require('dotenv').config()
const fs = require('fs')
const path = require('path')

const environmentFilePath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts')
let environmentFileContent = fs.readFileSync(environmentFilePath, 'utf8')

const environmentVariables = ['API_BASE_URL']

environmentVariables.forEach(variable => {
  const value = process.env[variable] || ''
  environmentFileContent = environmentFileContent.replace(new RegExp(`\\$\{${variable}\}`, 'g'), value)
})

fs.writeFileSync(environmentFilePath, environmentFileContent)
