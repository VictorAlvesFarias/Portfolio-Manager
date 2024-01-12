import Input from '@/components/Input'
import InputRoot from '@/components/InputRoot'
import Label from '@/components/Label'
import React from 'react'

function BaseInput({name,errors,label,register}:any) {
  return (
    <InputRoot label={label} error={errors[name] }>
        <Label className={"text-zinc-800"}>{label}</Label>
        <Input className="p-1 border border-zinc-800 rounded text-black" register={register(name)} />
    </InputRoot>
  )
}

export default BaseInput