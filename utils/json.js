const fs = require('fs')
const path = require('path')

const jsonFS = {
    createMap: (fileName, data) => {
        let text = JSON.stringify(data)
        let file = path.join('./json/map', fileName+'.json')
        fs.writeFile(file, text, function (err) {
            if(err) {
                console.log('新建map数据失败')
                return false
            }
            else {
                console.log('新建map数据----'+ fileName+'.json----' +'成功')
            }
        })
    },
    createFarm: (fileName, data) => {
        let text = JSON.stringify(data)
        let file = path.join('./json/farm', fileName+'.json')
        fs.writeFile(file, text, function (err) {
            if(err) {
                console.log('新建farm数据失败')
                return false
            }
            else {
                console.log('新建farm数据----'+ fileName+'.json----' +'成功')
            }
        })
    }
}

module.exports = jsonFS