import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hello from './assets/Hello.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img className='greeting' src={Hello}></img>
      </div>
      <div className="card">
        <p>
          I regret to inform you this site is under maitenance.<br></br>Checkout <a href="https://liambrophy.com">my previous design portfolio</a> in the meantime!
        </p>
      </div>
    </>
  )
}

export default App
