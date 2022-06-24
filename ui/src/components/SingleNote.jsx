import { useState, useGlobal } from 'reactn'

const Note = ({  notes, note, index, column, arraysLists, instrumentLists } ) => {
  const [currentInstrument, setCurrentInstrument ] = useGlobal("currentInstrument")
  const [refresh, setRefresh ] = useState('')
  const [erasing, setErasing] = useGlobal('erasing')
  const [sharpToggle, setSharpToggle] = useGlobal("sharpToggle")

  let currentNote = ''

  const hearNote = () => {
    identifySharp()
    if (erasing) new Audio(`./sounds/eraser/eraser.mp3`).play()
    else new Audio(`./sounds/${currentInstrument}/${currentNote}${currentInstrument}.mp3`).play()
    new Audio(`./sounds/${currentInstrument}/${currentNote}${currentInstrument}.mp3`).play()

    addNoteToArray()
    changeNoteImage()
    setRefresh("turtles travel through time ")
  }

  const changeNoteImage = () => {
    notes[index].img = `./images/${currentInstrument}.gif`
    if (erasing) setRefresh('asfjklasdfj')
    setRefresh("refresh")

    forceStateRerender()
  }

  const forceStateRerender = () => {
    let stateTrick = currentInstrument
    setCurrentInstrument('fake')
    setCurrentInstrument(stateTrick)
  }

  const identifySharp = () => {
    currentNote = note.name

    if (sharpToggle){
      if (['C','D', 'F', 'G', 'A', 'CHigh'].includes(note.name)){
        currentNote += "Sharp"
      }
      else{
        currentNote = note.name
      }
    }
  }

  
  const addNoteToArray = () => {
    identifySharp()

    //stops stacking notes on each other
    if (note.img === './images/note.gif'){

      if (arraysLists[6][column] !== null) {
        arraysLists[7][column] = currentNote
        instrumentLists[7][column] = currentInstrument
      }
      else if (arraysLists[5][column] !== null) {
        arraysLists[6][column] = currentNote
        instrumentLists[6][column] = currentInstrument
      }
      else if (arraysLists[4][column] !== null) {
        arraysLists[5][column] = currentNote
        instrumentLists[5][column] = currentInstrument
      }
      else if (arraysLists[3][column] !== null) {
        arraysLists[4][column] = currentNote
        instrumentLists[4][column] = currentInstrument
      }
      else if (arraysLists[2][column] !== null) {
        arraysLists[3][column] = currentNote
        instrumentLists[3][column] = currentInstrument
      }
      else if (arraysLists[1][column] !== null) {
        arraysLists[2][column] = currentNote
        instrumentLists[2][column] = currentInstrument
      }
      else if (arraysLists[0][column] !== null) {
        note.instrument = currentInstrument
        arraysLists[1][column] = currentNote
        instrumentLists[1][column] = currentInstrument
      }
      else {
          note.instrument = currentInstrument
          arraysLists[0][column] = currentNote
          instrumentLists[0][column] = note.instrument
        }
    }
    else{
      if (erasing){
      
        arraysLists[0][column] = null
        arraysLists[1][column] = null
        arraysLists[2][column] = null
        arraysLists[3][column] = null
        arraysLists[4][column] = null
        arraysLists[5][column] = null
        arraysLists[6][column] = null
        arraysLists[7][column] = null

        let adjust = column * 8
        notes[adjust].img = `./images/note.gif`
        notes[(adjust + 1) ].img = `./images/note.gif`
        notes[(adjust + 2) ].img = `./images/note.gif`
        notes[(adjust + 3) ].img = `./images/note.gif`
        notes[(adjust + 4) ].img = `./images/note.gif`
        notes[(adjust + 5) ].img = `./images/note.gif`
        notes[(adjust + 6) ].img = `./images/note.gif`
        notes[(adjust + 7) ].img = `./images/note.gif`
      
        }

      }
    changeNoteImage()
    currentNote = ""
  }
  
  return (
    <>  
        <img id={`note${index}`} className={`note h-[1.5rem] md:h-[3.2rem] column${column} ${note.name}`} src={note.img}  onClick={() => hearNote()}/>  
    </>
  )
}

export default Note