import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import Private from './Private'

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='register' element={<SignUp/>}/>
            <Route path='main' element={<Private><MainPage/></Private>}/>
        </Routes>
    )
}

export default RoutesApp