'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subtitle = function () {
  function Subtitle(_ref) {
    var id = _ref.id;
    var language = _ref.language;
    var version = _ref.version;
    var status = _ref.status;
    var downloadLink = _ref.downloadLink;
    var showInfo = _ref.showInfo;
    (0, _classCallCheck3.default)(this, Subtitle);

    this.language = language;
    this.version = version;
    this.status = status;
    this.downloadLink = downloadLink;
    this.show = showInfo;
  }

  (0, _createClass3.default)(Subtitle, [{
    key: 'download',
    value: function download(path) {
      return (0, _request2.default)({
        url: 'http://www.tusubtitulo.com' + this.downloadLink,
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Upgrade-Insecure-Requests': 1,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
          Referer: (0, _util.getEpisodeUrl)(this.show.TvShow, this.show.season, this.show.episode),
          'Accept-Encoding': 'gzip, deflate, sdch',
          'Accept-Language': 'en-US,en;q=0.8,es;q=0.6,pt;q=0.4,gl;q=0.2,it;q=0.2'
        }
      }).pipe(_fs2.default.createWriteStream(path));
    }
  }]);
  return Subtitle;
}();

exports.default = Subtitle;