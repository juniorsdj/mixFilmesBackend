const express = require('express')
const bodyParser = require('body-parser')
const MongoDb = require('./config/database')
const FilmesDAO = require('./DAO/filmesDAO')

const port = 3001

const app = express()

const configureApp = async () => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    require('./controller/filmesController')(app)
    const db = await MongoDb.getDb()
    await FilmesDAO.injectDB(db)

    return app
}


configureApp().then((app) => {
    app.listen(port, () => {
        console.log('backend is running ', port)
    })
})
