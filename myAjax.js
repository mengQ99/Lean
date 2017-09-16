/**
 * Ajax函数封装
 * @param {string} method 请求类型 默认get
 * @param {string} url 请求地址
 * @param {object} data 发送的参数
 * @param {function} success 请求操作
 */
function myAjax(method, url, data, success) {
    var xhr = null;
    method = method.toUpperCase() || 'GET';
    url = url||'';
    data = data || null;
    success = success || function () { };
    // 1、创建一个异步调用对象
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        //ie6及以下版本
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var params = [];
    for (var key in data) {
        params.push(key+'='+data[key]);
    }
    var postData = params.join('&');
    // 2、创建http请求 open()
    // 3、提交http请求 send()
    if (method === 'GET') {
        xhr.open(method, url + '?' + postData, true);
        xhr.send(null);
    } else {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(postData);
    }
    // 4、http状态变化函数
    xhr.onreadystatechange = function () {
        try{
            if (xhr.readyState == 4 && xhr.status == 200) {
                success(xhr.responseText);
            }
        } catch (e) {
            alert('Error:' + e);
        }
    };

}