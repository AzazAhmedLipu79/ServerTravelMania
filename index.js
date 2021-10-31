const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://admin:909LL989R@cluster0.bqzbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hola Amigo");
});

async function run() {
  try {
    await client.connect();

    const database = client.db("TravelMania");
    const servicesCollection = database.collection("Services");

    //Get Data from Api
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    //   Post Data of Service via  Post Api
    app.post("/services", async (req, res) => {
      const service = req.body;
      console.log(service);
      const result = await servicesCollection.insertOne(service);

      console.log(result);
      res.json(result);
    });

    // Add Service :")
  } finally {
    //  await close
  }
}

app.listen(port, () => {
  console.log(`Now Running Server on `, port);
});
