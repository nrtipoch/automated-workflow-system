// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { WorkflowProcessor } = require('./src/workflow-processor');
const { DatabaseManager } = require('./src/database-manager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// File upload configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Initialize components
const workflowProcessor = new WorkflowProcessor();
const dbManager = new DatabaseManager();

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/process-workflow', upload.single('logo'), async (req, res) => {
  try {
    const { content, customEnding, title } = req.body;
    const logoPath = req.file ? req.file.path : null;

    console.log('Processing workflow:', { content: content.substring(0, 100) + '...', title });

    const result = await workflowProcessor.processContent({
      content,
      customEnding,
      title,
      logoPath
    });

    // Save to database
    await dbManager.saveWorkflow(result);

    res.json({
      success: true,
      data: result,
      message: 'Workflow processed successfully'
    });

  } catch (error) {
    console.error('Workflow processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/workflows', async (req, res) => {
  try {
    const workflows = await dbManager.getWorkflows();
    res.json({ success: true, data: workflows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/workflow/:id', async (req, res) => {
  try {
    const workflow = await dbManager.getWorkflow(req.params.id);
    if (!workflow) {
      return res.status(404).json({ success: false, error: 'Workflow not found' });
    }
    res.json({ success: true, data: workflow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Create necessary directories
const createDirectories = () => {
  const dirs = ['uploads', 'outputs', 'temp', 'logs'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Start server
createDirectories();
app.listen(PORT, () => {
  console.log(`🚀 Automated Workflow System running on port ${PORT}`);
  console.log(`📱 Access the application at: http://localhost:${PORT}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});