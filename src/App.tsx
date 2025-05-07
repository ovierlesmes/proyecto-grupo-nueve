import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PanelUsuario from './components/PanelUsuario';
import PanelVeterinario from './components/PanelVeterinario';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<PanelUsuario />} />
          <Route path="/panel-usuario" element={<PanelUsuario />} />
          <Route path="/panel-veterinario" element={<PanelVeterinario />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
