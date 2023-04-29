import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='register' element={<SignUp/>}/>
            <Route path='main' element={<MainPage/>}/>
        </Routes>
    )
}

export default RoutesApp