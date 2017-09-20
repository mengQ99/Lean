var Lean = {
    
    //绑定事件
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function () {
                handler.call(element);// 解决IE下this意外绑定到window问题
            });
        } else {
            element['on' + type] = handler;
        }
    },
    //移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    //获得事件对象
    getEvent: function (ev) {
        return ev ? ev : window.event;
    },
    //获得事件目标
    getTarget: function (ev) {
        return ev.target || ev.srcElement;
    },
    //阻止事件冒泡
    stopPropagation: function (ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    //阻止默认行为
    preventDefault: function (ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            ev.returnValue = false;
        }
    },
    //取得鼠标滚轮增量值 上正下负 120
    getWheelDelta: function(ev){
        if (event.wheelDelta)
            return event.wheelDelta;
        else
            // FF 
            return -event.detail * 40;
    },
    //获得键盘字符编码
    getCharCode: function (ev) {
        if (typeof ev.charCode == 'number') {
            return ev.charCode;
        } else {
            return ev.keyCode;//ie- + opera
        }
    },
    //获得剪贴板内容
    getClipboardText: function (ev) {
        var clipboardData = ev.clipboardData || window.clipboardData;
        return clipboardData.getData('text');
    },
    //设置剪贴板内容
    setClipboardData: function (ev, value) {
        if (ev.clipboardData) {
            return ev.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value);//IE
        }
    },
    //表单序列化  
    serialize(form) {
        var parts = [],
            field = null,
            i, j,
            option,
            optValue;
        
        //遍历表单元素
        for (i = 0; i < form.elements.length; i++) {
            field = form.element[i];
            switch (field.type) {
                // select 元素
                case 'select-one':
                case 'select-multiple':
                    if (field.name.length) {
                        for (j = 0; j < field.options.length; i++){

                            option = field.options[j];
                            //循环获取被选中的选项
                            if (option.selected) {
                                optValue = '';
                                if (option.hasAttribute) {
                                    optValue = option.hasAttribute['value'] ?
                                               option.value : option.text;
                                } else {
                                    // IE 
                                    optValue = option.attributes['value'].specified ?
                                               option.value : option.text;
                                }
                                parts.push(encodeURIComponent(field.name) + '=' +
                                           encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;
                case undefined:
                case 'file':
                case 'submit':
                case 'reset':
                case 'button':
                    break;
                case 'radio':
                case 'checkbox':
                    // 仅获取勾选的内容
                    if (!field.checked) break;
                default:
                    if (field.name.length) {
                        parts.push(encodeURIComponent(field.name) + '=' +
                                   encodeURIComponent(field.value));
                    }
            }

        }

        return parts.join('&');
    },
    //获取指定范围内随机数字
    getRandomNumber: function(min, max) {
        return (Math.random() * (max - min + 1) + min) << 0;
    },
    //获取随机颜色
    getRandomColor: function () {
        var r = Math.random() * 0x1000000 << 0;
        while(s == this.lastColor) 
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    },
    //获取行间样式
    getStyle: function(element, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    },
    //类名选择器
    getByClass: function(oParent, sClass) {
        var aLi = oParent.getElementsByTagName('*');
        var reClass = new RegExp("(^| )" + sClass + "( |$)");
        var res = [];
        for (var i = 0; i < aLi.length; i++) {
            reClass.test(aLi[i].className) && res.push(aLi[i]);
        }
        return res;
    },
    //css样式设置
    css: function (attr, value) {
        if (arguments.length == 2) {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style[attr] = value;
            }
        } else {
            if (typeof attr == 'string') {
                return getStyle(this.elements[0], attr);
            } else {
                //json
                for (i = 0; i < this.elements.length; i++) {
                    for (var k in attr) {
                        this.elements[i].style[k] = attr[k];
                    }
                }
            }      
        }
    },
    //documen.hidden属性
    getHiddenProp: function(){
        var prefixes = ['webkit','moz','ms','o'];

        if ('hidden' in document) return 'hidden';

        for (var i = 0; i < prefixes.length; i++){
            if ((prefixes[i] + 'Hidden') in document) 
                return prefixes[i] + 'Hidden';
        }
        return null;
    },
    //document.visibilityState属性
    getVisibilityState: function () {
        var prefixes = ['webkit', 'moz', 'ms', 'o'];
        if ('visibilityState' in document) return 'visibilityState';

        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'VisibilityState') in document)
                return prefixes[i] + 'VisibilityState';
        }

        return null;
    },
    //深拷贝
    deepCopy: function(p, o){
        var o = o || {};
        for(var i in p){
            if(typeof p[i] === 'object'){
                o[i] = (p[i].constructor === Array) ? [] : {};
                deepCopy(p[i], o[i]);
            }else{
                o[i] = p[i];
            }
        }
        return o;
    },
    //判断对象类型
    typeOf: function(){
        return {}.toString.call(obj).slice(8, -1);
    },
    //查询URL字符串参数
    getQueryStringArgs: function () {
        //去掉开头的问号    qs = 'name=value'
        var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
            arg = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null;
        for (let i = 0; i < items.length; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                arg[name] = value;
            }
        }
        //返回 name:value 键值对的数组
        return args;
    },
    //数组扁平化
    flat: function (arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (Array.isArray(arr[i])) {
                result = result.concat(flat(arr[i]))
            }
            else {
                result.push(arr[i])
            }
        }
        return result;
    },
    // 递归创建DOM片段 stackoverflow上看到的一个方法
    // makeElement(["p", "Here is a ", ["a", { href:"http://www.google.com/" }, "link"], "."]);
    // =>  <p>Here is a <a href="http://www.google.com/">link</a>.</p>
    makeElement: function (desc) {

        if (!Array.isArray(desc)) {
            return makeElement.call(this, Array.prototype.slice.call(arguments));
        }

        var name = desc[0];
        var attributes = desc[1];

        var ele = document.createElement(name);

        var start = 1;
        if (typeof attributes === "object" && attributes !== null && !Array.isArray(attributes)) {
            for (var attr in attributes) {
                ele[attr] = attributes[attr];
            }
            start = 2;
        }

        for (var i = start; i < desc.length; i++) {
            if (Array.isArray(desc[i])) {
                ele.appendChild(makeElement(desc[i]));
            }
            else {
                ele.appendChild(document.createTextNode(desc[i]));
            }
        }

        return ele;
    }
};

