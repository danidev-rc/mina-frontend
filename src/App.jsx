import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Usuarios from './pages/Usuarios'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/usuarios' element={<Usuarios />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App