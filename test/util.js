import expect from 'expect'
import Subtitle from '../src/Subtitle'
import { getSubs } from '../src/util'

describe('getSubs', () => {
  it('returns an array of Subtitles', () => {
    const input = {
      data: [
        {
          title: 'Versión DIMENSION, 0.00 megabytes Nueva traducción',
          comment: 'Comentario: De addic7ed. Sin acotaciones.',
          languages: [{
            language: 'Español (España)',
            status: 'Completado',
            downloadLink: '/updated/5/33549/0',
          }],
        },
      ],
      showInfo: {
        TvShow: {
          name: 'The Big Bang Theory',
          link: 'http://www.tusubtitulo.com/show/26',
        },
        season: '10',
        episode: '3',
      },
    }

    const expected = [
      new Subtitle({
        language: input.data[0].languages[0].language,
        version: input.data[0].title,
        comment: input.data[0].comment,
        status: input.data[0].languages[0].status,
        downloadLink: input.data[0].languages[0].downloadLink,
        showInfo: input.showInfo,
      }),
    ]

    expect(getSubs(input)).toEqual(expected)
  })
})
