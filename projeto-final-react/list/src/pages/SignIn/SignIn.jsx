import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import '../SignIn/SignIn.css'

export default function SignIn() {

    const[userName, setUserName] = useState('')
    const[userPassword, setuserPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    function handleSignIn(e) {
        e.preventDefault()
        alert('teste')

        if (userName !== '' && userPassword !== '') {
            signIn(userName, userPassword)
        }
    }


    return (
        <div className="container-center">
            <div className='inputArea'>
                <h1>LOGIN</h1>
                <div className='line'></div>
                <span className="p-float-label">
                    <InputText value={userName} onChange={(e)=> setUserName(e.target.value)} size={31} id="username" />
                    <label htmlFor="username">Usuário</label>
                </span>
                <span className="p-float-label">
                    <Password toggleMask strongLabel="Boa" mediumLabel="Média" weakLabel="muito simples"value={userPassword} onChange={(e)=> setuserPassword(e.target.value)} size={27} inputId="password"/>
                    <label htmlFor="password">Senha</label>
                </span>
                <div>
                    <Button onClick={handleSignIn} className='button' label="Login" severity="info" outlined />
                </div>

                <div className='register'>
                    <div> Ainda não possui uma conta?</div>
                    <Link className='link' to='/register'>
                        <Button size='small' className='button' label="Cadastre-se" severity="info" outlined />
                    </Link>
                </div>
            </div>
        
        </div>
    )
}