import "./App.scss";
import MyFooter from "./components/Footer/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar'
import Main from "./components/Main"
import NotFound from "./components/NotFound"
import ProfileDetail from "./components/ProfileDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Implementazione di pagina utente per ricerca navabar */}
          <Route path="/profile/:id" element={<ProfileDetail />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
