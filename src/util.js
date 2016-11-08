import slug from 'slug'
import path from 'path'
import fs from 'mz/fs'
import fuzzy from 'fuzzy'
import Subtitle from './Subtitle'

const x = require('x-ray')({
  filters: {
    clean: (value) => typeof value === 'string' ? value.replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'').trim() : value
  }
})
const cacheFile = path.resolve(`${__dirname}/cache.json`)

export const getEpisodeUrl = (TvShow, season, episode) => {
  const tvShowId = TvShow.link.split('/').pop()
  return `http://www.tusubtitulo.com/serie/${slug(TvShow.name)}/${season}/${episode}/${tvShowId}/`
}

export const getTvShows = async () => {
  if(!await fs.exists(cacheFile)) {
    await saveTvShows()
  }
  return JSON.parse(await fs.readFile(cacheFile, 'utf8'))
}

const saveTvShows = () => {
  return new Promise((resolve, reject) => {
    const stream = x('http://www.tusubtitulo.com/series.php', 'td.line0', [{
        name: 'a@html',
        link: 'a@href',
      }]).stream()
    stream.on('end', () => resolve())
    stream.pipe(fs.createWriteStream(cacheFile))
  })
}

export const getSubs = (subtitles) => {
  return subtitles.data.reduce((output, subtitle) => {
    return subtitle.languages.map(language => new Subtitle({
      language: language.language,
      version: subtitle.title,
      comment: subtitle.comment,
      status: language.status,
      downloadLink: language.downloadLink,
      showInfo: subtitles.showInfo
    }))
  }, []).filter(s => !!s.downloadLink)
}

export const getSubtitlesFromUrl = (url, showInfo) => {
  return new Promise((resolve, reject) => {
    x(url, '#content .ssdiv', [{
      title: '.title-sub | clean',
      comment: 'span.comentario | clean',
      languages: x('.sslist', [{
        language: '.li-idioma | clean',
        status: '.li-estado | clean',
        downloadLink: '.download a:nth-child(2)@href'
      }])
    }])((err, subtitles) => {
      if (err) reject(err)
      else resolve({data: subtitles.filter( s => s.languages.length), showInfo})
    })
  })
}

export const findTvShowByName = async (name) => {
  try {
    const tvShows = await getTvShows()
    const result = fuzzy.filter(name, tvShows.map(s => s.name))
    console.log(tvShows.find(s => s.name === result[0].string));
    return result.length
      ? tvShows.find(s => s.name === result[0].string)
      : 'no encontre el show'
  }
  catch (err) {
    console.log(err)
  }
}

export const findSubtitlesForEpisode = (TvShow, season, episode) => {
  const url = getEpisodeUrl(TvShow, season, episode)
  return getSubtitlesFromUrl(url, { TvShow, season, episode })
}
