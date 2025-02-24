import React, { FC } from 'react'

interface Message {
  role: string
  content: string
  id: string
  createdAt: string
}

interface ChatProps {
  messages: Message[]
}

const Chat: FC<ChatProps> = ({ messages }) => {
  return (
    <div id="chatWindow" style={{ border: '1px solid gold', margin: '10px', overflow: "scroll", width: "100%" }}>
      <h2>Chat</h2>
      <div>
        {messages.map((message, index) => {
          const { text, imageUrl } = parseMessageContent(message.content)
          console.log('Parsed message:', { text, imageUrl }) // Debugging log
          return (
            <ul key={index} style={{ listStyleType: 'none', textAlign: 'left' }}>
              <li className={message.role === 'user' ? 'userChat' : 'aiChat'}>
                <strong>{message.role === 'user' ? 'User' : 'Agent'}:</strong>
                <div>{text}</div>
                {imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />}
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

// Helper function to parse message content and extract the URL
const parseMessageContent = (content: string) => {
  const markdownImageRegex = /!\[.*?\]\((https?:\/\/[^\s]+)\)/g
  const urls = content.match(markdownImageRegex)
  const imageUrl = urls ? (urls[0].match(/\((https?:\/\/[^\s]+)\)/)?.[1] ?? null) : null
  console.log("imageUrl:", imageUrl) // Debugging log
  const text = content.replace(markdownImageRegex, '').trim()
  console.log('parseMessageContent:', { content, text, imageUrl }) // Debugging log
  return { text, imageUrl }
}

export default Chat