import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeImage from '../assets/code-image.png'
import ReactJSIcon from '../assets/reactjs-icon.png'
import { Logo } from '../components/Logo'

export default function Login() {
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement

    const fullname = form.fullname.value as string
    const email = form.email.value as string

    localStorage.setItem('user_info', JSON.stringify({
      fullname,
      email
    }))

    navigate('/event')
  }

  return (
    <div
      className={`grid place-items-center max-w-[100vw] w-full min-h-[100vh] p-14 bg-[url("../assets/blur-background.png")] sml:p-8 overflow-hidden`}
    >
      <main
        className="w-full"
      >
        <div className="flex justify-between items-center gap-4 relative leading-relaxed md:flex-col md:gap-12">
          <div
            className="flex flex-col gap-4 max-w-[500px] w-full"
          >
            <div className="max-w-[150px] w-full">
              <Logo />
            </div>

            <h1
              className='text-3xl'
            >Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React JS</strong></h1>

            <p className="text-xs text-gray-200 leading-5">
              Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com
              alta demanda para acessar as melhores oportunidades do mercado.
            </p>
          </div>

          <img
            className='absolute max-w-[450px] w-full left-[30%] top-0 md:left-[10%] sml:w-[500px] sml:-left-11'
            src={ReactJSIcon}
            alt="image of atom in gray color"
          />

          <form
            className='relative max-w-[390px] p-7 bg-gray-700 border border-gray-500 rounded-md sml:'
            onSubmit={handleFormSubmit}
          >
            <span
              className='block mb-5 text-[1.5rem] font-medium sml:text-[1.2rem]'
            >
              Inscreva-se gratuitamente
            </span>
            <input
              name="fullname"
              placeholder='Seu nome completo'
              type="text"
              className="w-full p-4 pl-6 bg-gray-900 mb-2 text-base text-gray-200 rounded-md"
            />
            <input
              name="email"
              placeholder='Digite seu email'
              type="text"
              className="w-full p-4 pl-6 bg-gray-900 mb-6 text-base text-gray-200 rounded-md"
            />
            <button
              type="submit"
              className="w-full text-center py-4 uppercase text-gray-100 font-bold bg-green-500 rounded-md hover:bg-green-700 transition-colors"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>

        <div>
          <img src={CodeImage} alt="background with green colors" />
        </div>
      </main>
    </div>
  )
}
