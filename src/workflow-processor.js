// src/workflow-processor.js
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');
const { GoogleAIStudio } = require('./google-ai-studio');
const { CanvaIntegration } = require('./canva-integration');
const { YouTubeUploader } = require('./youtube-uploader');

class WorkflowProcessor {
  constructor() {
    this.googleAI = new GoogleAIStudio();
    this.canva = new CanvaIntegration();
    this.youtube = new YouTubeUploader();
  }

  async processContent({ content, customEnding, title, logoPath }) {
    const workflowId = `workflow_${Date.now()}`;
    const results = {
      id: workflowId,
      timestamp: new Date().toISOString(),
      originalContent: content,
      customEnding,
      title,
      steps: {}
    };

    try {
      // Step 1: AI Summary with Gemini
      console.log('Step 1: Generating AI summary...');
      const summary = await this.generateSummary(content, customEnding);
      results.steps.summary = {
        status: 'completed',
        data: summary,
        timestamp: new Date().toISOString()
      };

      // Step 2: Text-to-Speech with Google AI Studio
      console.log('Step 2: Converting to speech...');
      const audioPath = await this.generateAudio(summary.text, workflowId);
      results.steps.audio = {
        status: 'completed',
        data: { audioPath, duration: summary.estimatedDuration },
        timestamp: new Date().toISOString()
      };

      // Step 3: Create video with Canva
      console.log('Step 3: Creating video...');
      const videoData = await this.createVideo(title, logoPath, audioPath, workflowId);
      results.steps.video = {
        status: 'completed',
        data: videoData,
        timestamp: new Date().toISOString()
      };

      // Step 4: Upload to YouTube
      console.log('Step 4: Uploading to YouTube...');
      const youtubeData = await this.uploadToYouTube(videoData, title, summary.text);
      results.steps.youtube = {
        status: 'completed',
        data: youtubeData,
        timestamp: new Date().toISOString()
      };

      results.status = 'completed';
      results.completedAt = new Date().toISOString();

    } catch (error) {
      console.error('Workflow processing error:', error);
      results.status = 'failed';
      results.error = error.message;
      results.failedAt = new Date().toISOString();
    }

    return results;
  }

  async generateSummary(content, customEnding) {
    try {
      const prompt = `
        Please summarize the following content in a way that can be read in under 1 minute (approximately 150-200 words).
        Make it engaging and informative. 
        ${customEnding ? `End with this custom phrase: "${customEnding}"` : ''}
        
        Content to summarize:
        ${content}
        
        Please provide a summary that is clear, concise, and engaging for audio presentation.
      `;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const summaryText = response.data.candidates[0].content.parts[0].text;
      const wordCount = summaryText.split(' ').length;
      const estimatedDuration = Math.ceil(wordCount / 2.5); // Average reading speed

      return {
        text: summaryText,
        wordCount,
        estimatedDuration: `${estimatedDuration} seconds`,
        generatedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Summary generation error:', error);
      throw new Error(`Failed to generate summary: ${error.message}`);
    }
  }

  async generateAudio(text, workflowId) {
    try {
      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_AI_API_KEY}`,
        {
          input: { text },
          voice: {
            languageCode: 'th-TH',
            name: 'th-TH-Standard-A',
            ssmlGender: 'FEMALE'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0.0
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const audioContent = response.data.audioContent;
      const audioPath = path.join('outputs', `${workflowId}_audio.mp3`);
      
      await fs.writeFile(audioPath, audioContent, 'base64');
      
      return audioPath;

    } catch (error) {
      console.error('Audio generation error:', error);
      throw new Error(`Failed to generate audio: ${error.message}`);
    }
  }

  async createVideo(title, logoPath, audioPath, workflowId) {
    try {
      // This is a simplified video creation process
      // In a real implementation, you would integrate with Canva API
      const videoData = {
        videoPath: path.join('outputs', `${workflowId}_video.mp4`),
        title,
        logoPath,
        audioPath,
        createdAt: new Date().toISOString()
      };

      // Simulate video creation process
      await this.simulateVideoCreation(videoData);

      return videoData;

    } catch (error) {
      console.error('Video creation error:', error);
      throw new Error(`Failed to create video: ${error.message}`);
    }
  }

  async simulateVideoCreation(videoData) {
    // This simulates video creation - replace with actual Canva API integration
    const dummyVideoContent = 'dummy video content';
    await fs.writeFile(videoData.videoPath, dummyVideoContent);
  }

  async uploadToYouTube(videoData, title, description) {
    try {
      // This would integrate with YouTube API
      const youtubeData = {
        videoId: `dummy_video_id_${Date.now()}`,
        title,
        description,
        videoPath: videoData.videoPath,
        uploadedAt: new Date().toISOString(),
        url: `https://youtube.com/watch?v=dummy_video_id_${Date.now()}`
      };

      // Simulate upload process
      await this.simulateYouTubeUpload(youtubeData);

      return youtubeData;

    } catch (error) {
      console.error('YouTube upload error:', error);
      throw new Error(`Failed to upload to YouTube: ${error.message}`);
    }
  }

  async simulateYouTubeUpload(youtubeData) {
    // This simulates YouTube upload - replace with actual YouTube API integration
    console.log('Simulating YouTube upload for:', youtubeData.title);
  }
}

module.exports = { WorkflowProcessor };