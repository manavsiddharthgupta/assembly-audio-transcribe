import express from 'express'
import dotenv from 'dotenv'
import { audioRecorder } from './record'

dotenv.config()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Nothing to see here, see Node js Terminal')
})

audioRecorder()

app.listen(port, () => {})
