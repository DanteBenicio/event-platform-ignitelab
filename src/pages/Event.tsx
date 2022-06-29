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
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Video />
        <Sidebar />
      </main>
    </div>
  )
}
