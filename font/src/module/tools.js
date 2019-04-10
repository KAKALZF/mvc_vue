// 删除元素（hack IE）
function removeElement(_element) {
    let _parentElement = _element.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(_element);
    }
}

// 获取地址栏参数
function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let loc = decodeURIComponent(window.location.search);
    let r = loc.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

// 对日期进行格式化
function timeFormat(date, format) {
    date = new Date(date);
    let map = {
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "h": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "q": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        let v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

// 通过字符串获取日期
function getDate(str) {
    let reg = /\d{4}(-|\/|\.)\d{2}\1\d{2}/g;
    return str.match(reg);
}

// 弹窗弱提示
function mytips(text, times) {
    times = times || 2000;
    let el = document.getElementById('c-tips');
    if (el) {
        removeElement(el);
    }
    // 创建元素
    let newEl = document.createElement('div');
    newEl.className = 'c-tips';
    newEl.id = 'c-tips';
    newEl.innerHTML = `
        <div class="c-tips-wrap">
            <i></i>
            <p>${ text }</p>
        </div>
    `;
    // 防止tap事件后触发click删除
    setTimeout(function () {
        // 删除
        let t = setTimeout(function () {
            removeElement(newEl);
        }, times);

        // 点击删除
        newEl.onclick = function () {
            removeElement(newEl);
        };

        // 鼠标移入则去除定时删除
        let child = newEl.getElementsByClassName('c-tips-wrap')[0];
        child.onmouseenter = function () {
            clearTimeout(t);
            child.onmouseleave = function () {
                removeElement(newEl);
            }
        };

        // 添加元素
        document.body.appendChild(newEl);

        // 居中
        let cont = document.getElementsByClassName('c-tips-wrap')[0];
        cont.style.marginLeft = -cont.offsetWidth / 2 + 'px';
        cont.style.marginTop = -cont.offsetHeight / 2 + 'px';

    }, 0);
}

// 弹窗确认提示框
function myconfirm(options) {
    options = options || {};
    options.title = options.title || '确定修改吗？';
    options.msg = options.msg || '';
    options.confirmBtnName = options.confirmBtnName || '确定';
    options.cancelBtnName = options.cancelBtnName || '取消';
    options.confirmFn = options.confirmFn || function () {
    };
    options.cancelFn = options.cancelFn || function () {
    };

    let wrap = document.createElement('div');
    wrap.className = 'c-bg-opacity';
    wrap.innerHTML = `
            <div class="c-confirm">
                <h3>${ options.title }</h3>
                <p>${ options.msg }</p>
                <div>
                    <button type="button" class="c-btn sm red cancel">${ options.cancelBtnName }</button>
                    <button type="button" class="c-btn sm confirm">${ options.confirmBtnName }</button>
                </div>
            </div>
    `;
    document.body.appendChild(wrap);
    wrap.getElementsByClassName('confirm')[0].onclick = function () {
        removeElement(wrap);
        if (typeof options.confirmFn == 'function') {
            options.confirmFn();
        }
    };
    wrap.getElementsByClassName('cancel')[0].onclick = function () {
        removeElement(wrap);
        if (typeof options.cancelFn == 'function') {
            options.cancelFn();
        }
    };
}

// 弹出对话框
function myprompt(options) {
    options = options || {};
    options.title = options.title || '确定修改吗？';
    options.confirmBtnName = options.confirmBtnName || '确定';
    options.cancelBtnName = options.cancelBtnName || '取消';
    options.confirmFn = options.confirmFn || function () {
    };
    options.cancelFn = options.cancelFn || function () {
    };
    options.initValue = options.initValue || '';

    let wrap = document.createElement('div');
    wrap.className = 'c-bg-opacity';
    wrap.innerHTML = `
            <div class="c-confirm">
                <h3>${ options.title }</h3>
                <p><input type="text" class="c-form-control" value="${ options.initValue }"${ options.maxlength ? ' maxlength="' + options.maxlength + '"' : '' }></p>
                <div>
                    <button type="button" class="c-btn sm transprant cancel">${ options.cancelBtnName }</button>
                    <button type="button" class="c-btn sm confirm">${ options.confirmBtnName }</button>
                </div>
            </div>
    `;
    document.body.appendChild(wrap);

    let confirmFn = function () {
        let msg = wrap.getElementsByTagName('input')[0].value;
        if (typeof options.confirmFn == 'function') {
            if (options.confirmFn(msg) !== false) {
                removeElement(wrap);
            }
        }
    };

    wrap.getElementsByTagName('input')[0].onkeyup = function (ev) {
        if (ev.keyCode == 13) {
            confirmFn();
        }
    };
    wrap.getElementsByClassName('confirm')[0].onclick = confirmFn;

    wrap.getElementsByClassName('cancel')[0].onclick = function () {
        let msg = wrap.getElementsByTagName('input')[0].value;
        if (typeof options.cancelFn == 'function') {
            if (options.cancelFn(msg) !== false) {
                removeElement(wrap);
            }
        }
    };
}

// 验证数组中是否包含某个值
function valueInArray(value, arr) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === value) {
            return true;
        }
    }
    return false;
}

