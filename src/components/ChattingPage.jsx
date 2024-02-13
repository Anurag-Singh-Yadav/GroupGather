import React, { useState } from 'react'

function ChattingPage({messages, setMessages}) {
  return (
    <div className='relative h-[100vh] bg-green-500 overflow-y-auto'>
        <div className='absolute bottom-1 w-full bg-blue-400 flex'>
          <input
          className='text-black w-full py-2 px-4'
          onChange={(e) => setMessages(e.target.value)}
          value={messages}
          ></input>
          <div className='px-4 py-3'>send</div>
        </div>
    </div>
  )
}

export default ChattingPage
