import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function buildAndExit() {
  try {
    console.log('Starting build process...')
    const { stdout, stderr } = await execAsync('vite build')
    
    console.log(stdout)
    if (stderr) console.error(stderr)
    
    console.log('Build completed successfully. Exiting...')
    process.exit(0)
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

buildAndExit()