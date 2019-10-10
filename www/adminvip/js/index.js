$(function(){
	indexObj(1);

	$(document).on("click", ".indexConPage li", function(){
		//console.log($(this).find("a").text())
		indexObj($(this).find("a").text());
	});

	$(document).on("click", ".indexConA dl dt", function(){

		indexObj(1);
	});

});


function indexObj(page) {
	var id = $(".indexConA dl input#userId").val();
	var name = $(".indexConA dl input#userName").val();
	id > 0 ? id = "&id="+ id +"" : id = "";
	name != '' ? name = "&name="+ name +"" : name = "";

	$.ajax({
		type: "get",
		url: "/admin/index?&page="+ page + id + name +"",
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
					conHtml += '<td>'+ dataCon[i].name +'</td>';
					var gender = dataCon[i].gender ? "男" : "女";
					conHtml += '<td>'+ gender +'</td>';
					conHtml += '<td>'+ dataCon[i].city +'</td>';
					var ispt = dataCon[i].ispt ? "true" : "false";
					conHtml += '<td>'+ ispt +'</td>';
					conHtml += '<td><a href="/adminvip/paintingList.html?pid='+ dataCon[i].id +'">'+ dataCon[i].count +'</a></td>';
					conHtml += '<td>'+ dataCon[i].buildTime +'</td>';
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
			console.log("获取用户列表出错");
		}
	})

}