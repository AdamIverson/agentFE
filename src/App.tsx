import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import './App.css'

interface Message {
  role: string
  content: string
  id: string
  createdAt: string
}

function App() {
  const [userMessage, setUserMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('http://localhost:3000/api/messages')
      const data = await res.json()
      setMessages(data)
    }

    fetchMessages()
  }, [])

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3000/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage }),
    })
    const data = await res.json()
    const newMessage: Message = {
      role: 'user',
      content: userMessage,
      id: data.id, // Use the correct structure from the response
      createdAt: new Date().toISOString()
    }
    const assistantMessage: Message = {
      role: 'assistant',
      content: data.content, // Use the correct structure from the response
      id: data.id, // Use the correct structure from the response
      createdAt: new Date().toISOString()
    }
    setMessages([...messages, newMessage, assistantMessage])
    setUserMessage('')
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
      <Chat messages={messages} />
    </>
  )
}

export default App
