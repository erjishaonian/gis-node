let request = require('../../utils/request')
let farmSQL = require('./sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')

let farmServe = {
    submit: (req) => {
        return new Promise((resolve, reject) => {
            let rand = MathRand(6)
            let fileName = req.email+(new Date().getTime())+rand+'.json'
            jsonFS.createFarm(fileName, req.geojson)
            req.geojson = fileName
            farmSQL.insert(req).then(res => {
                resolve(request.success({}, '提交成功！'))
            })
        })
    },
    getAll: (req) => {
        return new Promise((resolve, reject) => {
            farmSQL.selectAll(req).then(res => {
                for (let i = 0; i < res.length; i++) {
                    res[i].geojson = require('../../json/farm/' + res[i].geojson + '.json')
                }
                resolve(request.success(res))
            })
        })
    },
    getList: (req) => {
        return new Promise((resolve, reject) => {
            farmSQL.selectByEmail(req).then(res => {
                for (let i = 0; i < res.length; i++) {
                    res[i].geojson = require('../../json/farm/' + res[i].geojson + '.json')
                }
                resolve(request.success(res))
            })
        })
    },
    pass: (req) => {
        return new Promise((resolve, reject) => {
            req.status = '正常'
            farmSQL.updateStatusById(req).then(res => {
                resolve(request.success({}, '审核成功！'))
            })
        })
    },
    getZC: (req) => {
        return new Promise((resolve, reject) => {
            req.status = '正常'
            farmSQL.selectByStatusAndPCD(req).then(res => {
                for (let i = 0; i < res.length; i++) {
                    res[i].geojson = require('../../json/farm/' + res[i].geojson + '.json')
                }
                resolve(request.success(res))
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
module.exports = farmServe