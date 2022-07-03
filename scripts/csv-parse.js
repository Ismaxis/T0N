const csv = require('csv-parser')
const fs = require('fs-sync')

content = fs.read('./tables/messages.csv')
const results = content.split("\r\n")
results.forEach((item, index) => {
  results[index] = results[index].split(',')
})
messages = results.map(([name, content]) => ({
  name,
  content
}))

module.exports = {

  messages: messages,
} 