const {MongoClient, Db } = require('mongodb');  
const mongodb = null;

const url = 'mongodb://localhost:27017/api-filmes'

module.exports = class MongoDb {
    async connect(){
        try {
             const mongoClient = await MongoClient.connect(
                url,
                {   useNewUrlParser: true,
                    poolSize: 50,
                    wtimeout: 2500,
                    autoReconnect: true,
                    reconnectTries: Number.MAX_VALUE,
                    reconnectInterval: 2000
                 },
              )
             
              const Db = mongoClient.db('api-filmes')
      
              Db.on('error', (error) => {
                console.log(error);
              });
              return Db;

        } catch (error) {
            throw error
        }
    }

    static async getDb(){
        return mongodb == null ? await new MongoDb().connect() : mongodb;
    }
}