// README.md
# Automated Workflow System

ระบบสร้างเนื้อหาอัตโนมัติที่ใช้ AI ในการสรุปเนื้อหา แปลงเป็นเสียง สร้างวิดีโอ และอัปโหลดไปยัง YouTube

## ฟีเจอร์หลัก

- 🤖 **AI Content Summarization**: ใช้ Google Gemini API สรุปเนื้อหาให้อยู่ในช่วงเวลาไม่เกิน 1 นาที
- 🎵 **Text-to-Speech**: แปลงข้อความเป็นเสียงด้วย Google AI Studio
- 🎬 **Video Creation**: สร้างวิดีโอพร้อมโลโก้ด้วย Canva API
- 📺 **YouTube Upload**: อัปโหลดวิดีโอไปยัง YouTube อัตโนมัติ
- 💾 **Workflow Management**: บันทึกและจัดการประวัติการทำงาน
- 🌐 **Web Interface**: หน้าเว็บสำหรับการใช้งานที่ใช้งานง่าย

## การติดตั้ง

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/automated-workflow-system.git
cd automated-workflow-system
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` โดยคัดลอกจาก `.env.example`:

```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env` และใส่ API keys ที่จำเป็น:

```env
# Google AI API Key
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Canva API Key
CANVA_API_KEY=your_canva_api_key_here

# YouTube API Credentials
YOUTUBE_CLIENT_ID=your_youtube_client_id_here
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret_here
YOUTUBE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. การได้ API Keys

#### Google AI API Key
1. ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. สร้าง API key ใหม่
3. คัดลอก key มาใส่ใน `.env`

