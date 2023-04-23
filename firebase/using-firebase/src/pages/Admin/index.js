import './admin.css'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState('')

  useEffect(()=> {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse( userDetail))
    }
    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault()
    if (tarefaInput === '') {
      alert("digite sua tarefa")
      return 
    }
    await addDoc(collection(db,"tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(()=> {
      console.log('registrada')
      setTarefaInput('')
    })
    .catch((error)=> {
      console.log('error')
    })
  }

  async function handleLogout() {
    await signOut(auth)
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

        <button className="btn-register" type="submit">
          Registrar tarefa
        </button>
      </form>
      <article className="list">
        <p>Estudar JS e reactJS</p>
        <div>
          <button>Editar</button>
          <button className="btn-delete">Concluir</button>
        </div>
      </article>

      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>
    </div>
  )
}
