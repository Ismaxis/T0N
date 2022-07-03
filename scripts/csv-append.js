fs = require('fs-sync')

module.exports = {
    append: function (name, content){ 
        file = fs.read('./tables/messages.csv')
        fs.write('./tables/messages.csv', file+'\n'+name+','+content)
    }
} 
