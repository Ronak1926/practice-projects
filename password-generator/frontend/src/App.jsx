import { useState,useEffect } from 'react'
import { Route,Routes, Navigate } from 'react-router-dom'
import SignupPage from './page/SignupPage'
import LoginPage from './page/LoginPage'
import HomePage from './page/HomePage'
import {useAuthStore} from "./store/authUser"
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import PasswordDescription from './page/PasswordDescription'

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black/45 h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/password_description' element={user ? <PasswordDescription /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster position='top-center' />
    </div>
  )
}

export default App

