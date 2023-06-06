import { Link, Route, Routes } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";

import Home from "pages/home";
import Login from "./components/Login";
import Register from "./components/Register";
import Setting from './pages/setting'

import 'react-toastify/dist/ReactToastify.css';
import Header from "components/Header";

function App() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
