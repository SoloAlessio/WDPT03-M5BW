import "./App.scss";
import MyFooter from "./components/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar'
import Main from "./Components/Main";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <Main/>
        <Routes>
          <Route path="/" element="" />
        </Routes>
      <MyFooter />
      </BrowserRouter>
    </div>
  )}



export default App;
