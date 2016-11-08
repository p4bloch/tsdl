'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTvShows = exports.getEpisodeUrl = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slug = require('slug');

var _slug2 = _interopRequireDefault(_slug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = require('x-ray')();

var cacheFile = _path2.default.resolve(__dirname + '/cache.json');

var getEpisodeUrl = exports.getEpisodeUrl = function getEpisodeUrl(TvShow, season, episode) {
  var tvShowId = TvShow.link.split('/').pop();
  return 'http://www.tusubtitulo.com/serie/' + (0, _slug2.default)(TvShow.name) + '/' + season + '/' + episode + '/' + tvShowId + '/';
};

var getTvShows = exports.getTvShows = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fs2.default.exists(cacheFile);

          case 2:
            if (_context.sent) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return saveTvShows();

          case 5:
            _context.t0 = JSON;
            _context.next = 8;
            return _fs2.default.readFile(cacheFile, 'utf8');

          case 8:
            _context.t1 = _context.sent;
            return _context.abrupt('return', _context.t0.parse.call(_context.t0, _context.t1));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getTvShows() {
    return _ref.apply(this, arguments);
  };
}();

var saveTvShows = function saveTvShows() {
  return new Promise(function (resolve, reject) {
    var stream = x('http://www.tusubtitulo.com/series.php', 'td.line0', [{
      name: 'a@html',
      link: 'a@href'
    }]).stream();
    stream.on('end', function () {
      return resolve();
    });
    stream.pipe(_fs2.default.createWriteStream(cacheFile));
  });
};