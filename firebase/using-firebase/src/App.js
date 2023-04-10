import { useState, useEffect } from 'react'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'
import { db, auth } from './firebaseConnection'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import './app.css'

function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')
  const [posts, setPosts] = useState([])
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, 'posts'), snapshot => {
        let listaPost = []

        snapshot.forEach(doc => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(listaPost)
      })
    }
    loadPosts()
  }, [])

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, user => {
        if (user) {
          setUser(true)
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
        } else {
          setUser(false)
          setUserDetail({})
        }
      })
    }
    checkLogin()
  }, [])

  async function handleAdd() {
    // await setDoc(doc(db, 'posts', '12345'), {
    //   titulo: titulo,
    //   autor: autor
    // })
    //   .then(() => {
    //     console.log('dados registrados')
    //   })
    //   .catch(error => {
    //     console.log('deu erro' + error)
    //   })

    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        console.log('cadastrado com sucesso')
        setAutor('')
        setTitulo('')
      })
      .catch(error => {
        console.log('Erro ' + error)
      })
  }

  async function buscarPost() {
    // const postRef = doc(db, 'posts', "XeRe2hLDy3qdOU1kGtwC")

    // await getDoc(postRef)
    //   .then(snapshot => {
    //     setAutor(snapshot.data().autor)
    //     setTitulo(snapshot.data().titulo)
    //   })
    //   .catch(() => {
    //     console.log('erro ao buscar')
    //   })

    const postsRef = collection(db, 'posts')
    await getDocs(postsRef)
      .then(snapshot => {
        let lista = []

        snapshot.forEach(doc => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(lista)
      })
      .catch(error => {})
  }

  async function editarPost() {
    const docRef = doc(db, 'posts', idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
      .then(() => {
        setIdPost('')
        setAutor('')
        setTitulo('')
      })
      .catch(() => {})
  }

  async function excluirPost(id) {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(value => {
        setEmail('')
        setSenha('')
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          alert('senha muito fraca')
        } else if (error.code === 'auth/email-already-in-use') {
          alert('email ja existe')
        }
      })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then(value => {
        alert('logado com sucesso')

        setUserDetail({
          uid: value.user.uid,
          email: value.user.email
        })
        setUser(true)
        setEmail('')
        setSenha('')
      })
      .catch(() => {
        alert('erro ao logar')
      })
  }

  async function fazerLogout() {
    await signOut(auth)
    setUser(false)
    setUserDetail({})
  }

  return (
    <div>
      {user && (
        <div>
          <strong>seja bem vindo(a) (voce esta logado)</strong>
          <br />
          <span>
            ID: {userDetail.uid} - Email: {userDetail.email}
          </span>
          <button onClick={fazerLogout}>Sair da conta</button>
          <br />
          <br />
          <br />
        </div>
      )}
      <div className="container">
        <h2>Usuarios</h2>
        <label>Email</label>
        <input
          placeholder="digite seu email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
        <br />

        <label>Senha</label>
        <input
          placeholder="informe sua senha"
          onChange={e => setSenha(e.target.value)}
          value={senha}
        ></input>
        <br />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer login</button>
      </div>

      <br />
      <br />
      <hr />

      <div className="container">
        <h2>POSTS</h2>
        <label>ID do post:</label>
        <input
          onChange={e => setIdPost(e.target.value)}
          value={idPost}
          placeholder="digite o id do post"
        ></input>{' '}
        <br />
        <label>Titulo:</label>
        <textarea
          onChange={e => setTitulo(e.target.value)}
          value={titulo}
          type="text"
          placeholder="digite o tiulo"
        ></textarea>
        <label>Autor:</label>
        <input
          onChange={e => setAutor(e.target.value)}
          value={autor}
          type="text"
          placeholder="Autor do post"
        ></input>
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button> <br />
        <button onClick={editarPost}>Atualizar Post</button>
        <ul>
          {posts.map(post => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
                <br />
                <br />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
