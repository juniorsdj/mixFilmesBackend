const express = require('express')
const router = express.Router()
const ServiceTMDB = require('./../services/ServicesAPI')
const filmesDAO = require('./../DAO/filmesDAO')

router.get('/lancamentos', async (req, resp) => {
    try {
        const lancamentos = await ServiceTMDB.getLancamentos()
        return resp.send(lancamentos)
    } catch (err) {
        console.log(err)
    }
})

router.get('/populares', async (req, resp) => {
    try {

        const filmesPopularesInDb = await filmesDAO.getPopulares()
        let filmesPopulares = filmesPopularesInDb
        if (!filmesPopularesInDb.length) {
            const filmesPopularesService = await ServiceTMDB.getFilmesPopulares()
            filmesPopulares = filmesPopularesService
            filmesDAO.insertPopulares(filmesPopularesService)
        }

        return resp.send(filmesPopulares)
    } catch (err) {
        console.log(err)
    }
})
router.get('/atores', async (req, resp) => {
    try {
        const atores = await ServiceTMDB.getAtoresPopulares()
        return resp.send(atores)
    } catch (err) {
        console.log(err)
    }
})


router.get('/procurar-filme', async (req, resp) => {
    try {
        const {
            query,
            page
        } = req.query

        const filmeBuscadoDb = await filmesDAO.getFilmeByQuery(query, page)
        if(filmeBuscadoDb){
           return  resp.send(filmeBuscadoDb.result)
        }
        const resultService = await ServiceTMDB.procurarFilmeByName(query, page)
        filmesDAO.insertFilmeByQuery(query, page, resultService)
        return resp.send(resultService)
    } catch (err) {
        console.log(err)
    }
})
router.get('/:movieId', async (req, resp) => {
    try {
        const {
            movieId
        } = req.params;


        const filmeDetails = await filmesDAO.getDetails(movieId)
        let filmeReturn = filmeDetails
        if (!filmeDetails) {
            const detalhesFilmeResponse = await ServiceTMDB.getDetalhesFilmes(movieId)
            filmeReturn = detalhesFilmeResponse
            filmesDAO.insertDetails(detalhesFilmeResponse)
        }

        return resp.send(filmeReturn)


        const filme = await ServiceTMDB.getDetalhesFilmes(movieId)

        return resp.send(filme)
    } catch (err) {
        console.log(err)
    }
})


module.exports = app => app.use('/filmes', router)