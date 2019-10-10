$(function(){

	//提交绘画信息
	$(document).on("click","#paintingConA h6",function(){
		var input1 = $("#paintingCon li.input1 input").val();
		var input2 = $("#paintingCon li.input2 input").val();
		var input3 = $("#paintingCon li.input3 input").val();
		var input4 = $("#paintingCon li.input4 input").val();
		var input5 = $("#paintingCon li.input5 input").val();
		var input6 = $("#paintingCon li.input6 input").val();
		var input7 = $("#paintingCon li.input7 input").val();
		var input8 = $("#paintingCon li.input8 input").val();

		$.ajax({
			 type: "post",
			 url: "/api/painting/paintingCord",
			 data: "&ptUid="+ input1 +"&ptName="+ input2 +"&ptSpot="+ input3 +"&ptSpotStep="+ input4 +"&ptSpotImg="+ input5 +"&ptLine="+ input6 +"&ptLineStep="+ input7 +"&ptLineImg="+ input8 +"",
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
				 console.log("获取绘画列表出错");
			 }
		});
	});



    //提交“挑战绘画”信息
    $(document).on("click","#paintingConC h6",function(){
        var input1 = $("#paintingConC li.input1 input").val();
        var input2 = $("#paintingConC li.input2 input").val();
        var input3 = $("#paintingConC li.input3 input").val();
        var input4 = $("#paintingConC li.input4 input").val();
        var input5 = $("#paintingConC li.input5 input").val();
        var input6 = $("#paintingConC li.input6 input").val();

        $.ajax({
            type: "post",
            url: "/api/painting/paintingWar",
            data: "&ptId="+ input1 +"&ptUid="+ input2 +"&ptCoUid="+ input3 +"&ptLine="+ input4 +"&ptLineStep="+ input5 +"&ptLineImg="+ input6 +"",
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
                console.log("获取绘画列表出错");
            }
        });
    });





//获取挑战绘画信息
worksDetails($("#paintingConB").attr("data-ptid"));
});

function worksDetails(id) {
	$.ajax({
		type: "get",
		url: "/api/painting?&id="+ id +"",
		data: "",
		beforeSend: function(request){ ajaxtoken(request); },
		dataType: "json",
		success: function (data) {
			if(data.returnCode == 0){

				var dataCon = data.data;
				$("#paintingConB li.input1 p").html(dataCon.id);
				$("#paintingConB li.input2 p").html(dataCon.ptName);
				$("#paintingConB li.input3 p").html(dataCon.ptSpot);
				$("#paintingConB li.input4 p").html(dataCon.ptSpotStep);
				$("#paintingConB li.input5 p").html(dataCon.ptSpotImg);
				$("#paintingConB li.input6 p").html(dataCon.ptLineStep);
				$("#paintingConB li.input7 p").html(dataCon.ptUserId);


			}else{
				textprompt(""+ data.returnMsg +"");

			}
		},
		error: function (error) {
			console.log("获取绘画详情出错");
		}
	})

}





