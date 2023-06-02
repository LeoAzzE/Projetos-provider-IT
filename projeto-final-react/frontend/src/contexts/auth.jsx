import { useState, useEffect, createContext } from 'react'
import { auth, db} from '../services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Password } from 'primereact/password'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {
        async function loadUser() {
            const storageUser = localStorage.getItem('@clients')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }
        loadUser()
    },[])

    async function signIn(email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value)=> {
            let uid = value.user.uid

            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success("bem vindo(a) de volta")
            navigate("/main")
        })
        .catch((error)=> {
            console.log(error)
            setLoadingAuth(false)
            toast.error("ops, algo deu errado!")
        })

    }


    async function signUp(name,password, email) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value)=> {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null,
            })
            .then(()=> {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success("Seja bem-vindo")
                navigate("/main")
            })
        })
        .catch((error)=> {
            console.log(error)
            setLoadingAuth(false)
        })
    }

    function storageUser(data) {
        localStorage.setItem('@clients', JSON.stringify(data))
    }

    async function logout() {
        await signOut(auth)
        localStorage.removeItem('@clients')
        setUser(null)
    }

    return (
        <AuthContext.Provider 
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logout,
                loadingAuth,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider