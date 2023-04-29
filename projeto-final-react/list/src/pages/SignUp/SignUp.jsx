import { useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../contexts/auth'
import  validator  from "validator";
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import '../SignUp/SignUp.css'

export default function SignUp() {
const[userName, setUserName] = useState('')
const[userPassword, setUserPassword] = useState('')
const[userPassword2, setUserPassword2] = useState('')
const[email, setEmail] = useState('')
    
const { signUp, loadingAuth } = useContext(AuthContext)

const { register, handleSubmit, formState: { errors }, watch } = useForm()

 async function onSubmit(data){
    await signUp(data.name, data.password, data.email)
}

const watchPassword = watch("password");

    return (
        <div className="container-center">
            <div className='inputAreaa'>
                    <h1>CADASTRO</h1>
                    <div className='line'></div>
                    <span className="p-float-label">
                        <InputText className={errors?.name && "p-invalid"} {... register('name', {required: true, minLength: 3})} value={userName} onChange={(e)=> setUserName(e.target.value)} size={31} id="username" />
                        {errors?.name?.type === "required" && (<p className='error-msg'>O Nome é obrigatorio</p>)}
                        {errors?.name?.type === "minLength" && (<p className='error-msg'>Nome deve ter no minimo 3 caracteres</p>)}
                        <label htmlFor="username">Nome</label>
                    </span>
                    <span className="p-float-label">
                        <InputText maxLength='15' type='password' className={errors?.password && "p-invalid"} size={31} {...register("password", {required: true, minLength: 8})} id="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                        {errors?.password?.type === "required" && (<p className='error-msg'>A senha é obrigatória</p>)}
                        {errors?.password?.type === "minLength" && (<p className='error-msg'>A senha deve ter no mínimo 8 caracteres</p>)}
                        <label htmlFor="userpassword">Senha</label>
                    </span>
                    <span className="p-float-label">
                        <InputText maxLength='15' type='password' className={errors?.senha && "p-invalid"} size={31} {...register('senha', {required: true, minLength: 8, validate: (value) => value === watchPassword})} id="psw" value={userPassword2} onChange={(e) => setUserPassword2(e.target.value)} />
                        {errors?.senha?.type === "validate" && (<p className='error-msg'>As senhas não conferem</p>)}
                        {errors?.senha?.type === "required" && (<p className='error-msg'>A confirmação de senha é obrigatória</p>)}
                        {errors?.senha?.type === "minLength" && (<p className='error-msg'>A senha deve ter no mínimo 8 caracteres</p>)}
                        <label htmlFor="userpassword">Confirme sua senha</label>
                    </span>
                   
                    <span className="p-float-label">
                        <InputText className={errors?.email && "p-invalid"} {... register('email', {required: true, validate: (value) => validator.isEmail(value)})} value={email} onChange={(e)=> setEmail(e.target.value)} size={31} id="useremail" />
                        {errors?.email?.type && (<p className='error-msg'>Insira um e-mail válido</p>)}   
                        <label htmlFor="email">Email</label>
                    </span>
                    
                    <div>
                        <Button type='submit' onClick={()=> handleSubmit(onSubmit)()} className='button' label={loadingAuth ? 'Carregando...' : 
                    'Cadastrar'} severity="info" outlined />
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