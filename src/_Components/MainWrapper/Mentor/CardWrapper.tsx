'use client'

import React from 'react'
import MentorCard from './MentorCards'

const CardWrapper = ({data}:{data:any}) => {
  return (
    <div className='grid grid-cols-3 gap-4 mt-16'>
      {data.map((value:any , index:number)=>{
        return <MentorCard {...value} key={index} />;
      })}
    </div>
  );
}

export default CardWrapper