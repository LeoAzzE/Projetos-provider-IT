import { useEffect, useState } from 'react';
import './Modal.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import  validator  from "validator";
import { useForm } from "react-hook-form"
import { addDoc, collection} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../services/firebase'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import { useParams } from 'react-router-dom';



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
    const [gender, setGender] = useState(null)


    const { register, handleSubmit, setFocus, setValue, formState: { errors }} = useForm()
       
    async function onSubmit(data) {
        await addDoc(collection(db, "clientes") , {
            nome: data.nameCad,
            email: data.emailCad,
            nascimento: data.nascCad,
            cpf: data.cpfCad,
            cep: data.cepCad,
            estado: data.estCad,
            bairro: data.bairroCad,
            cidade: data.cidadeCad,
            logradouro: data.logCad,
            numero: data.numeroCad,          
            gender: data.gender
        })
        .then(()=> {
            toast.success('cliente cadastrado com sucesso')
            window.location.reload()
        })
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

    // function dateFormatter() {
    //     let dataAtual = new Date()
    //     let dia = String(dataAtual.getDate() - 1).padStart(2, '0')
    //     let mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    //     let ano = dataAtual.getFullYear()
    //     let date = ano + '-' + mes + '-' + dia
    //     return date
    // }
    
//    const teste=(snapshot)=> {
//         setNome(snapshot.data().nome)
//         setCpf(snapshot.data().cpf)
//         setCep(snapshot.data().cep)
//         setUserEmail(snapshot.data().email)
//         setLog(snapshot.data().endereco)
//         setNascimento(snapshot.data().nascimento)
//         setEst(snapshot.data().estado)
//         setGender(snapshot.data().gender)
//         setBairro(snapshot.data().bairro)
//         setCidade(snapshot.data().cidade)
//         setNumero(snapshot.data().numero)
//     }



    async function cepComplete(e) {
        if (!e.target.value) {
            return;
        } else {

            const cep = e.target.value.replace(/\D/g, '')
            const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
            const response = await fetch(apiUrl)
            const data = await response.json()

            setValue('estCad', data.uf)
            setValue('cidadeCad', data.localidade)
            setValue('logCad', data.logradouro)
            setValue('bairroCad', data.bairro)
            setFocus('numeroCad')
        }

            

    }

    return (
        <div className="modall">
            <div className='container'>
                <h1 className='aga1'>Cadastrar cliente</h1>
                <span className='lineCad'></span>
                <Button onClick={close} className='close' icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
                <main className='inputTexts'>
                        <div className='afastar'>
                            <span className="cli">
                                <label htmlFor="username">Nome</label>
                                <InputText className={errors?.nameCad && "p-invalid"} {... register('nameCad', {required: true, minLength: 3})} value={userName} onChange={(e)=> setUserName(e.target.value)} size={15} id="username" />
                                {errors?.nameCad?.type === "required" && (<p className='erro-msg'>O Nome é obrigatorio</p>)}
                                {errors?.nameCad?.type === "minLength" && (<p className='erro-msg'>O Nome deve ter no minimo 3 caracteres</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="email">Email</label>
                                <InputText className={errors?.emailCad && "p-invalid"} {... register('emailCad', {required: true, validate: (value) => validator.isEmail(value)})} value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} size={15} id="useremail" />
                                {errors?.emailCad?.type && (<p className='erro-msg'>Insira um e-mail válido</p>)}   
                            </span>
                            
                            <span className="cli">
                                <label htmlFor="username">Nascimento</label>
                                <InputText type='date' className={errors?.nascCad && "p-invalid"} size={10} {... register('nascCad', {required: true})} value={nasc} onChange={(e)=> setNasc(e.target.value)} id="usernasc" />
                                {errors?.nascCad?.type && (<p className='erro-msg'>Insira uma data válida</p>)} 
                            </span>
                            
                        </div>
                        <div className='afastar2'>
                            <span className="cli">
                                <label htmlFor="userCpf">CPF</label>
                                <InputText maxLength={14} keyfilter="int" {... register('cpfCad', {required: true, minLength: 14})} className={errors?.cpfCad && "p-invalid"} size={13} value={cpfFormatter(cpf)} onChange={(e) => setCpf(e.target.value)}  placeholder="CPF" />
                                {errors?.cpfCad?.type && (<p className='erro-msg'>Insira um cpf válido</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="userCep">CEP</label>
                                <InputText maxLength={9} onKeyUp={cepComplete} {...register('cepCad', {required: true, minLength: 9})} className={errors?.cepCad && "p-invalid"}  size={13} onChange={(e)=> setCep(e.target.value)} value={cepFormatter(cep)} id="cep" />
                                {errors?.cepCad?.type && (<p className='erro-msg'>Insira um cep válido</p>)} 
                                
                            </span>
                            <span className="cli">
                                <label htmlFor="username">Estado</label>
                                <InputText className={errors?.estCad && "p-invalid"} size={15} {... register('estCad', {required: true,minLength: 2})} value={estado} onChange={(e)=> setEstado(e.target.value)} id="username" />
                                {errors?.estCad?.type === "required" && (<p className='erro-msg'>O Estado é obrigatório</p>)}
                                {errors?.estCad?.type === "minLength" && (<p className='erro-msg'>Mínimo 2 caracteres</p>)}
                            </span>
                        </div>
                        <div className='afastar3'>
                            <span className="cli">
                                <label htmlFor="username">Cidade</label>
                                <InputText className={errors?.cidadeCad && "p-invalid"} size={11} {... register('cidadeCad', {required: true,minLength: 2})} value={cidade} onChange={(e)=> setCidade(e.target.value)} id="username" />
                                {errors?.cidadeCad?.type && (<p className='erro-msg'>A cidade é obrigatória</p>)}
                                {errors?.cidadeCad?.type === "minLength" && (<p className='erro-msg'>Mínimo 2 caracteres</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="username">Bairro</label>
                                <InputText className={errors?.bairroCad && "p-invalid"} size={12} {... register('bairroCad', {required: true})} id="username" value={bairro} onChange={(e)=> setBairro(e.target.value)} />
                                {errors?.bairroCad?.type && (<p className='erro-msg'>O bairro é obrigatório</p>)} 
                            </span>
                            <span className="cli">
                                <label htmlFor="username">Logradouro</label>
                                <InputText className={errors?.logCad && "p-invalid"} {... register('logCad', {required: true, minLength: 2})} value={log} onChange={(e)=> setLog(e.target.value)} size={12} id="username" />
                                {errors?.logCad?.type === "required" && (<p className='erro-msg'>mínimo 2 digitos</p>)}
                                {errors?.logCad?.type === "minLength" && (<p className='erro-msg'>O Logradouro é obrigatório</p>)}
                            </span>
                            <span className="cli">
                                <label htmlFor="username">N°</label>
                                <InputText className={errors?.numeroCad && "p-invalid"} {... register('numeroCad', {required: true})} value={numero} onChange={(e)=> setNumero(e.target.value)} size={5} id="username" />
                                {errors?.numeroCad?.type === "required" && (<p className='erro-msg'>O numero é obrigatório</p>)}
                            </span>
                        </div>

                        <div className='genderContainer'>
                            <div className='gender'>*Gênero:</div>
                                <div className='separator'>
                                    <div className='radioInputs'>
                                        <input {... register('gender', {required: true})}
                                        value='masculino' type="radio" name="gender" id="" /> Masculino
                                        <input {... register('gender', {required: true})} value='feminino' type="radio" name="gender" id="" /> Feminino
                                        <input {... register('gender', {required: true})} value='other' type="radio" name="gender" id="" /> Outro
                                    </div>
                                    <div className='error'>
                                        {errors?.gender && <p className='erro-msg'>O gênero é obrigatório</p>}
                                    </div>

                            </div>
                            
                        </div>
                        
                        <div className='btnCad'>
                        <Button onClick={()=> handleSubmit(onSubmit)()} type='submit'
                        style={{backgroundColor: '#85bb65'}} severity='Sucess' size="normal" label="Cadastrar"/>
                        </div>
                    </main>    
            </div>
        </div>
    )
}