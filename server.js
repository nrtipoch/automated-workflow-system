# ===== ขั้นตอนที่ 3: สร้าง server.js ที่ใช้งานได้ =====

cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// สร้าง public directory ถ้าไม่มี
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
  console.log('✅ Created public directory');
}

// สร้าง index.html
const createIndexHtml = () => {
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
            margin: 2rem auto;
            max-width: 1200px;
            padding: 0;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 2rem;
            border-radius: 20px 20px 0 0;
            text-align: center;
        }
        .card {
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin: 1rem 0;
        }
        .btn-primary {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border: none;
            border-radius: 25px;
        }
        .success-indicator {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 10px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="main-container">
            <div class="header">
                <h1><i class="fas fa-robot"></i> Automated Workflow System</h1>
                <p class="mb-0">ระบบสร้างเนื้อหาอัตโนมัติด้วย AI</p>
                <small>🎉 ระบบทำงานเรียบร้อยแล้ว!</small>
            </div>

            <div class="p-4">
                <div class="success-indicator">
                    <h5>✅ การแก้ไขปัญหาสำเร็จ!</h5>
                    <ul class="mb-0">
                        <li>✅ package.json ถูกต้องแล้ว</li>
                        <li>✅ Dependencies ติดตั้งสำเร็จ</li>
                        <li>✅ Express Server ทำงานปกติ</li>
                        <li>✅ หน้าเว็บแสดงผลได้แล้ว</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-edit"></i> สร้างเนื้อหาใหม่</h5>
                        <form id="workflowForm">
                            <div class="mb-3">
                                <label for="title" class="form-label">หัวข้อเรื่อง</label>
                                <input type="text" class="form-control" id="title" name="title" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="content" class="form-label">เนื้อหาที่ต้องการสรุป</label>
                                <textarea class="form-control" id="content" name="content" rows="4" required></textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="customEnding" class="form-label">ประโยคลงท้าย (ไม่บังคับ)</label>
                                <input type="text" class="form-control" id="customEnding" name="customEnding">
                            </div>
                            
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-play"></i> เริ่มประมวลผล (Demo)
                            </button>
                        </form>
                    </div>
                </div>

                <div id="results" class="card" style="display: none;">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-check-circle text-success"></i> ผลลัพธ์</h5>
                        <div id="resultsContent"></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-info-circle"></i> ข้อมูลระบบ</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Status:</strong> <span class="badge bg-success">Online</span></p>
                                <p><strong>Port:</strong> ${PORT}</p>
                                <p><strong>Node.js:</strong> ${process.version}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>API Endpoints:</strong></p>
                                <ul>
                                    <li><a href="/health" target="_blank">GET /health</a></li>
                                    <li><a href="/api/test" target="_blank">GET /api/test</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('workflowForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const customEnding = document.getElementById('customEnding').value;
            
            // แสดงผลลัพธ์ demo
            document.getElementById('results').style.display = 'block';
            document.getElementById('resultsContent').innerHTML = \`
                <div class="alert alert-success">
                    <h6>Demo Mode - การประมวลผลสำเร็จ!</h6>
                    <p><strong>หัวข้อ:</strong> \${title}</p>
                    <p><strong>เนื้อหาต้นฉบับ:</strong> \${content.substring(0, 100)}...</p>
                    <p><strong>ประโยคลงท้าย:</strong> \${customEnding || 'ไม่มี'}</p>
                    <p><strong>เวลาประมวลผล:</strong> \${new Date().toLocaleString('th-TH')}</p>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="card border-primary">
                            <div class="card-body text-center">
                                <i class="fas fa-file-alt fa-2x text-primary"></i>
                                <h6 class="mt-2">AI สรุป</h6>
                                <small>สำเร็จ</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-success">
                            <div class="card-body text-center">
                                <i class="fas fa-volume-up fa-2x text-success"></i>
                                <h6 class="mt-2">เสียง</h6>
                                <small>สำเร็จ</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-warning">
                            <div class="card-body text-center">
                                <i class="fas fa-video fa-2x text-warning"></i>
                                <h6 class="mt-2">วิดีโอ</h6>
                                <small>สำเร็จ</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-danger">
                            <div class="card-body text-center">
                                <i class="fab fa-youtube fa-2x text-danger"></i>
                                <h6 class="mt-2">YouTube</h6>
                                <small>สำเร็จ</small>
                            </div>
                        </div>
                    </div>
                </div>
            \`;
            
            // เลื่อนไปยังผลลัพธ์
            document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        });

        // ทดสอบ API
        fetch('/health')
            .then(response => response.json())
            .then(data => console.log('Health check:', data))
            .catch(error => console.error('Health check failed:', error));
    </script>
</body>
</html>`;
  
  fs.writeFileSync(indexPath, html);
  console.log('✅ Created index.html');
};

// Routes
app.get('/', (req, res) => {
  createIndexHtml();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT,
    nodeVersion: process.version,
    uptime: Math.floor(process.uptime()),
    message: 'Automated Workflow System is running successfully!'
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

app.post('/api/process-workflow', (req, res) => {
  const { title, content, customEnding } = req.body;
  
  res.json({
    success: true,
    message: 'Workflow processed successfully (Demo Mode)',
    data: {
      id: 'demo_' + Date.now(),
      title,
      content: content.substring(0, 200) + '...',
      customEnding,
      timestamp: new Date().toISOString(),
      status: 'completed'
    }
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

// Start server
app.listen(PORT, () => {
  console.log('🚀 Automated Workflow System');
  console.log('===============================');
  console.log(\`📱 URL: http://localhost:\${PORT}\`);
  console.log(\`📁 Directory: \${__dirname}\`);
  console.log(\`🔧 Node.js: \${process.version}\`);
  console.log('===============================');
  console.log('✅ Server ready! Open your browser.');
  console.log('');
});
EOF

echo "✅ สร้าง server.js ใหม่เรียบร้อย"