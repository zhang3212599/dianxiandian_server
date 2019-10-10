var ApiUrl = "";

var teltestft = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;

var terminal = navigator.userAgent;
var isWeixin = terminal.indexOf('MicroMessenger') > -1; //微信
var isAndroid = terminal.indexOf('Android') > -1 || terminal.indexOf('Adr') > -1; //android终端
var isIOS = !!terminal.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端



/* 返回上一页  */
function htmlback(index){
	window.history.go(-1);
}


/* 文本提示   */
function textprompt(texts,item){
	if($(".xgdztanchu").size() > 0){
		$(".xgdztanchu .xgdztanchucon").text(""+texts+"");

	} else {
		var texthtml = '<div class="xgdztanchu"><div class="xgdztanchuConA"><div class="xgdztanchucon">'+texts+'</div></div></div>';
		$("body").append(texthtml);
	}

	if(parseInt(item) == 1){
		$(".xgdztanchu").css("opacity","1");
		$(".xgdztanchu").fadeIn(300);

	}else if(parseInt(item) == 2){
		$(".xgdztanchu").css({"opacity":"1"});
		$(".xgdztanchu").addClass("eventsno");
		$(".xgdztanchu").fadeIn(300);

	}else{
		$(".xgdztanchu").show();
		$(".xgdztanchu").animate({opacity:'1'},1000,function(){
			$(".xgdztanchu").animate({opacity:'0'},1000,function(){
				$(".xgdztanchu").hide();
			});
		});
	}
};


/* 文本提示_关闭 */
$(document).on("click",".xgdztanchu",function(){
	$(".xgdztanchu").fadeOut(300);
}); 


/*  V=time  */
var htmlgetdata = new Date().getTime();
var htmlVtimea = "?&v="+htmlgetdata+"";
var htmlVtimeb = "&v="+htmlgetdata+"";

/*  cnzz  */


//手机号码加星
function telPhone(phone){
	var phone = phone.substring(0,3)+"****"+phone.substring(7,11);
	return phone;
}

var user_id = sessionStorage.getItem("loginid");
var user_token = sessionStorage.getItem("logintoken");
//sessionStorage/localStorage

/* token */
function ajaxtoken(request){
	//request.setRequestHeader("x-dianxiandian-uid", ""+ user_id +"");
	request.setRequestHeader("x-dianxiandian-token", ""+ user_token +"");
}