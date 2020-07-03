// ================================================================================ container 기본 높이
function containerSet(){
	var winH = $(window).height();
	$('.container').css('min-height',winH);

	if($('.container').hasClass('historyScroll')){
		$('.container').css('height',winH);
		$('.container').css('min-height','');
	}
}

// ================================================================================ 하단고정 버튼
function btnFixingAdd(){
	for(var i = 0 ; i < $('.btnFixing').length ; ++i ){
		if($('.btnFixing').eq(i).hasClass('uiActive') == false ){
			$('.btnFixing').eq(i).addClass('uiActive');

			if($('.btnFixing').eq(i).parents().hasClass('container') == false ){
				$('.btnFixing').eq(i).parents('.popInner').css('padding-bottom','55px');
			} else {
				$('.btnFixing').eq(i).parents('.container').find('.content').css('padding-bottom','75px');
			}
		}
	}

	for(var i = 0; i < $('.popOption').length ; ++i ){
		if($('.popOption').eq(i).find('.popCont').length == 0 ){
			$('.popOption').eq(i).addClass('nonCont');
		}
	}
}

// ================================================================================ br, hr 히든 처리
function tagHidden(){
	setTimeout(
	function(){
		$('br, hr').attr('aria-hidden',true);
	},1000);
}

// ================================================================================ 콘텐츠 높이에 따른 세로 정렬
function pageValignAdd(){
	var contH = $(window).height() - 100;

	for(var i = 0 ; i < $('.pageValign_m').length ; ++i ){
		if($('.pageValign_m').eq(i).length > 0 ){
			$('.pageValign_m').eq(i).addClass('uiActive');
			var pageH = $('.pageValign_m').eq(i).outerHeight();

			if(pageH > contH){
				$('.pageValign_m').eq(i).addClass('override');
			}
		}
	}
}

// ================================================================================ 아코디언
function accordionAdd(){
	for(var i = 0; i < $('.accoHead').length ; ++i ){
		if($('.accoHead').eq(i).hasClass('uiActive') == false ){
			$('.accoHead').eq(i).addClass('uiActive');
			if($('.accoHead').eq(i).parent().hasClass('termsWrap') == false ){
				$('.accoHead').eq(i).attr('role','button');
				$('.accoHead').eq(i).attr('tabindex','0');
				$('.accoHead').eq(i).attr('title','펼치기');
				$('.accoHead').eq(i).attr('aria-expanded', false);
				$('.accoHead').eq(i).find('+ .accoCont').attr('aria-hidden', true);
				$('.accoHead').eq(i).bind({
					'click':function(e){
						e.preventDefault();
						if($(this).hasClass('on')){
							$(this).removeClass('on');
							$(this).attr('title','펼치기');
							$(this).attr('aria-expanded', false);
							$(this).find('+ .accoCont').slideUp();
							$(this).find('+ .accoCont').attr('aria-hidden', true);
						} else {
							$(this).parents('li').siblings().find('.accoCont').slideUp(200);
							$(this).parents('li').siblings().find('.accoHead').removeClass('on');	

							$(this).addClass('on');
							$(this).attr('title','접기');
							$(this).attr('aria-expanded', true);
							$(this).find('+ .accoCont').attr('aria-hidden', false);
							$(this).find('+ .accoCont').delay(200).slideDown();
						}
					}
				});

				if($('.accoHead').eq(i).hasClass('on') == false ){

				} else {
					$('.accoHead').eq(i).attr('title','접기');
					$('.accoHead').eq(i).attr('aria-expanded', true);
					$('.accoHead').eq(i).find('+ .accoCont').show();
					$('.accoHead').eq(i).find('+ .accoCont').attr('aria-hidden', false);
				}
			} else {
				$('.accoHead').eq(i).find('.check_single').after('<button type="button" class="btnIco_acco" title="펼치기"></button>');
				$('.accoHead').eq(i).find('.btnIco_acco').attr('aria-expanded', false);
				$('.accoHead').eq(i).find('+ .accoCont').attr('aria-hidden', true);
				$('.accoHead').eq(i).find('.btnIco_acco').bind({
					'click':function(e){
						e.preventDefault();
						if($(this).parent().hasClass('on')){
							$(this).parent().removeClass('on');
							$(this).attr('title','펼치기');
							$(this).attr('aria-expanded', false);
							$(this).parent().find('+ .accoCont').slideUp();
							$(this).parent().find('+ .accoCont').attr('aria-hidden', true);
						} else {
							$(this).parent().addClass('on');
							$(this).attr('title','접기');
							$(this).attr('aria-expanded', true);
							$(this).parent().find('+ .accoCont').slideDown();
							$(this).parent().find('+ .accoCont').attr('aria-hidden', false);
						}
					}
				});
			}
		}
	}
}

