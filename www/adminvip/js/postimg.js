$(function(){
	var inputImg = $("#paintingConA textarea").val();
	$("#paintingConA img").attr("src",""+ inputImg +"");

	//提交绘画信息
	$(document).on("click","#paintingConA button",function(){
		var inputImgA = $("#paintingConA textarea").val();
		$.ajax({
			 type: "post",
			 url: "/api/painting/paintingBaseImg",
			 data: "&baseimg="+ encodeURIComponent(inputImgA) +"",
			 beforeSend: function(request){ ajaxtoken(request); },
			 dataType: "json",
			 success: function (data) {
				 if(data.returnCode == 0){
					 alert("提交成功");

				 }else{
					textprompt(""+ data.returnMsg +"");

				 }
			 },
			 error: function (error) {
				 console.log("请求base64上传图片出错");
			 }
		});
	});




});







