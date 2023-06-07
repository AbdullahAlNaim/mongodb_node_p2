const { MongoClient, ObjectId } = require('mongodb');
//import { key } from "./mongokey.js";
const key = require('./mongokey')

const uri = key['key']['key'];

//this function is to just view all databases in mongodb
async function listing(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

//function to insert one new document
async function creating(client, newListing) {
    const result = await client.db("myexercises").collection("exercises").insertOne(newListing);

    if (result) {
        console.log(`New listing created with the following id: ${result.insertedId}`);
    } else {
        console.log("Unable to create new document");
    }

}

//function to find a document
async function finding(client, found) {
    //projections: { _id: 1, exercise_name: 1 } })
    const result = await client.db("myexercises").collection("exercises").findOne(found)
    if (result) {
        console.log(`Found a listing in the collection with the name: ${found}`);
        console.log(result);
    } else {
        console.log(`No listing was found with the name: ${found}`)
    }
}

async function redoing(client, nameUsing, updateThis) {
    const result = await client.db("myexercises").collection("exercises").updateOne({ _id: nameUsing }, { $set: { weight: updateThis } });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`)
    console.log(`${result.modifiedCount} document(s) was/were updated.`)
    console.log(result)
}

const newing = {
    name: "The Castle",
    summary: "The Hogwarts castle",
    bedrooms: 1000,
    bathrooms: 500
}

const exers = {
    date: new Date(),
    exercise_name: "benchpress",
    weight: 155,
    reps: 8,
}

const foodLog = {
    date: new Date(),
    food_ingred: "protein shake",
    calories: 250,
    protein: 50,
}


//where the magic happens
async function main() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        //6478d18e7db66a667bbd48a6
        //await listing(client);
        //await creating(client, exers);
        await finding(client, { _id: new ObjectId('6478d2c4624a252190389880') });
        //await redoing(client, '6478d18e7db66a667bbd48a6', 155);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