// ================================================================================ 탭
function tabAdd(){
	for(var i = 0; i < $('.tabWrap').length ; ++i ){
		var target = $('.tabWrap').eq(i);
		if(target.hasClass('uiActive') == false ){
			target.addClass('uiActive');
			var tab = target.find('.tabList');
			if(tab.find('> li button, > li a').length == 0 ){
				if(tab.find('> li').length > 4 ){
					tab.addClass('nonLayout');
				}
				tab.attr('role','tablist');
				tab.find('> *').attr('role','tab');
				tab.find('> *').attr('tabindex','0');
				tab.find('> *').attr('aria-selected','false');
				for( j = 0 ; j < tab.find('> *').length ; ++j ){
					tab.find('> *').eq(j).attr('id','tab_'+i+'_'+j);
					tab.find('> *').eq(j).attr('aria-controls','panel_'+i+'_'+j);
				}
				tab.find('> *').eq(0).addClass('on');
				tab.find('> *').eq(0).attr('aria-selected','true');
				$(target).find('> .tabCont').hide();
				$(target).find('> .tabCont').attr('role','tabpanel');
				$(target).find('> .tabCont').attr('tabindex','0');
				$(target).find('> .tabCont').attr('aria-hidden','true');
				$(target).find('> .tabCont').eq(0).show();
				$(target).find('> .tabCont').eq(0).attr('aria-hidden','false');
				for( j = 0 ; j < tab.find('> *').length ; ++j ){
					$(target).find('.tabCont').eq(j).attr('id','panel_'+i+'_'+j);
					$(target).find('.tabCont').eq(j).attr('aria-labelledby','tab_'+i+'_'+j);
				}
				$(".tabWrap").eq(i).find("> .tabList > *").bind({
					'click':function(e){
						e.preventDefault();
						var $contain = $(this).parent().parent();
						$contain.find('> .tabList > *').removeClass('on');
						$contain.find('> .tabList > *').attr('aria-selected','false');
						$(this).addClass('on');
						$(this).attr('aria-selected','true');
						var idx = $contain.find('> .tabList').children().index(this);
						$contain.find('> .tabCont').hide();
						$contain.find('> .tabCont').attr('aria-hidden','true');
						$contain.find('> .tabCont').eq(idx).show();
						$contain.find('> .tabCont').eq(idx).attr('aria-hidden','false');
					}
				});
			}
		} 
	}
}

function inputInit(){
	for(var i = 0; i < $('.regisNum').length ; ++i ){
		if($('.firstNum').parent('.regisNum').eq(i).hasClass('uiAct') == false ){
			$('.firstNum').parent('.regisNum').eq(i).addClass('uiAct');

			if($('.regisNum:eq('+i+') > .firstNum').length > 0 ){
				if($('.regisNum:eq('+i+') > .firstNum').val() != ""){//value select or value input
					console.log($('.firstNum').val());
					$('.regisNum:eq('+i+')').addClass('hasValue');
				}
			}
		}
	}

	$('.regisNum > .firstNum').bind("change keyup input", function() {
		if($(this).val() != ""){
			$(this).parent('.regisNum').addClass('hasValue');
		} else {
			$(this).parent('.regisNum').removeClass('hasValue');
		}

	});
}


function checkTabAdd(){
	var checkTab = $('.checkTabArea > .checkTab_typeL')
	
	if(checkTab.find('> li').length > 4 ){
		checkTab.addClass('nonLayout');
	}
}

// ================================================================================ rangeSlider
function rangeSliderAdd(){
	for(var i = 0 ; i < $('.rangeBar').length ; ++i ){
		if($('.rangeBar').eq(i).hasClass('uiActive') == false ){
			$('.rangeBar').eq(i).addClass('uiActive');

			var rangeWrap = $('.rangeBar').eq(i).find('.rangeSlider');
			console.log(rangeWrap.val());
			
			var rangeValue = (rangeWrap.val()-rangeWrap.attr('min')) / (rangeWrap.attr('max') - rangeWrap.attr('min'));
			console.log(rangeValue);

			$('.rangeBar').eq(i).find('.rangeSlider').css('background-image',
								'-webkit-gradient(linear, left top, right top, '
								+ 'color-stop(' + rangeValue + ', #0072ff), '
								+ 'color-stop(' + rangeValue + ', #e9ebee)'
								+ ')'
				);

			$('.rangeBar').eq(i).find('.rangeSlider').bind({
				'change mousemove':function(e){
					e.preventDefault();
					var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
					
					$(this).css('background-image',
								'-webkit-gradient(linear, left top, right top, '
								+ 'color-stop(' + val + ', #0072ff), '
								+ 'color-stop(' + val + ', #e9ebee)'
								+ ')'
					);
				}
			});

			$('.rangeBar').eq(i).find('.num').before($('.rangeBar').eq(i).find('.num > span:first-child'));
		}
	}
}

