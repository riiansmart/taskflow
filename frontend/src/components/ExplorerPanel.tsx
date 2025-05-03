import { ChevronDown, ChevronRight } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Task } from '../types/task.types'
import '../styles/taskflow-dashboard.css'

interface ExplorerPanelProps {
  tasks: Task[]
  activeTaskId: string | null
  onTaskSelect: (taskId: string) => void
}

interface TaskGroup {
  id: string
  title: string
  tasks: Task[]
}

export function ExplorerPanel({ tasks, activeTaskId, onTaskSelect }: ExplorerPanelProps) {
  const [openSections, setOpenSections] = useState<string[]>(['current-sprint'])
  
  const taskGroups: TaskGroup[] = [
    {
      id: 'current-sprint',
      title: 'Current Sprint (May 5-19)',
      tasks: tasks.filter(task => task.status === 'in-progress' || task.status === 'review')
    },
    {
      id: 'backlog',
      title: 'Backlog',
      tasks: tasks.filter(task => task.status === 'todo')
    }
  ]

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="explorer-panel">
      <div className="explorer-header">Explorer</div>
      
      {taskGroups.map(group => (
        <Collapsible.Root
          key={group.id}
          open={openSections.includes(group.id)}
          onOpenChange={() => toggleSection(group.id)}
          className="task-group"
        >
          <Collapsible.Trigger className="task-group-header">
            {openSections.includes(group.id) ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span>{group.title}</span>
          </Collapsible.Trigger>
          
          <Collapsible.Content>
            <div className="space-y-1">
              {group.tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className={`task-item ${task.id === activeTaskId ? 'active' : ''}`}
                >
                  <div className={`task-item-status ${task.status}`} />
                  <span className="flex-1 truncate">{task.id}: {task.title}</span>
                  {task.labels && task.labels.length > 0 && (
                    <div className="task-item-labels">
                      {task.labels.map(label => (
                        <span 
                          key={label}
                          className={`task-item-label ${label}`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </div>
  )
} 