import { useState, useGlobal, useRef } from 'reactn'
import React, { useEffect } from 'react'
import gsap from 'gsap'

import Navbar from "./components/Navbar";
import SaveAndLoad from './components/SaveAndLoad';
import MusicMakerContainer from "./components/MusicMakerContainer";
import NoteLength from './components/NoteLength';

function App() {
  const numberOfColumns = 400
  const [notes, setNotes ] = useState([])  
  const [noteLength, setNoteLength] = useState([])

  const [newSong, setNewSong] = useGlobal("newSong")
  const [copyArraysLists, setCopyArraysLists] = useGlobal("copyArraysLists")
  const [copyNoteLength, setCopyNoteLength] = useGlobal("copyNoteLength")
  const [copyInstrumentLists, setCopyInstrumentLists] = useGlobal("copyInstrumentLists")
  
  let notesArray = []
  let instrument = 'piano'
  let keepGoing = true
  let time = 100
  let nonStateNewsong = false
  
  const tempoBtn = useRef('')
  
  // shows state bug with setAnimationFrame
  // const [dummyState, setDummyState] = useState("test")

  useEffect(() => { 
    setNullInArrays()
  })

  
  useEffect(() => {

    let counter = 0
    setNewSong(false)

    tempoBtn.current.disabled = true
    for (let i=1; i < numberOfColumns +1; i++) {

      // setNotes(notes => [...notes, ...notesArray])
      counter += 1
      if (counter === 9) counter = 1

      let note = 'C'
      if (counter === 1) note = 'CHigh'
      else if (counter === 2) note ='B'
      else if (counter === 3) note ='A'
      else if (counter === 4) note ='G'
      else if (counter === 5) note ='F'
      else if (counter === 6) note ='E'
      else if (counter === 7) note ='D'
      else if (counter === 8) note ='C'
      
      let newNote = {
        name: note,
        img: './images/note.gif',
        instrument: 'piano'
      }
      notesArray.push(newNote)
      setNotes(notesArray)

      let newNoteLength = {
        length: 1000,
        name: './images/fourthNote.gif'
      }
      if (counter % 8 === 0) noteLength.push(newNoteLength)

    }
    setCopyArraysLists(arraysLists)
    setCopyNoteLength(noteLength)
    setCopyInstrumentLists(instrument)
  }, [])


  let playList0 = []
  let playList1 = []
  let playList2 = []
  let playList3 = []
  let playList4 = []
  let playList5 = []
  let playList6 = []
  let playList7 = []
  let soundTypeList0 = []
  let soundTypeList1 = []
  let soundTypeList2 = []
  let soundTypeList3 = []   
  let soundTypeList4 = []   
  let soundTypeList5 = []   
  let soundTypeList6 = []   
  let soundTypeList7 = []  

  let arraysLists =[
    playList0, playList1, playList2, playList3, playList4, playList5, playList6, playList7
  ]

  let instrumentLists = [
    soundTypeList0, soundTypeList1, soundTypeList2, soundTypeList3, soundTypeList4, soundTypeList5, soundTypeList6, soundTypeList7
  ]

  // make starting arrays with null values
  const setNullInArrays = () => {
    for (let i=0; i<numberOfColumns; i++){
      playList0.push(null)
      playList1.push(null)
      playList2.push(null)
      playList3.push(null)
      playList4.push(null)
      playList5.push(null)
      playList6.push(null)
      playList7.push(null)
    }
  }

  let loopCounter = 0

  const updateNoteDuration = (loopCounter) => {

      // get the note length from object and adjust to tempo
      if (copyNoteLength[loopCounter].name === './images/fourthNote.gif') {
        return 60000 / time 
      }
      else if (copyNoteLength[loopCounter].name === './images/eighthNote.gif') {
        return 30000 / time 
      }
      else if (copyNoteLength[loopCounter].name === './images/sixteenthNote.gif') {
        return 15000 / time 
      }
      else if (copyNoteLength[loopCounter].name === './images/halfNote.gif') {
        return 120000 / time
      }
  }

  const playHandler = () => {
    if (!playInProgress){
      //Fixes audio delay in Safari 
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();

      document.getElementById('playMarker').src = './images/running.gif'
      nonStateNewsong = newSong
      keepGoing = true
      playInProgress = true

      // handles loading in a song
      if (nonStateNewsong === true){
        nonStateNewsong = false
        // setNewSong(false)
        arraysLists = copyArraysLists
        instrumentLists = copyInstrumentLists

        playList0 = arraysLists[0]
        playList1 = arraysLists[1]
        playList2 = arraysLists[2]
        playList3 = arraysLists[3]
        playList4 = arraysLists[4]
        playList5 = arraysLists[5]
        playList6 = arraysLists[6]
        playList7 = arraysLists[7]  
      }

      playSong()
    }
  }

  const stopHander = () => {
    document.getElementById('playMarker').src = './images/standing.gif'
    keepGoing = false;
    playInProgress = false
    loopCounter = 0
  }

  

  // State causes problem with this funciton. Due to the callback of this function on itself, 
  // state would que with its original values, thus there are varaibles that are non state versions
  const playSong = () => {

    // NEXT LINE: is used to show how state breaks the function. Comment it in and the app will be full of bugs such as the stop button no longer working
    // setDummyState('change')

    if(keepGoing) {
      scrollToTarget(loopCounter)

      if (playList0[loopCounter] === null){}
      else {
        var note0 = new Audio(`./sounds/${instrumentLists[0][loopCounter]}/${playList0[loopCounter]}${instrumentLists[0][loopCounter]}.mp3`)
        note0.play()

        // due to browsers only allowing a max amount of MediaPlayers, function frees up the amount  https://stackoverflow.com/questions/68480528/blocked-attempt-to-create-a-webmediaplayer-as-there-are-too-many-webmediaplayers
        note0.onended = function(){
          this.remove();
        }
        // Animates the column to jump up and down as the notes play
        gsap.to(`.column${loopCounter}`, {y: "-1rem", ease: "none", duration: .1})
        gsap.to(`.column${loopCounter}`, {y: "-0rem", ease: "none", delay:.1, duration: .1})
      }

      if (playList1[loopCounter] === null){}
      else {
        var note1 = new Audio(`./sounds/${instrumentLists[1][loopCounter]}/${playList1[loopCounter]}${instrumentLists[1][loopCounter]}.mp3`)
        note1.play()
        note1.onended = function(){
          this.remove();
        }
      }

      if (playList2[loopCounter] === null){}
      else {
        var note2 = new Audio(`./sounds/${instrumentLists[2][loopCounter]}/${playList2[loopCounter]}${instrumentLists[2][loopCounter]}.mp3`)
        note2.play()
        note2.onended = function(){
          this.remove();
        }
      }
      if (playList3[loopCounter] === null){}
      else {
        var note3 = new Audio(`./sounds/${instrumentLists[3][loopCounter]}/${playList3[loopCounter]}${instrumentLists[3][loopCounter]}.mp3`)
        note3.play()
        note3.onended = function(){
          this.remove();
        }
      }

      if (playList4[loopCounter] === null){}
      else {
        var note4 =new Audio(`./sounds/${instrumentLists[4][loopCounter]}/${playList4[loopCounter]}${instrumentLists[4][loopCounter]}.mp3`)
        note4.play()
        note4.onended = function(){
          this.remove();
        }
      }

      if (playList5[loopCounter] === null){}
      else {
        var note5 = new Audio(`./sounds/${instrumentLists[5][loopCounter]}/${playList5[loopCounter]}${instrumentLists[5][loopCounter]}.mp3`)
        note5.play()
        note5.onended = function(){
          this.remove();
        }
      }

      if (playList6[loopCounter] === null){}
      else {
        var note6 = new Audio(`./sounds/${instrumentLists[6][loopCounter]}/${playList6[loopCounter]}${instrumentLists[6][loopCounter]}.mp3`)
        note6.play()
        note6.onended = function(){
          this.remove();
        }
      }

      if (playList7[loopCounter] === null){}
      else {
        var note7 = new Audio(`./sounds/${instrumentLists[7][loopCounter]}/${playList7[loopCounter]}${instrumentLists[7][loopCounter]}.mp3`)
        note7.play()
        note7.onended = function(){
          this.remove();
        }
      }
      
      loopCounter += 1
    }
    else{
      loopCounter = 0
    }
    if (keepGoing){
      // Function Calls itself to repeat playlist
      setTimeout(playSong, updateNoteDuration(loopCounter -1));
    }
  }

  let noteSection = document.getElementById('noteSection')

  let distance = -71
  let playInProgress = false

  let BaseDistance = 71

  const scrollToTarget = (loopCounter) => {

    // These three conditional statements handle if the app is running in mobile. The math has to be adjusted 
    if (loopCounter == 0 && window.screen.width < 768){
      distance = -44
      BaseDistance = 44
    }

    if (window.screen.width < 768){
      distance += 44
    }
    else  {
      distance += 71
    }

    playInProgress = true
    let startTime = null;
    let requestId;
    
    const loop = function (currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        // Elapsed time in miliseconds
        let time = currentTime - startTime;

        let percent = Math.min(time / updateNoteDuration(loopCounter));

        // noteSection.scrollTo(startPos + diff * percent, 0);
        noteSection.scrollTo(distance + BaseDistance * percent, 0);

        if (time < updateNoteDuration(loopCounter) && playInProgress === true) {
            // Continue moving
            requestId = window.requestAnimationFrame(loop);
        } 
        else if (!playInProgress)  {
            window.cancelAnimationFrame(requestId);
            noteSection.scrollTo(0, 0)
            distance = - BaseDistance
        }
    };
    requestId = window.requestAnimationFrame(loop);
  }

  const changeTempo = (e) =>
  {
    let value = document.getElementById('tempoRange').value
    time = value
    animateToast('Tempo changed to: ' + time)
  }

  const animateToast = (string, top=false) => {
    if (top){
      document.getElementById("toastTextTop").innerHTML = string
      gsap.to('#toastTextTop', {y: '2rem', visibility: 'visible', opacity: 1, duration: 1})
      gsap.to('#toastTextTop', {delay: 2, y: '0', opacity: 0, duration: 1})
    }
    else{
      document.getElementById("toastText").innerHTML = string
      gsap.to('#toastText', {y: '-2rem', visibility: 'visible', opacity: 1, duration: 1})
      gsap.to('#toastText', {delay: 2, y: '0', opacity: 0, duration: 1})
    }
  }

  const enableBtn = () => {
    tempoBtn.current.disabled = false
  }

  const logIt = () => {
    // console.log("copy",copyNoteLength)
    // console.log("original", noteLength)
    // console.log(copyNoteLength)
    // console.log(copyInstrumentLists)
  }

  const postLoadUpdateOriginals = () => {
    // alert('did it reach')
    // arraysLists = copyArraysLists
    // setNoteLength(copyNoteLength)
    // instrumentLists = copyInstrumentLists
  }
  
    return (
      <>
      <h1 id='wrongRatioMessage' className='absolute top-[40%] text-center w-screen text-[3rem] hidden'>
      <img className='ml-[45%]' src={'./images/running.gif'} />Mario Music was designed for full screen or mobile. Please full screen your browser
        
      </h1>
      <div className="App rotate-[90deg] mt-[5rem] md:mt-[0rem] md:rotate-[0deg] ">
        <div className='flex md:block'>

          <Navbar animateToast={animateToast}/>
          <div className='flex md:justify-center '>
            <SaveAndLoad notes={notes} setNotes={setNotes} arraysLists={arraysLists} instrumentLists={instrumentLists} noteLength={noteLength} setCopyArraysLists={setCopyArraysLists}  setCopyInstrumentLists={setCopyInstrumentLists} animateToast={animateToast} postLoadUpdateOriginals={postLoadUpdateOriginals}/>
          </div>
        </div>
        {notes && <MusicMakerContainer  notes={notes} arraysLists={arraysLists} instrumentLists={instrumentLists} playSong={playSong} noteLength={noteLength} time={time} copyNoteLength={copyNoteLength} /> }
          
        <div className='w-full flex md:mt-2 md:justify-center '>
          <div className='w-5/6 flex justify-between '>
            <div className='flex md:block '>
              <h1 className='pl-4 pr-2  md:text-2xl'>Tempo</h1>
                <input className="md:h-[2.5rem] w-[5rem] md:w-[10rem] text-center bg-white border-l-2 border-t-2 border-b-2 border-black rounded-l-lg" id="tempoRange" 
                  placeholder='100' onChange={enableBtn}/>
                <button className="md:h-[2.5rem] pl-1 pr-2 rounded-r-lg  bg-green-600 border-2 border-black" 
                  ref={tempoBtn} onClick={changeTempo}>
                    SUBMIT
                  </button>
            </div>



            <div className='flex'>
              <button className="ml-2 md:text-5xl pl-[.5rem] pr-[.5rem] md:p-2 md:h-[5rem] text-center bg-green-600 border-2 md:border-4 border-black rounded-lg" 
                onClick={()=> playHandler()}>PLAY</button>  
              <button className="ml-2 md:text-5xl pl-[.5rem] pr-[.5rem] md:p-2 md:h-[5rem] align-center text-white text-center bg-red-600 border-2 md:border-4 border-black rounded-lg" 
                onClick={stopHander}>STOP</button> 
            </div>
          </div>
        </div>
        {/* <div onClick={logIt}> HIIIIIIIIIIIIIIIIIIIIIIIIIIII</div> */}
        <div id="toastTop" className="flex">
          <p id="toastTextTop"></p>
        </div>
        <div id="toast" className="flex">
          <p id="toastText"> 100</p>
        </div>
      </div>
      </>
    );
}

export default App;


