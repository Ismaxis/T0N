var fs = require('fs');
const fs_sync = require('fs-sync')

module.exports = {
    append: function (arr) {
        files = fs.readdirSync('./tables/nums');
        files.forEach((item, index) => {
            files[index] = item.replace(".csv", "")
        })
        if (files.length != 0) {
            num = parseInt(files[files.length - 1]) + 1
        } else {
            num = 0
        }
        fs.open(`./tables/nums/${num}.csv`, 'w', function (err,
            file) {
            if (err) throw err;
        });
        arr.forEach((item, index) => {
            files[index] = item.join(",")
        })
        fs_sync.write(`./tables/nums/${num}.csv`, arr.join("\n"))
    },
    read: function (num) {
        content = fs_sync.read(`./tables/nums/${num}.csv`)
        const results = content.split("\n")
        results.forEach((item, index) => {
            results[index] = results[index].split(',')
        })
        return results
    },
    last_table_num: function () {
        files = fs.readdirSync('./tables/nums');
        files.forEach((item, index) => {
            files[index] = item.replace(".csv", "")
        })
        if (files.length != 0) {
            num = parseInt(files[files.length - 1])+1
        } else {
            num = null
        }
        return num
    }
}