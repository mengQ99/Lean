function LimitDrag(id) {
    //组合继承
    Drag.call(this, id);
}

for(var i in Drag.prototype){
    LimitDrag.prototype[i] = Drag.prototype[i];
}

LimitDrag.prototype.fnMove = function (ev) {
    var oEv = event || ev;
    var l = oEv.clientX - this.distLeft;
    var t = oEv.clientY - this.distTop;

    var maxL = document.documentElement.clientWidth - this.oDiv.offsetWidth;
    var maxT = document.documentElement.clientHeight - this.oDiv.offsetHeight;

    l = l < 0 ? 0 : l;
    l = l > maxL ? maxL : l;
    t = t < 0 ? 0 : t;
    t = t > maxT ? maxT : t;

    this.oDiv.style.left = l + 'px';
    this.oDiv.style.top = t + 'px';
};
