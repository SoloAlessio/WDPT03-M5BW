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
import ChatArea from "./components/ChatArea/ChatArea";
import LoginForm from "./components/Login";

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
          <Route path="/login" element={<LoginForm />}/>
        </Routes>
        <MyFooter />
        <ChatArea />
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
