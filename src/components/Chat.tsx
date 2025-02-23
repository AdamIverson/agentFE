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
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((message, index) => (
          <ul key={index} style={{ listStyleType: 'none', textAlign: 'left' }}>
            <li className={message.role === 'user' ? 'userChat' : 'aiChat'}>
              <strong>{message.role === 'user' ? 'User' : 'Agent'}:</strong> {message.content}
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Chat