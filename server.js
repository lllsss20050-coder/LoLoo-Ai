const express = require('express');
const multer = require('multer');
const Replicate = require('replicate');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(express.json());

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

app.post('/generate', upload.single('image'), async (req, res) => {
  try {
    const base64Image = req.file.buffer.toString('base64');
    const output = await replicate.run(
      "stability-ai/stable-video-diffusion:...", 
      { input: { image: base64Image } }
    );
    res.json({ videoUrl: output[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));