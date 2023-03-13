// Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import Home from "./components/Home";
import Error from "./components/Error";
import StockDetail from "./components/StockDetail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<StockDetail />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
