const axios = require('axios')
const helpers = require('./../helpers/fnUtils')
const API_URL = "https://api.themoviedb.org/3"

const api_key  = "ba19a79e0aa6722b483fcf104b8e8b10"
const language= "pt-BR"

class TmdbService {

    static async getLancamentos() {
        try {
            let request = await axios.get(`${API_URL}/movie/now_playing?${helpers.stringifyQueryString({ api_key, language  })}`)

            return request.data
        } catch (err) {
            console.log(err)
        }
    }
    static async getFilmesPopulares() {
        try {
            let request = await axios.get(`${API_URL}/movie/popular?${helpers.stringifyQueryString({ api_key, language  })}`)

            return request.data
        } catch (err) {
            console.log(err)
        }
    }
    static async getAtoresPopulares() {
        try {
            let request = await axios.get(`${API_URL}/person/popular?${helpers.stringifyQueryString({ api_key, language  })}`)

            return request.data
        } catch (err) {
            console.log(err)
        }
    }
    static async getDetalhesFilmes(movieId) {
        try {
            let request = await axios.get(`${API_URL}/movie/${movieId}?${helpers.stringifyQueryString({ api_key, language  })}`)

            return request.data
        } catch (err) {
            console.log(err)
        }
    }
    static async procurarFilmeByName(query, page) {
        try {
            let request = await axios.get(`${API_URL}/search/movie/?${helpers.stringifyQueryString({ query, page, api_key, language  })}`)

            return request.data
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = TmdbService
