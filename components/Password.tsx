import React from 'react'

function Password({register,className}:any) {
  return (
    <input {...register} type='password' autoComplete="off" className={className}/>
  )
}

export default Password