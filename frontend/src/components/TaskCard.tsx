// Display a task's info (title, due, priority)

import { Task } from '../types/Task'; // Task type interface

interface Props {
  task: Task; // Task to display
  onEdit: (id: number) => void; // Callback for editing
  onDelete: (id: number) => void; // Callback for deleting
}

const TaskCard = ({ task, onEdit, onDelete }: Props) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3> {/* Display task title */}
      <p>{task.description}</p> {/* Display description */}
      <p>Due: {task.dueDate}</p> {/* Display due date */}
      <p>Priority: {task.priority}</p> {/* Display priority */}
      <button onClick={() => onEdit(task.id)}>Edit</button> {/* Trigger edit */}
      <button onClick={() => onDelete(task.id)}>Delete</button> {/* Trigger delete */}
    </div>
  );
};

export default TaskCard;