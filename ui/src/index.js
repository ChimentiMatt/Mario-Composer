import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setGlobal, addCallback } from 'reactn'

const root = ReactDOM.createRoot(document.getElementById('root'));

const rehydrateState = () => {
  const state = localStorage.getItem("globalState")
  if (state) return JSON.parse(state)

  return {
    logginLoad: false,
    songList: [],
    songName: "",
    token: null,
    user: null,
    currentInstrument: 'piano',
    erasing: false,
    sharpToggle: false,
    copyArraysLists: [],
    copyNoteLength: [],
    copyInstrumentLists: [],
    newSong: false,
    songWasReset: false,
  }
}
setGlobal(rehydrateState())

addCallback(state => {
  localStorage.setItem("globalState", JSON.stringify(state))
})

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
