$(function(){
	indexObj(11,1);

	$(document).on("click","#ptButton",function(){
		var inputVal = $("#ptInputNum").val();
		var inputUid = 10;
		$.ajax({
			type: "post",
			url: "/api/adminworks/adminWorksDel",
			data: "&uid="+ inputUid +"&id="+ inputVal +"",
			beforeSend: function(request){ ajaxtoken(request); },
			dataType: "json",
			success: function (data) {
				if(data.returnCode == 0){
					//console.log(data)

					alert("删除绘画成功");

				}else{
					textprompt(""+ data.returnMsg +"");

				}
			},
			error: function (error) {
				console.log("删除我的绘画出错");
			}
		});

	});

});


function indexObj(id,page) {
	$.ajax({
		type: "get",
		url: "/api/adminworks/adminWorksUse?&id="+ id +"&page="+ page +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){
				//console.log(data)

				var dataCon = data.data.data;

				var conHtml = '';
				var conHtmlLen = dataCon.length
				for(var i=0; i<conHtmlLen; i++){
					conHtml += '<tr>';
					conHtml += '<td>'+ dataCon[i].id +'</td>';
					conHtml += '<td>'+ dataCon[i].ptUid +'</td>';
					conHtml += '<td>'+ dataCon[i].ptName +'</td>';
					conHtml += '<td><img src="'+ dataCon[i].ptImg +'" /></td>';
					var ptIs = dataCon[i].ptIs ? "true" : "false";
					conHtml += '<td>'+ ptIs +'</td>';
					conHtml += '<td>'+ dataCon[i].ptCount +'</td>';
					conHtml += '<td>'+ dataCon[i].ptUsername +'</td>';
					conHtml += '<td>'+ dataCon[i].ptUserimg +'</td>';
					conHtml += '</tr>';
				}

				$("#indexConBTableA").html(conHtml);


			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取我的绘画列表出错");
		}
	});




	$.ajax({
		type: "get",
		url: "/api/adminworks/adminWorksHe?&id="+ id +"&page="+ page +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){
				//console.log(data)

				var dataCon = data.data.data;

				var conHtml = '';
				var conHtmlLen = dataCon.length
				for(var i=0; i<conHtmlLen; i++){
					conHtml += '<tr>';
					conHtml += '<td>'+ dataCon[i].id +'</td>';
					conHtml += '<td>'+ dataCon[i].ptUid +'</td>';
					conHtml += '<td>'+ dataCon[i].ptName +'</td>';
					conHtml += '<td><img src="'+ dataCon[i].ptImg +'" /></td>';
					var ptIs = dataCon[i].ptIs ? "true" : "false";
					conHtml += '<td>'+ ptIs +'</td>';
					conHtml += '<td>'+ dataCon[i].ptCount +'</td>';
					conHtml += '<td>'+ dataCon[i].ptUsername +'</td>';
					conHtml += '<td>'+ dataCon[i].ptUserimg +'</td>';
					conHtml += '</tr>';
				}

				$("#indexConBTableB").html(conHtml);


			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取我挑战的绘画列表出错");
		}
	})
}