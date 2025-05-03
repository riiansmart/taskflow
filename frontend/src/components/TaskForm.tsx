// Reusable form for creating/editing tasks

import { useState } from 'react'
import { Task } from '../types/task.types'

interface Props {
  initialTask?: Task; // Optional pre-filled task
  onSave: (task: Task) => void; // Callback to save task
}

const TaskForm = ({ initialTask, onSave }: Props) => {
  const [task, setTask] = useState<Task>(
    initialTask || {
      id: crypto.randomUUID(),
      title: '',
      type: 'feature',
      status: 'todo',
      priority: 'medium',
      description: '',
      dueDate: '',
      assignee: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  )

  // Handles field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  // Handles form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(task)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form flex flex-col gap-3 p-4 bg-secondary border border-default rounded"
    >
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="bg-primary text-primary border border-default rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="bg-primary text-primary border border-default rounded px-2 py-1 h-24 resize-y focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        className="bg-primary text-primary border border-default rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="bg-primary text-primary border border-default rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="self-start bg-accent text-primary px-3 py-1 rounded hover:bg-accent focus:ring-2 focus:ring-accent focus:outline-none"
      >
        Save Task
      </button>
    </form>
  )
}

export default TaskForm
