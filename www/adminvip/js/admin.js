$(function(){
	var id = $("#bodyCon").attr("data-id");


	$.ajax({
		type: "get",
		url: "/api/admin?&id="+ id +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 999){
				location.href = "/adminvip/auth.html";

			}else if(data.returnCode == 0){
				var dataCon = data.data;

				var conHtml = '';
				conHtml += '<tr>';
				conHtml += '<td>'+ dataCon.id +'</td>';
				conHtml += '<td>'+ dataCon.userName +'</td>';
				conHtml += '<td>'+ dataCon.userImg +'</td>';
				var ptis = dataCon.ptIs ? "true" : "false";
				conHtml += '<td>'+ ptis +'</td>';
				conHtml += '<td>'+ dataCon.ctCount +'</td>';
				conHtml += '<td>'+ dataCon.ctCountYes +'</td>';
				conHtml += '<td>'+ dataCon.ptNotice +'</td>';
				conHtml += '</tr>';


				$("#indexConBTable").html(conHtml);
				$("#userIsBool").html(ptis);

			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取用户数据出错");
		}
	});


	$(document).on("click","#userIsBool",function(){
		var bool = $(this).html();
		bool == 'false' ? bool = 1 : bool = 0;

		$.ajax({
			type: "post",
			url: "/api/admin/adminIspt",
			data: "&uid="+ id +"&bool="+ bool +"",
			beforeSend: function(request){ ajaxtoken(request); },
			dataType: "json",
			success: function (data) {
				if(data.returnCode == 0){
					alert("修改成功")
					window.location.reload();

				}else{
					textprompt(""+ data.returnMsg +"");

				}
			},
			error: function (error) {
				console.log("设置用户呈现否出错");
			}
		});

	});


});



function adminObj() {



}