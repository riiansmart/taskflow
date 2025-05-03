import * as Select from '@radix-ui/react-select'
import { ChevronDown, Plus, X } from 'lucide-react'
import { Task, TaskPriority, TaskStatus } from '../types/task.types'
import '../styles/dropdown.css'
import '../styles/properties-panel.css'

interface PropertiesPanelProps {
  task: Task | undefined
  onTaskUpdate: (task: Task) => void
}

const users = [
  { id: '1', name: 'Alex Kim' },
  { id: '2', name: 'Morgan Smith' }
]

const priorities: TaskPriority[] = ['low', 'medium', 'high', 'critical']
const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done']
const points = [1, 2, 3, 5, 8, 13]

export function PropertiesPanel({ task, onTaskUpdate }: PropertiesPanelProps) {
  if (!task) {
    return (
      <div className="properties-panel">
        <div className="no-task">No task selected</div>
      </div>
    )
  }

  const handleStatusChange = (status: TaskStatus) => {
    onTaskUpdate({ ...task, status })
  }

  const handlePriorityChange = (priority: TaskPriority) => {
    onTaskUpdate({ ...task, priority })
  }

  const handlePointsChange = (points: string) => {
    onTaskUpdate({ ...task, storyPoints: parseInt(points, 10) })
  }

  const handleAssigneeChange = (assigneeId: string) => {
    const assignee = users.find(u => u.id === assigneeId)?.name || ''
    onTaskUpdate({ ...task, assignee })
  }

  const handleDateChange = (date: string) => {
    onTaskUpdate({ ...task, dueDate: date })
  }

  const handleAddLabel = (label: string) => {
    onTaskUpdate({ ...task, labels: [...(task.labels || []), label] })
  }

  const handleRemoveLabel = (label: string) => {
    onTaskUpdate({ ...task, labels: (task.labels || []).filter(l => l !== label) })
  }

  const handleAddDependency = (dependency: string) => {
    onTaskUpdate({ ...task, dependencies: [...(task.dependencies || []), dependency] })
  }

  const handleRemoveDependency = (dependency: string) => {
    onTaskUpdate({ 
      ...task, 
      dependencies: (task.dependencies || []).filter(d => d !== dependency)
    })
  }

  return (
    <div className="properties-panel">
      <div className="p-4 space-y-4">
        {/* Task ID */}
        <div className="property-section">
          <div className="property-label">ID</div>
          <div className="task-id">{task.id}</div>
        </div>

        {/* Status */}
        <div className="property-section">
          <div className="property-label">Status</div>
          <Select.Root value={task.status} onValueChange={handleStatusChange}>
            <Select.Trigger className="SelectTrigger" data-type="status">
              <Select.Value className="SelectValue">
                <div className={`status-indicator status-${task.status}`} />
                <span>{task.status.replace('-', ' ')}</span>
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDown />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.Viewport className="SelectViewport">
                  {statuses.map(status => (
                    <Select.Item
                      key={status}
                      value={status}
                      className="SelectItem"
                      data-type="status"
                    >
                      <div className={`status-indicator status-${status}`} />
                      <Select.ItemText>{status.replace('-', ' ')}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Assignee */}
        <div className="property-section">
          <div className="property-label">Assignee</div>
          <Select.Root value={users.find(u => u.name === task.assignee)?.id || ''} onValueChange={handleAssigneeChange}>
            <Select.Trigger className="SelectTrigger">
              <Select.Value className="SelectValue">
                <span>{task.assignee || 'Unassigned'}</span>
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDown />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.Viewport className="SelectViewport">
                  {users.map(user => (
                    <Select.Item
                      key={user.id}
                      value={user.id}
                      className="SelectItem"
                    >
                      <Select.ItemText>{user.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Priority */}
        <div className="property-section">
          <div className="property-label">Priority</div>
          <Select.Root value={task.priority} onValueChange={handlePriorityChange}>
            <Select.Trigger className="SelectTrigger" data-type="priority">
              <Select.Value className="SelectValue">
                <div className={`priority-indicator priority-${task.priority}`} />
                <span>{task.priority}</span>
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDown />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.Viewport className="SelectViewport">
                  {priorities.map(priority => (
                    <Select.Item
                      key={priority}
                      value={priority}
                      className="SelectItem"
                      data-type="priority"
                    >
                      <div className={`priority-indicator priority-${priority}`} />
                      <Select.ItemText>{priority}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Story Points */}
        <div className="property-section">
          <div className="property-label">Story Points</div>
          <Select.Root value={task.storyPoints.toString()} onValueChange={handlePointsChange}>
            <Select.Trigger className="SelectTrigger">
              <Select.Value className="SelectValue">
                <span>{task.storyPoints}</span>
              </Select.Value>
              <Select.Icon className="SelectIcon">
                <ChevronDown />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="SelectContent">
                <Select.Viewport className="SelectViewport">
                  {points.map(point => (
                    <Select.Item
                      key={point}
                      value={point.toString()}
                      className="SelectItem"
                    >
                      <Select.ItemText>{point}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Due Date */}
        <div className="property-section">
          <div className="property-label">Due Date</div>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="SelectTrigger"
          />
        </div>

        {/* Labels */}
        <div className="property-section">
          <div className="property-label">Labels</div>
          <div className="labels-container">
            {task.labels?.map(label => (
              <div key={label} className="label">
                {label}
                <button
                  onClick={() => handleRemoveLabel(label)}
                  className="label-remove"
                  aria-label={`Remove ${label} label`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddLabel('frontend')}
              className="add-label"
            >
              <Plus className="w-3 h-3" />
              Add label
            </button>
          </div>
        </div>

        {/* Dependencies */}
        <div className="property-section">
          <div className="property-label">Dependencies</div>
          <div className="space-y-2">
            {task.dependencies?.map(dep => (
              <div key={dep} className="dependency-item">
                <span>{dep}</span>
                <button
                  onClick={() => handleRemoveDependency(dep)}
                  className="dependency-remove"
                  aria-label={`Remove ${dep} dependency`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddDependency('TASK-7835')}
              className="add-dependency"
            >
              <Plus className="w-4 h-4" />
              Add dependency
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 