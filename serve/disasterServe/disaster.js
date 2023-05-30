let request = require('../../utils/request')
let disasterSQL = require('./sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')

let mapServe = {
    getDisaster: (req) => {
        return new Promise((resolve, reject) => {
            disasterSQL.selectByPCD(req).then(res => {
                if (res.length >= 1) {
                    let jsonData = require('../../json/disaster/' + res[0].json + '.json')
                    resolve(request.success(jsonData))
                }
                else {
                    //先获取所有地区的code
                    const allJson = require('../../json/disaster/all.json')
                    for (let i = 0; i < allJson.length; i++) {
                        if (String(allJson[i].province_name).includes(req.province)) {
                            for (let j = 0; j < allJson[i].citys.length; j++) {
                                if (String(allJson[i].citys[j].city_name).includes(req.city)) {
                                    let key = '61604a0607b9ca510da7932da7b4e68a'
                                    console.log('http://apis.juhe.cn/fapig/alarm/queryV2?city_code=' + allJson[i].citys[j].city_name + '&key=' + key)
                                    axios.get('http://apis.juhe.cn/fapig/alarm/queryV2?city_code=' + allJson[i].citys[j].city_code + '&key=' + key).then(res => {
                                        console.log(res.data)
                                        if(res.data.error_code !== 0){
                                            return resolve(request.error('获取数据失败！'))
                                        }
                                        let json = allJson[i].citys[j].city_name+'-'+(new Date().getTime())
                                        req.json = json
                                        // jsonFS.createMap(json, res.data)
                                        disasterSQL.insert(req).then(sqlRes => {
                                            //保存
                                            jsonFS.createDisaster(json, res.data)
                                            resolve(request.success(res.data))
                                        })
                                    }).catch(e => {
                                        resolve(request.error('获取数据网络异常！'))
                                    })
                                }
                            }

                        }
                    }
                }
            })
        })
    }
}

module.exports = mapServe