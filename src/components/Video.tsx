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
    <div className="flex-1">Video</div>
  )
}
