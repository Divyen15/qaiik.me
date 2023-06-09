!(function (t) {
  function e(o) {
    if (n[o]) return n[o].exports;
    var i = (n[o] = { exports: {}, id: o, loaded: !1 });
    return t[o].call(i.exports, i, i.exports, e), (i.loaded = !0), i.exports;
  }
  var n = {};
  (e.m = t), (e.c = n), (e.p = ""), e(0);
})([
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      new (n(1).SwingDragPlugIn)().register();
  },
  function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var o = n(2),
      i = n(3),
      a = n(4),
      s = (function () {
        function t(t) {
          (this.plugInName = "ui.swingdrag"),
            (this.swingDragOptions = t),
            this.swingDragOptions ||
              (this.swingDragOptions = new o.SwingDragOptions()),
            (this.updateCurrentDragVectorIntervalMS = 1e3 / 30);
        }
        return (
          (t.prototype.destroy = function () {
            if (
              $ &&
              $.Widget &&
              ($.Widget.prototype.destroy.call(this), this.element)
            ) {
              var t = $(this.element);
              t.draggable("destroy"),
                this.disableSwing(t),
                this.disableSwingDragShadow(t),
                t.removeClass("dragging"),
                $(this.element).css({ transform: "" });
            }
          }),
          (t.prototype.register = function () {
            $.widget(this.plugInName, this);
          }),
          (t.prototype.enableSwing = function (t) {
            t.addClass("swingdrag");
          }),
          (t.prototype.disableSwing = function (t) {
            t.removeClass("swingdrag");
          }),
          (t.prototype.enableSwingDragShadow = function (t) {
            t.addClass("shadow");
          }),
          (t.prototype.disableSwingDragShadow = function (t) {
            t.removeClass("shadow");
          }),
          (t.prototype.updateElementTransform = function (t, e, n) {
            t.css({ transform: "rotate(" + e + "deg) scale(" + n + ")" });
          }),
          (t.prototype._create = function () {
            var t = this,
              e = $(this.element);
            this.initOptions(), this.enableSwing(e);
            var n,
              o,
              s = new i.Vector2D(),
              r = new i.Vector2D(),
              g = new i.Vector2D(),
              p = function () {
                var n = e.position();
                (s.x = n.left),
                  (s.y = n.top),
                  (g.x = s.x - r.x),
                  (g.y = s.y - r.y);
                var i = Math.abs(g.x) / t.updateCurrentDragVectorIntervalMS;
                (i *= t.swingDragOptions.speedInfluenceFactor),
                  (o = a.MathUtils.mapInterval(
                    i,
                    0,
                    5,
                    0,
                    t.swingDragOptions.maxRotationAngleDeg
                  )),
                  (o *= g.x > 0 ? 1 : -1),
                  t.updateElementTransform(
                    e,
                    o,
                    t.swingDragOptions.pickUpScaleFactor
                  ),
                  (r.x = s.x),
                  (r.y = s.y);
              };
            e.on("dragstart", function (i) {
              e.addClass("dragging"),
                t.swingDragOptions.showShadow && t.enableSwingDragShadow(e),
                (s.x = e.position().left),
                (s.y = e.position().top),
                (o = Math.abs(t.swingDragOptions.maxRotationAngleDeg)),
                (n = setInterval(p, t.updateCurrentDragVectorIntervalMS));
            }),
              e.on("dragstop", function (o) {
                e.removeClass("dragging"),
                  n && clearInterval(n),
                  t.disableSwingDragShadow(e),
                  t.updateElementTransform(e, 0, 1);
              }),
              e.data("draggable") || e.draggable();
          }),
          (t.prototype.initOptions = function () {
            (this.swingDragOptions = new o.SwingDragOptions()),
              (this.options.rotationAngleDeg ||
                0 === this.options.rotationAngleDeg) &&
                (this.swingDragOptions.maxRotationAngleDeg =
                  this.options.rotationAngleDeg),
              (this.options.maxRotationAngleDeg ||
                0 === this.options.maxRotationAngleDeg) &&
                (this.swingDragOptions.maxRotationAngleDeg =
                  this.options.maxRotationAngleDeg),
              void 0 !== this.options.showShadow &&
                (this.swingDragOptions.showShadow = this.options.showShadow),
              (this.options.pickUpScaleFactor ||
                0 === this.options.pickUpScaleFactor) &&
                (this.swingDragOptions.pickUpScaleFactor =
                  this.options.pickUpScaleFactor),
              (this.options.speedInfluenceFactor ||
                0 === this.options.speedInfluenceFactor) &&
                (this.swingDragOptions.speedInfluenceFactor =
                  this.options.speedInfluenceFactor);
          }),
          (t.prototype._setOption = function (t, e) {
            switch (($.Widget.prototype._setOption.apply(this, arguments), t)) {
              case "rotationAngleDeg":
              case "maxRotationAngleDeg":
                this.swingDragOptions.maxRotationAngleDeg = e;
                break;
              case "showShadow":
                this.swingDragOptions.showShadow = e;
                break;
              case "pickUpScaleFactor":
                this.swingDragOptions.pickUpScaleFactor = e;
                break;
              case "speedInfluenceFactor":
                this.swingDragOptions.speedInfluenceFactor = e;
            }
          }),
          t
        );
      })();
    e.SwingDragPlugIn = s;
  },
  function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var n = (function () {
      function t() {
        (this.maxRotationAngleDeg = 20),
          (this.showShadow = !0),
          (this.pickUpScaleFactor = 1.1),
          (this.speedInfluenceFactor = 2);
      }
      return t;
    })();
    e.SwingDragOptions = n;
  },
  function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var n = (function () {
      function t() {
        (this.x = 0), (this.y = 0);
      }
      return t;
    })();
    e.Vector2D = n;
  },
  function (t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
    var n = (function () {
      function t() {}
      return (
        (t.mapInterval = function (e, n, o, i, a) {
          return i + ((a - i) / (o - n)) * (t.clamp(e, n, o) - n);
        }),
        (t.clamp = function (t, e, n) {
          return Math.min(Math.max(t, e), n);
        }),
        t
      );
    })();
    e.MathUtils = n;
  },
]);
