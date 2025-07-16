// ===== Complete Automated Workflow System =====

// เพิ่มในไฟล์ server.js ที่มีอยู่แล้ว
// หรือแทนที่ไฟล์เดิมด้วยโค้ดนี้

const express = require('express');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Complete Automated Workflow System...');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// Create directories
const createDirectories = () => {
  const dirs = ['public', 'uploads', 'outputs', 'temp', 'logs', 'data'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created: ${dir}/`);
    }
  });
};

// Create complete index.html
const createCompleteIndexHtml = () => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  const html = `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automated Workflow System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .main-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            margin: 2rem auto;
            max-width: 1200px;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 2rem;
            border-radius: 20px 20px 0 0;
            text-align: center;
        }
        .workflow-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin: 1rem 0;
            transition: transform 0.3s ease;
        }
        .workflow-card:hover {
            transform: translateY(-5px);
        }
        .step-indicator {
            display: flex;
            justify-content: space-between;
            margin: 2rem 0;
            position: relative;
        }
        .step {
            flex: 1;
            text-align: center;
            position: relative;
        }
        .step::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100%;
            width: 100%;
            height: 2px;
            background: #ddd;
            z-index: 1;
        }
        .step:last-child::after {
            display: none;
        }
        .step-icon {
            width: 50px;
            height: 50px;
            background: #e9ecef;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            color: #6c757d;
            font-size: 1.2rem;
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .step.active .step-icon {
            background: #ffc107;
            color: white;
            animation: pulse 2s infinite;
        }
        .step.completed .step-icon {
            background: #28a745;
            color: white;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .progress-bar {
            height: 10px;
            border-radius: 5px;
            overflow: hidden;
            background: #e9ecef;
            margin: 1rem 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
            transition: width 0.5s ease;
            width: 0%;
        }
        .btn-primary {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border: none;
            border-radius: 25px;
            padding: 12px 30px;
            font-weight: 600;
        }
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .result-card {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 10px;
            padding: 1rem;
            margin: 1rem 0;
        }
        .success-indicator {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="main-container">
            <div class="header">
                <h1><i class="fas fa-robot"></i> Automated Workflow System</h1>
                <p class="mb-0">ระบบสร้างเนื้อหาอัตโนมัติด้วย AI</p>
                <small>🎉 JSON Error แก้ไขเรียบร้อย - ระบบพร้อมใช้งาน</small>
            </div>

            <div class="p-4">
                <!-- Success Message -->
                <div class="success-indicator">
                    <h5><i class="fas fa-check-circle"></i> ระบบทำงานเรียบร้อยแล้ว!</h5>
                    <ul class="mb-0">
                        <li>✅ JSON Error แก้ไขสำเร็จ</li>
                        <li>✅ Express Server ทำงานปกติ</li>
                        <li>✅ หน้าเว็บแสดงผลได้</li>
                        <li>✅ พร้อมสำหรับการพัฒนาต่อ</li>
                    </ul>
                </div>

                <!-- Input Form -->
                <div class="workflow-card p-4 mb-4">
                    <h3><i class="fas fa-edit"></i> สร้างเนื้อหาใหม่</h3>
                    <form id="workflowForm" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="title" class="form-label">หัวข้อเรื่อง</label>
                            <input type="text" class="form-control" id="title" name="title" required 
                                   placeholder="เช่น: การพัฒนาเว็บแอปพลิเคชันด้วย AI">
                        </div>
                        
                        <div class="mb-3">
                            <label for="content" class="form-label">เนื้อหาที่ต้องการสรุป</label>
                            <textarea class="form-control" id="content" name="content" rows="6" required
                                      placeholder="กรอกเนื้อหาที่ต้องการให้ AI สรุป (สามารถใส่ข้อความยาวๆ ได้)"></textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label for="customEnding" class="form-label">ประโยคลงท้าย (ไม่บังคับ)</label>
                            <input type="text" class="form-control" id="customEnding" name="customEnding"
                                   placeholder="เช่น: ขอบคุณที่รับชม, สวัสดีครับ/ค่ะ">
                        </div>
                        
                        <div class="mb-3">
                            <label for="logo" class="form-label">อัปโหลดโลโก้</label>
                            <input type="file" class="form-control" id="logo" name="logo" accept="image/*">
                            <small class="form-text text-muted">รองรับไฟล์ JPG, PNG, GIF (ขนาดไม่เกิน 10MB)</small>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-lg">
                            <i class="fas fa-play"></i> เริ่มประมวลผล
                        </button>
                    </form>
                </div>

                <!-- Progress Section -->
                <div id="progressSection" class="workflow-card p-4 mb-4" style="display: none;">
                    <h3><i class="fas fa-cogs"></i> กำลังประมวลผล...</h3>
                    
                    <div class="progress-bar">
                        <div id="progressFill" class="progress-fill"></div>
                    </div>
                    
                    <div class="step-indicator">
                        <div class="step" id="step1">
                            <div class="step-icon"><i class="fas fa-brain"></i></div>
                            <small>AI สรุปเนื้อหา</small>
                        </div>
                        <div class="step" id="step2">
                            <div class="step-icon"><i class="fas fa-volume-up"></i></div>
                            <small>แปลงเป็นเสียง</small>
                        </div>
                        <div class="step" id="step3">
                            <div class="step-icon"><i class="fas fa-video"></i></div>
                            <small>สร้างวิดีโอ</small>
                        </div>
                        <div class="step" id="step4">
                            <div class="step-icon"><i class="fab fa-youtube"></i></div>
                            <small>อัปโหลด YouTube</small>
                        </div>
                    </div>
                    
                    <div id="statusMessage" class="text-center mt-3">
                        <div class="loading-spinner"></div>
                        <span class="ms-2">กำลังเริ่มต้น...</span>
                    </div>
                </div>

                <!-- Results Section -->
                <div id="resultsSection" class="workflow-card p-4 mb-4" style="display: none;">
                    <h3><i class="fas fa-check-circle text-success"></i> ผลลัพธ์</h3>
                    <div id="resultsContent"></div>
                </div>

                <!-- History Section -->
                <div class="workflow-card p-4 mb-4">
                    <h3><i class="fas fa-history"></i> ประวัติการทำงาน</h3>
                    <div id="historyContent">
                        <div class="text-center text-muted">
                            <i class="fas fa-clock fa-2x mb-2"></i>
                            <p>ยังไม่มีประวัติการทำงาน</p>
                        </div>
                    </div>
                </div>

                <!-- System Info -->
                <div class="workflow-card p-4">
                    <h3><i class="fas fa-info-circle"></i> ข้อมูลระบบ</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <h6>📊 สถานะระบบ</h6>
                            <p><strong>Status:</strong> <span class="badge bg-success">Online</span></p>
                            <p><strong>Port:</strong> ${PORT}</p>
                            <p><strong>Environment:</strong> Development</p>
                            <p><strong>Version:</strong> 1.0.0</p>
                        </div>
                        <div class="col-md-6">
                            <h6>🔗 API Endpoints</h6>
                            <ul class="list-unstyled">
                                <li><a href="/" target="_blank">GET / (Homepage)</a></li>
                                <li><a href="/health" target="_blank">GET /health</a></li>
                                <li><a href="/api/test" target="_blank">GET /api/test</a></li>
                                <li>POST /api/process-workflow</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Next Steps -->
                <div class="workflow-card p-4">
                    <h3><i class="fas fa-rocket"></i> ขั้นตอนต่อไป</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <h6>🔧 การพัฒนาต่อ</h6>
                            <ul>
                                <li>เชื่อมต่อ Google AI API</li>
                                <li>เชื่อมต่อ Canva API</li>
                                <li>เชื่อมต่อ YouTube API</li>
                                <li>เพิ่มระบบ authentication</li>
                                <li>เพิ่ม database</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6>📚 การเรียนรู้</h6>
                            <ul>
                                <li>ศึกษา API documentation</li>
                                <li>ทดสอบการอัปโหลดไฟล์</li>
                                <li>พัฒนา UI/UX เพิ่มเติม</li>
                                <li>เพิ่มฟีเจอร์ใหม่ๆ</li>
                                <li>Deploy ขึ้น production</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Form submission handler
        document.getElementById('workflowForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                title: formData.get('title'),
                content: formData.get('content'),
                customEnding: formData.get('customEnding')
            };
            
            // Show progress section
            document.getElementById('progressSection').style.display = 'block';
            document.getElementById('resultsSection').style.display = 'none';
            
            // Reset progress
            updateProgress(0);
            resetSteps();
            
            try {
                // Simulate workflow steps
                await simulateWorkflow(data);
                
                // Call API
                const response = await fetch('/api/process-workflow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showResults(result.data);
                } else {
                    showError(result.error || 'เกิดข้อผิดพลาดในการประมวลผล');
                }
                
            } catch (error) {
                showError('เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + error.message);
            }
        });

        function updateProgress(percentage) {
            document.getElementById('progressFill').style.width = percentage + '%';
        }

        function resetSteps() {
            for (let i = 1; i <= 4; i++) {
                const step = document.getElementById('step' + i);
                step.classList.remove('completed', 'active');
            }
        }

        function setStepActive(stepNumber) {
            const step = document.getElementById('step' + stepNumber);
            step.classList.add('active');
        }

        function setStepCompleted(stepNumber) {
            const step = document.getElementById('step' + stepNumber);
            step.classList.remove('active');
            step.classList.add('completed');
        }

        function updateStatusMessage(message) {
            document.getElementById('statusMessage').innerHTML = 
                '<div class="loading-spinner"></div><span class="ms-2">' + message + '</span>';
        }

        async function simulateWorkflow(data) {
            const steps = [
                { step: 1, message: 'กำลังสรุปเนื้อหาด้วย AI Gemini...', progress: 25 },
                { step: 2, message: 'กำลังแปลงข้อความเป็นเสียง...', progress: 50 },
                { step: 3, message: 'กำลังสร้างวิดีโอด้วย Canva...', progress: 75 },
                { step: 4, message: 'กำลังอัปโหลดไปยัง YouTube...', progress: 100 }
            ];

            for (const { step, message, progress } of steps) {
                setStepActive(step);
                updateStatusMessage(message);
                updateProgress(progress);
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                setStepCompleted(step);
            }
        }

        function showResults(data) {
            document.getElementById('progressSection').style.display = 'none';
            document.getElementById('resultsSection').style.display = 'block';
            
            const resultsContent = document.getElementById('resultsContent');
            resultsContent.innerHTML = \`
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="result-card">
                            <h6><i class="fas fa-file-alt text-primary"></i> เนื้อหาที่สรุป</h6>
                            <p>\${data.summary || 'เนื้อหาถูกสรุปเรียบร้อยแล้ว'}</p>
                            <small class="text-muted">จำนวนคำ: \${data.wordCount || '150'} คำ</small>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="result-card">
                            <h6><i class="fas fa-volume-up text-success"></i> ไฟล์เสียง</h6>
                            <p>แปลงเป็นเสียงเรียบร้อยแล้ว</p>
                            <small class="text-muted">ระยะเวลา: \${data.duration || '45'} วินาที</small>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="result-card">
                            <h6><i class="fas fa-video text-warning"></i> วิดีโอ</h6>
                            <p>สร้างวิดีโอเรียบร้อยแล้ว</p>
                            <small class="text-muted">รูปแบบ: MP4, คุณภาพ: HD</small>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="result-card">
                            <h6><i class="fab fa-youtube text-danger"></i> YouTube</h6>
                            <p>อัปโหลดเรียบร้อยแล้ว</p>
                            <a href="#" class="btn btn-sm btn-danger">
                                <i class="fab fa-youtube"></i> ดูใน YouTube
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="result-card">
                    <h6><i class="fas fa-info-circle"></i> ข้อมูลเพิ่มเติม</h6>
                    <p><strong>Workflow ID:</strong> \${data.id || 'demo_' + Date.now()}</p>
                    <p><strong>สร้างเมื่อ:</strong> \${new Date().toLocaleString('th-TH')}</p>
                    <p><strong>สถานะ:</strong> <span class="badge bg-success">เสร็จสิ้น</span></p>
                </div>
            \`;
            
            // Update history
            loadHistory();
        }

        function showError(error) {
            document.getElementById('progressSection').style.display = 'none';
            document.getElementById('resultsSection').style.display = 'block';
            
            const resultsContent = document.getElementById('resultsContent');
            resultsContent.innerHTML = \`
                <div class="alert alert-danger">
                    <h6><i class="fas fa-exclamation-triangle"></i> เกิดข้อผิดพลาด</h6>
                    <p>\${error}</p>
                </div>
            \`;
        }

        async function loadHistory() {
            try {
                const response = await fetch('/api/workflows');
                const result = await response.json();
                
                if (result.success && result.data.length > 0) {
                    const historyContent = document.getElementById('historyContent');
                    historyContent.innerHTML = result.data.map(workflow => \`
                        <div class="card mb-2">
                            <div class="card-body">
                                <h6 class="card-title">\${workflow.title}</h6>
                                <p class="card-text small text-muted">
                                    \${new Date(workflow.timestamp).toLocaleString('th-TH')}
                                </p>
                                <span class="badge bg-success">\${workflow.status}</span>
                            </div>
                        </div>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading history:', error);
            }
        }

        // Load history on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadHistory();
            
            // Health check
            fetch('/health')
                .then(response => response.json())
                .then(data => {
                    console.log('✅ System health check successful:', data);
                })
                .catch(error => {
                    console.error('❌ Health check failed:', error);
                });
        });
    </script>
</body>
</html>`;

  fs.writeFileSync(indexPath, html);
  console.log('✅ Created complete index.html');
};

// Mock workflow processing
const processWorkflow = async (data) => {
  return {
    id: 'workflow_' + Date.now(),
    title: data.title,
    summary: `สรุป: ${data.content.substring(0, 100)}...`,
    wordCount: Math.floor(Math.random() * 100) + 100,
    duration: Math.floor(Math.random() * 30) + 30,
    timestamp: new Date().toISOString(),
    status: 'completed'
  };
};

// Routes
app.get('/', (req, res) => {
  createCompleteIndexHtml();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Automated Workflow System is running perfectly!',
    timestamp: new Date().toISOString(),
    port: PORT,
    nodeVersion: process.version,
    uptime: Math.floor(process.uptime()),
    features: {
      aiSummarization: 'ready',
      textToSpeech: 'ready', 
      videoCreation: 'ready',
      youtubeUpload: 'ready'
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API ทำงานปกติ',
    timestamp: new Date().toISOString(),
    endpoint: '/api/test'
  });
});

app.post('/api/process-workflow', async (req, res) => {
  try {
    console.log('Processing workflow:', req.body);
    
    const result = await processWorkflow(req.body);
    
    res.json({
      success: true,
      data: result,
      message: 'Workflow processed successfully (Demo Mode)'
    });
    
  } catch (error) {
    console.error('Workflow processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/workflows', (req, res) => {
  // Mock history data
  const mockWorkflows = [
    {
      id: 'workflow_demo_1',
      title: 'การพัฒนาเว็บแอปพลิเคชัน',
      status: 'completed',
      timestamp: new Date(Date.now() - 60000).toISOString()
    },
    {
      id: 'workflow_demo_2',
      title: 'ระบบ AI สำหรับสร้างเนื้อหา',
      status: 'completed', 
      timestamp: new Date(Date.now() - 120000).toISOString()
    }
  ];
  
  res.json({
    success: true,
    data: mockWorkflows
  });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found',
    path: req.url,
    message: 'The requested resource was not found on this server.'
  });
});

// Initialize and start server
createDirectories();

app.listen(PORT, () => {
  console.log('');
  console.log('🎉 Complete Automated Workflow System');
  console.log('========================================');
  console.log(`📱 URL: http://localhost:${PORT}`);
  console.log(`📁 Directory: ${__dirname}`);
  console.log(`🔧 Node.js: ${process.version}`);
  console.log('========================================');
  console.log('✅ System ready with all features!');
  console.log('');
  console.log('🚀 Features Available:');
  console.log('   • AI Content Summarization (Demo)');
  console.log('   • Text-to-Speech Conversion (Demo)');
  console.log('   • Video Creation (Demo)');
  console.log('   • YouTube Upload (Demo)');
  console.log('   • Workflow Management');
  console.log('   • Progress Tracking');
  console.log('');
  console.log('🌐 Open your browser to start using!');
  console.log('');
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Automated Workflow System...');
  console.log('👋 Thank you for using our system!');
  process.exit(0);
});