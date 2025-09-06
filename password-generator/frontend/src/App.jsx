import { useState } from 'react'
import { Route,Routes, Navigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className="text-3xl font-bold underline">
       Hello world!
     </h1>
    </>
  )
}

export default App
