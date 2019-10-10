$(function(){
	//worksDetailsTheory(10,1);

	$(document).on("click","#commentdForm",function() {
		var inputVal = $("#commentdInput").val();
		$.ajax({
			type: "post",
			url: "/api/workslist/worksTheory",
			data: "&id=5&ptid=13&cotext="+ inputVal +"",
			beforeSend: function(request){ ajaxtoken(request); },
			dataType: "json",
			success: function (data) {
				if(data.returnCode == 0){
					console.log(data)
					alert("评论成功。");

				}else{
					textprompt(""+ data.returnMsg +"");

				}
			},
			error: function (error) {
				console.log("提交评论失败");
			}
		})
	});


})


worksDetails(100);
function worksDetails(id) {
	$.ajax({
		type: "get",
		url: "/api/workslist/worksDetails?&id="+ id +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){

				var dataCon = data.data;
				var conHtml = '';
				conHtml += '<tr>';
				conHtml += '<td>'+ dataCon.id +'</td>';
				conHtml += '<td>'+ dataCon.ptName +'</td>';
				conHtml += '<td><img src="'+ dataCon.ptImg +'" /></td>';
				conHtml += '<td>'+ dataCon.ptCountStep +'</td>';
				conHtml += '<td>'+ dataCon.ptUserName +'</td>';
				conHtml += '<td>'+ dataCon.ptUserImg +'</td>';
				conHtml += '<td>'+ dataCon.ptWar +'</td>';
				conHtml += '<td>'+ dataCon.ptWarSucc +'</td>';
				conHtml += '</tr>';

				$("#indexConBTableA").html(conHtml);


			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取绘画详情出错");
		}
	})

}


function worksDetailsTheory(id, page) {
	$.ajax({
		type: "get",
		url: "/api/workslist/worksDetailsTheory?&id="+ id +"&page="+ page +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){

				var dataCon = data.data.data;
				var dataConlen = dataCon.length;
				var conHtml = '';
				for(var i=0; i<dataConlen; i++){
					conHtml += '<tr>';
					conHtml += '<td>'+ dataCon[i].coText +'</td>';
					conHtml += '<td>'+ dataCon[i].coTime +'</td>';
					conHtml += '<td>'+ dataCon[i].coName +'</td>';
					conHtml += '<td>'+ dataCon[i].coImg +'</td>';
					conHtml += '</tr>';
				}
				$("#indexConBTableB").html(conHtml);


			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取绘画详情出错");
		}
	})

}