import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="searcher" element={<Home />} />
        <Route path="searcher/:entitys" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
