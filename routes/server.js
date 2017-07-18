var express = require('express');
var router = express.Router();

var con = require('../model/connect');

router.get('/', function(req, res, next) {
	res.render('manage/server', {
		title: 'Express'
	});
})

/* GET home page. */
	// 取得type 的下拉列表
	router.get('/getTypeList', function(req, res, next) {
	var sql = `SELECT type.type_id,type.type_name 
				FROM type WHERE 1 = 1 ORDER BY type_id ASC`;

	con.query(sql, function(err, results, f) {
		if(err) {
			console.log(err);
		} else {
			res.send(results);
		}
	})

});
//添加数据
router.post('/SubmitRouter', function(req, res, next) {
	
	if(req.body.id){
		// 判断 id 是不是空的  如果不是空的 UPDATE
		
		
		var sql =`UPDATE news SET title = ?, aur = ?, matter = ?, img = ?, data = ?, source = ?,type_id = ? WHERE id = ?`;
		//解析数据
		con.query(sql,[req.body.title,req.body.author,req.body.matter,req.body.src,req.body.time,req.body.source, req.body.tag,req.body.id], function(err, results, f) {

			if(err) {
				console.log(err);
			} else {
				res.send('更新成功');
				
			}

		})
		
		// 判断 id 是不是空的  如果是空的 走原来的 insert 
	}else{
		var sql =`INSERT INTO news ( title,text,img,data,aur,source,type_id ) VALUES ( ?,?,?,?,?,?,?)`;
		//解析数据
			con.query(sql, [req.body.title, req.body.matter, req.body.src, req.body.time,req.body.author,req.body.source, req.body.tag], function(err, results, f) {

				if(err) {
					console.log(err);
				} else {
					res.send('添加成功');
				}

			})
	}
	
});

router.post('/getnews', function(req, res, next) {
	var type_id = req.body.type_id;
	//获取数据列表	
	var sql = `SELECT news.id,news.title,news.data,type.type_name,news.img 
				FROM news LEFT JOIN type 
				ON news.type_id = type.type_id WHERE 1 = 1`;
	if(type_id){
		sql += ` AND news.type_id = '` + type_id + "'";
	}
	sql += ` ORDER BY news.id DESC`;
	con.query(sql, function(err, results, f) {
		if(err) {
			console.log(err);
		} else {
			res.send(results);
		}
	})

});

router.post('/getnewsbyid', function(req, res, next) {
	var id = req.body.id;
	console.log(id)
	//获取数据列表通过id	
	var sql = `SELECT id,title,data,aur,source,type_id FROM news WHERE id = ` + id;

	con.query(sql, function(err, results, f) {
		if(err) {
			console.log(err);
		} else {
			res.send(results);
		}
	})

});

//删除数据 
router.post('/DelRoute', function(req, res, next) {
	var id = req.body.id;
	var sql = `DELETE FROM news WHERE id= '${id}'`;

	con.query(sql, function(err, results, f) {
		if(err) {
			console.log(err);
		} else {
			res.send({
				message: '删除成功'
			});
		}
	})



});

module.exports = router;