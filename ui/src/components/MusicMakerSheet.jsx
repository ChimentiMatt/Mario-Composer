import NotesComponent from './NotesComponent'
import NoteLength from './NoteLength'

const MusicMakerSheet = ({ notes, arraysLists, instrumentLists, currentInstrument, noteLength, time, copyNoteLength={copyNoteLength} }) => {
  return (
    <>
      <div id="noteSection" className="flex flex-col w-[45rem] h-[15rem] md:w-5/6 md:h-[30rem] pt-[1rem] md:pt-[2rem] ">
        <div id ="noteDurations" className='flex  '>
          <p className="h-[35rem] pl-[1.45rem] md:pl-[8.1rem]"></p>
            {copyNoteLength.map((item, index) => (
              <NoteLength key={index} item={item} column={index} noteLength={noteLength} time={time}/>
            ))}
        </div>  
          <NotesComponent notes={notes} arraysLists={arraysLists} instrumentLists={instrumentLists} currentInstrument={currentInstrument} />
      </div>
    </>
  )
}

export default MusicMakerSheet

