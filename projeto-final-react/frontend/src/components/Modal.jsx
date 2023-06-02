import { useEffect, useState } from 'react';
import './Modal.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import  validator  from "validator";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import {format, parse, parseISO} from 'date-fns'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Modal({close}){
    const[userName, setUserName] = useState('')
    const[userEmail, setUserEmail] = useState('')
    const[cpf, setCpf] = useState('')
    const[nasc, setNasc] = useState('')
    const [cep, setCep] = useState('')
    const[estado, setEstado] = useState(null)
    const [log, setLog] = useState(null)
    const [bairro, setBairro] = useState(null)
    const [cidade, setCidade] = useState(null)
    const [numero, setNumero] = useState(null)
    const [gender, setGender] = useState('')
    const [idCliente, setIdCliente] = useState(false)

    const { id } = useParams()
    const { register, handleSubmit, setFocus, setValue, formState: { errors }, reset} = useForm()

    let metodo = "post"

    if(id) {
        metodo = "put"
    }

        async function onSubmit(data) {
            fetch(`http://localhost:8080/clientes/${id ? id : ""}`, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)       
            }).then(()=> {              
              window.location = "/main"
                
            })
        } 

        useEffect(()=> {
            if (id) {
                setIdCliente(true)
                fetch(`http://localhost:8080/clientes/${id}`,{                   
                }).then((resp)=> {
                   return resp.json()
                }).then((data)=> {
                    reset(data)               
                    setNasc(format(parseISO(data.nascimento), 'yyyy-MM-dd'))
                    setUserName(data.nome)
                    setUserEmail(data.email)
                    setCpf(data.cpf)                                     
                    setCep(data.cep)
                    setEstado(data.estado)
                    setCidade(data.cidade)
                    setBairro(data.bairro)
                    setLog(data.logradouro)
                    setNumero(data.numero)
                    setGender(data.genero)
                    
                })
            }
        }, [id])

        // function getDate(data) {
        //     let today = new Date(data);
        //     let date = today.getFullYear() + '-' +
        //         (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
        //         today.getDate().toString().padStart(2, '0');
        //     let time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0');
        //     return date
        // }
        // function formatterDate(date, style = "short") {
        //     return new Intl.DateTimeFormat("pt-br", {
        //         dateStyle: style,
        //     }).format(date)
        // }
    
        function handleOptionChange(e) {
            setGender(e.target.value)
        }

    function cpfFormatter(cpf) {
        return cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
        }

    function cepFormatter(cep) {
        return cep.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    }



    async function cepComplete(e) {
        if (!e.target.value) {
            return;
        } else {
            const cep = e.target.value.replace(/\D/g, '')
            const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
            const response = await fetch(apiUrl)
            const data = await response.json()

            if (data.erro) {
                return
            }

            setValue('estado', data.uf)
            setValue('cidade', data.localidade)
            setValue('logradouro', data.logradouro)
            setValue('bairro', data.bairro)
            setFocus('numero')
        }
    }


    return (
        <div className="modall">
            <div className='container'>
                <h1 className='aga1'>{idCliente ? "Editar dados" : "Cadastrar Cliente"}</h1>
                <span className='lineCad'></span>
                <Link to={'/main'} >
                    <Button onClick={close} className='close' icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
                </Link>
                <main className='inputTexts'>
                        <div className='afastar'>
                            <span className="cli">
                                <label htmlFor="nome">Nome</label>
                                <InputText name='nome' autoFocus className={errors?.nome && "p-invalid"} {... register('nome', {required: true, minLength: 3})} value={userName} onChange={(e)=> setUserName(e.target.value)} size={15} id="username" />
                                {errors?.nome?.type === "required" && (<p className='erro-msg'>O Nome é obrigatorio</p>)}
                                {errors?.nome?.type === "minLength" && (<p className='erro-msg'>O Nome deve ter no minimo 3 caracteres</p>)}
                                
                            </span>
                            <span className="cli">
                                <label htmlFor="email">Email</label>
                                <InputText name='email' className={errors?.email && "p-invalid"} {... register('email', {required: true, validate: (value) => validator.isEmail(value)})} placeholder='example@ex.com' value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} size={15} id="useremail" />
                                {errors?.email?.type && (<p className='erro-msg'>Insira um e-mail válido</p>)}   
                            </span>
                            
                            <span className="cli">
                                <label htmlFor="nascimento">Nascimento</label>
                                <InputText name='nascimento' type='date' {... register('nascimento', {required: true})} className={errors?.nascimento && "p-invalid"} size={10} value={nasc} onChange={(e)=> setNasc(e.target.value)} />
                                {errors?.nascimento?.type && (<p className='erro-msg'>Insira uma data válida </p>)}                               
                            </span>                        
        
                        </div>
                        <div className='afastar2'>
                            <span className="cli">
                                <label htmlFor="cpf">CPF</label>
                                <InputText name='cpf' maxLength={14} keyfilter="int" {... register('cpf', {required: true, minLength: 14})} className={errors?.cpf && "p-invalid"} size={13} value={cpfFormatter(cpf)} onChange={(e) => setCpf(e.target.value)}   />
                                {errors?.cpf?.type && (<p className='erro-msg'>Insira um cpf válido</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="cep">CEP</label>
                                <InputText name='cep' maxLength={9} onKeyUp={cepComplete} {...register('cep', {required: true, minLength: 9})} className={errors?.cep && "p-invalid"}  size={13} onChange={(e)=> setCep(e.target.value)} value={cepFormatter(cep)} id="cep" />
                                {errors?.cep?.type && (<p className='erro-msg'>Insira um cep válido</p>)} 
                                
                            </span>
                            <span className="cli">
                                <label htmlFor="estado">Estado</label>
                                <InputText name='estado' className={errors?.estado && "p-invalid"} size={15} {... register('estado', {required: true,minLength: 2})} value={estado} onChange={(e)=> setEstado(e.target.value)} id="username" />
                                {errors?.estado?.type === "required" && (<p className='erro-msg'>O Estado é obrigatório</p>)}
                                {errors?.estado?.type === "minLength" && (<p className='erro-msg'>Mínimo 2 caracteres</p>)}
                            </span>
                        </div>
                        <div className='afastar3'>
                            <span className="cli">
                                <label htmlFor="cidade">Cidade</label>
                                <InputText name='cidade' className={errors?.cidadeCad && "p-invalid"} size={11} {... register('cidade', {required: true,minLength: 2})} value={cidade} onChange={(e)=> setCidade(e.target.value)} id="username" />
                                {errors?.cidade?.type && (<p className='erro-msg'>A cidade é obrigatória</p>)}
                                {errors?.cidade?.type === "minLength" && (<p className='erro-msg'>Mínimo 2 caracteres</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="bairro">Bairro</label>
                                <InputText name='bairro' className={errors?.bairro && "p-invalid"} size={12} {... register('bairro', {required: true})} id="username" value={bairro} onChange={(e)=> setBairro(e.target.value)} />
                                {errors?.bairro?.type && (<p className='erro-msg'>O bairro é obrigatório</p>)} 
                            </span>
                            <span className="cli">
                                <label htmlFor="logradouro">Logradouro</label>
                                <InputText name='logradouro' className={errors?.logCad && "p-invalid"} {... register('logradouro', {required: true, minLength: 2})} value={log} onChange={(e)=> setLog(e.target.value)} size={12} id="username" />
                                {errors?.logradouro?.type === "required" && (<p className='erro-msg'>mínimo 2 digitos</p>)}
                                {errors?.logradouro?.type === "minLength" && (<p className='erro-msg'>O Logradouro é obrigatório</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="numero">N°</label>
                                <InputText name='numero' className={errors?.numeroCad && "p-invalid"} {... register('numero', {required: true})} value={numero} onChange={(e)=> setNumero(e.target.value)} size={5} id="username" />
                                {errors?.numero?.type === "required" && (<p className='erro-msg'>O numero é obrigatório</p>)}
                            </span>
                        </div>

                        <div className='genderContainer'>
                            <div className='gender'>*Gênero:</div>
                                <div className='separator'>
                                    <div className='radioInputs'>
                                        <input checked={ gender === "masculino"} {... register('genero', {required: true, minLength: 3})} onChange={handleOptionChange} 
                                        value='masculino' type="radio" name="genero" id="" /> Masculino

                                        <input checked={ gender === "feminino"} {... register('genero', {required: true, minLength: 3})} onChange={handleOptionChange}  value='feminino' type="radio" name="genero" id="" /> Feminino

                                        <input checked={ gender === "outro"} {... register('genero', {required: true, minLength: 3})}onChange={handleOptionChange} type="radio" name="genero" id="" value="outro"/> Outro
                                    </div>
                                    <div className='error'>
                                        {errors?.genero && <p className='erro-msg'>O gênero é obrigatório</p>}
                                    </div>

                            </div>
                            
                        </div>
                        
                        <div className='btnCad'>
                            {idCliente ? <Button type='submit' onClick={()=> handleSubmit(onSubmit)()}
                            severity="help" size="normal" label="Editar"/>
                            : 
                             <Button type='submit' onClick={()=> handleSubmit(onSubmit)()}
                            style={{backgroundColor: '#85bb65'}} severity='Sucess' size="normal" label="Cadastrar"/>}

                        </div>
                    </main>    
            </div>
        </div>
    )
}