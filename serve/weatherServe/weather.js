let request = require('../../utils/request')
let weatherSQL = require('./sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')

let mapServe = {
    getWeather: (req) => {
        return new Promise((resolve, reject) => {
            weatherSQL.selectByPCD(req).then(res => {
                if (res.length >= 1) {
                    let jsonData = require('../../json/weather/' + res[0].json + '.json')
                    resolve(request.success(jsonData))
                }
                else {
                    //先获取所有地区的code
                    const allJson = require('../../json/weather/all.json')
                    for (let i = 0; i < allJson.length; i++) {
                        if (allJson[i].name === req.province) {
                            for (let j = 0; j < allJson[i].child.length; j++) {
                                if (allJson[i].child[j].name === req.city) {
                                    let key = '542a38cf2eddcc11c6b6d926b7b2de2f'
                                    console.log('http://apis.juhe.cn/simpleWeather/query?city=' + allJson[i].child[j].name + '&key=' + key)
                                    axios.get('http://apis.juhe.cn/simpleWeather/query?city=' + allJson[i].child[j].name + '&key=' + key).then(res => {
                                        console.log(res.data)
                                        if(res.data.error_code !== 0){
                                            return resolve(request.error('获取数据失败！'))
                                        }
                                        let json = allJson[i].child[j].name+'-'+(new Date().getTime())
                                        req.json = json
                                        // jsonFS.createMap(json, res.data)
                                        weatherSQL.insert(req).then(sqlRes => {
                                            //保存
                                            jsonFS.createWeather(json, res.data)
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