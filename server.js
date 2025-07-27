const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configure Multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Serve static files from 'public' folder
app.use(express.static('public'));

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('<script>alert("No file uploaded"); window.history.back();</script>');
  }
  res.send(`<script>alert("✅ Encrypted file uploaded: ${req.file.originalname}"); window.location.href="/";</script>`);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});