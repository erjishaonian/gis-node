//连接mysql
const mysql = require('../../database/mysql-gis')

const sqlActive = (sql) => {
    return new Promise((resolve, reject) => {
        mysql.executeSQL(sql).then(res => {
            // console.log(res)
            resolve(res)
        }).catch(e => {
            console.log(e)
            reject(e)
        })
    })
}

const mapSQL = {
    insert: (req) => {
        let sql = `INSERT INTO farm (geojson, province, city, district, name `+
            `, area, plant, fill_color, fill_opacity `+
            ` ,introduce `+
            ` ,user_id `+
            `, color, weight, opacity, status) VALUES ('`+ 
            req.geojson+`', '`+ req.pcd.province+`', '`+ req.pcd.city+`', '`+ req.pcd.district+`', '`+ req.farm.name+
            `', '`+ req.farm.area+  `', '`+ req.farm.plant+ `', '`+ req.style.fillColor+ `', '`+ req.style.fillOpacity+
            `', '`+ (req.farm.introduce||``)+
            `',(SELECT id FROM user WHERE email = '`+ req.email + `') `+
            `, '`+ req.style.color+  `', '`+ req.style.weight+ `', '`+ req.style.opacity+ `', '待审核')`
            console.log(sql)
        return sqlActive(sql)
    },
    selectAll: (req) => {
        let sql = `SELECT farm.id as farmId, farm.name as farmName, farm.introduce as farmIntroduce, farm.city as farmCity, farm.province as farmProvince, farm.district as farmDistrict, farm.status as farmStatus, farm.user_id, area, plant, fill_color, fill_opacity, color, weight, opacity, geojson, user.*  FROM farm, user where farm.user_id = user.id`
        //let sql = `SELECT * FROM farm join user on farm.user_id = user.id`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    selectByEmail: (req) => {
        let sql = `SELECT farm.id as farmId, farm.name as farmName, farm.introduce as farmIntroduce, farm.city as farmCity, farm.province as farmProvince, farm.district as farmDistrict, farm.status as farmStatus, farm.user_id, area, plant, fill_color, fill_opacity, color, weight, opacity, geojson, user.*  FROM farm, user where farm.user_id = user.id and user_id = (SELECT id FROM user WHERE email = '`+ req.email + `')`
        //let sql = `SELECT * FROM farm join user on farm.user_id = user.id`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    updateStatusById: (req) => {
        let sql = `UPDATE farm SET status = '`+ req.status+`' WHERE id = '`+ req.id + `'`
        return sqlActive(sql)
    },
    selectByStatusAndPCD: (req) => {
        let sql = `SELECT farm.id as farmId, farm.name as farmName, farm.introduce as farmIntroduce, farm.city as farmCity, farm.province as farmProvince, farm.district as farmDistrict, farm.status as farmStatus, farm.user_id, area, plant, fill_color, fill_opacity, color, weight, opacity, geojson, user.*  FROM farm, user where farm.user_id = user.id and farm.status = '`+req.status+`' and farm.province = '`+req.province+`' and farm.city = '`+req.city+`' and farm.district = '`+req.district+`'`
        //let sql = `SELECT * FROM farm join user on farm.user_id = user.id`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    }
}

module.exports = mapSQL