//查找当前值在数组中的所有索引位置 返回一个数组
if (!Array.prototype.allIndexOf) {
    Array.prototype.allIndexOf = function (ele) {
        var arr = [];
        var index = this.indexOf(ele);
        while (index !== 1) {
            arr.push(index);
            index = this.indexOf(ele, index + 1);
            //index = index > 0 ? this.lastIndexOf(ele, index - 1) : -1;
        }
        return arr;
    };
}
//字符串翻转
if (!String.prototype.reverse) {
    String.prototype.reverse = function () {
        return this.split('').reverse().join('');
    };
}
//首字母大写
if (!String.prototype.capitalize) {

    String.prototype.capitalize = function () {
        var arr = this.toLowerCase().split(' ');

        //this.toLowerCase.replace(/( |^)[a-z]/g, (m) => m.toUpperCase()); 正则方法

        for (var i in arr) {
            if(arr.hasOwnProperty(i))
                arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
            
        }
        return arr.join(' ');
    };
}
//数组随机排序 返回随机排序后的新数组 不改变原数组
if(!Array.prototype.randomSort){
    Array.prototype.randomSort = function(){
        //复制this 保证不改变原数组
        var _this = JSON.parse(JSON.stringify(this));
        var arr = [];
        while(_this.length > 0){
            var r = parseInt(Math.random() * _this.length);
            arr.push(oldArr[i]);
            _this.splice(r, 1);
        }
        return arr;
    }
}
//数组去重 不改变原数组
if(!Array.prototype.unique){
    Array.prototype.unique = function(){
        var arr = this;
        return this.filter(function(index, ele, arr) {
            return arr.indexOf(ele) === idx;
        });
    }
}
