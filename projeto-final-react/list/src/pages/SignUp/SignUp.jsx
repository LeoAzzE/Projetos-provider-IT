import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import '../SignUp/signup.css'

export default function SignUp() {
const[userName, setUserName] = useState('')
const[userPassword, setUserPassword] = useState('')
const[email, setEmail] = useState('')
    
const { register } = useForm()
// const onSubmit = () => {}

    return (
        <div className="container-center">
            <div className='inputAreaa'>
                    <h1>CADASTRO</h1>
                    <div className='line'></div>
                    <span className="p-float-label">
                        <InputText {... register('name')} value={userName} onChange={(e)=> setUserName(e.target.value)} size={31} id="username" />
                        <label htmlFor="username">Nome</label>
                    </span>
                    <span className="p-float-label">
                        <Password {... register('password')} toggleMask strongLabel="Boa" mediumLabel="Média" weakLabel="muito simples"value={userPassword} onChange={(e)=> setUserPassword(e.target.value)} size={27} inputId="password"/>
                        <label htmlFor="password">Senha</label>
                    </span>
                    <span className="p-float-label">
                        <Password {... register('password')} toggleMask strongLabel="Boa" mediumLabel="Média" weakLabel="muito simples"value={userPassword} onChange={(e)=> setUserPassword(e.target.value)} size={27} inputId="password"/>
                        <label htmlFor="password">Confirme sua senha</label>
                    </span>
                    <span className="p-float-label">
                        <InputText {... register('email')}value={email} onChange={(e)=> setEmail(e.target.value)} size={31} id="username" />
                        <label htmlFor="username">Email</label>
                    </span>
                    <div>
                        <Button className='button' label="Cadastrar" severity="info" outlined />
                    </div>
                    <div className='register'>
                        <div> Já possui uma conta?</div>
                        <Link className='link' to='/'>
                            <Button size='small' className='button' label="Faça login" severity="info" outlined />
                        </Link>
                    </div>
            </div>
        </div>
    )
}