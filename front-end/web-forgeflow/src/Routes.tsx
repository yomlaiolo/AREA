import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Loginpage } from './pages/Loginpage';
import { NotFoundpage } from './pages/NotFoundpage';

export const My_Routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </Router>
  );
}