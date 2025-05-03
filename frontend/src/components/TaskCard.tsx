// Display a task's info (title, due, priority)

import { Task } from '../types/task.types'

interface Props {
  task: Task
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

function TaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <div className="task-card bg-secondary border border-default rounded p-4 text-primary space-y-2">
      <h3 className="text-lg font-semibold text-primary">{task.title}</h3>
      <p className="text-sm text-secondary">{task.description}</p>
      <p className="text-sm text-secondary">Due: {task.dueDate}</p>
      <p className="text-sm text-secondary capitalize">Priority: {task.priority}</p>
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-accent text-primary px-3 py-1 rounded hover:bg-accent focus-ring-accent"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-primary border border-accent text-accent px-3 py-1 rounded hover:bg-secondary focus-ring-accent"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard