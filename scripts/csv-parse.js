
const fs = require('fs-sync')

module.exports = {
  messages: function read_messages() {
    content = fs.read('./tables/messages.csv')
    const results = content.split("\n")
    results.forEach((item, index) => {
      results[index] = results[index].split(',')
    })
    return results.map(([name, content]) => ({
      name,
      content
    }))
  }
} 