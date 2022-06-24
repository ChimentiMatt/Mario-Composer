import { useGlobal } from 'reactn'

const MusicMakerTop = ({noteLength}) => {
  const [currentInstrument, setCurrentInstrument ] = useGlobal("currentInstrument")
  const [erasing, setErasing] = useGlobal('erasing')
  const [sharpToggle, setSharpToggle] = useGlobal("sharpToggle")

  const beepNote = () => {
    setCurrentInstrument('beep')
    setErasing(false)
    new Audio(`./sounds/beep/Cbeep.mp3`).play()
    document.body.style.cursor = "url('./images/beep.gif') 5 0, auto"
  }

  const meowNote = () => {
    setCurrentInstrument('meow')
    setErasing(false)
    new Audio(`./sounds/meow/Cmeow.mp3`).play()
    document.body.style.cursor = "url('./images/meow.gif') 5 0, auto"
  }

  const baseNote = () => {
    setCurrentInstrument('base')
    setErasing(false)
    new Audio(`./sounds/base/Cbase.mp3`).play()
    document.body.style.cursor = "url('./images/base.gif') 5 0, auto"
  }

  const drumNote = () => {
    setCurrentInstrument('drum')
    setErasing(false)
    new Audio(`./sounds/drum/Cdrum.mp3`).play()
    document.body.style.cursor = "url('./images/drum.gif') 5 0, auto"
  }

  const pianoNote = () => {
    setCurrentInstrument('piano')
    setErasing(false)
    new Audio(`./sounds/piano/Cpiano.mp3`).play()
    document.body.style.cursor = "url('./images/piano.gif') 5 0, auto"
  }

  const flowerNote = () => {
    setCurrentInstrument('flower')
    setErasing(false)
    new Audio(`./sounds/flower/Cflower.mp3`).play()
    document.body.style.cursor = "url('./images/flower.gif') 5 0, auto"
  }

  const coinNote = () => {
    setCurrentInstrument('coin')
    setErasing(false)
    new Audio(`./sounds/coin/Ccoin.mp3`).play()
    document.body.style.cursor = "url('./images/coin.gif') 5 0, auto"
  }

  const barkNote = () => {
    setCurrentInstrument('bark')
    setErasing(false)
    new Audio(`./sounds/bark/Cbark.mp3`).play()
    document.body.style.cursor = "url('./images/bark.gif') 5 0, auto"
  }

  const yoshiNote = () => {
    setCurrentInstrument('yoshi')
    setErasing(false)
    new Audio(`./sounds/yoshi/Cyoshi.mp3`).play()
    document.body.style.cursor = "url('./images/yoshi.gif') 5 0, auto"
  }

  const organNote = () => {
    setCurrentInstrument('organ')
    setErasing(false)
    new Audio(`./sounds/organ/Corgan.mp3`).play()
    document.body.style.cursor = "url('./images/organ.gif') 5 0, auto"
  }

  const trumpetNote = () => {
    setCurrentInstrument('trumpet')
    setErasing(false)
    new Audio(`./sounds/trumpet/Ctrumpet.mp3`).play()
    document.body.style.cursor = "url('./images/trumpet.gif') 5 0, auto"
  }

  const toggleSharp = () => {
    setSharpToggle(!sharpToggle)
    { sharpToggle ? document.getElementById("sharpIcon").style.background = 'initial' : document.getElementById("sharpIcon").style.background = 'green'}
  }

  const eraser = () => {
    setCurrentInstrument('note')
    setErasing(true)
    new Audio(`./sounds/eraser/eraser.mp3`).play()
    document.body.style.cursor = "url('./images/eraser.gif') 5 0, auto"
  }

  return (
    <div id="top" className="ml-[10rem] md:ml-0 w-[40rem]  md:h-[2rem] md:w-5/6   pt-5 md:mb-12 ">
      <div className='flex md:justify-center'>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/beep.gif'} onClick={beepNote} alt="robot"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/meow.gif'} onClick={meowNote} alt="cat"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/base.gif'} onClick={baseNote} alt="base"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/drum.gif'} onClick={drumNote} alt="drum"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/piano.gif'} onClick={pianoNote} alt="paino"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/flower.gif'} onClick={flowerNote} alt="flower"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/coin.gif'} onClick={coinNote} alt="coin"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/bark.gif'} onClick={barkNote} alt="dog"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/yoshi.gif'} onClick={yoshiNote} alt="yoshi"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/organ.gif'} onClick={organNote} alt="organ instament"/>
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' src={'./images/trumpet.gif'} onClick={trumpetNote} alt="trumpet" />   
        <img  className='h-[1rem] md:h-[2rem] mr-[.5rem] md:mr-[1.5rem]' id="sharpIcon"  src={'./images/sharp.gif'} onClick={toggleSharp}  alt="sharp note"/>
    
        <img  className='h-[1rem] md:h-[2rem] mr-[1.5rem] ' src={'./images/eraser.gif'} onClick={eraser} alt="eraser"/>
      </div>
      <div className='flex text-[.5rem] md:text-[1rem] md:justify-end mt-1'>
        <p className='ml-4 md:ml-8'> Quarter Note</p>
        <img  className='h-[.5rem] md:h-[1rem]' src={'./images/fourthNote.gif'} />
        <p className='ml-4 md:ml-8'>Eighth Note</p>
        <img  className='h-[.5rem] md:h-[1rem]' src={'./images/eighthNote.gif'} />
        <p  className='ml-4 md:ml-8'>Sixteenth Note</p>
        <img  className='h-[.5rem] md:h-[1rem]' src={'./images/sixteenthNote.gif'} />
        <p  className='ml-4 md:ml-8'>Half Note</p>
        <img  className='h-[.5rem] md:h-[1rem]' src={'./images/halfNote.gif'} />
      </div>
      <img id="playMarker" src={'./images/standing.gif'} />
    </div>
  )
}

export default MusicMakerTop