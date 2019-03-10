"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Greetings functio to greet the caller
 */
var AppMain =
/*#__PURE__*/
function () {
  function AppMain() {
    _classCallCheck(this, AppMain);
  }

  _createClass(AppMain, null, [{
    key: "greetings",
    value: function greetings() {
      return "Hello, today is ".concat((0, _moment.default)(), ", how is your day so far? let's transform API messages");
    }
  }]);

  return AppMain;
}();

exports.default = AppMain;