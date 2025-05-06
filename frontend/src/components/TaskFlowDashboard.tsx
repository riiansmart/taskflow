/**
 * TaskFlowDashboard.tsx
 * Main dashboard component that implements the core task management interface.
 * Features a multi-panel layout with explorer, content, properties, and timeline views.
 */

import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'  // Resizable panel system
import { ExplorerPanel } from './ExplorerPanel'        // Task explorer/navigation panel
import { MainContentPanel } from './MainContentPanel'  // Main task content display
import { TimelinePanel } from './TimelinePanel'        // Timeline visualization
import { PropertiesPanel } from './PropertiesPanel'    // Task properties editor
import { Task, TaskStatus, TaskPriority } from '../types/task.types'  // Task-related types
import { Clock } from 'lucide-react'                   // Icon components

/**
 * Sample task data for demonstration purposes
 * Each task includes:
 * - Unique identifier
 * - Title and description
 * - Type and priority
 * - Status and assignee
 * - Due date and story points
 * - Creation and update timestamps
 */
const initialTasks: Task[] = [
  {
    id: 'TASK-001',
    title: 'Setup Project Infrastructure',
    type: 'feature',
    status: TaskStatus.DONE,
    priority: TaskPriority.HIGH,
    dueDate: '2024-03-20',
    assignee: 'Sarah Chen',
    storyPoints: 5,
    description: 'Initialize project with React, Vite, and TailwindCSS. Set up development environment and CI/CD pipeline.',
    createdAt: '2024-03-15T08:00:00.000Z',
    updatedAt: '2024-03-20T16:30:00.000Z'
  },
  {
    id: 'TASK-002',
    title: 'Design System Implementation',
    type: 'feature',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    dueDate: '2024-03-25',
    assignee: 'Michael Torres',
    storyPoints: 8,
    description: 'Create reusable components following VSCode design patterns. Implement dark theme support.',
    createdAt: '2024-03-18T09:15:00.000Z',
    updatedAt: '2024-03-21T14:20:00.000Z'
  },
  {
    id: 'TASK-003',
    title: 'Task Management API',
    type: 'feature',
    status: TaskStatus.REVIEW,
    priority: TaskPriority.MEDIUM,
    dueDate: '2024-03-23',
    assignee: 'Alex Johnson',
    storyPoints: 5,
    description: 'Implement REST API endpoints for task CRUD operations with proper validation and error handling.',
    createdAt: '2024-03-17T10:30:00.000Z',
    updatedAt: '2024-03-21T11:45:00.000Z'
  },
  {
    id: 'TASK-004',
    title: 'Timeline Component',
    type: 'feature',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    dueDate: '2024-03-24',
    assignee: 'Emily White',
    storyPoints: 3,
    description: 'Create interactive timeline view for task visualization with drag-and-drop support.',
    createdAt: '2024-03-19T13:20:00.000Z',
    updatedAt: '2024-03-21T09:15:00.000Z'
  },
  {
    id: 'TASK-005',
    title: 'User Authentication',
    type: 'feature',
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    dueDate: '2024-03-27',
    assignee: 'David Kim',
    storyPoints: 5,
    description: 'Implement user authentication and authorization using JWT tokens.',
    createdAt: '2024-03-20T11:00:00.000Z',
    updatedAt: '2024-03-21T11:00:00.000Z'
  },
  {
    id: 'TASK-006',
    title: 'Data Persistence Layer',
    type: 'feature',
    status: TaskStatus.REVIEW,
    priority: TaskPriority.HIGH,
    dueDate: '2024-03-22',
    assignee: 'Lisa Anderson',
    storyPoints: 5,
    description: 'Set up database schema and implement data access layer with TypeORM.',
    createdAt: '2024-03-16T14:30:00.000Z',
    updatedAt: '2024-03-21T10:20:00.000Z'
  },
  {
    id: 'TASK-007',
    title: 'Performance Optimization',
    type: 'improvement',
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    dueDate: '2024-03-28',
    assignee: 'Ryan Martinez',
    storyPoints: 3,
    description: 'Optimize application performance and implement lazy loading for better user experience.',
    createdAt: '2024-03-21T09:00:00.000Z',
    updatedAt: '2024-03-21T09:00:00.000Z'
  },
  {
    id: 'TASK-008',
    title: 'Automated Testing Suite',
    type: 'feature',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: '2024-03-26',
    assignee: 'Rachel Thompson',
    storyPoints: 5,
    description: 'Set up testing infrastructure and write unit tests for core components.',
    createdAt: '2024-03-20T15:45:00.000Z',
    updatedAt: '2024-03-21T15:45:00.000Z'
  }
]

