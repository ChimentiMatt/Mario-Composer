import { setGlobal, addCallback, useState, useGlobal } from 'reactn'

const MusicMakerBottom = ({playSong, stopBtn, tempo, setTempo}) => {


  const handleChange = (e) =>
  {
    setTempo(e.target.value)
  }

  return (
    <div className=" w-[80rem] h-[5rem] ">
      <div id="tempoControlsContainer">
          <label id="tempLabel">Tempo</label>
          <input type="range" id="tempoRange" min='50' max="250" value={tempo} onChange={handleChange}/>
          <span id="currentTempoVisual">{tempo}</span>
      </div>
    </div>
  )
}

export default MusicMakerBottom