function Drag(id) {
    var _this = this;
    
    this.oDiv = document.getElementById(id);
    this.distLeft = 0;
    this.distTop = 0;
    
    this.oDiv.onmousedown = function () {
        _this.fnDown();
    };
}

Drag.prototype.fnDown = function (ev) {
    var oEv = event || ev;
    var _this = this;

    this.distLeft = oEv.clientX - this.oDiv.offsetLeft;
    this.distTop = oEv.clientY - this.oDiv.offsetTop;

    document.onmousemove = function (ev) {
        _this.fnMove(ev);
    };
    document.onmouseup = function () {
        _this.fnUp();
    };
};

Drag.prototype.fnMove = function (ev) {
    var oEv = event || ev;

    this.oDiv.style.left = oEv.clientX - this.distLeft + 'px';
    this.oDiv.style.top = oEv.clientY - this.distTop + 'px';
};

Drag.prototype.fnUp = function () {
    document.onmousemove = null;
    document.onmousedown = null;
};
