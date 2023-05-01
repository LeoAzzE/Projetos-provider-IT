import { useState } from 'react';
import './Modal.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";


export default function Modal(){
    const [closeModal, setCloseModal] = useState(true)

    function handleCloseModal() {
        if(closeModal) {
            setCloseModal(false)
        }
        else {
            setCloseModal(true)
        }
    }

    return (
        <div className={(closeModal) ? "modall" : "none"}>
            <div className='container'>
                <h1 className='aga1'>Cadastrar cliente</h1>
                <span className='lineCad'></span>
                <Button onClick={handleCloseModal} className='close' icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
                <main className='inputTexts'>
                    <div className='afastar'>
                        <span className="p-float-label">
                            <InputText size={15} id="username" />
                            <label htmlFor="username">Nome</label>
                        </span>
                        <span className="p-float-label">
                            <InputText size={15} id="username" />
                            <label htmlFor="username">E-mail</label>
                        </span>
                    </div>
                    <div className='afastar2'>
                        <span className="p-float-label">
                            <InputText size={15} id="username" />
                            <label htmlFor="username">CPF</label>
                        </span>
                        <span className="p-float-label">
                            <InputText size={15} id="username" />
                            <label htmlFor="username">Nascimento</label>
                        </span>
                    </div>
                    <div className='afastar3'>
                        <span className="p-float-label">
                            <InputText size={15} id="username" />
                            <label htmlFor="username">Endereco</label>
                        </span>
                        <span className="p-float-label">
                            <InputText size={15} id="username" />
                            <label htmlFor="username">Gênero</label>
                        </span>
                    </div>
                    <div className='btnCad'>
                    <Button
                    style={{backgroundColor: '#85bb65'}} severity='Sucess' size="normal" label="Cadastrar"/>
                    </div>
                </main>
            </div>
        </div>
    )
}