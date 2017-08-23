/**
 * 简单运动框架
 * @params {object} 运动对象
 * @params {json} 包含运动目标的json对象
 * @params {function} 运动结束后的回调函数
 */
function startMove(obj, json, fn) {

	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
        
	    var bStop = true;

	    for (var attr in json) {
	        //1.取当前值
	        var iCur = 0;

	        if (attr == 'opacity') {
	            iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
	        } else {
	            iCur = parseInt(getStyle(obj, attr));
	        }

	        //2.计算速度
	        var iSpeed = (json[attr] - iCur) / 6;
	        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

	        if (iCur != json[attr]) {
	            bStop = false;
	        }

	        if (attr == 'opacity') {
	            obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
	            obj.style.opacity = (iCur + iSpeed) / 100;
	        } else {
	            obj.style[attr] = iCur + iSpeed + 'px';
	        }
	    }
        // 3.运动结束
	    if (bStop) {
	        clearInterval(obj.timer);

	        if (fn) {
	            fn();
	        }
	    }
	}, 30);
}
/**
 * 获取非行间样式
 * @params {object}
 * @params {string} 
 * @return 返回字符串形式的非行间样式
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        //IE
        return obj.currentStyle[attr];
    } else {
        //非IE
        return getComputedStyle(obj, false)[attr];
    }
}
