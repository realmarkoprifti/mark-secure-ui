import React from 'react'
import MessageBox from '../../components/MessageBox'


const page = ({params}: {params: {room_id: string}}) => {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <MessageBox room_id={params.room_id} />
    </div>
  )
}

export default page