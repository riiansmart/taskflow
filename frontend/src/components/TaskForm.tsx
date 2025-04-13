// Reusable form for creating/editing tasks

import { useState } from 'react';
import { Task } from '../types/Task'; // Task type interface

interface Props {
  initialTask?: Task; // Optional pre-filled task
  onSave: (task: Task) => void; // Callback to save task
}

const TaskForm = ({ initialTask, onSave }: Props) => {
  const [task, setTask] = useState<Task>(initialTask || {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    completed: false,
    userId: 0,
  }); // State for form values

  // Handles field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handles form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task); // Pass task to parent
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
