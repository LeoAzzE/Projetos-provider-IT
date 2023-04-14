import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import Private from './Private'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/admin" element={<Private> <Admin /> </Private>}></Route>
    </Routes>
  )
}

export default RoutesApp
