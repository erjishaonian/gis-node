//连接mysql
const mysql = require('../../database/mysql-gis')

const sqlActive = (sql) => {
    return new Promise((resolve, reject) => {
        mysql.executeSQL(sql).then(res => {
            console.log(res)
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
            `', '`+ (req.farm.introduce||`''`)+
            `',(SELECT id FROM user WHERE email = '`+ req.email + `') `+
            `, '`+ req.style.color+  `', '`+ req.style.weight+ `', '`+ req.style.opacity+ `', '待审核')`
            console.log(sql)
        return sqlActive(sql)
    }
}

module.exports = mapSQL