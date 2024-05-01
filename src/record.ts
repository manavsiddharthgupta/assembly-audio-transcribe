import recorder from 'node-record-lpcm16'
import { AssemblyAI } from 'assemblyai'
import fs from 'fs'

export const audioRecorder = () => {
  const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
  const recording = recorder.record()
  console.log('started')
  recording.stream({ threshold: 5 }).pipe(file)

  const run = async (audioUrl: string) => {
    if (!audioUrl) {
      return
    }
    const params = {
      audio: audioUrl
    }

    const client = new AssemblyAI({
      apiKey: process.env.assemblyapi || ''
    })

    const transcript = await client.transcripts.transcribe(params)
    console.log('Trancribed Text -->', transcript.text)
  }

  setTimeout(() => {
    console.log('stopped')
    recording.stop()
    file.end()
    run('./test.wav')
  }, 12000)
}
