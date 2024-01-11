'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import LanguageService from '@/services/LanguageService';
import TecnologieCard from '@/components/TecnologieCard';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import AddLanguage from '@/containers/AddLanguage';
import AddProject from '@/containers/AddProject';
import ProjectService from '@/services/projectService';

function Home() {

  const languageService = new LanguageService()

  const projectsService = new ProjectService()

  const [projects, setProjects]: any = useState(null)

  const [languages, setLanguages]: any = useState(null)

  const [modalLanguage, setModalLanguage] = useState(false)

  const [modalProjects, setModalProjects] = useState(false)

  function handleGetLanguages() {
    languageService.getAll()
      .then(item => {
        console.log(item)
        setLanguages(item)
      })
      .catch(e => {
      })
  }

  function handleDeleteLanguages(id: number) {
    languageService.delete(id)
      .then(item => {
      })
      .catch(e => {
      })
  }

  function handleGetProjects() {
    projectsService.getAll()
      .then(item => {
        console.log(item)
        setProjects(item)
      })
      .catch(e => {
      })
  }

  function handleDeleteProjects(id: number) {
    projectsService.delete(id)
      .then(item => {
      })
      .catch(e => {
      })
  }

  function handleCloseModal() {
    setModalLanguage(false)
    setModalProjects(false)
    handleGetLanguages()
    handleGetProjects() 
  }

  return (
    <>
      <Suspense fallback="testoing">
        <div className="  flex flex-col items-center justify-center w-full">
          <div className="text-zinc-900 text-sm flex w-full flex-col justify-center items-center">
            <Section>
              <div className='w-full'>
                <h1 className='text-xl mb-14'>Tecnologies</h1>
                <Button
                  submit={() => setModalLanguage(!modalLanguage)}
                  className="text w-fit text-white flex justify-center items-center white p-3 bg-purple-300 rounded-lg mb-6 ">
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

                  {languages != null && languages.sort((a:any, b:any) => a.order - b.order).map((item: any, index: any) =>
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
                  className="text w-fit text-white flex justify-center items-center white p-3 bg-purple-300 rounded-lg mb-6 ">
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
      </Suspense>
    </>
  )
}
export default Home
