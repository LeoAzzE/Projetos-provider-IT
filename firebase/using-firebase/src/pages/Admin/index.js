import './admin.css'
import { useState } from 'react'
import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')

  function handleRegister(e) {
    e.preventDefault()
    alert('clicou')
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
