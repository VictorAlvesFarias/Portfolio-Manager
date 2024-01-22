'use client'

import React, { useContext, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Loading from '@/components/Loading'
import Password from '@/components/Password'
import InputRoot from '@/components/InputRoot'
import Label from '@/components/Label'
import Button from '@/components/Button'
import LoginService from '@/services/LoginService'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function Home() {
  
  const loginService = new LoginService()

  const [loginLoading, setLoginLoding] = useState(false)

  const formSchema = z.object({
    password: z.string().nonempty("Campo Obrigatório")
  })

  const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  async function handleSingIn(data: any) {
    
    setLoginLoding(true)
    await loginService.signin(data)
      .then((r) => {
        Cookies.set('auth',r.accessKey[0].code,{expires:1})
        setLoginLoding(false)
      })
      .catch(() => {
        setLoginLoding(false)
      })
  }

  return (
    <section className="gradient-form h-screen w-full bg-neutral-200 ">
      <div className="h-full w-full ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
          <div className="g-0 h-full lg:flex-row flex-col flex lg:flex-wrap">
            <div className="flex-1  md:mx-6 md:p-12 flex items-center justify-center flex-col ">
              <form className='flex flex-col gap-4 bg-zinc-100 p-10 rounded'>
                <h4 className=" pb-1 text-3xl font-semibold text-zinc-800">
                  Manager
                </h4>
                <p>Bem vindo de volta</p>
                <InputRoot label={"Senha"} error={errors.password}>
                  <Label className="text-zinc-800">Senha</Label>
                  <Password 
                    className="bg-transparent border  text-black border-zinc-800 p-2 rounded outline-none"
                    register={register('password')} />
                </InputRoot>
                <Button                     
                  className="h-10 mb-3 bg-gradient-to-r from-rose-400  to-fuchsia-700  flex items-center justify-center w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  style={{
                    background:" linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                  }}
                  submit={handleSubmit(handleSingIn)}
                  loading={loginLoading}
                  loadingComponent = {<Loading visible={true} className="w-5 h-5"/>}
                  >
                    Entrar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
