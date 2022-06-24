import SingleNotes from "./SingleNote"

const NotesComponent = ({ notes, arraysLists, instrumentLists, currentInstrument}) => {
    return (
      <>
        {/* <p> gives whitespace to help with scroll */}
        <p className="h-[35rem] md:w-[11.5rem] w-[2.4rem]"></p>
          {notes.map((note, index) => (
              <div key={index} className={`column${Math.floor(index / 8)} pr-[1.25rem] `} >
                <SingleNotes index={index} notes={notes} note={note} column={Math.floor(index / 8)} arraysLists={arraysLists} instrumentLists={instrumentLists} currentInstrument={currentInstrument}/>
              </div>
          ))
        }
          {/* <p> gives whitespace to help with scroll */}
        <p id="rightOfSheetWhiteSpace" className="h-[35rem] w-[82.5rem]"></p>
      </>
    )
}

export default NotesComponent