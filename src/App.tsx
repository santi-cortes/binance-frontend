import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { DetailPage } from "./pages/DetailPage";
import { FormPage } from "./pages/FormPage";
import { Header } from "./components/Header";

export const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/detail/:symbol" element={<DetailPage />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  </BrowserRouter>
);
