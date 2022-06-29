import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Video from '../components/Video'
import { useClickOutside } from '../hooks/useClickOutside'
import { useLocalStorage } from '../hooks/useLocalStorage'
interface User {
  fullname: string
  email: string
}

export default function Event() {
  const { slug } = useParams<{ slug: string }>()
  const [user] = useLocalStorage<User>('user_info')
  const [openBurger, setOpenBurger] = useState<boolean>(false)
  const [breakpoint, setBreakpoint] = useState<boolean>(false)

  const sidebarRef = useRef<HTMLElement | null>(null)
  const burgerRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(() => {
    setOpenBurger(false)
  }, sidebarRef, burgerRef)

  useEffect(() => {
    const { scrollWidth } = document.documentElement

    if (openBurger) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'auto'
    }

    if (scrollWidth <= 768) {
      setBreakpoint(true)
    } else {
      setBreakpoint(false)
    }
  }, [openBurger])

  useEffect(() => {
    document.addEventListener('resize', e => {
      const { innerWidth } = e.target as Window

      if (innerWidth >= 768) {
        setBreakpoint(false)
      }

      console.log(innerWidth)
    })

    return () => document.removeEventListener('resize', () => {})
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header setOpenBurger={setOpenBurger} openBurger={openBurger} burgerRef={burgerRef!}/>
      <main className="flex flex-1">
        { slug ? (
          <Video lessonSlug={slug}/>
        ) : (
          <div className="flex-1">
            <p className="text-xl text-center mt-10">Bem vindo <span className="text-2xl text-blue-500">{user?.fullname}</span> ao <span className="text-2xl text-blue-500">Ignite Lab 🧪</span></p>
            <p className="text-base text-center mt-6 text-gray-200">Selecione uma video aula no lado direito 👉</p>
          </div>
        )}
        {breakpoint
          ? openBurger ? (
            <>
              <Sidebar sidebarRef={sidebarRef} breakpoint={breakpoint} openBurger={openBurger}/>
              <div className="overlay"/>
            </>
          ) : <Sidebar breakpoint={breakpoint} openBurger={openBurger}/>
          : <Sidebar breakpoint={breakpoint} openBurger={openBurger}/>
        }
      </main>
    </div>
  )
}
