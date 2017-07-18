var mysql = require ('mysql');

var con = mysql.createConnection({
		// 一定要注意 小心有炸
		host:'localhost', //主机
		port:'3306', //端口号
		user:'root', //用户名
		database:'baidunews' //数据库的名字
});

module.exports = con;