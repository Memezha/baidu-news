

alert(1111)
jQuery(document).ready(function($) {

	console.log($)


	//时间
$('#time').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	forceParse: 0,
	showMeridian: 1
})

refresh()
//刷新数据
function refresh() {
	$.ajax({
		url: '/server/getnews',
		type: 'post',
		success: function(data) {
			$('#list').html('')
			data.forEach(function(ele, index) {
				$(`<tr>
               <th>${ele.id}</th>	
                <td>${ele.title}</td>	
                 <td>${ele.data}</td>	
                 <td>${ele.type}</td>
                                <td><button type="button" class="btn changebtn btn-warning">更改</button></td>
                 <td><button type="button" class="btn delbtn btn-danger">删除</button></td>
              </tr>`).prependTo($('#list'));

			})
		}
	})
};

//插入一条数据到数据库
$('#btn').click(function(e) {
	// 	e.preventDefault();
	alert(1)
	$.ajax({
		url: '/server/SubmitRouter',
		type: 'post',
		data: {
			title: $('#title').val(),
			author: $('#aur').val(),
			matter: $('#matter').val(),
			src: $('#src').val(),
			time: $('#time').val(),
			source: $('#source').val(),
			tag: $('#tag').val()
		},
		success: function(data) {

			refresh()
		},
		error: function(err) {
			console.log(err);
		}
	});
})
//删除列表

$('#list').on('click', '.delbtn', function() {
	$('#myModal').modal('toggle')
	var id = $(this).parent().parent().children(0).html();
	$.ajax({
		url: '/server/DelRoute',
		type: 'post',
		data: {
			id: id
		},
		success: function(data) {
			//			alert(data.message);

			refresh();

		},
		err: function(err) {
			console.log(err);
		}
	})
})
//查询单条数据
//$('#list').on('click','.changebtn',function(){
//	var id = $(this).parent().parent().children(0).html();
//	$.ajax({
//		url:'/server/QueryRouter',
//		type:'get',
//		data:{
//			id:id
//		},
//		success:function(data){
//			console.log(data);
//		}
//	})
//})
	
});

