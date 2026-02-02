import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./components/MenuPage";
import OrdersPage from "./components/OrdersPage";
import Navbar from "./components/Navbar";
import BillPage from "./components/BillPage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/bill/:id" element={<BillPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
