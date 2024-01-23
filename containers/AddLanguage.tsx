import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import BaseInput from '@/styled-components/BaseInput'
import Button from '@/components/Button'
import LanguageService from '@/services/LanguageService'

function AddLanguage({ closeModal }: any) {

    const languageService = new LanguageService()

    const formSchema = z.object({
        name: z.string().nonempty("Campo Obrigatório"),
        order: z.string().nonempty("Campo Obrigatório"),
        src: z.string().nonempty("Campo Obrigatório"),
    })

    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    );

    async function handleAdd(data:z.infer<typeof formSchema>) {
        await languageService.saveOrUpdate(data)
        .then(i=>{
            closeModal()
        })
        .catch(e=>e)
    }

    return (
        <div className='bg-white rounded p-5 gap-3 flex flex-col  text-black '>
            <div className='w-full flex justify-end'>
                <Button 
                    submit={()=>closeModal()}
                    className="m-0 w-5 h-5 text-white flex justify-center items-center p-1 bg-red-300 rounded">
                    <p>X</p>
                </Button>
            </div>
            <form onSubmit={handleSubmit(handleAdd)} className="gap-3 flex flex-col h-full " action="#">
                <BaseInput label={"Name"} register={register} errors={errors} name="name"/>
                <BaseInput label={"Position"} register={register} errors={errors} name="order"/>
                <BaseInput label={"Icon"} register={register} errors={errors} name="src" />
                <Button 
                    className="h-10 mb-3 w-fit bg-gradient-to-r from-rose-400  to-fuchsia-700  flex items-center justify-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]">
                    <p>Save</p>
                </Button>
            </form>
        </div>
    )
}

export default AddLanguage