const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { Schema } = mongoose
const { ObjectID } = Schema.Types

const songFields = Schema({
    songName: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectID,
        required: true,
        ref: "User"
    },
    noteArray: {
        type: Array,
        required: true
    },
    noteLength: {
        type: Array,
        required: true
    },
    instruments: {
        type: Array,
        required: true
    },
    notes: { 
        type: Array,
        required: true
    }
})

// Notes needs to be renamed its an array of the following objects:  
// {name: 'CHigh', img: './images/note.gif', instrument: 'piano'}


songFields.statics.create = async function (songName, userId, noteArray, noteLength, instruments, notes) {
    const song = new this()
    song.songName = songName 
    song.user = userId
    song.noteArray = noteArray
    song.noteLength = noteLength
    song.instruments = instruments
    song.notes = notes

    await song.save()
    return song
}


const Song = mongoose.model("Song", songFields)
module.exports = Song