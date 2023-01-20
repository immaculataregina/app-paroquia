import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}