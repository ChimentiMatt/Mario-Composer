const { AsyncRouter: Router } = require("express-async-router")
const jwt = require("jsonwebtoken")

const Song = require("../models/Song")

const handleValidationErrors = require("../helpers/handleValidatorErrors")
const jwtMiddlewere = require("../helpers/jwtMiddlewear")

const router = Router()


// Create
router.post("/", [jwtMiddlewere, handleValidationErrors ], async (req, res) => {

    const song = await Song.create(req.body.songName, req.user._id, req.body.noteArray, req.body.noteLength, req.body.instruments, req.body.notes)
    res.status(201).send(song)
})

// Retreive
router.get("/:songname", async (req, res) => {
    const song = await Song.findOne({ songName: req.params.songname });

    if(!song){
        res.sendStatus(404)
    } else{
        res.send(song);
    }
});

// List
router.get("/", [jwtMiddlewere], async (req, res) => {
    const song = await Song.find( { user: req.user._id }, 
    { user: true, createdAt: true, songName: true}, 
    { limit: 10, sort: "-createdAt"}).populate({ path: "user" })


    res.send(song)
})



// Delete
router.delete("/:songname", [jwtMiddlewere], async (req, res) => {
    const song = await Song.findOne({ songName: req.params.songname })

    if (song.user.toString() != req.user._id.toString()) return res.status(403).send({errors: ["Invalid Operation"]})

    song.delete()

    res.send(song)
})


module.exports = router