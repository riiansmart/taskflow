import { useState } from 'react'
import { loginUser, registerUser } from './services/authService'
import { getTasks } from './services/taskService'
import { Task } from './types/Task'
import './App.css'

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password })
      setToken(res.token)
      localStorage.setItem('token', res.token)
      alert('Login success!')
    } catch {
      alert('Login failed')
    }
  }

  const handleRegister = async () => {
    try {
      await registerUser({ name, email, password })
      alert('Registered successfully! You can now log in.')
      setAuthMode('login')
    } catch {
      alert('Registration failed')
    }
  }

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token)
      setTasks(data)
    } catch {
      alert('Fetch failed')
    }
  }

  return (
    <div className="app-container">
      <h1>TaskFlow Dev Test</h1>

      <div className="auth-toggle">
        <button
          className={authMode === 'login' ? 'active' : ''}
          onClick={() => setAuthMode('login')}
        >
          Login
        </button>
        <button
          className={authMode === 'register' ? 'active' : ''}
          onClick={() => setAuthMode('register')}
        >
          Register
        </button>
      </div>

      <div className="form">
        {authMode === 'register' && (
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={authMode === 'login' ? handleLogin : handleRegister}>
          {authMode === 'login' ? 'Login' : 'Register'}
        </button>
      </div>

      <div className="tasks-section">
        <h3>Fetch Tasks</h3>
        <button onClick={fetchTasks} disabled={!token}>Get Tasks</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.title} – {task.priority}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
