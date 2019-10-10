var hrefUrl = location.search;
var theRequest = new Object();
if (hrefUrl.indexOf("?") != -1) {
	var str = hrefUrl.substr(1);
	strs = str.split("&");
	for (var i = 0; i < strs.length; i++) {
		theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
	}
} else {
	theRequest.pid = 0;
}
var pid = theRequest.pid;

$(function(){
	if(pid > 0){ $(".indexConA dl input#userId").val(pid) };

	indexObj(1);

	$(document).on("click", ".indexConPage li", function(){
		indexObj($(this).find("a").text());
	});

	$(document).on("click", ".indexConA dl dt", function(){
		indexObj(1);
	});


	$(document).on("click", "#commentCon h6 em", function(){
		$("#commentCon").fadeOut();
	});

	$(document).on("click", "#commentCon ul li", function(){
		commentList($("#commentCon").attr("data-id"), $("#commentCon").attr("data-num"), $(this).find("a").text());
	});


	//点击查看效果画布效果
	$(document).on("click", "#paintingCanvas h6 em", function(){
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		$("#paintingCanvas").fadeOut();
		ctx.clearRect(0, 0, 640, 640);
	});


});



function indexObj(page) {
	var ptId = $(".indexConA dl input#ptId").val();
	var userId = $(".indexConA dl input#userId").val();
	var ptText = $(".indexConA dl input#ptText").val();
	ptId > 0 ? ptId = "&Id="+ ptId +"" : ptId = "";
	userId > 0 ? userId = "&userId="+ userId +"" : userId = "";
	ptText != '' ? ptText = "&ptText="+ ptText +"" : ptText = "";

	$.ajax({
		type: "get",
		url: "/admin/paintinglist?&page="+ page + ptId + userId + ptText +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 999){
				location.href = "/adminvip/auth.html";

			}else if(data.returnCode == 0){

				var dataPage = data.data;
				var dataCon = data.data.data;

				var conHtml = '';
				var conHtmlLen = dataCon.length
				for(var i=0; i<conHtmlLen; i++){
					conHtml += '<tr>';
					conHtml += '<td>'+ dataCon[i].id +'</td>';
					conHtml += '<td>'+ dataCon[i].uid +'</td>';
					conHtml += '<td>'+ dataCon[i].pttext +'</td>';
					conHtml += '<td>'+ dataCon[i].ptspotA +'(点)</td>';
					conHtml += "<td><a href='javascript:paintingCanvas("+ dataCon[i].ptspotC +")'>"+ dataCon[i].ptspotB +"</a></td>";
					conHtml += '<td>'+ dataCon[i].ptlineA +'(线)</td>';
					conHtml += "<td><a href='javascript:paintingCanvas("+ dataCon[i].ptspotC +","+ dataCon[i].ptlineC +")'>"+ dataCon[i].ptlineB +"</a></td>";
					var ispt = dataCon[i].ispt ? "true" : "false";
					conHtml += '<td>'+ ispt +'</td>';
					conHtml += '<td>'+ dataCon[i].ptwarnum +'</td>';
					conHtml += '<td><a href="javascript:commentList('+ dataCon[i].id +','+ dataCon[i].ptcomment +',1);">'+ dataCon[i].ptcomment +'</a></td>';
					conHtml += '<td>'+ dataCon[i].pttime +'</td>';
					conHtml += '</tr>';
				}

				$("#indexConBTable").html(conHtml);

				var pageHtml = '';
				for(var p=1; p<dataPage.totalPages+1; p++){
					pageHtml += '<li '
					if(dataPage.currentPage == p){
						pageHtml += 'class="active"'
					}
					pageHtml += '><a href="javascript:void(0);">'+ p +'</a></li>'
				}
				$(".indexConPage .pagination").html(pageHtml);

			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取绘画列表出错");
		}
	})

}


function commentList(id,num,page) {
	if(num <= 0){
		textprompt("没有评论内容哦。");

	}else{
		$("#commentCon").attr({"data-id":""+ id +"","data-num":""+ num +""});

		$.ajax({
			type: "get",
			url: "/admin/commentlist?&Id="+ id +"&page="+ page +"",
			data: "",
			beforeSend: function(request){ ajaxtoken(request); },
			dataType: "json",
			success: function (data) {
				if(data.returnCode == 999){
					location.href = "/adminvip/auth.html";

				}else if(data.returnCode == 0){

					var dataPage = data.data;
					var dataCon = data.data.data;

					var conHtml = '';
					var conHtmlLen = dataCon.length;
					$("#commentCon h6 b").html('评论绘画Id：'+ dataCon[0].ptid +'');
					for(var i=0; i<conHtmlLen; i++){
						conHtml += '<dd><b>'+ parseInt(i+1) +'、用户ID：'+ dataCon[i].ptuid +'</b><em>'+ dataCon[i].pttext +'</em>'+ dataCon[i].pttime +'</dd>';
					}

					$("#commentCon dl").html(conHtml);

					var pageHtml = '';
					for(var p=1; p<dataPage.totalPages+1; p++){
						pageHtml += '<li '
						if(dataPage.currentPage == p){
							pageHtml += 'class="active"'
						}
						pageHtml += '><a href="javascript:void(0);">'+ p +'</a></li>'
					}
					$("#commentCon .pagination").html(pageHtml);

					$("#commentCon").css("display","flex");

				}else{
					textprompt(""+ data.returnMsg +"");

				}
			},
			error: function (error) {
				console.log("获取绘画评论列表出错");
			}
		});
	}


}


//打开canvas 画点
function paintingCanvas(spotPx, spotPostList){
	var spotPx = spotPx || [];
	var spotPostList = spotPostList || [];

	var spotpxlen = spotPx.length;
	var spotPostListsize = spotPostList.length;

	var bodyWidth = 640, bodyHeight = 640;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	if(spotpxlen > 0){
		for(var i=0; i<spotpxlen; i++){
			var canMarX = parseInt(spotPx[i].spotWidth * bodyWidth);
			var canMarY = parseInt(spotPx[i].spotHeight * bodyHeight);
			ctx.beginPath();
			ctx.arc(canMarX,canMarY,6,0,360);
			ctx.fillStyle = "red";
			ctx.fill();//画实心圆
			ctx.closePath();
		}
	}

	if(spotPostListsize > 0){
		for(var z=0; z<spotPostListsize; z++){
			var widthLeft = parseInt(spotPostList[z].moveLeft * bodyWidth);
			var widthTop = parseInt(spotPostList[z].moveTop * bodyHeight);
			var canMarX = parseInt(spotPostList[z].lineLeft * bodyWidth);
			var canMarY = parseInt(spotPostList[z].lineTop * bodyHeight);
			ctx.beginPath();
			ctx.lineWidth=5;
			ctx.strokeStyle="red";
			ctx.moveTo(widthLeft, widthTop);
			ctx.lineTo(canMarX, canMarY);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(widthLeft, widthTop, 8, 0, 360, false);
			ctx.lineWidth=1;
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(canMarX, canMarY, 8, 0, 360, false);
			ctx.lineWidth=1;
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.closePath();
		}
	}
	$("#paintingCanvas").css("display","flex");
}

