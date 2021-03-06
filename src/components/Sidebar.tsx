import React from 'react'
import Lesson from './Lesson'
import { gql, useQuery } from '@apollo/client'

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`

interface Lesson {
  id: string
  title: string
  slug: string
  availableAt: string
  lessonType: 'live' | 'class'
}

interface SidebarProps {
  breakpoint: boolean
  openBurger: boolean
  sidebarRef?: React.MutableRefObject<any>
}

interface GetLessonsQueryResponse {
  lessons: Lesson[]
}

export default function Sidebar({ breakpoint, openBurger, sidebarRef }: SidebarProps) {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)

  return (
    <aside ref={sidebarRef} className={`max-w-[348px] w-full bg-gray-700 p-6 border-l border-gray-600 md:hidden ${openBurger ? 'active_sidebar' : ''}`}>
      <span className="block font-bold text-2xl pb-6 mb-6 border-b border-gray-500">
        Cronograma de Aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
          />
        ))}
      </div>
    </aside>
  )
}
