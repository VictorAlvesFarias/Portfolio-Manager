import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import BaseInput from '@/styled-components/BaseInput'
import Button from '@/components/Button'
import BaseFileInput from '@/styled-components/BaseFileInput'
import Image from 'next/image'
import { url } from 'inspector'
import ProjectService from '@/services/projectService'

function AddProject({ closeModal }: any) {
    
    const projectService = new ProjectService()

    const formSchema = z.object({
        name: z.string().nonempty("Campo Obrigatório"),
        order: z.string().nonempty("Campo Obrigatório"),
        description: z.string().nonempty("Campo Obrigatório"),
        url: z.string().nonempty("Campo Obrigatório"),
        icon: z.string().nonempty("Campo Obrigatório")
    })
    
    const formSchemaImage = z.object({
        name: z.string().nonempty("Campo Obrigatório"),
        src: z.string().nonempty("Campo Obrigatório")
    })

    const post  = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    );

    const image = useForm<z.infer<typeof formSchemaImage>>(
        {
            resolver: zodResolver(formSchemaImage),
        }
    );

    const [images,setImages] = useState([])
 
    function handleAddImage(data:any) {

        let newList = [...images]
        newList.push(data)
        setImages(newList)
    }

    function handleRemoveImage(id:any) {

        let newList = [...images]
        newList.splice(id, 1);
        setImages(newList)
    }


    async function handleAdd(data:z.infer<typeof formSchema>) {
        await projectService.saveOrUpdate(data,images)
        .then(i=>{
            closeModal()
        })
        .catch(e=>e)
    }

    return (
        <div className='bg-white rounded p-5 gap-3 flex flex-col max-h-full overflow-auto text-black '>
            <div className='w-full flex justify-end'>
                <Button
                    submit={() => closeModal()}
                    className="m-0 w-5 h-5 text-white flex justify-center items-center p-1 bg-red-300 rounded">
                    <p>X</p>
                </Button>
            </div>
            <form id={"post"} onSubmit={post.handleSubmit(handleAdd)} className="gap-3 flex flex-col h-full " action="#">
                <BaseInput 
                    label={"Name"} 
                    register={post.register} 
                    errors={post.formState.errors} name="name" 
                />
                <BaseInput 
                    label={"Position"} 
                    register={post.register} 
                    errors={post.formState.errors} name="order" 
                />
                <BaseInput 
                    label={"Link"} 
                    register={post.register} 
                    errors={post.formState.errors} name="url" 
                />
                <BaseInput 
                    label={"Description"} 
                    register={post.register} 
                    errors={post.formState.errors} name="description" 
                />
                <BaseInput 
                    label={"Icon"} 
                    register={post.register} 
                    errors={post.formState.errors} name="icon" 
                />
            </form>
            <form onSubmit={image.handleSubmit(handleAddImage)} className='flex gap-3 justify-center items-start'>
                <BaseInput 
                        label={"Image Url"} 
                        register={image.register} 
                        errors={image.formState.errors} name="src" 
                />
                <BaseInput 
                    label={"Image Name"} 
                    register={image.register} 
                    errors={image.formState.errors} name="name" 
                />
                <Button
                    className="m-0 w-8 h-8 mt-5 text-white flex justify-center items-center bg-green-300 rounded">
                    <p>+</p>
                </Button>
            </form>
            <div className='flex flex-col gap-2'>
                {images.map((item:any, index) => 
                    <div className='flex items-center justify-between ' key={index}>
                        <p>{item.src}</p>    
                        <span  className="m-0 w-8 h-8 text-white flex justify-center items-center bg-red-300 rounded" onClick={()=>handleRemoveImage(item)}>X</span>
                    </div>
                )}
            </div>
            <Button
                form="post" 
                className="m-0 w-fit text-white flex justify-center items-center p-2 bg-purple-300 rounded">
                <p>Save</p>
            </Button>
        </div>
    )
}

export default AddProject