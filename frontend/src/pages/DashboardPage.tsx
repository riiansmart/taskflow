// List of tasks with filter/sort UI

import TaskCard from '../components/TaskCard';
import { useTasks } from '../hooks/useTasks';

const DashboardPage = () => {
  const { tasks, loading, error } = useTasks(); // Fetch user tasks

  return (
    <div>
      <h1>Your Tasks</h1>
      {loading && <p>Loading tasks...</p>}  {/* Show loading */}
      {error && <p>{error}</p>}              {/* Show error */}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={() => {}} onDelete={() => {}} />
      ))} {/* Render all tasks */}
    </div>
  );
};

export default DashboardPage;