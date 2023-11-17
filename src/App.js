import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import MyFooter from "./components/Footer/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import ProfileDetail from "./components/ProfileDetail";
import { ToastContainer } from "react-toastify";
import WorkInProgress from "./components/WorkInProgress";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Profile" element={<Main />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/wip" element={<WorkInProgress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
