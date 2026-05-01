import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <Button variant="contained">Contained</Button>
  <button className="btn btn-neutral">Neutral</button>

    </>
  )
}

export default App
