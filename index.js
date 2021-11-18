const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const { ObjectID } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.llkrc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  const serviceCollection = client.db("TravelMania").collection("Services");

  try {
    await client.connect();

    // add Service
    app.post("/addService", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
    });

    // Get All Service

    app.get("/allServices", async (req, res) => {
      const result = await serviceCollection.find({}).toArray();
      res.send(result);
    });

    //get single
    app.get(`/singleProduct/:id`, async (req, res) => {
      const result = await serviceCollection
        .find({ _id: ObjectID(req.params.id) })
        .toArray();
      console.log(result);
      res.send(result[0]);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello  portal!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
