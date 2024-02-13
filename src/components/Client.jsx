import React from 'react'
import Avatar from 'react-avatar';
function Client({userName}) {
  return (
    <div className='flex justify-center flex-col items-center gap-2'>
      <Avatar name={userName} size='50' round='20px'></Avatar>
      <div>{userName}</div>
    </div>
  )
}

export default Client
