import {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../contexts/auth'
import '../MainPage/MainPage.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import  Modal from '../../components/Modal'
import { collection, getDocs, query} from 'firebase/firestore'
import { db } from '../../services/firebase'

const listaRef = collection(db, "clientes")

function MainPage() {
    const { logout } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [listaClientes, setListaClientes] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
    })

    async function handleLogout() {
        await logout()
    }

    function handleOpenModal() {   
            setShowModal(true)
        }

        useEffect(() => {
            async function loadLista() {
                const q = query(listaRef)

                const querySnapshot = await getDocs(q)
                setListaClientes([])
                await updateList(querySnapshot)
            }

            loadLista()

            return () => {

            }
        },[])

        async function updateList(querySnapshot) {
            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                let lista = []

                querySnapshot.forEach(doc => {
                    lista.push({
                        nome: doc.data().nome,
                        email: doc.data().email,
                        nascimento: doc.data().nascimento,
                        cpf: doc.data().cpf,
                        cep: doc.data().cep,
                        endereco: doc.data().endereco,
                        genero: doc.data().gender
                    })
                });
                setListaClientes(clientes =>[...clientes, ...lista ])
            }
            else {
                
            }
        }

    return (
        <div>
            <div className='logout'>
                <Button style={{ fontSize: '15px' }} onClick={handleLogout} icon="pi pi-power-off" label="Sair" severity="danger" rounded size='normal' />
            </div>
            <div className='container'>
                <div className='inputZone'>
                    <InputText placeholder='Buscar palavra' onInput={(e)=> {
                        setFilters({
                            global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                        })
                    }}/>
                    <i className="pi pi-search" style={{width: '40px'}}></i>
                </div>    
                <DataTable value={listaClientes} filterDisplay="row" className='dataTable' filters={filters}>
                    <Column style={{ minWidth: '17rem', fontSize: '12px' }} showFilterMatchModes={false} filter field="nome" header="Nome"></Column>
                    <Column style={{ minWidth: '14rem', fontSize: '12px' }} showFilterMatchModes={false} filter field="email" header="Email"></Column>
                    <Column style={{ minWidth: '15rem', fontSize: '12px' }} showFilterMatchModes={false} filter field="cpf" header="CPF"></Column>
                    <Column style={{ minWidth: '13rem', fontSize: '12px' }} showFilterMatchModes={false} filter field="nascimento" header="Nascimento"></Column>
                    <Column style={{ minWidth: '17rem', fontSize: '12px' }} showFilterMatchModes={false} filter field="endereco" header="Endereco"></Column>
                    <Column style={{ minWidth: '14rem', fontSize: '12px' }} showFilterMatchModes={false} filter field="genero" header="Gênero"></Column>
                </DataTable>
                <div className='buttonInclude'>
                    <Button onClick={handleOpenModal} style={{backgroundColor: '#85bb65'}} severity='Sucess' size="normal" label="incluir" icon="pi pi-user-plus" />
                </div>
            </div>         
            {showModal && (<Modal close={()=> setShowModal(false)}/>) }
   
        </div>
    )
}

export default MainPage