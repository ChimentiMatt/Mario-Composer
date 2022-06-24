import { useState, useGlobal } from 'reactn'

const NoteLength = ({item, column, noteLength}) => {
    const [currentInstrument, setCurrentInstrument ] = useGlobal("currentInstrument")
    const [counter, setCounter] = useState(0)
    const [noteImg, setNoteImg] = useState('./images/fourthNote.gif')
    
    let halfNoteTempo =  120000 
    let quarterNoteTempo = 60000 
    let eighthNoteTempo = 30000 
    let sixteenthNoteTempo = 15000 

    let time = 100

    const changeNoteLength = () => {
        // update the time based off the input, if it's still the placeholder set time to 100
        if (document.getElementById('tempoRange').placeholder === '100'){
            time = 100
        }
        else{
            time = document.getElementById('tempoRange').value
        }

        if (counter === 0){
            noteLength[column].length = eighthNoteTempo / time
            item.name = './images/eighthNote.gif'
            setCounter(counter +1)
            setNoteImg('./images/eighthNote.gif')
        }
        else if (counter === 1){
            noteLength[column].length = sixteenthNoteTempo / time
            item.name = './images/sixteenthNote.gif'
            setCounter( counter +1)
            setNoteImg('./images/sixteenthNote.gif')
        }
        else if (counter === 2){
            noteLength[column].length = halfNoteTempo / time
            item.name = './images/halfNote.gif'
            setCounter(counter +1)
            setNoteImg('./images/halfNote.gif')
        }
        else if (counter === 3){
   
            noteLength[column].length = quarterNoteTempo / time
            item.name = './images/fourthNote.gif'
            setCounter(0)
            setNoteImg('./images/fourthNote.gif')
        }
        forceStateRerender()
    }

    const forceStateRerender = () => {
        let stateTrick = currentInstrument
        setCurrentInstrument('fake')
        setCurrentInstrument(stateTrick)
      }

    return (
        <img  className={`column${column} h-[.5rem] mt-[.5rem] ml-[1.616rem] md:mt-[.1rem] md:h-[1rem] md:ml-[2.423rem]  `} src={item.name} onClick={() => changeNoteLength()}  />
    )
    
}


export default NoteLength