/**
 *
 * Some basic tools and methods
 *
 * @file util-AMD.js
 * @author Dhyey Shrimankar(dhyeyshrimankar3187@gmail.com)
 *
 */
define(function() {


    var isArray = function(arr) {
        return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
    };


    var isFunction = function(fn) {
        return typeof fn === "function";
    };


    var cloneObject = function(src) {
        var o; //result
        if (Object.prototype.toString.call(src) === "[object Array]") {
            o = []; 
        } else {
            o = {};
        }
        for (var i in src) { 
            if (src.hasOwnProperty(i)) { 
                if (typeof src[i] === "object") {
                    o[i] = cloneObject(src[i]); 
                } else {
                    o[i] = src[i]; 
                }
            }
        }
        return o;
    };

    
    var uniqArray = function(arr) {
        var newArr = []; 
        for (var i in arr) { 
            if (newArr.indexOf(arr[i]) == -1) { 
                newArr.push(arr[i]); 
            }
        }
        return newArr;
    };


    var simpleTrim = function(str) {
        var i;
        var j;
        for (i = 0; i < str.length; i++) { 
            if (str.charAt(i) != " " && str.charAt(i) != "\t") { 
                break; 
            }
        }
        for (j = str.length - 1; j >= 0; j--) {
            if (str.charAt(j) != " " && str.charAt(j) != "\t") { 
                break; 
            }
        }
        return str.slice(i, j + 1); 
    };

    var trim = function(str) {
        if (str.length != -1) {
            return str.replace(/^\s+|\s+$/g, '');
            
        }
    };


    var deleteBlank = function(arr) {
        var arr2 = [];
        for (i = 0; i < arr.length; i++) {
            if (arr[i].match(/\s+/) || arr[i] === "") {
                continue;
            } else {
                arr2.push(arr[i]);
            }
        }
        return arr2;
    };


    var deleteInArray = function(arr, index) {
        if (isArray(arr) && index < arr.length) {
            return arr.slice(0, index).concat(arr.slice(index + 1));
        } else {
            console.error("not a arr or index error");
        }
    };


    var each = function(arr, fn) {
        for (var i in arr) {
            fn(arr[i], i);
        }
    };


    var getObjectLength = function(obj) {
        return Object.keys(obj).length;
    };


    var isEmail = function(emailStr) {
        var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
        return pattern.test(emailStr);
    };


    var isMobilePhone = function(phone) {
        var pattern = /^(\+\d{1,4})?\d{7,11}$/;
        return pattern.test(phone);
    };


    var addClass = function(element, newClassName) {
        var oldClassName = element.className; 
        element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
    };


    var removeClass = function(element, oldClassName) {
        var originClassName = element.className; 
        var pattern = new RegExp("\\b" + oldClassName + "\\b"); 
        element.className = trim(originClassName.replace(pattern, ''));
    };


    var isSiblingNode = function(element, siblingNode) {
        return element.parentNode === siblingNode.parentNode;
    };


    var getPosition = function(element) {
        var pos = {};
        pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        return pos;
    };




    var $ = function(selector) {

        if (!selector) {
            return null;
        }

        if (selector == document) {
            return document;
        }

        selector = trim(selector);
        if (selector.indexOf(" ") !== -1) { 
            var selectorArr = selector.split(/\s+/); 

            var rootScope = myQuery(selectorArr[0]); 
            var i = null;
            var j = null;
            var result = [];

            for (i = 1; i < selectorArr.length; i++) {
                for (j = 0; j < rootScope.length; j++) {
                    result.push(myQuery(selectorArr[i], rootScope[j]));
                }
                // rootScope = result;

            }
            return result[0][0];
        } else { 
            return myQuery(selector, document)[0];
        }
    };

    var myQuery = function(selector, root) {
        var signal = selector[0]; //
        var allChildren = null;
        var content = selector.substr(1);
        var currAttr = null;
        var result = [];
        root = root || document; 
        switch (signal) {
            case "#":
                result.push(document.getElementById(content));
                break;
            case ".":
                allChildren = root.getElementsByTagName("*");
                // var pattern0 = new RegExp("\\b" + content + "\\b");
                for (i = 0; i < allChildren.length; i++) {
                    currAttr = allChildren[i].getAttribute("class");
                    if (currAttr !== null) {
                        var currAttrsArr = currAttr.split(/\s+/);
                        // console.log(currAttr);
                        for (j = 0; j < currAttrsArr.length; j++) {
                            if (content === currAttrsArr[j]) {
                                result.push(allChildren[i]);
                                // console.log(result);
                            }
                        }
                    }
                }
                break;
            case "[": 
                if (content.search("=") == -1) { 
                    allChildren = root.getElementsByTagName("*");
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                            result.push(allChildren[i]);
                        }
                    }
                } else { 
                    allChildren = root.getElementsByTagName("*");
                    var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; 
                    var cut = selector.match(pattern); 
                    var key = cut[1]; 
                    var value = cut[2]; 
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(key) == value) {
                            result.push(allChildren[i]);
                        }
                    }
                }
                break;
            default: //tag
                result = root.getElementsByTagName(selector);
                break;
        }
        return result;
    };


    var addEvent = function(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, listener);
        }
    };


    var removeEvent = function(element, event, listener) {
        if (element.removeEventListenr) {
            element.removeEventListenr(event, listener);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        }
    };


    var addClickEvent = function(element, listener) {
        addEvent(element, "click", listener);
    };


    var addEnterEvent = function(element, listener) {
        addEvent(element, "keydown", function(event) {
            if (event.keyCode == 13) {
                listener();
            }
        });
    };


    var delegateEvent = function(element, tag, eventName, listener) {
        addEvent(element, eventName, function(e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (target && target.tagName.toLowerCase() == tag.toLowerCase()) {
                listener.call(target, event);
            }
        });
    };


    var delegateEventBubbleOnce = function(element, tag, eventName, listener) {
        addEvent(element, eventName, function(e) {
            var event = e || window.event;
            var target = event.target || event.srcElement; 
            if (target && target.tagName.toLowerCase() == tag.toLowerCase()) {
                listener.call(target, event);
            } else if (target.parentNode && target.parentNode.tagName.toLowerCase() == tag.toLowerCase()) {

                
                if (target.getAttribute("class") !== "fa fa-trash-o") {
                    listener.call(target.parentNode, event);
                }
            }
        });
    };


    var delegateEventTrash = function(element, tag, eventName, className, listener) {
        addEvent(element, eventName, function(e) {
            var event = e || window.event;
            var target = event.target || event.srcElement; //兼容 IE 与标准浏览器
            if (target && target.tagName.toLowerCase() == tag.toLowerCase() && target.getAttribute("class") === className) {
                listener.call(target, event);
            }
        });
    };

    var isIE = function() {
        var s = navigator.userAgent.toLowerCase();
        console.log(s);
        //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
        //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
        var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
        if (ie) {
            return ie[1];
        } else {
            return -1;
        }
    };


    var setCookie = function(cookieName, cookieValue, expiredays) {
        var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
        if (typeof expiredays === "number") {
            cookie += ";max-age=" + (expiredays * 60 * 60 * 24);
        }
        document.cookie = cookie;
    };

    var getCookie = function(cookieName) {
        var cookie = {};
        var all = document.cookie;
        if (all === "") {
            return cookie;
        }
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var p = list[i].indexOf("=");
            var name = list[i].substr(0, p);
            var value = list[i].substr(p + 1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    };


    var ajax = function(url, options) {

        var dataResult; 

        // 处理data
        if (typeof(options.data) === 'object') {
            var str = '';
            for (var c in options.data) {
                str = str + c + '=' + options.data[c] + '&';
            }
            dataResult = str.substring(0, str.length - 1);
        }

        
        options.type = options.type || 'GET';

        
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        
        xhr.open(options.type, url);
        if (options.type == 'GET') {
            xhr.send(null);
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(dataResult);
        }

        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (options.onsuccess) {
                        options.onsuccess(xhr.responseText, xhr.responseXML);
                    }
                } else {
                    if (options.onfail) {
                        options.onfail();
                    }
                }
            }
        };
    };


    
    var changeCode = function(str) {
        str = str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2f;");
        return str;
    };

    return {
        isArray: isArray,
        isFunction: isFunction,
        cloneObject: cloneObject,
        uniqArray: uniqArray,
        simpleTrim: simpleTrim,
        trim: trim,

        deleteBlank: deleteBlank,
        deleteInArray: deleteInArray,

        each: each,
        getObjectLength: getObjectLength,
        isEmail: isEmail,
        isMobilePhone: isMobilePhone,

        addClass: addClass,
        removeClass: removeClass,
        isSiblingNode: isSiblingNode,
        getPosition: getPosition,

        $: $,
        myQuery: myQuery,

        addEvent: addEvent,
        removeEvent: removeEvent,
        addClickEvent: addClickEvent,
        addEnterEvent: addEnterEvent,
        delegateEvent: delegateEvent,
        delegateEventBubbleOnce: delegateEventBubbleOnce,
        delegateEventTrash: delegateEventTrash,

        isIE: isIE,
        setCookie: setCookie,
        getCookie: getCookie,
        ajax: ajax,
        changeCode: changeCode
    };
});