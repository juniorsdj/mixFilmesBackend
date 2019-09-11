
let connectionFilme

class filmesDAO {
    static async injectDB(conn) {
        if (connectionFilme) {
            return
        }
        try {
            connectionFilme = conn
            this.lancamentos = await connectionFilme.collection("lancamentos")
            this.atores = await connectionFilme.collection("atores")
            this.filmes = await connectionFilme.collection("filmes")
            this.populares = await connectionFilme.collection("populares")
            this.query = await connectionFilme.collection("query")
        } catch (e) {
            console.log(e)
        }
    }

    static async getPopulares() {
        try {
            return await this.populares.find().toArray()
        } catch (err) {
            console.log(err)
        }
    }
    static async insertPopulares(filmes) {
        try {
            return await this.populares.insert(filmes)
        } catch (err) {
            console.log(err)
        }
    }
    static async getDetails(movieId) {
        try {
            return await this.filmes.find(movieId
            ).toArray()
        } catch (err) {
            console.log(err)
        }
    }
    static async insertDetails(filmeDetail) {
        try {
            return await this.filmes.insert(filmeDetail)
        } catch (err) {
            console.log(err)
        }
    }
    static async getFilmeByQuery(query, page) {
        try {
            return await this.query.find(query, page
            ).toArray()
        } catch (err) {
            console.log(err)
        }
    }
    static async insertFilmeByQuery(query, page, result) {
        try {
            return await this.query.insert({query, page, result})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = filmesDAO