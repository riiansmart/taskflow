import { Files, Calendar, Settings, BarChart2, Users } from 'lucide-react'
import { ReactNode } from 'react'

interface ActivityBarItem {
  icon: ReactNode
  label: string
  isActive?: boolean
}

export function ActivityBar() {
  const items: ActivityBarItem[] = [
    { icon: <Files size={24} />, label: 'Explorer', isActive: true },
    { icon: <Calendar size={24} />, label: 'Timeline' },
    { icon: <BarChart2 size={24} />, label: 'Reports' },
    { icon: <Users size={24} />, label: 'Team' },
    { icon: <Settings size={24} />, label: 'Settings' }
  ]

  return (
    <div className="w-12 bg-secondary flex flex-col items-center py-2 border-r border-default">
      {items.map((item, index) => (
        <button
          key={index}
          className={`
            w-full p-3 flex justify-center hover:bg-secondary relative group
            ${item.isActive ? 'bg-secondary' : ''}
          `}
          aria-label={item.label}
          title={item.label}
        >
          <div className={`
            absolute left-0 w-0.5 h-6 top-1/2 -translate-y-1/2 transition-colors
            ${item.isActive ? 'bg-accent' : 'bg-transparent hover:bg-accent'}
          `} />
          <div className={`text-secondary ${item.isActive ? 'text-primary' : ''} hover:text-primary`}>
            {item.icon}
          </div>
        </button>
      ))}
    </div>
  )
} 