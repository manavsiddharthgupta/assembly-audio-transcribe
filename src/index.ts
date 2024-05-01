import express from 'express'
import dotenv from 'dotenv'
import { audioRecorder } from './record'

dotenv.config()

const app = express()
const port = process.env.PORT
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.get('/record', (req, res) => {
  audioRecorder()
  res.send('See Terminal')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
