import {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../contexts/auth'
import '../MainPage/MainPage.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode} from "primereact/api"
import { InputText } from "primereact/inputtext"
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'
import {format, parseISO, toDate} from 'date-fns'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import  Modal from '../../components/Modal'
import { collection, getDocs, query, doc, deleteDoc, orderBy} from 'firebase/firestore'
import { db } from '../../services/firebase'

const listaRef = collection(db, "clientes")

function MainPage() {
    const { logout } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [listaClientes, setListaClientes] = useState([])
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nome: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        cpf: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nascimento: {value: null, matchMode: FilterMatchMode.CONTAINS},
        endereco: {value: null, matchMode: FilterMatchMode.CONTAINS},
        genero: {value: null, matchMode: FilterMatchMode.CONTAINS}
    })
    

    async function handleLogout() {
        await logout()
    }

    function handleOpenModal() {   
            setShowModal(true)
        }

        useEffect(() => {
             async function loadLista() {
                const q = query(listaRef, orderBy('created', 'desc'))
                
                const querySnapshot = await getDocs(q)
                setListaClientes([])
                await updateState(querySnapshot)            
            }

            loadLista()

            return () => {
                }
        },[])



        async function updateState(querySnapshot) {
            const isCollectionEmpty = querySnapshot.size === 0
        
            if (!isCollectionEmpty) {
                let lista = []

                querySnapshot.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        email: doc.data().email,
                        //nascimento: doc.data().nascimento,
                        nascimento: format(parseISO(doc.data().nascimento), 'dd/MM/yyyy'),            
                        cpf: doc.data().cpf,
                        cep: doc.data().cep,
                        endereco: doc.data().cep + " ," + doc.data().estado + " ," + doc.data().cidade +
                        " ," + doc.data().bairro + " ," + doc.data().logradouro + " ," + doc.data().numero,
                        genero: doc.data().gender
                    })
                });
                setListaClientes(clientes =>[...clientes, ...lista ])              
            }
            
        }

        const actionBodyTemplate = (e) => {          
                return <span className="p-buttonset">     
                <Link to={`/main/${e.id}`}>
                    <Button onClick={()=> editData(e.id)} className='action' icon="pi pi-pencil" size="small"/>                 
                </Link>     
                    <Button onClick={()=> deleteClient(e.id)} 
                    className='action' icon="pi pi-trash" size="small" severity="danger" />
                </span> 
            }
    
        async function deleteClient(id) {
            const docRef = doc(db, "clientes", id)
            await deleteDoc(docRef)
            window.location.reload()
        }

        async function editData() {
            setShowModal(true)         
        }

        const onGlobalFilterChange = (e) => {
            const value = e.target.value;
            let _filters = { ...filters };
    
            _filters['global'].value = value;
    
            setFilters(_filters);
            setGlobalFilterValue(value);
        };


    return (
        <div>
            <div className='logout'>
                <Button style={{ fontSize: '15px' }} onClick={handleLogout} icon="pi pi-power-off" label="Sair" severity="danger" rounded size='normal' />
            </div>
            <div className='container'>
                <div className='inputZone'>
                    <InputText className='globalInput' placeholder='Buscar palavra' value={globalFilterValue} onChange={onGlobalFilterChange}/>
                    <i className="pi pi-search" style={{width: '40px'}}></i>
                </div>
    
                <DataTable filters={filters} paginator rows={3} rowsPerPageOptions={[1,2,3,10]} totalRecords={3}
                 tableStyle={{ minWidth: '90rem'}} emptyMessage="Nenhum resultado encontrado" value={listaClientes} filterDisplay="row" showGridlines className='dataTable'>

                    <Column filterField='nome' style={{ minWidth: '17rem', fontSize: '15px', fontFamily: 'Cambria'}} sortable filter field="nome" header="Nome"></Column>
                    <Column filterField='email' style={{ minWidth: '14rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="email" header="Email"></Column>
                    <Column filterField='cpf' style={{ minWidth: '15rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="cpf" header="CPF"></Column>
                    <Column filterField='nascimento'style={{ minWidth: '13rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="nascimento" header="Data de Nascimento"></Column>
                    <Column filterField='endereco' style={{ minWidth: '17rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="endereco" header="Endereco"></Column>
                    <Column filterField='genero' style={{ minWidth: '14rem', fontSize: '15px', fontFamily: 'Cambria' }} sortable filter field="genero" header="Gênero"></Column>
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