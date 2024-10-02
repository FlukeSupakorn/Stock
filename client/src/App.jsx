import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DairyOrder from './pages/StockManagement/DairyOrder';
import StockManagement from './pages/StockManagement/StockManagement';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DairyOrder />} />
        <Route path="/management" element={<StockManagement />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
