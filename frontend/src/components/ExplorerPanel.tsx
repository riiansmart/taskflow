/**
 * ExplorerPanel.tsx
 * Task explorer component that displays tasks organized by groups (sprints, backlog).
 * Implements a collapsible tree-view interface similar to VSCode's explorer.
 */

import { ChevronDown, ChevronRight } from 'lucide-react'  // Icons for expand/collapse
import * as Collapsible from '@radix-ui/react-collapsible'  // Accessible collapsible UI
import { useState } from 'react'
import { Task } from '../types/task.types'  // Task type definitions
import '../styles/taskflow-dashboard.css'   // Component styles

/**
 * Props for the ExplorerPanel component
 * @interface ExplorerPanelProps
 * @property {Task[]} tasks - Array of all tasks to display
 * @property {string | null} activeTaskId - ID of currently selected task
 * @property {function} onTaskSelect - Callback when a task is selected
 */
interface ExplorerPanelProps {
  tasks: Task[]
  activeTaskId: string | null
  onTaskSelect: (taskId: string) => void
}

/**
 * Represents a group of tasks in the explorer
 * @interface TaskGroup
 * @property {string} id - Unique identifier for the group
 * @property {string} title - Display title for the group
 * @property {Task[]} tasks - Tasks belonging to this group
 */
interface TaskGroup {
  id: string
  title: string
  tasks: Task[]
}

/**
 * ExplorerPanel Component
 * Displays tasks in collapsible groups with status indicators and labels.
 * Features:
 * - Collapsible task groups (Current Sprint, Backlog)
 * - Visual status indicators
 * - Task selection
 * - Label display
 * 
 * @param {ExplorerPanelProps} props - Component props
 * @returns {JSX.Element} The explorer panel component
 */
export function ExplorerPanel({ tasks, activeTaskId, onTaskSelect }: ExplorerPanelProps) {
  // Track which sections are expanded
  const [openSections, setOpenSections] = useState<string[]>(['current-sprint'])
  
  /**
   * Task groups configuration
   * Organizes tasks into Current Sprint and Backlog based on status
   */
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

  /**
   * Toggles the expanded/collapsed state of a section
   * @param {string} sectionId - ID of the section to toggle
   */
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="explorer-panel">
      {/* Panel Header */}
      <div className="explorer-header">Explorer</div>
      
      {/* Task Groups */}
      {taskGroups.map(group => (
        <Collapsible.Root
          key={group.id}
          open={openSections.includes(group.id)}
          onOpenChange={() => toggleSection(group.id)}
          className="task-group"
        >
          {/* Group Header with Expand/Collapse Control */}
          <Collapsible.Trigger className="task-group-header">
            {openSections.includes(group.id) ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span>{group.title}</span>
          </Collapsible.Trigger>
          
          {/* Group Content - Task List */}
          <Collapsible.Content>
            <div className="space-y-1">
              {group.tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task.id)}
                  className={`task-item ${task.id === activeTaskId ? 'active' : ''}`}
                >
                  {/* Task Status Indicator */}
                  <div className={`task-item-status ${task.status}`} />
                  
                  {/* Task Title with ID */}
                  <span className="flex-1 truncate">{task.id}: {task.title}</span>
                  
                  {/* Task Labels (if any) */}
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