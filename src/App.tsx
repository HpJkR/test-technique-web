import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EquipmentList from './components/EquipmentList';
import EquipmentDetail from './components/EquipmentDetail';
import React from 'react';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EquipmentList />} />
        <Route path="/equipments/:id" element={<EquipmentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
