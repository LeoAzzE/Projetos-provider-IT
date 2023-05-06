import './admin.css'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([])
  const [edit, setEdit] = useState({})

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail)

        const tarefaRef = collection(db, 'tarefas')
        const q = query(
          tarefaRef,
          orderBy('created', 'desc'),
          where('userUid', '==', data?.uid)
        )
        const unsub = onSnapshot(q, snapshot => {
          let lista = []

          snapshot.forEach(doc => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
          setTarefas(lista)
        })
      }
    }

    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault()
    if (tarefaInput === '') {
      alert('digite sua tarefa')
      return
    }

    if (edit?.id) {
      handleUpdateTarefa()
      return
    }

    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        console.log('registrada')
        setTarefaInput('')
      })
      .catch(error => {
        console.log('error')
      })
  }

  async function handleLogout() {
    await signOut(auth)
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, 'tarefas', id)
    await deleteDoc(docRef)
  }

  function editTarefa(item) {
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, 'tarefas', edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
      .then(() => {
        setTarefaInput('')
        setEdit({})
      })
      .catch(() => {
        setTarefaInput('')
        setEdit({})
      })
  }

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>
      <form className="form" onSubmit={handleRegister}>
        <textarea
          onChange={e => setTarefaInput(e.target.value)}
          value={tarefaInput}
          placeholder="digite sua tarefa..."
        ></textarea>

        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" type="submit">
            Atualizar tarefa
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Registrar tarefa
          </button>
        )}
      </form>

      {tarefas.map(item => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>
          <div>
            <button onClick={() => editTarefa(item)}>Editar</button>
            <button
              onClick={() => deleteTarefa(item.id)}
              className="btn-delete"
            >
              Concluir
            </button>
          </div>
        </article>
      ))}

      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>
    </div>
  )
}