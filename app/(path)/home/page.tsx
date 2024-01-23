'use client'

import React, { useEffect, useState } from 'react'
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import LanguageService from '@/services/LanguageService';
import TecnologieCard from '@/components/TecnologieCard';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import AddLanguage from '@/containers/AddLanguage';
import AddProject from '@/containers/AddProject';
import ProjectService from '@/services//ProjectService';

function Home() {

  const languageService = new LanguageService()
  const projectsService = new ProjectService()
  const [projects, setProjects]: any = useState(null)
  const [languages, setLanguages]: any = useState(null)
  const [modalLanguage, setModalLanguage] = useState(false)
  const [modalProjects, setModalProjects] = useState(false)

  async function handleGetLanguages() {
    await languageService.getAll()
      .then(item => {
        setLanguages(item)
      })
      .catch(e => {
      })
  }

  async function handleDeleteLanguages(id: number) {
    await languageService.delete(id)
      .then(item => {
        handleGetLanguages()
      })
      .catch(e => {
      })
  }

  async function handleGetProjects() {
    await projectsService.getAll()
      .then(item => {
        setProjects(item)
      })
      .catch(e => {
      })
  }

  async function handleDeleteProjects(id: number) {
    await projectsService.delete(id)
      .then(item => {
        handleGetProjects()
      })
      .catch(e => {
      })
  }

  function handleCloseModal() {
    setModalLanguage(false)
    setModalProjects(false)
  }

  useEffect(() => {
    handleGetLanguages()
    handleGetProjects()
  }, [])

  return (
    <div className=" text-black flex flex-col items-center justify-center w-full">
      <div className="text-zinc-900 text-sm flex w-full flex-col justify-center items-center">
        <Section>
          <div className='w-full'>
            <h1 className='text-xl mb-14'>Tecnologies</h1>
            <Button
              submit={() => setModalLanguage(!modalLanguage)}
              className="h-10 mb-3 w-fit bg-gradient-to-r from-rose-400  to-fuchsia-700  flex items-center justify-center rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]">
              Add
            </Button>
            <Modal
              isOpen={modalLanguage}
              timer={150}
              setClose={handleCloseModal}
            >
              <AddLanguage closeModal={() => setModalLanguage(false)} />
            </Modal>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">

              {languages != null && languages.sort((a: any, b: any) => a.order - b.order).map((item: any, index: any) =>
                <div className='relative' key={index}>
                  <Button
                    submit={() => handleDeleteLanguages(item._id)}
                    className="text w-fit text-white flex justify-center items-center white m-2 p-1 bg-red-300 rounded-lg mb-6 absolute top-0 right-0 z-50">
                    Delete
                  </Button>
                  <TecnologieCard data={item}></TecnologieCard>
                </div>
              )}
            </div>
          </div>
        </Section>
        <Section>
          <div className='w-full'>
            <h1 className='text-xl mb-14'>Projects</h1>
            <Button
              submit={() => setModalProjects(!modalProjects)}
              className="h-10 mb-3 bg-gradient-to-r from-rose-400  to-fuchsia-700  flex items-center justify-center w-fit rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]">
              Add
            </Button>
            <Modal
              isOpen={modalProjects}
              timer={150}
              setClose={handleCloseModal}
            >
              <AddProject closeModal={() => setModalProjects(false)} />
            </Modal>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
              {projects != null && projects.map((item: any, index: any) =>
                <div className='relative' key={index}>
                  <Button
                    submit={() => handleDeleteProjects(item._id)}
                    className="text w-fit text-white flex justify-center items-center white m-2 p-1 bg-red-300 rounded-lg mb-6 absolute top-0 right-0 z-50">
                    Delete
                  </Button>
                  <ProjectCard key={index} data={item}></ProjectCard>
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default Home

