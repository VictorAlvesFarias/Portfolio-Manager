import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import BaseInput from '@/styled-components/BaseInput'
import Button from '@/components/Button'
import BaseFileInput from '@/styled-components/BaseFileInput'
import Image from 'next/image'
import Language from '@/entitites/Language'
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
        <div className='bg-white rounded p-5 gap-3 flex flex-col  '>
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
                    className="m-0 w-fit text-white flex justify-center items-center p-2 bg-purple-300 rounded">
                    <p>Save</p>
                </Button>
            </form>
        </div>
    )
}

export default AddLanguage