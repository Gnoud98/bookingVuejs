"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _buefy = _interopRequireDefault(require("buefy"));

require("buefy/dist/buefy.css");

require("bootstrap");

require("bootstrap/dist/css/bootstrap.css");

var _moment = _interopRequireDefault(require("moment"));

require("@/assets/style.scss");

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].use(_buefy["default"]);

_vue["default"].use(_moment["default"]);

_vue["default"].config.productionTip = false;
var EventBus = new _vue["default"]();
Object.defineProperties(_vue["default"].prototype, {
  $bus: {
    get: function get() {
      return EventBus;
    }
  }
});
new _vue["default"]({
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');