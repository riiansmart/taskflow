import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import { Layout } from './components/Layout'

function App() {
  const { user } = useAuth()
  console.log('App rendering with user:', user);
  
  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/register"
        element={!user ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
