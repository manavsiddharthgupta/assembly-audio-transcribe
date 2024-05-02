import recorder from 'node-record-lpcm16'
import { AssemblyAI } from 'assemblyai'
import fs from 'fs'
import readline from 'readline'

export const audioRecorder = () => {
  let t = 11
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Enter a value between 5 and 20 seconds: ', (input) => {
    const value = parseInt(input)

    if (isNaN(value) || value < 5 || value > 20) {
      console.log(
        'Invalid input. Please enter a value between 5 and 20 seconds.'
      )
    } else {
      t = value + 1
      console.log('Value entered:', value)
    }
    rl.close()

    const file = fs.createWriteStream('test.wav', { encoding: 'binary' })
    const recording = recorder.record()
    console.log('recording..')
    recording.stream({ threshold: 3 }).pipe(file)

    setTimeout(() => {
      console.log('stopped, transcribing...')
      recording.stop()
      file.end()
      run('./test.wav')
    }, t * 1000)
  })

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
}