// 获取唯一标识
function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// 获取短信验证码
// 倒计时的时间和使用次数，存放在目标元素的dataset中；
function getShortMsgCode(ev) {
    if (!ev.target.dataset.time) {
        ev.target.dataset.time = 3;
        if (!ev.target.dataset.count) {
            ev.target.dataset.count = 1;
        } else {
            ev.target.dataset.count++;
        }
        ev.target.innerText = '剩余' + ev.target.dataset.time + '秒';
        ev.target.className = ev.target.className.replace(/dark-blue/, 'gray');
        let t = setInterval(function () {
            ev.target.dataset.time--;
            ev.target.innerText = '剩余' + ev.target.dataset.time + '秒';
            if (ev.target.dataset.time == 0) {
                ev.target.dataset.time = '';
                ev.target.className = ev.target.className.replace(/gray/, 'dark-blue');
                ev.target.innerText = '获取验证码';
                clearInterval(t);
            }
        }, 1000);
    }
}

// 获取字符串长度，汉字算两个长度
function getByteLen(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
        let length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
            len += 1;
        } else {
            len += 2;
        }
    }
    return len;
}

// 截取字符串长度，汉字算两个长度
function cutByteStr(str, len, hasDot) {
    let newLength = 0;
    let newStr = "";
    let chineseRegex = /[^\x00-\xff]/g;
    let singleChar = "";
    let strLength = str.replace(chineseRegex, "**").length;
    for (let i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }
    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}

// 初始化日期范围控件
function initLaydateRangeTime(opt) {
    opt = opt || {};
    opt.isEmptyDate = !!opt.isEmptyDate;
    opt.isDateTime = !!opt.isDateTime;
    opt.isFutureTime = !!opt.isFutureTime;
    let d = new Date();
    // 今天的日期
    let nowDate = {
        date: d.getDate(),
        hours: 0,
        minutes: 0,
        month: d.getMonth(),
        seconds: 0,
        year: d.getFullYear(),
    };
    // 开始时间
    let startOpt = {
        elem: this.$refs.startDate,
        btns: ['confirm'],
        type: opt.isDateTime ? 'datetime' : 'date',
        done: (value, date) => {
            if (JSON.stringify(date) == "{}") {
                endDate.config.min = nowDate;
            } else {
                date.month--;
                endDate.config.min = date;
            }
        }
    };
    // 结束时间
    let endOpt = {
        elem: this.$refs.endDate,
        btns: ['confirm'],
        type: opt.isDateTime ? 'datetime' : 'date',
        done: (value, date) => {
            if (JSON.stringify(date) == "{}") {
                startDate.config.max = nowDate;
            } else {
                date.month--;
                startDate.config.max = date;
            }
        }
    };

    // 设置时间范围
    if (!opt.isFutureTime) {
        startOpt.max = timeFormat(new Date(), 'yyyy-MM-dd');
        endOpt.max = timeFormat(new Date(), 'yyyy-MM-dd');
    } else {
        startOpt.min = timeFormat(new Date(), 'yyyy-MM-dd');
        endOpt.min = timeFormat(new Date(), 'yyyy-MM-dd');
    }

    let startDate = laydate.render(startOpt);
    let endDate = laydate.render(endOpt);

    if (!opt.isEmptyDate) {
        this.$refs.startDate.value = timeFormat(new Date(), 'yyyy-MM-01');
        this.$refs.endDate.value = timeFormat(new Date(), 'yyyy-MM-dd');
    }
}

// 遍历数组深度的个数
function getArrDeepCount(arr, keys) {
    let len = 0;
    arr.forEach(
        item => {
            if (keys.length > 1) {
                let skeys = JSON.parse(JSON.stringify(keys));
                skeys.shift();
                len += getArrDeepCount(item[keys[0]], skeys);
            } else {
                len += item[keys[0]].length;
            }
        }
    );
    return len;
}

/*根据时间数据获取开始时间和结束时间*/
function getTimeByTimeArray(timeArr, index) {
    if (timeArr && timeArr.length == 2 && index == 0) {
       return timeFormat(timeArr[index], 'yyyy-MM-dd 00:00:00');
    }
    else if (timeArr && timeArr.length == 2 && index == 1) {
        return timeFormat(timeArr[index], 'yyyy-MM-dd 23:59:59');
    }
}

export {
    getUrlParam,
    timeFormat,
    mytips,
    myconfirm,
    myprompt,
    valueInArray,
    generateUUID,
    getShortMsgCode,
    getByteLen,
    cutByteStr,
    getDate,
    initLaydateRangeTime,
    getArrDeepCount,
    getTimeByTimeArray
}
