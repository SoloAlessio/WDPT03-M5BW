import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element="" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
