import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './components/Dashboard'
import { ProtectedComponents } from './components/ProtectedComponents'
import { Register } from './components/Register'
import { Login } from './components/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Login></Login>}></Route>
        <Route path={'/register'} element={<Register />}></Route>
        <Route path='/dashboard' element={<ProtectedComponents>
          <Dashboard />
        </ProtectedComponents>} />
        <Route path='/' element={<ProtectedComponents>
          <Dashboard />
        </ProtectedComponents>} />
        <Route path='*' element={<><h3>Erreur 404</h3><h4>Page introuvable</h4></>}/>
      </Routes>
    </>
  )
}

export default App
