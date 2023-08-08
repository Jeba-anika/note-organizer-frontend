import './App.css'
import MainLayout from './layouts/MainLayout'
import { useEffect } from 'react'
import { useAppDispatch } from './redux/hook'
import { setUser } from './redux/features/user/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    const id = localStorage.getItem("id")
    if (token && email && id) {
      const payload = {
        accessToken: token,
        email,
        _id: id
      }
      dispatch(setUser(payload))
    }
  }, [dispatch])


  return (
    <>
      <MainLayout />
      <ToastContainer />
    </>
  )
}

export default App