function addInput(){
	var target = document.querySelector('.dctInput');
	var close = document.querySelector('.dctInput .btnIco_close');
	target.style.display = "block";	
	close.onclick = function(){
		target.style.display = "none";	
	}
}

/* 2019-11-11 버텀시트 안에 버튼이 있을경우와 없을경우 */
/*function popContPadd() {
	if( !document.querySelector('.popInner')){
		
	}else {
		var target = document.querySelector('.popInner');
		if(target.querySelector('.btnArea')){
			target.querySelector('.popCont').style.paddingBottom = "70px";
		}else {
			target.querySelector('.popCont').style.paddingBottom = "20px";
		}
	}
}*/

/* 2019-11-11 버텀시트 안에 버튼이 있을경우와 없을경우 */
function popContPadd() {
	if( !document.querySelector('.popInner')){
		
	}else {
		var target = document.querySelector('.popInner');
		var popCont = target.querySelector('.popCont');
		
		if(target.querySelector('.btnArea')){
			if (popCont) {
				popCont.style.paddingBottom = "70px";
			}
		}else {
			if (popCont) {
				popCont.style.paddingBottom = "20px";
			}
		}
	}
}

function scrollNone(){
	var winHeight = $(window).height();
	var target = $('.wrapper');
	var target2 = $('.popWrap');
	if($('.wrapper')){
		target.css('height', winHeight).css('overflow','hidden');	
	}else if($('.popWrap')){
		target2.css('height', winHeight).css('overflow','hidden');	
	}
}


function scrollAuto(){ // 버텀시트 팝업 닫힐때 호출 할 함수.  wrapper를 원래대로 돌린다.
	var target = $('.wrapper');
	var target2 = $('.popWrap');
	if($('.wrapper')){
		target.css('height', 'auto').css('overflow','auto');	
	}else if($('.popWrap')){
		target2.css('height', 'auto').css('overflow','auto');	
	}
	
	
}


// 레이아웃 Setting
function layoutSetting(){
	containerSet();
	tagHidden();
}

// UI 기능 Setting
function uiBind(){
	btnFixingAdd();
	pageValignAdd();
	accordionAdd();
	tabAdd();
	checkTabAdd();
	rangeSliderAdd();
	inputInit();
	// popContPadd();
	// helpAdd();
}

// 안드로이드 버전 체크
function checkAndroidVer4 () {
	var agent = navigator.userAgent.toLowerCase();
	var and_pos = agent.search("android");

	if(agent.indexOf('android') >= 0) {
		var pv_pos = agent.indexOf(";", and_pos);
		var aVersion = parseFloat(agent.slice(and_pos+8, pv_pos ));

//		if(aVersion < 5) $('body').addClass('android4');
		if(aVersion < 5) {
			return true;
		} else {
			return false;
		}
	}
}

(function($){
	$.fn.lastAllMenu = function(){
		return $(this).each(function(){
			var wrap = $(this).find('.inner');
			var target = $(this).find('.menuList:last-child').find('.menu_2th');
			var lastTarget = target.last();
			
			lastTarget.on('click', function(){
				var scTop = wrap.scrollTop() + 100;
				setTimeout(function(){
					wrap.animate({
						scrollTop: scTop
					});
				},300)
			});

		});
	}
})(jQuery);


$(document).ready(function(){
	layoutSetting();
	uiBind();
	$('.allMenuArea').lastAllMenu();

//	var agent = navigator.userAgent.toLowerCase();
//	var and_pos = agent.search("android");
//
//	if(agent.indexOf('android') >= 0) {
//		var pv_pos = agent.indexOf(";", and_pos);
//		var aVersion = parseFloat(agent.slice(and_pos+8, pv_pos ));
//
//		if(aVersion < 5) $('body').addClass('android4');
//	}
	
	if (checkAndroidVer4()) $('body').addClass('android4');
});


