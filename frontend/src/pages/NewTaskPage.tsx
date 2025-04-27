import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';
import { useAuth } from '../hooks/useAuth';
import { Task, Priority } from '../types/Task';
import { getCategories } from '../services/categoryService';
import { Category } from '../types/Category';

const NewTaskPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form state
  const [task, setTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM' as Priority,
    completed: false,
    userId: user?.id || 0,
  });

  // Load categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setTask({ ...task, [name]: checkbox.checked });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!task.title) {
      setError('Title is required');
      return;
    }
    
    if (!task.dueDate) {
      setError('Due date is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create the task
      await createTask(task);
      
      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="new-task-page">
      <div className="page-header">
        <h1 className="page-title">Create New Task</h1>
        <p className="page-description">Fill out the details below to create a new task</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-form-container">
        <form onSubmit={handleSubmit} className="task-form cyberpunk-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId" className="form-label">Category (Optional)</label>
            <select
              id="categoryId"
              name="categoryId"
              value={task.categoryId || ''}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">None</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i> Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskPage; 