let request = require('../../utils/request')
let mapSQL = require('./sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')

let mapServe = {
    submit: (req) => {
        return new Promise((resolve, reject) => {
            let rand = MathRand(6)
            let fileName = req.email+(new Date().getTime())+rand+'.json'
            jsonFS.createFarm(fileName, req.geojson)
            req.geojson = fileName
            mapSQL.insert(req).then(res => {
                resolve(request.success({}, '提交成功！'))
            })
        })
    }
}
//生成一个随机的六位数
function MathRand(num) {
    var Num = "";
    for (var i = 0; i < num; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}
module.exports = mapServe