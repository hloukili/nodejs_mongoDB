// Test de connexion à une base de donnée MongoDb avec NodeJS.

const MongoClient = require("mongodb").MongoClient;
const MongoObjectID = require("mongodb").ObjectID;

//Déclaration des tables.

const DB_NAME = 'Cinema';
const DB_MOVIES = 'movies';

MongoClient.connect('mongodb://localhost/', {
    useNewUrlParser: true
}, function (error, client) {
    if (error) return funcCallback(error);
    console.log("Connected to MongoDb");

    //Connexion a la base de donnée
    let db = client.db(DB_NAME);

    /**Insertion d'une nouvelle entrée dans la collection (table)**/

    db.collection(DB_MOVIES).insertOne({
        title: 'The Sixth Sense',
        date: 2000,
        actors: ["Bruce Willis", "Haley Joel Osment", "Toni Collette"]
    }, function (error, results) {

        if (error) throw error;
        console.log("Le document est bien inséré");
    });


    /**Récupération de toutes les entrées de la collection **/

    db.collection(DB_MOVIES).find().toArray(function (error, results) {
        if (error) throw error;
        console.log(results);

        results.forEach(function (element, index) {
            console.log('ID : ' + element._id.toString() + "\n" +
                'Title : ' + element.title + "\n" +
                'date : ' + element.date + "\n" +
                'actors : ' + element.actors
            );
        });
    });
});
