'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSubtitlesForEpisode = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var findTvShowByName = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(name) {
    var _this = this;

    var _ret;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
              var tvShows, result;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _util.getTvShows)();

                    case 2:
                      tvShows = _context.sent;
                      result = _fuzzy2.default.filter(name, tvShows.map(function (s) {
                        return s.name;
                      }));

                      if (!result.length) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt('return', {
                        v: tvShows.find(function (s) {
                          return s.name === result[0].string;
                        })
                      });

                    case 6:
                      return _context.abrupt('return', {
                        v: 'no encontre el show'
                      });

                    case 7:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            })(), 't0', 2);

          case 2:
            _ret = _context2.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', _ret.v);

          case 5:
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t1 = _context2['catch'](0);

            console.log(_context2.t1);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function findTvShowByName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _fuzzy = require('fuzzy');

var _fuzzy2 = _interopRequireDefault(_fuzzy);

var _Subtitle = require('./Subtitle');

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _util = require('./util');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = require('x-ray')({
  filters: {
    clean: function clean(value) {
      return typeof value === 'string' ? value.replace(/(\r\n|\n|\r)/gm, "").replace(/ +(?= )/g, '').trim() : value;
    }
  }
});

var findSubtitlesForEpisode = exports.findSubtitlesForEpisode = function findSubtitlesForEpisode(TvShow, season, episode) {
  var url = (0, _util.getEpisodeUrl)(TvShow, season, episode);
  return getSubtitlesFromUrl(url, { TvShow: TvShow, season: season, episode: episode });
};

function getSubtitlesFromUrl(url, showInfo) {
  return new Promise(function (resolve, reject) {
    x(url, '#content .ssdiv', [{
      title: '.title-sub | clean',
      comment: 'span.comentario | clean',
      languages: x('.sslist', [{
        language: '.li-idioma | clean',
        status: '.li-estado | clean',
        downloadLink: '.download a:nth-child(2)@href'
      }])
    }])(function (err, subtitles) {
      if (err) reject(err);else resolve({ data: subtitles.filter(function (s) {
          return s.languages.length;
        }), showInfo: showInfo });
    });
  });
}

function getSubs(subtitles) {
  var subtitlesForLanguage = [];
  var i = 0;
  subtitles.data.forEach(function (version) {
    version.languages.forEach(function (language) {
      var sub = new _Subtitle2.default({
        language: language.language,
        version: version.title,
        comment: version.comment,
        status: language.status,
        downloadLink: language.downloadLink,
        showInfo: subtitles.showInfo
      });
      subtitlesForLanguage.push(sub);
    });
  });
  return subtitlesForLanguage.filter(function (s) {
    return !!s.downloadLink;
  });
}

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
  var argShowName, argSeason, argEpisode;
  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          argShowName = process.argv[2];
          argSeason = process.argv[3];
          argEpisode = process.argv[4];
          _context4.prev = 3;
          return _context4.delegateYield(_regenerator2.default.mark(function _callee3() {
            var _ref3, showName, TvShow, _ref4, season, _ref5, episode, subtitles, subtitlesToDownload;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!argShowName) {
                      _context3.next = 4;
                      break;
                    }

                    _context3.t0 = { showName: argShowName };
                    _context3.next = 7;
                    break;

                  case 4:
                    _context3.next = 6;
                    return _inquirer2.default.prompt([{
                      type: 'input',
                      name: 'showName',
                      message: 'Que serie?'
                    }]);

                  case 6:
                    _context3.t0 = _context3.sent;

                  case 7:
                    _ref3 = _context3.t0;
                    showName = _ref3.showName;
                    _context3.next = 11;
                    return findTvShowByName(showName);

                  case 11:
                    TvShow = _context3.sent;

                    if (!argSeason) {
                      _context3.next = 16;
                      break;
                    }

                    _context3.t1 = { season: argSeason };
                    _context3.next = 19;
                    break;

                  case 16:
                    _context3.next = 18;
                    return _inquirer2.default.prompt([{
                      type: 'input',
                      name: 'season',
                      message: 'Temporada?'
                    }]);

                  case 18:
                    _context3.t1 = _context3.sent;

                  case 19:
                    _ref4 = _context3.t1;
                    season = _ref4.season;

                    if (!argEpisode) {
                      _context3.next = 25;
                      break;
                    }

                    _context3.t2 = { episode: argEpisode };
                    _context3.next = 28;
                    break;

                  case 25:
                    _context3.next = 27;
                    return _inquirer2.default.prompt([{
                      type: 'input',
                      name: 'episode',
                      message: 'Episodio?'
                    }]);

                  case 27:
                    _context3.t2 = _context3.sent;

                  case 28:
                    _ref5 = _context3.t2;
                    episode = _ref5.episode;
                    _context3.next = 32;
                    return findSubtitlesForEpisode(TvShow, season, episode);

                  case 32:
                    subtitles = _context3.sent;
                    subtitlesToDownload = getSubs(subtitles);

                    _inquirer2.default.prompt([{
                      type: 'list',
                      name: 'subtitle',
                      message: 'Que subtitulo querés?',
                      choices: subtitlesToDownload.map(function (subtitle) {
                        return {
                          name: subtitle.version + ' - ' + subtitle.language,
                          value: subtitle
                        };
                      })
                    }]).then(function (_ref6) {
                      var subtitle = _ref6.subtitle;

                      try {
                        subtitle.download(showName + ' - ' + season + 'x' + episode + '.srt');
                      } catch (err) {
                        console.log(err);
                      }
                    });

                  case 35:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, undefined);
          })(), 't0', 5);

        case 5:
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t1 = _context4['catch'](3);

          console.log(_context4.t1);

        case 10:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined, [[3, 7]]);
}))();