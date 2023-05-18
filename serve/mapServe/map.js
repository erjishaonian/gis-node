let request = require('../../utils/request')
let mapSQL = require('./sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')

let mapServe = {
    getMap: (req) => {
        return new Promise((resolve, reject) => {
            mapSQL.selectByPCD(req).then(res => {
                if (res.length >= 1) {
                    let jsonData = require('../../json/map/' + res[0].json + '.json')
                    resolve(request.success(jsonData))
                }
                else {
                    //先获取所有地区的code
                    const allJson = require('../../json/map/all.json')
                    for (let i = 0; i < allJson.length; i++) {
                        if (allJson[i].level = 'district' && String(allJson[i].name).includes(req.district)) {
                            //确认父级是否正确
                            for (let n = 0; n < allJson.length; n++) {
                                if (allJson[n].level = 'city' && allJson[n].adcode === allJson[i].parent && String(allJson[n].name).includes(req.city)) {
                                    //adcode, lng:126, lat: 44, name
                                    axios.get('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=' + allJson[i].adcode).then(res => {
                                        console.log(res.data)
                                        let json = allJson[i].adcode
                                        req.json = json
                                        // jsonFS.createMap(json, res.data)
                                        mapSQL.insert(req).then(sqlRes => {
                                            //保存
                                            jsonFS.createMap(json, res.data)
                                            resolve(request.success(res.data))
                                        })
                                    }).catch(e => {
                                        resolve(request.error('访问dataV失败！'))
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