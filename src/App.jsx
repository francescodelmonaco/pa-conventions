import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import { GlobalProvider } from "./contexts/GlobalContexts";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
};