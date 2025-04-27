import { useState, useEffect } from 'react'
import { getTasks } from '../services/taskService'
import { useAuth } from '../hooks/useAuth'
import { Task, Priority } from '../types/Task'

export default function HomePage() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    
    setLoading(true)
    setError(null)
    
    getTasks()
      .then(response => {
        console.log('Tasks response:', response);
        // Check if response is an array or has a content property
        if (Array.isArray(response)) {
          setTasks(response);
        } else if (response && response.content) {
          setTasks(response.content);
        } else {
          console.error('Unexpected tasks response format:', response);
          setTasks([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
        setTasks([]);
        setLoading(false);
      });
  }, [token])

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  return (
    <div>
      <section className="welcome-section">
        <h1 className="welcome-text">Welcome back</h1>
        <p className="welcome-description">Here's a list of your tasks for this month</p>
      </section>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="toolbar">
        <div className="search-container">
          <i className="fas fa-search search-icon" />
          <input
            className="search-input"
            placeholder="Filter tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          {(['ALL', 'LOW', 'MEDIUM', 'HIGH'] as const).map(p => (
            <button
              key={p}
              className={`filter-button${filterPriority === p ? ' active' : ''}`}
              onClick={() => setFilterPriority(p)}
            >
              {p === 'ALL' ? 'Priority' : p}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-message">
          <i className="fas fa-spinner fa-spin"></i> Loading tasks...
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-message">
          <i className="fas fa-tasks"></i>
          <p>No tasks found. Create a new task to get started!</p>
        </div>
      ) : (
        <div className="task-list">
          <div className="task-list-header">
            <div className="task-list-header-item task-header-checkbox"><input type="checkbox" disabled /></div>
            <div className="task-list-header-item task-header-id sortable">#</div>
            <div className="task-list-header-item sortable">Title</div>
            <div className="task-list-header-item task-header-type sortable">Type</div>
            <div className="task-list-header-item sortable">Status</div>
            <div className="task-list-header-item sortable">Priority</div>
            <div className="task-list-header-item task-header-date sortable">Due Date</div>
            <div className="task-list-header-item task-header-actions">Actions</div>
          </div>
          <div className="task-list-body">
            {filteredTasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-cell task-cell-checkbox"><input type="checkbox" className="task-checkbox" checked={task.completed} readOnly /></div>
                <div className="task-cell task-cell-id"><span className="task-id">TASK-{task.id}</span></div>
                <div className="task-cell"><div className="task-title task-title-tooltip" data-tooltip={task.description}>{task.title}</div></div>
                <div className="task-cell task-cell-type"><span className="task-type"><i className="fas fa-tag task-type-icon" /> {task.categoryId ? 'Feature' : 'Bug'}</span></div>
                <div className="task-cell"><span className={`status-pill status-${task.completed ? 'done' : 'todo'}`}><i className={`fas fa-${task.completed ? 'check-circle' : 'circle-notch'}${task.completed ? '' : ' fa-spin'}`} /> {task.completed ? 'Done' : 'Todo'}</span></div>
                <div className="task-cell"><span className={`priority-indicator priority-${task.priority.toLowerCase()}`}><span className={`priority-dot dot-${task.priority.toLowerCase()}`}></span> {task.priority}</span></div>
                <div className="task-cell task-cell-date"><span className={`task-due${new Date(task.dueDate) < new Date() ? ' overdue' : ''}`}>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span></div>
                <div className="task-cell task-cell-actions">
                  <div className="action-buttons">
                    <button className="action-button edit-button"><i className="fas fa-edit" /></button>
                    <button className="action-button delete-button"><i className="fas fa-trash" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 