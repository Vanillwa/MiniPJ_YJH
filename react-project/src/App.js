/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import { useState } from 'react';
function App() {
    const [user, setUser] = useState(null);
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path='/' element={<Main></Main>}></Route>
                <Route path='/login' element={<Login setUser={setUser}></Login>}></Route>
            </Routes>
        </>
    );
}

export default App;
