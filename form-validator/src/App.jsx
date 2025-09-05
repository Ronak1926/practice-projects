import { useState } from 'react'

function App() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })


  return (
    <>
      <div className='h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex justify-center items-center'>
        <div className='w-[420px] bg-black/80 rounded-2xl p-8 shadow-xl shadow-black/50 backdrop-blur-md'>
          <h1 className='text-4xl font-extrabold text-center mb-6 text-indigo-400 drop-shadow-lg'>
            Form Validator
          </h1>

          <div>
            <form className='space-y-5'>
              <div>
                <label htmlFor="username" className='block text-lg font-medium mb-1'>Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200' 
                  placeholder='Enter your username' 
                />
              </div>

              <div>
                <label htmlFor="email" className='block text-lg font-medium mb-1'>Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200' 
                  placeholder='Enter your email' 
                />
              </div>

              <div>
                <label htmlFor="password" className='block text-lg font-medium mb-1'>Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200' 
                  placeholder='Enter your password' 
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className='block text-lg font-medium mb-1'>Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200' 
                  placeholder='Confirm password' 
                />
              </div>
              <div className='mt-4 text-center'>
                <button className='w-full bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-lg shadow-indigo-500/50 transition duration-200'>
                  Submit
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
