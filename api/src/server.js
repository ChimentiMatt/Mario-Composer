const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")


// Import Routes
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

// Initialize dotenv
const envPath = path.resolve(__dirname, "../../.env")
dotenv.config({
    path: envPath
});


// Initialize express app
const app = express()

// Middlewear
app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/song", songRoutes)

// Connect to Database
// const connectDatabaes = async (DB_NAME=process.env.DB_NAME) => {
//     const connection = await mongoose.connect(`mongodb://localhost/${DB_NAME}`)
//     if(process.env.ENV != "test"){
//         console.log(`😎 Connected to mongodb://localhost/${DB_NAME}`)
//     }
//     return connection
// }

// Connect to DB Production
const connectDatabaes = async () =>{  mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
    )
    .then(() => console.log("😎 MongoDB has been connected"))
    .catch((err) => console.log('ERROR-------------', err, '\n ----', process.env.MONGODB_CONNECTION_STRING));
}

const PORT = process.env.API_PORT || 500

// Start Server
const startServer = () => {
    app.listen(PORT , async () => {
        await connectDatabaes()
        if (process.env.ENV != "test"){
            console.log(`🚀 Server listening on http://localhost:${PORT}`)
        }
    })
}


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.ATLAS_USER}:<${process.env.ATLAS_PASS}>@cluster0.efsf4uu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


module.exports = {
    app,
    connectDatabaes,
    startServer
}