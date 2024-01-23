import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import BaseInput from '@/styled-components/BaseInput'
import Button from '@/components/Button'
import ProjectService from '@/services/ProjectService'

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

    const [images,setImages] = useState<any[]>([])
 
    function handleAddImage(data:any) {

        let newList:any[] = [...images]
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
                className="h-10 mb-3 w-fit bg-gradient-to-r from-rose-400  to-fuchsia-700  flex items-center justify-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]">
                <p>Save</p>
            </Button>
        </div>
    )
}

export default AddProject