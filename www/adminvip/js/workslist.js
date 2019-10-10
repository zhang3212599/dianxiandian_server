$(function(){
	indexObj(1);


});


function indexObj(page) {
	$.ajax({
		type: "get",
		url: "/api/workslist/workslistHot?&page="+ page +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){
				//console.log(data)

				var dataCon = data.data;

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
			console.log("获取绘画热门列表出错");
		}
	})


	$.ajax({
		type: "get",
		url: "/api/workslist/workslistNew?&page="+ page +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){
				//console.log(data)

				var dataCon = data.data;

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
			console.log("获取绘画最新列表出错");
		}
	})
}