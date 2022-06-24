import { useGlobal, useEffect, useState } from 'reactn'
import axios from "axios"

const SongList = ({notes, setNotes, arraysLists, noteLength, instrumentLists, setCopyArraysLists, setCopyInstrumentLists, animateToast, postLoadUpdateOriginals }) => {
    const [token, setToken] = useGlobal("token")
    const [newSong, setNewSong] = useGlobal("newSong")
    const [logginLoad, setLogginLoad] = useGlobal("logginLoad")
    const [songList, setsongList ] = useGlobal("songList")
    
    const [copyNoteLength, setCopyNoteLength] = useGlobal("copyNoteLength")
    const [copyArraysLists] = useGlobal("copyArraysLists")
    const [copyInstrumentLists] = useGlobal("copyInstrumentLists")

    const [previouslyLoaded, setPrevouslyLoaded] = useState(false)

    useEffect(() => {
      if (token){
        getSongs()
      }
    }, [logginLoad])


      const getSongs = async () =>{
        const res = await axios.get("http://localhost:1337/song/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setsongList(res.data)
      }
    

    let nonStateName = ''

    const saveSong = async () => {

        nonStateName = document.getElementById('songNameForm').value
        
        if (previouslyLoaded){
          arraysLists =copyArraysLists
          noteLength= copyNoteLength
          instrumentLists= copyInstrumentLists
          console.log(copyArraysLists)
          console.log(copyNoteLength)
          console.log(copyInstrumentLists)
        }

        try{
          await axios.post("http://localhost:1337/song/", {
            songName: nonStateName,
            // user: "629845e4c1fe79a6d09a4117",
            noteArray: arraysLists,
            noteLength: noteLength,
            instruments: instrumentLists,
            notes: notes,
          },
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
        }
        catch (err){
          let param = 'Could not save song '
          animateToast(param)
          return "Invalid song info"
        }
        getSongs()
        let param = 'Saved Song: ' + nonStateName
        animateToast(param)
          
      }

      const loadSong = (currentSong) => {
        setPrevouslyLoaded(true)
        setNewSong(true)
        document.getElementById('tempoRange').value = '100'
        try{
            axios.get(`http://localhost:1337/song/${currentSong}/`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            })
            .then(res => {
                setCopyArraysLists(res.data.noteArray)
                setCopyNoteLength(res.data.noteLength)
                setCopyInstrumentLists(res.data.instruments)
                setNotes(res.data.notes)
                postLoadUpdateOriginals()
            })
        }
        catch (err){
          let param = 'Could not load song '
          animateToast(param)
          return "Invalid song info"
        }
        
        let param = 'Loaded Song: ' + currentSong
        animateToast(param)
      }

      const deleteSong = async (song) => {
        try {
         await axios.delete(`http://localhost:1337/song/${song}` , {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
        }
        catch (err){
          console.error(err)

        }
        
        getSongs()
      }


  return (
    <div className=' top-5 md:top-0 right-0 md md:relative h-[1rem] md:h-[5rem] flex md:justify-end md:items-center w-5/6 '>
 
      {token &&
      <div className='flex md:block'>
        <p className='hidden md:block ml-2'>Save Song</p>
        <input className='w-[7rem] md:w-auto h-[2rem] pl-2 md:h-[2.5rem] rounded-l-lg border-l-2 border-t-2 border-b-2 border-r-0 border-black' placeholder="song name" id="songNameForm" type="text"/>
        <button className='w-[6rem]  md:w-auto  h-[2rem] md:h-[2.5rem] border-2 border-black rounded-r-lg  bg-green-600 pl-1 pr-1' onClick={saveSong}>Save Song</button>
      </div>
  
      }
      
      {token &&
        <div className='ml-5 relative z-10'>
          <p className='hidden md:block ml-2 ' >Load Song</p>
          <div id="songsList" className='h-[3.5rem] border-2 border-black rounded-l-lg  md:h-[5rem] w-[20rem] md:w-[25rem] md:pt-1.5 pb-2 bg-white overflow-y-scroll '>

            {songList && songList.map((song, index) => 
              <div className='flex justify-between' key={index}>
                <p className='pl-2 md:pl-5'>Name: {song.songName}</p>
                <div className='flex'>
                  <p className="md:ml-3 hover:text-green-500" onClick={() => loadSong(song.songName)}>Load</p>
                  <p className="ml-2 md:ml-5  mr-7 hover:text-red-500" onClick={() => deleteSong(song.songName)}>delete</p>
                </div>
              </div>

            )}
          </div>
        </div>
      
      }
    </div>
  )
}

export default SongList