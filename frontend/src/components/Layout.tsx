import { Outlet } from 'react-router-dom'
import { MainNav } from './MainNav'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300">
      <MainNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout