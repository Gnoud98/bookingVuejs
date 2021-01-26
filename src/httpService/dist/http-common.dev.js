"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTP = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HTTP = _axios["default"].create({
  baseURL: 'https://stag.api.be.suplo.vn/v1'
});

exports.HTTP = HTTP;