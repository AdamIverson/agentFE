import { useState } from 'react'
import './App.css'

function App() {
  const [userMessage, setUserMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3000/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage }),
    })
    const data = await res.json()
    setResponse(JSON.stringify(data, null, 2))
  }
  return (
    <>
      <h1>Agent Zero</h1>
      <input
        type="text"
        placeholder="ask ur little question"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Ask</button>
      <pre>{response}</pre>
    </>
  )
}

export default App
