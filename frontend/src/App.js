import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Reviews from "./pages/Reviews";
import Answers from "./pages/Answers";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/answers" element={<Answers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
