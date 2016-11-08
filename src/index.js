import {
  getEpisodeUrl,
  getTvShows,
  getSubs,
  getSubtitlesFromUrl,
  findTvShowByName,
  findSubtitlesForEpisode
} from './util'
import inquirer from 'inquirer'

(async () => {
  const argShowName = process.argv[2]
  const argSeason = process.argv[3]
  const argEpisode = process.argv[4]

  try {
    let { showName } = argShowName ? {showName: argShowName} : await inquirer.prompt([{
      type: 'input',
      name: 'showName',
      message: 'Que serie?',
    }])
    const TvShow = await findTvShowByName(showName)
    const { season } = argSeason ? { season: argSeason } : await inquirer.prompt([{
      type: 'input',
      name: 'season',
      message: 'Temporada?',
    }])
    const { episode } = argEpisode ? { episode: argEpisode } : await inquirer.prompt([{
      type: 'input',
      name: 'episode',
      message: 'Episodio?',
    }])
    const subtitles = await findSubtitlesForEpisode(TvShow, season, episode)
    console.log(JSON.stringify(subtitles, null, 5));
    const subtitlesToDownload = getSubs(subtitles)
    console.log(JSON.stringify(subtitlesToDownload, null, 5));
    inquirer.prompt([{
      type: 'list',
      name: 'subtitle',
      message: 'Que subtitulo querés?',
      choices: subtitlesToDownload.map(
        subtitle => ({
          name: `${subtitle.version} - ${subtitle.language}`,
          value: subtitle
        })
      )
    }]).then(({subtitle}) => {
      try {
        subtitle.download(`${showName} - ${season}x${episode}.srt`)
      }
      catch (err) {
        console.log(err)
      }
    })
  }
  catch (err) {
    console.log(err);
  }
})()
