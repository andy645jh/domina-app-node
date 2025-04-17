import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Task from './pages/Task';
import Layout from './pages/Layout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="task" element={<Task />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