#### Canva API Key
1. ไปที่ [Canva Developers](https://www.canva.com/developers/)
2. สร้างแอปพลิเคชันใหม่
3. ได้รับ API key

#### YouTube API
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจ็คใหม่หรือเลือกโปรเจ็คที่มีอยู่
3. เปิดใช้งาน YouTube Data API v3
4. สร้าง OAuth 2.0 credentials
5. เพิ่ม redirect URI: `http://localhost:3000/auth/youtube/callback`

### 5. รันแอปพลิเคชัน

```bash
# Development mode
npm run dev

# Production mode
npm start
```

แอปพลิเคชันจะรันที่ `http://localhost:3000`

## การใช้งาน

### 1. การสร้างเนื้อหาใหม่

1. เข้าไปที่หน้าเว็บแอปพลิเคชัน
2. กรอกหัวข้อเรื่อง
3. ใส่เนื้อหาที่ต้องการสรุป
4. เพิ่มประโยคลงท้าย (ถ้าต้องการ)
5. อัปโหลดไฟล์โลโก้
6. คลิก "เริ่มประมวลผล"

### 2. การติดตามความคืบหน้า

ระบบจะแสดงความคืบหน้าในขั้นตอนต่างๆ:

1. **สรุปเนื้อหา**: AI จะสรุปเนื้อหาให้อยู่ในกรอบเวลาที่กำหนด
2. **แปลงเป็นเสียง**: ใช้ Text-to-Speech แปลงข้อความเป็นเสียง
3. **สร้างวิดีโอ**: สร้างวิดีโอพร้อมเสียงและโลโก้
4. **อัปโหลด YouTube**: อัปโหลดวิดีโอไปยัง YouTube

### 3. การดูผลลัพธ์

เมื่อเสร็จสิ้น จะได้รับ:
- เนื้อหาที่สรุปแล้ว
- ไฟล์เสียง
- วิดีโอที่สร้างขึ้น
- ลิงก์ YouTube

## API Endpoints

### POST /api/process-workflow
สร้างและประมวลผล workflow ใหม่

**Request Body:**
```json
{
  "title": "หัวข้อเรื่อง",
  "content": "เนื้อหาที่ต้องการสรุป",
  "customEnding": "ประโยคลงท้าย",
  "logo": "file"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "workflow_id",
    "status": "completed",
    "steps": {
      "summary": {...},
      "audio": {...},
      "video": {...},
      "youtube": {...}
    }
  }
}
```

### GET /api/workflows
ดึงรายการ workflows ทั้งหมด

### GET /api/workflow/:id
ดึงข้อมูล workflow ตาม ID

### GET /health
ตรวจสอบสถานะของระบบ

## โครงสร้างโปรเจ็ค

```
automated-workflow-system/
├── server.js                 # Main server file
├── package.json              # Dependencies และ scripts
├── .env.example             # Environment variables template
├── README.md                # คู่มือนี้
├── src/
│   ├── workflow-processor.js # Core workflow logic
│   ├── database-manager.js   # Database operations
│   ├── google-ai-studio.js   # Google AI integrations
│   ├── canva-integration.js  # Canva API integration
│   └── youtube-uploader.js   # YouTube upload functionality
├── public/
│   └── index.html           # Web interface
├── uploads/                 # Uploaded files
├── outputs/                 # Generated content
├── data/                    # Database files
└── logs/                    # Log files
```

## การพัฒนาเพิ่มเติม

### เพิ่มฟีเจอร์ใหม่

1. **Database Integration**: เปลี่ยนจาก JSON file เป็น MongoDB หรือ PostgreSQL
2. **Authentication**: เพิ่มระบบล็อกอิน
3. **Batch Processing**: ประมวลผลหลายไฟล์พร้อมกัน
4. **Scheduled Tasks**: ตั้งเวลาการทำงานอัตโนมัติ
5. **Advanced Analytics**: วิเคราะห์ผลการทำงาน

### การปรับแต่ง

1. **AI Model**: เปลี่ยนหรือเพิ่มโมเดล AI อื่นๆ
2. **Video Templates**: เพิ่มเทมเพลตวิดีโอหลายแบบ
3. **Language Support**: รองรับหลายภาษา
4. **Export Options**: เพิ่มรูปแบบการส่งออก

## การแก้ปัญหา

### ปัญหาที่พบบ่อย

1. **API Key ไม่ถูกต้อง**
   - ตรวจสอบว่า API key ใน `.env` ถูกต้อง
   - ตรวจสอบว่า API ได้รับการเปิดใช้งาน

2. **ข้อผิดพลาดการอัปโหลด**
   - ตรวจสอบขนาดไฟล์ (ไม่เกิน 100MB)
   - ตรวจสอบรูปแบบไฟล์ที่รองรับ

3. **การเชื่อมต่อ YouTube**
   - ตรวจสอบ OAuth credentials
   - ตรวจสอบ redirect URI

### การตรวจสอบสถานะ

```bash
# ตรวจสอบสถานะเซิร์ฟเวอร์
curl http://localhost:3000/health

# ตรวจสอบ logs
tail -f logs/app.log
```

## การ Deploy

### Deploy บน Heroku

1. สร้าง Heroku app
2. ตั้งค่า environment variables
3. Deploy ด้วย Git

```bash
heroku create your-app-name
heroku config:set GOOGLE_AI_API_KEY=your_key
git push heroku main
```

### Deploy บน VPS

1. ติดตั้ง Node.js และ PM2
2. Clone repository
3. ติดตั้ง dependencies
4. ตั้งค่า environment variables
5. รันด้วย PM2

```bash
pm2 start server.js --name automated-workflow
pm2 startup
pm2 save
```

## การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. เปิด Issue ใน GitHub
2. ตรวจสอบ documentation
3. ดู logs สำหรับข้อผิดพลาด

## License

MIT License - ดูไฟล์ LICENSE สำหรับรายละเอียด

## การสนับสนุน

ถ้าโปรเจ็คนี้มีประโยชน์ อย่าลืมให้ ⭐ ใน GitHub!

---

## ข้อมูลเพิ่มเติม

### ความต้องการระบบ
- Node.js 16.0.0 หรือใหม่กว่า
- RAM อย่างน้อย 2GB
- พื้นที่ว่าง 5GB สำหรับไฟล์ชั่วคราว

### ความปลอดภัย
- API keys ถูกเก็บในไฟล์ .env
- ไฟล์อัปโหลดได้รับการตรวจสอบ
- ระบบมีการจำกัดขนาดไฟล์

### ประสิทธิภาพ
- รองรับการประมวลผลหลายไฟล์
- ระบบแคชสำหรับเนื้อหาที่ซ้ำกัน
- การจัดการหน่วยความจำอัตโนมัติ