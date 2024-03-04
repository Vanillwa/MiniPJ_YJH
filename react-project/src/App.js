/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
function App() {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path='/' element={<Main></Main>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
            </Routes>
        </>
    );
}

export default App;
