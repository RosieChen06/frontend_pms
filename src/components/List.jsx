import React from 'react'

const List = ({date, name, is_garantee, is_service_bonus, is_online_bonus}) => {

  return (
    <div className='w-[87%] grid grid-cols-5 bg-white p-3 mb-2 mr-8'>
        <p>{date.slice(0,10)}</p>
        <p>{name}</p>
        <p>{is_garantee}</p>
        <p>{is_service_bonus}</p>
        <p>{is_online_bonus}</p>
    </div>
  )
}

export default List
