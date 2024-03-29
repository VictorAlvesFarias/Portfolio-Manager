"use client"

import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import Eye from './Eye';
import { TryParseToURL } from '../extensions/String';


function ProjectCard({data}:any) {
	const [toggler, setToggler] = useState(false);

  console.log(TryParseToURL(data.src))
  return (
      <div className="flex gap-3 items-center dark:text-white text-black   lex-1 p-4 py-10 rounded-sm dark:bg-zinc-800 bg-zinc-200 shadow-lg ">
        <Lightbox
          open={toggler}
          close={() => setToggler(false)}
          plugins={[Counter]}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
          slides={data.images}
        /> 
        <div className=' flex items-center justify-center rounded-sm shadow-black  w-20 h-20'>
            <Image alt="" width={50} height={50} className='w-10 h-10' src={TryParseToURL(data.src)}/>
        </div>
        <div className='flex flex-col flex-1'>
            <div className="flex justify-between items-center">
              <p className='font-semibold'>{data.name} </p>
              <Eye className='stroke-black dark:stroke-white w-7 cursor-pointer ml-3' onClick={()=>setToggler(!toggler)} alt={''}></Eye>
            </div>
            <p>{data.description}</p>
            <a target='_blank' href={data.href} className='font-semibold'>See more...</a>
        </div>
      </div>
  )
}

export default ProjectCard