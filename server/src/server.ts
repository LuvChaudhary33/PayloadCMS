import express from 'express'
import payload from 'payload'
import cors from 'cors';
require("dotenv").config()
const app = express()


app.use(cors({origin:process.env.URL}))
app.get('/posts/videos/stream', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  try {
    const posts = await payload.find({collection: 'posts', limit: limit, page: page, where: {
      type: {
        equals: "Short Video",
      }} 
    })
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })
  
  app.listen(3000, () => {
    console.log('Server running on Port 3000')
  })
}

start()
