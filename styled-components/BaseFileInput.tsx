import FileInput from '@/components/FileInput'
import React from 'react'

function BaseFileInput({name,children,change}:any) {
  return (
    <FileInput name={name} change={change} className={"bg-blue-300 rounded-lg w-full text-white "} >
      {children}
    </FileInput>
  )
}

export default BaseFileInput