/**
 * TaskFlowDashboard Component
 * Implements a VSCode-inspired interface with:
 * - Left sidebar for task exploration
 * - Central area for task content
 * - Right sidebar for task properties
 * - Optional timeline view at bottom
 * 
 * Features:
 * - Multi-panel layout with resizable panels
 * - Task selection and management
 * - Tab-based task navigation
 * - Real-time task updates
 * 
 * @returns {JSX.Element} The dashboard component
 */
export function TaskFlowDashboard() {
  // State Management
  const [tasks, setTasks] = useState<Task[]>(initialTasks)           // All available tasks
  const [openTasks, setOpenTasks] = useState<Task[]>([])            // Currently open tasks
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)  // Selected task
  const [isTimelineVisible, setIsTimelineVisible] = useState(true)   // Timeline visibility

  /**
   * Handles task selection from the explorer panel
   * - Opens the task if not already open
   * - Sets it as the active task
   * @param taskId - ID of the selected task
   */
  const handleTaskSelect = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    if (!openTasks.some(t => t.id === taskId)) {
      setOpenTasks(prev => [...prev, task])
    }
    setActiveTaskId(taskId)
  }

  /**
   * Handles tab selection in the main content area
   * @param taskId - ID of the task to activate
   */
  const handleTabSelect = (taskId: string) => {
    setActiveTaskId(taskId)
  }

  /**
   * Handles closing a task tab
   * - Removes task from open tasks
   * - Updates active task if necessary
   * @param taskId - ID of the task to close
   */
  const handleCloseTab = (taskId: string) => {
    setOpenTasks(prev => prev.filter(t => t.id !== taskId))
    if (activeTaskId === taskId) {
      setActiveTaskId(openTasks[openTasks.length - 2]?.id || null)
    }
  }

  /**
   * Handles task updates from any panel
   * - Updates task in both tasks and openTasks arrays
   * @param updatedTask - The modified task object
   */
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setOpenTasks(prev => prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  /**
   * Toggles the visibility of the timeline panel
   */
  const toggleTimeline = () => {
    setIsTimelineVisible(prev => !prev)
  }

  // Get the currently active task object
  const activeTask = tasks.find(t => t.id === activeTaskId)

  return (
    <div className="dashboard-container h-full flex flex-col">
      <div className="dashboard-content flex-1 flex">
        <div className="dashboard-panels flex-1">
          {/* Horizontal Panel Group for Main Layout */}
          <PanelGroup direction="horizontal">
            {/* Left Panel: Task Explorer */}
            <Panel defaultSize={20} minSize={15} maxSize={30}>
              <ExplorerPanel 
                tasks={tasks}
                onTaskSelect={handleTaskSelect}
                activeTaskId={activeTaskId}
              />
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-secondary hover:bg-accent transition-colors" />
            
            {/* Center Panel: Main Content */}
            <Panel defaultSize={60}>
              <MainContentPanel 
                openTasks={openTasks}
                activeTaskId={activeTaskId}
                onTabSelect={handleTabSelect}
                onCloseTab={handleCloseTab}
                onTaskUpdate={handleTaskUpdate}
              />
            </Panel>
            
            <PanelResizeHandle className="w-1 bg-secondary hover:bg-accent transition-colors" />
            
            {/* Right Panel: Task Properties */}
            <Panel defaultSize={20} minSize={15} maxSize={30}>
              <PropertiesPanel 
                task={activeTask}
                onTaskUpdate={handleTaskUpdate}
              />
            </Panel>
          </PanelGroup>
        </div>

        {/* Bottom Panel: Timeline (Optional) */}
        {isTimelineVisible && (
          <TimelinePanel 
            tasks={tasks}
            onClose={toggleTimeline}
            onMaximize={() => {
              // TODO: Implement maximize functionality
              console.log('Maximize timeline')
            }}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="status-bar flex items-center h-6 bg-primary border-t border-default px-2">
        <div 
          className="status-bar-item flex items-center gap-1 text-xs text-primary hover:text-accent cursor-pointer px-2 py-1"
          onClick={toggleTimeline}
          title={isTimelineVisible ? "Hide Timeline" : "Show Timeline"}
        >
          <Clock size={14} />
          <span>Timeline</span>
        </div>
      </div>
    </div>
  )
}

export default TaskFlowDashboard 