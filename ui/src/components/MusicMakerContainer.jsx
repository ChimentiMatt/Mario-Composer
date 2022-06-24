import MusicMakerTop from "./MusicMakerTop"
import MusicMakerSheet from "./MusicMakerSheet"
import MusicMakerBottom from "./MusicMakerBottom"

const MusicMakerContainer = ({ notes, arraysLists, instrumentLists, playSong, noteLength, stopBtn, copyNoteLength={copyNoteLength}}) => {
  return (
    <div id="mainGame" className="flex flex-col md:items-center   ">
        <MusicMakerTop />
        <MusicMakerSheet notes={notes} arraysLists={arraysLists} instrumentLists={instrumentLists} noteLength={noteLength} copyNoteLength={copyNoteLength}/>
    </div>
  )
}

export default MusicMakerContainer