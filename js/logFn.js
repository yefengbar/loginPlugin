/**
 * auther:yefengbar.com
 * date:2016-4-19 11:05
 * version:0.1.2
 * */
var Union = window.Union || {};
var _czc = _czc || [];
	_czc.push(["_setAccount", "30055902"]);
Union.logFn = {
	getPassUrl: './user/find_passport.php',
	getkkUrl:'./get_pre_kk?callback=',
	chkNameUrl:'/source/core_Post.php',
	doLogUrl:'/source/Post.php',
	cssUrl:'./cdn/api/loginPlus/css/reset.min.css?v7k7k1',
	logDomId:'#union',
	doMain:'web.7k7k.com',
	remName:0,
	isCheck:0,
	callBacks:'',
	msg:[
		'这是系统自动分配给你的kk号',
		'4-32位数字、字母、或组合',
		'6-32位数字、字母、_或组合',
		'两次密码不一致',
		'用户名已被注册',
		'用户名可以使用',
		'上次使用QQ登陆',
		'上次使用微信登陆',
		'上次使用账号登陆'
	],
	userInfo:{
		name:"",
		pass:"",
		status:0
	},
	defaults: {
		autokk: 0,//是否自动分配kk号0：不分配，1分配
		qqLogId:11715896,//qq登录id
		qqlogType: 'qqlogin',//qq登录请求地址
		qqlogCallback:encodeURIComponent(location.href),//qq登录回调地址
		logAction: 0, //0刷新，1跳转，2回调
		logedCallUrl: location.href,//登录成功后跳转地址
		regAction: 0, //0刷新，1跳转，2回调
		showSave:1,//是否显示保存账号面板
		saveInfo: './api/7k7ktxt.php?', //保存账号请求地址
		refer: 3841 //注册的参数
	},
	toggleUi: function(index) {
		var _this = $(this.logDomId+' .un_tabs a');
		var _index = $(this.logDomId+' .un_tabs a.cur').index();
		_this.removeClass('cur');
		_this.eq(index).addClass('cur');
		$('.un_mod_log .un_tips,.un_mod_reg .un_tips').html("").removeClass('no yes');
		$('.un_msg .logs').show();
		$('.un_msg .saves').hide();
		$('.un_mod_save').hide();
		Union.logFn.resetHack();
		if (index == 0) {
			$('.un_mod_log').show();
			$('.un_mod_reg').hide();
			$('.un_tabs span').animate({
				"left": "168px"
			}, 150);
			if(_index == 0){
				_czc.push(['_trackEvent','web7k通行证','登录','登录标签','','']);
			}else{
				_czc.push(['_trackEvent','web7k通行证','注册','登录标签','','']);
			}
		} else {
			if(Union.logFn.defaults.autokk){
				Union.logFn.autoKk();
			}
			$('.un_mod_log').hide();
			$('.un_mod_reg').show();
			$('.un_tabs span').animate({
				"left": "277px"
			}, 150);
			$(Union.logFn.logDomId+' #un_rname').bind('blur', function() {
				if(this.value){
					Union.logFn.checkName(this.value);
				}else{
					$('.un_mod_reg .un_tips.rname').html(Union.logFn.msg[1]).addClass('no');
				}
			});
			if(_index == 0){
				_czc.push(['_trackEvent','web7k通行证','登录','注册标签','','']);
			}else{
				_czc.push(['_trackEvent','web7k通行证','注册','注册标签','','']);
			}
			
		}
		var unHeight = $(this.logDomId).height() / 2;
		$(this.logDomId).animate({
			"margin-top": "-" + unHeight + "px"
		}, 150)
	},
	config:function(options){
		$.extend(Union.logFn.defaults, options);
	},
	init:function(){
		if(location.host == this.doMain){
			this.addCSS(Union.logFn.cssUrl);
			logHtml = '<IFRAME id=union_mask src="about:blank" frameBorder=no style="display:none"></IFRAME>'+
	'		<div class="union_warp" id="union" style="display:none">'+
	'			<div class="un_con">'+
	'				<div class="un_tit">'+
	'					<a href="http://web.7k7k.com" target="_blank" class="un_logo"></a>'+
	'					<div class="un_tabs">'+
	'						<a href="javascript:;" class="cur">用户登录</a>'+
	'						<a href="javascript:;">用户注册</a>'+
	'						<span></span>'+
	'					</div>'+
	'					<a href="javascript:;" class="un_close"></a>'+
	'				</div>'+
	'				<div class="un_login">'+
	'					<div class="un_inps un_mod_log">'+
	'						<div class="un_inp name">'+
	'							<span>用户名&nbsp;:</span>'+
	'							<input type="text" id="un_name" value="用户名/邮箱/KK号" placeholder="用户名/邮箱/KK号" />'+
	'						</div>'+
	'						<div class="un_tips name"></div>'+
	'						<div class="un_inp pass">'+
	'							<span>密　码&nbsp;:</span>'+
	'							<input type="password" id="un_pass" value="" />'+
	'						</div>'+
	'						<div class="un_tips pass"></div>'+
	'						<div class="un_rem">'+
	'							<span class="un_check"></span>'+
	'							<span class="un_lable">记住登录账号</span>'+
	'							<a href="./user/find_passport.php" target="_blank" class="un_lose_pass">忘记密码?</a>'+
	'							<div class="clear"></div>'+
	'						</div>'+
	'						<div class="un_btns">'+
	'							<a href="javascript:;" class="un_btns_log">登录</a>'+
	'							<a href="javascript:;" class="un_btns_reg">注册</a>'+
	'							<div class="clear"></div>'+
	'						</div>'+
	'					</div>'+
	'					<div class="un_inps un_mod_reg">'+
	'						<div class="un_inp rname">'+
	'							<span>用户名&nbsp;:</span>'+
	'							<input type="text" id="un_rname" value="" placeholder="'+Union.logFn.msg[1]+'" />'+
	'						</div>'+
	'						<div class="un_tips rname"></div>'+
	'						<div class="un_inp rpass">'+
	'							<span>密　码&nbsp;:</span>'+
	'							<input type="password" id="un_rpass" value="" placeholder="'+Union.logFn.msg[2]+'" />'+
	'						</div>'+
	'						<div class="un_tips rpass"></div>'+
	'						<div class="un_inp surePass rpass">'+
	'							<span>确认密码&nbsp;:</span>'+
	'							<input type="password" id="un_repass" value="" />'+
	'						</div>'+
	'						<div class="un_tips repass"></div>'+
	'						<div class="un_rem">'+
	'							<span class="un_check"></span>'+
	'							<a href="./html/duty.htm" target="_blank" class="un_lose_pass">已阅读《用户服务协议》</a>'+
	'							<div class="clear"></div>'+
	'						</div>'+
	'						<div class="un_btns">'+
	'							<a href="javascript:;" class="un_btns_regl">注册</a>'+
	'							<div class="clear"></div>'+
	'						</div>'+
	'					</div>'+
	'					<div class="un_inps un_mod_save">'+
	'						<p class="save_tit">注册成功！</p>'+
	'						<div class="save_info">'+
	'							<div class="savediv save_name">'+
	'								<span class="sdtit">用户名:</span>'+
	'								<span class="nameTxt"></span>'+
	'							</div>'+
	'							<div class="savediv save_pass">'+
	'								<span class="sdtit">密码:</span>'+
	'								<span class="passTxt"></span>'+
	'							</div>'+
	'						</div>'+
	'						<p class="saveTxt">赶紧拿笔记下，或<a href="">保存至桌面</a></p>'+
	'						<div class="un_btns">'+
	'							<a href="javascript:;" class="un_btns_done">完成</a>'+
	'							<div class="clear"></div>'+
	'						</div>'+
	'					</div>'+
	'					<div class="un_msg">'+
	'						<div class="logs">'+
	'							<a href="javascript:;" class="un_log_qq"></a>'+
	'							<p class="un_logName"></p>'+
	'							<p class="un_logInfo"></p>'+
	'						</div>'+
	'						<div class="saves">'+
	'							<p class="tipst">温馨提示</p>'+
	'							<p class="tipTxt">为抵御盗号风险，90%的用户都会选择<a target="_blank" href="./user/index.php">设置密码保护</a></p>'+
	'						</div>'+
	'					</div>'+
	'					<div class="clear"></div>'+
	'				</div>'+
	'			</div>'+
	'			<div class="un_bot"></div>'+
	'		</div>';
			$('body').append(logHtml);
			Union.logFn.showName();
			$('.un_mod_log .un_inp input').bind('keypress',function(e){
				var e = e || event;
			    if(e.keyCode == 13){
					Union.logFn.doLog()
			    }
			});
			$('.un_mod_reg .un_inp input').bind('keypress',function(e){
				var e = e || event;
			    if(e.keyCode == 13){
					Union.logFn.doReg()
			    }
			})
		}else{
			window.document.domain = Union.logFn.doMain
		}
	},
	open: function(callback) {
		var unHeight = $(this.logDomId).height() / 2;
		$('.un_mod_log .un_tips,.un_mod_reg .un_tips').html("").removeClass('no yes');
		$(this.logDomId+'_mask').fadeIn().css({"display":"block"});
		$(this.logDomId).show().animate({
			"top": "50%",
			"opacity": "1",
			"margin-top": "-" + unHeight + "px"
		}, 150);
		if (typeof callback === "function"){
            Union.logFn.callBacks = callback;
        }
	},
	close: function() {
		$(this.logDomId).animate({
			"top": "-100%",
			"opacity": "0"
		}, 150, function() {
			$(this).hide();
			$(Union.logFn.logDomId+'_mask').fadeOut()
		})
	},
	addCSS:function (url) {
	    var link = document.createElement('link');
	    link.type = 'text/css';
	    link.rel = 'stylesheet';
	    link.href = url;
	    document.getElementsByTagName("head")[0].appendChild(link);
	},
	doLog:function(){
		_czc.push(['_trackEvent','web7k通行证','登录','登录按钮','','']);
		var name = $('#un_name').val(),
		pass = $('#un_pass').val(),
		ch = Union.logFn.remName;
		Union.logFn.resetHack();
		$('.un_mod_log .un_tips').html('').removeClass('yes no');
		if(name && /^[a-zA-Z0-9][a-zA-Z0-9_.@]{3,32}$/.test(name)){
			$('.un_mod_log .un_tips.name').html("").removeClass('no yes');
			if(pass && /[\s|\S]{6,32}/.test(pass)){
				Union.logFn.ieHack();
				$('.un_mod_log .un_tips.pass').html("正在登录···").removeClass('no yes').addClass('yes');
				$.ajax({
					type: "post",
					url: Union.logFn.doLogUrl,
					//async: false,
					data: {
						"username": name,
						"password": pass,
						"auto": ch,
						"formtype": "index_log"
					},
					dataType: "json",
					success: function(data) {
						if (data.status == 1) {
							switch (Union.logFn.defaults.logAction) {
								case 0:
									location.reload();
									break;
								case 1:
									location.href=Union.logFn.defaults.logedCallUrl;
									break;
								case 2:
									Union.logFn.getUserInfo({"name":name,"pass":pass,"status":1});
									Union.logFn.close()
									break;
							}
							if (typeof Union.logFn.callBacks === "function"){
					            Union.logFn.callBacks();
					        }
						} else {
							$('.un_mod_log .un_tips.pass').html(data.info).addClass('no');
							Union.logFn.ieHack()
						}
					}
				});
			}else{
				$('.un_mod_log .un_tips.pass').html(Union.logFn.msg[2]).addClass('no');
				Union.logFn.ieHack()
			}
		}else{
			$('.un_mod_log .un_tips.name').html(Union.logFn.msg[1]).addClass('no');
			Union.logFn.ieHack()
		}
	},
	doReg:function(){
		_czc.push(['_trackEvent','web7k通行证','注册','注册按钮','','']);
		var name = $('#un_rname').val(),
		pass = $('#un_rpass').val(),
		rpass = $('#un_repass').val();
		$('.un_mod_reg .un_tips').removeClass('yes no');
		if(name && /^[a-zA-Z0-9][a-zA-Z0-9_]{4,32}$/.test(name)){
			//if(!Union.logFn.defaults.autokk){
				Union.logFn.checkName(name);
			//}
			if(Union.logFn.isCheck){
			if(pass && /[\s|\S]{6,32}/.test(pass)){
				$('.un_mod_reg .un_tips.rpass').html("").removeClass('no yes');
				if(rpass === pass){
					$('.un_mod_reg .un_tips').html("").removeClass('no yes');
					$('.un_mod_reg .un_tips.repass').html("正在注册···");
					$.ajax({
						type: "post",
						url: Union.logFn.doLogUrl,
						//async: false,
						data:{
							"name":name,
							"password":pass,
							"repassword":rpass,
							"formtype":"registerform",
							"from":Union.logFn.defaults.refer
						},
						dataType: "json",
						success: function(data) {
							if (data.status == 1) {
								if(Union.logFn.defaults.showSave == 1){
									$('.un_mod_reg,.un_mod_save').toggle();
									$('.un_msg .logs,.un_msg .saves').toggle();
									$('.un_mod_save .nameTxt').html(name);
									$('.un_mod_save .passTxt').html(pass);
									$('.un_mod_save .saveTxt a').attr({"href":Union.logFn.defaults.saveInfo+"u="+name+"&p="+pass});
									$('.un_btns_done').bind('click',function(){
										switch (Union.logFn.defaults.regAction) {
											case 0:
												location.reload();
												break;
											case 1:
												location.href=Union.logFn.defaults.logedCallUrl;
												break;
											case 2:
												$.extend(Union.logFn.userInfo, {"name":name,"pass":pass,"status":1});
												Union.logFn.close();
												break;
										}
									})
								}else{
									switch (Union.logFn.defaults.regAction) {
										case 0:
											location.reload();
											break;
										case 1:
											location.href=Union.logFn.defaults.logedCallUrl;
											break;
										case 2:
											$.extend(Union.logFn.userInfo, {"name":name,"pass":pass,"status":1});
											Union.logFn.close();
											break;
									}
								}
							} else {
								$('.un_mod_reg .un_tips.repass').html(data.info).addClass('no');
							}
						}
					});
				}else{
					$('.un_mod_reg .un_tips.repass').html(Union.logFn.msg[3]).addClass('no');
				}
			}else{
				$('.un_mod_reg .un_tips.rpass').html(Union.logFn.msg[2]).addClass('no');
			}
			}
		}else{
			$('.un_mod_reg .un_tips.rname').html(Union.logFn.msg[1]).addClass('no');
		}
	},
	showName: function() {
		var udom = $('.logs .un_logName'),tdom = $('.logs .un_logInfo');
		if (this.readCookie('loginfrom') == 'qq') {
			udom.html(this.readCookie('nickname'));
			tdom.html(Union.logFn.msg[6])
		} else if (this.readCookie('loginfrom') == 'wx') {
			udom.html(this.readCookie('nickname'));
			tdom.html(Union.logFn.msg[7])
		} else {
			var name = this.readCookie('username')?this.readCookie('username'):this.readCookie('k7_username');
			udom.html(name);
			$('#un_name').val(name);
			tdom.html(Union.logFn.msg[8])
		}
	},
	autoKk:function(){
		$.ajax({
			url: this.getkkUrl,
			type: "GET",
			dataType: 'jsonp',
			success: function(json) {
				if (eval(json).kk) {
					$(".un_mod_reg #un_rname").val(eval(json).kk);
					$('.un_mod_reg .un_tips.rname').html(Union.logFn.msg[0]).removeClass('no').addClass('yes');
				}
			}
		});
	},
	checkName:function(name){
		$.ajax({
			type: "post",
			url: Union.logFn.chkNameUrl,
			data: {
				"name": "name",
				"param": name
			},
			dataType: "json",
			//async: "false",
			success: function(data) {
				if (data.status == "y") {
					$('.un_mod_reg .un_tips.rname').html(Union.logFn.msg[5]).removeClass('no').addClass('yes');
					Union.logFn.isCheck = 1;
				} else {
					$('.un_mod_reg .un_tips.rname').html(Union.logFn.msg[4]).removeClass('yes').addClass('no');
					Union.logFn.isCheck = 0;
				}
			}
		});
	},
	rember:function(){
		//$(Union.logFn.logDomId+' .un_mod_log .un_rem .un_check').toggleClass('no');
		var isRem = $(Union.logFn.logDomId+' .un_mod_log .un_rem .un_check').hasClass('no');
		var _this = $(Union.logFn.logDomId+' .un_mod_log .un_rem .un_check');
		if(!isRem){
			_this.addClass('no');
			_this.attr({"style":"background:url(./cdn/api/loginPlus/img/chk_0.png) no-repeat;"})
		}else{
			_this.removeClass('no');
			_this.attr({"style":"background:url(./cdn/api/loginPlus/img/chk_1.png) no-repeat;"})
		}
	},
	getUserInfo:function(options){
		$.extend(Union.logFn.userInfo, options);
		return Union.logFn.userInfo;
	},
	saveInfo:function(options){
		$('.un_mod_reg,.un_mod_save').toggle();
		$('.un_msg .logs,.un_msg .saves').toggle();
		$('.un_mod_save .nameTxt').html(options.name);
		$('.un_mod_save .passTxt').html(options.pass);
		$('.un_mod_save .saveTxt a').attr({"href":Union.logFn.defaults.saveInfo+"u="+options.name+"&p="+options.pass});
		$('.un_btns_done').bind('click',function(){
			Union.logFn.close()
		})
	},
	qqLog:function(){
		this.thirdLogin({
            url: './Connect2.1/example/oauth/index.php?referer=%2fapi%2f'+Union.logFn.defaults.qqlogType+'.php%3faid%3d11457205%26refer%3d'+Union.logFn.defaults.qqlogCallback,
            w: 454,
            h: 320
        });
        _czc.push(['_trackEvent','web通行证','QQ登录','QQ登录','','']);
	},
	thirdLogin:function(opt){
        var times = 0,
            maxTimes = 10*60*3, // 最多等三分钟
            perTime = 300, // 轮询间隔
            timer = 0;
        var defaultOpt = {
            w: 454,
            h: 320
        };
        defaultOpt.t= (window.screen.availHeight-30-defaultOpt.h)/2;
        defaultOpt.l= (window.screen.availWidth-10-defaultOpt.w)/2;
        $.extend(defaultOpt, opt);
        var params = 'width='+defaultOpt.w
                +',height='+defaultOpt.h
                +',top='+defaultOpt.t
                +',left='+defaultOpt.l
                +',location=0'//是否显示地址字段。默认是 1
                +',menubar=0'//是否显示菜单栏。默认是 1
                +',resizable=0'//窗口是否可调节尺寸。默认是 1
                +',scrollbars=1'//是否显示滚动条。默认是 1
                +',status=1'//是否添加状态栏。默认是 1
                +',titlebar=1'//默认是 1
                +',toolbar=0';

        // 先判断是否登录了，如果已经登录，则直接结束
        if (Union.logFn.userInfo.status) {
            clearInterval(timer);
            location.reload();
            return;
        }
        window.open(opt.url,'',params);
        // 轮询登录状态， 登录成功就刷新iframe
        timer = setInterval(function(){
            if (Union.logFn.userInfo.status) {
                clearInterval(timer);
                location.reload();
            } else {
                if (times > maxTimes) {
                    clearInterval(timer);
                }
            }
            times++;
        }, perTime);
    },
    ieVersion:function(){
    	var _IE = (function(){
		    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		    while (
		        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
		        all[0]
		    );
		    return v > 4 ? v : false ;
		}());
		return _IE;
    },
	readCookie: function(name) {
		var ret = '',m;
		if (typeof name === 'string' && name !== '') {
			if ((m = String(document.cookie).match(
					new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')))) {
				ret = m[1] ? decodeURIComponent(m[1]) : '';
			}
		}
		return ret;
	},
	setCookie: function(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ";path=/;domain=*" + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	},
	myDate: function(timestamp) {
		d = new Date(timestamp);
		var jstimestamp = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds());
		return jstimestamp;
	},
	ieHack:function(){
		$('.un_mod_log').css({"height":"205px"})
	},
	resetHack:function(){
		$('.un_mod_log').css({"height":"195px"})
	}
};
(function(window, $) {
	Union.logFn.init();
	if(Union.logFn.ieVersion() <= 8){
		var sw = $(window).width(),sh = $(window).height();
		$('#Union.logFn_mask').attr('style','width:100%;height:'+sh+'px;filter:alpha(opacity=50);zoom:1');
		$(Union.logFn.logDomId+' #un_name').bind('click', function() {
			if($(this).val() == '用户名/邮箱/KK号'){
				$(this).val('');
			}
		});
		$(Union.logFn.logDomId+' #un_name').bind('blur', function() {
			if($(this).val() == ''){
				$(this).val('用户名/邮箱');
			}
		});
	}
	$(Union.logFn.logDomId+' .un_tabs a').bind('click', function() {
		var index = $(this).index();
		Union.logFn.toggleUi(index)
	});
	$(Union.logFn.logDomId+' .un_btns_reg').bind('click', function() {
		Union.logFn.toggleUi(1)
	});
	$(Union.logFn.logDomId+' .un_btns_log').bind('click', function() {
		Union.logFn.doLog();
	});
	$(Union.logFn.logDomId+' .un_btns_regl').bind('click', function() {
		Union.logFn.doReg();
	});
	$(Union.logFn.logDomId+' .un_close').bind('click', function() {
		Union.logFn.close();
	});
	$(Union.logFn.logDomId+' .un_log_qq').bind('click', function() {
		Union.logFn.qqLog();
	});
	$(Union.logFn.logDomId+' .un_mod_log .un_rem span').bind('click', function() {
		Union.logFn.rember();
		this.onselectstart = document.body.ondrag = function(){
			return false;
		}
	});
	
}(window, jQuery));