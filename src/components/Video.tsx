import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css'
import Footer from "./Footer";

interface VideoProps {
  lessonSlug: string
}

interface GetLessonBySlugResponse {
  lesson: {
    title: string
    videoId: string
    description: string
    teacher: {
      bio: string
      avatarURL: string
    }
  }
}

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`

export default function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: lessonSlug
    }
  })

  if (!data?.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube
              videoId={data?.lesson.videoId!}
            />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 pb-0 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold ">
              {data?.lesson.title}
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed">
              {data?.lesson.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="https://discord.com/channels/327861810768117763/384756018799706123"
              className="flex items-center justify-center p-4 text-sm bg-green-500 rounded font-bold uppercase gap-2 hover:bg-green-700 transition-colors"
              target="_blank"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href="https://evento.rocketseat.com.br/ignite-lab/desafios/checkpoints"
              className="flex items-center justify-center p-4 text-sm bg-transparent border border-blue-500 text-blue-500 rounded font-bold uppercase gap-2 hover:bg-blue-500 hover:text-gray-900 transition-colors"
              target="_blank"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="p-[2px] rounded-full bg-blue-500 w-16">
            <img
              className="rounded-full"
              src="https://avatars.githubusercontent.com/u/2254731?v=4" alt="" />
          </div>
          <div>
            <h2 className="mb-1 text-2xl font-bold">Diego Fernandes</h2>
            <span className="text-gray-200">Co-fundador e CTO na Rocketseat </span>
          </div>
        </div>

        <div className="gap-8 mt-20 flex items-center justify-center flex-wrap">
          <a
            href="https://efficient-sloth-d85.notion.site/Material-complementar-86d4ef35af16471ebc3ae3eba1a378e5"
            className="flex items-stretch max-h-36 bg-gray-700 rounded overflow-hidden gap-2 hover:bg-gray-600 transition-colors"
            target="_blank"
          >
            <div className="flex items-center bg-green-700 h-full p-6">
              <FileArrowDown size={60} />
            </div>
            <div className="ml-4 py-6 leading-relaxed">
              <strong className="text-2xl">Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="flex items-center h-full p-6">
              <CaretRight size={24} color="#81D8F7" />
            </div>
          </a>

          <a
            href="https://drive.google.com/drive/folders/1mxWnvlqmH7MbVRv2Na9xFNgCQCygM1iR?usp=sharing"
            className="flex items-stretch bg-gray-700 rounded overflow-hidden gap-6 hover:bg-gray-600 transition-colors"
            target="_blank"
          >
            <div className="flex items-center bg-green-700 h-full p-6">
              <FileArrowDown size={40} />
            </div>
            <div className="flex flex-col justify-center py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="flex items-center h-full p-6">
              <CaretRight size={24} color="#81D8F7" />
            </div>
          </a>
        </div>

        <Footer />
      </div>
    </div>
  )
}
