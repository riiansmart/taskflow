import { format, addDays, subDays } from 'date-fns'
import { Task } from '../types/task.types'
import { ChevronDown, Clock, Maximize2, Minimize2, X } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

interface TimelinePanelProps {
  tasks: Task[]
  onClose?: () => void
  onMaximize?: () => void
}

export function TimelinePanel({ tasks, onClose, onMaximize }: TimelinePanelProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const startHeightRef = useRef<number>(0)
  const startYRef = useRef<number>(0)

  const statusColors: Record<Task['status'], string> = {
    'todo': 'var(--status-todo)',
    'in-progress': 'var(--status-in-progress)',
    'review': 'var(--status-review)',
    'done': 'var(--status-done)'
  }

  // Generate dates array (14 days, 7 days before and after today)
  const today = new Date()
  const startDate = subDays(today, 7)
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startDate, i))

  // Convert tasks to timeline format
  const timelineTasks = tasks.map(task => ({
    ...task,
    startDate: new Date(task.createdAt),
    endDate: new Date(task.dueDate),
    progress: task.status === 'done' ? 100 : 
             task.status === 'review' ? 80 :
             task.status === 'in-progress' ? 50 : 0
  }))

  // Handle panel resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panelRef.current || isCollapsed || isFullscreen) return
    
    setIsResizing(true)
    startHeightRef.current = panelRef.current.offsetHeight
    startYRef.current = e.clientY
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !panelRef.current) return

    const deltaY = startYRef.current - e.clientY
    const newHeight = Math.min(
      Math.max(startHeightRef.current + deltaY, 100),
      window.innerHeight - 70
    )
    
    panelRef.current.style.height = `${newHeight}px`
  }

  const handleMouseUp = () => {
    setIsResizing(false)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleClose = () => {
    if (!onClose) return
    setIsClosing(true)
    setTimeout(onClose, 150)
  }

  const toggleCollapse = () => {
    if (isFullscreen) return
    setIsCollapsed(prev => !prev)
  }

  const toggleFullscreen = () => {
    if (isCollapsed) return
    setIsFullscreen(prev => !prev)
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div 
      ref={panelRef}
      className={`timeline-panel border-t border-default bg-primary 
        ${isClosing ? 'closing' : ''} 
        ${isCollapsed ? 'collapsed' : ''} 
        ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <div 
        className={`timeline-resizer ${isResizing ? 'resizing' : ''} border-t-2 border-default cursor-ns-resize`}
        onMouseDown={handleMouseDown}
      />
      
      {/* Timeline Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-default bg-secondary">
        <div 
          className="flex items-center gap-2 text-primary cursor-pointer"
          onClick={toggleCollapse}
        >
          <Clock size={14} />
          <ChevronDown 
            className={`transform transition-transform ${isCollapsed ? '-rotate-90' : ''}`} 
            size={14} 
          />
          <span className="text-xs font-medium">Timeline</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              toggleFullscreen()
              onMaximize?.()
            }}
            className="p-1 text-primary hover:bg-secondary rounded"
            title={isFullscreen ? "Exit full screen" : "Enter full screen"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          {onClose && (
            <button
              onClick={handleClose}
              className="p-1 text-primary hover:bg-secondary rounded"
              title="Close timeline"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="timeline-content h-48 overflow-auto">
        <div className="min-w-[800px]">
          {/* Timeline Header - Dates */}
          <div className="flex border-b border-default sticky top-0 bg-primary z-10">
            <div className="w-48 flex-shrink-0 p-2" />
            {dates.map((date, i) => (
              <div
                key={i}
                className={`w-24 flex-shrink-0 p-2 text-center text-xs ${
                  format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                    ? 'text-primary'
                    : 'text-secondary'
                }`}
              >
                {format(date, 'MMM d')}
              </div>
            ))}
          </div>

          {/* Task Rows */}
          {timelineTasks.map((task, index) => (
            <div
              key={task.id}
              className={`flex ${
                index % 2 === 0 ? 'bg-secondary' : 'bg-primary'
              } hover:bg-secondary`}
            >
              <div className="w-48 flex-shrink-0 p-2 border-r border-default text-xs text-primary">
                {task.title}
              </div>
              <div className="flex-grow relative h-8">
                <div
                  className="absolute h-5 top-1.5 rounded"
                  style={{
                    backgroundColor: statusColors[task.status],
                    left: `${getTaskOffset(task.startDate, dates)}px`,
                    width: `${getTaskDuration(task.startDate, task.endDate)}px`,
                    opacity: 0.8
                  }}
                >
                  <div 
                    className="h-full relative overflow-hidden"
                    title={`${task.progress}% complete`}
                  >
                    <div 
                      className="absolute inset-0 bg-white bg-opacity-20"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Today Indicator */}
        <div
          className="absolute top-0 bottom-0 w-px bg-accent z-20"
          style={{
            left: `${getTodayOffset(dates)}px`
          }}
        />
      </div>
    </div>
  )
}

function getTaskOffset(taskDate: Date, dates: Date[]): number {
  const startDate = dates[0]
  const daysDiff = Math.floor((taskDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  return (daysDiff * 96) + 192 // 96px per day (24px * 4), 192px initial offset
}

function getTaskDuration(startDate: Date, endDate: Date): number {
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff * 96 // 96px per day
}

function getTodayOffset(dates: Date[]): number {
  const today = new Date()
  return getTaskOffset(today, dates)
} 