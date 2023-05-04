import {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../contexts/auth'
import '../MainPage/MainPage.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import  Modal from '../../components/Modal'
import { collection, getDocs, query, doc, deleteDoc, onSnapshot} from 'firebase/firestore'
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
                        id: doc.id,
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

        const actionBodyTemplate = (e) => {          
                return <span className="p-buttonset">          
                    <Button className='action' icon="pi pi-pencil" size="small"/>
                    <Button onClick={()=> deleteClient(e.id)} 
                    className='action' icon="pi pi-trash" size="small" severity="danger" />
                </span> 
            }
    
        async function deleteClient(id) {
            const docRef = doc(db, "clientes", id)
            await deleteDoc(docRef)
            window.location.reload()
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
                <DataTable
                 tableStyle={{ minWidth: '90rem'}} paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown' emptyMessage="Nenhum resultado encontrado" value={listaClientes} filterDisplay="row" className='dataTable'>
                    <Column style={{ minWidth: '17rem', fontSize: '15px', fontFamily: 'Cambria'}} sortable filter field="nome" header="Nome"></Column>
                    <Column style={{ minWidth: '14rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="email" header="Email"></Column>
                    <Column style={{ minWidth: '15rem', fontSize: '15px', fontFamily: 'Cambria' }} filter field="cpf" header="CPF"></Column>
                    <Column style={{ minWidth: '13rem', fontSize: '15px', fontFamily: 'Cambria' }} filter field="nascimento" header="Nascimento"></Column>
                    <Column style={{ minWidth: '17rem', fontSize: '15px', fontFamily: 'Cambria' }}  filter field="endereco" header="Endereco"></Column>
                    <Column style={{ minWidth: '14rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="genero" header="Gênero"></Column>
                    <Column style={{ minWidth: '12rem'}} field="id" body={actionBodyTemplate}></Column>              
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