import { useRef, useState } from 'react'

function App() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const formRefs = useRef({})
  const inputRefs = useRef({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted")
    }
  }

  const validate = () => {
    const newErrors = {}

    if (formRefs.current.username) formRefs.current.username.textContent = ""
    if (formRefs.current.email) formRefs.current.email.textContent = ""
    if (formRefs.current.password) formRefs.current.password.textContent = ""
    if (formRefs.current.confirmPassword) formRefs.current.confirmPassword.textContent = ""

    // Reset input styles
    Object.values(inputRefs.current).forEach((el) => {
      if (!el) return
      el.classList.remove("border-red-500", "focus:ring-red-500")
      el.classList.add("border-gray-600", "focus:border-indigo-400")
    })

    // for Username
    if (!form.username.trim()) {
      newErrors.username = "Username is required"
      if (formRefs.current.username) formRefs.current.username.textContent = newErrors.username
      if (inputRefs.current.username) {
        inputRefs.current.username.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.username.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    } else if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters"
      if (formRefs.current.username) formRefs.current.username.textContent = newErrors.username
      if (inputRefs.current.username) {
        inputRefs.current.username.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.username.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    }

    // for Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
      if (formRefs.current.email) formRefs.current.email.textContent = newErrors.email
      if (inputRefs.current.email) {
        inputRefs.current.email.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.email.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    } else if (!emailRegEx.test(form.email)) {
      newErrors.email = "Email is not Valid"
      if (formRefs.current.email) formRefs.current.email.textContent = newErrors.email
      if (inputRefs.current.email) {
        inputRefs.current.email.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.email.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    }

    // for Password
    if (!form.password.trim()) {
      newErrors.password = "Password is required"
      if (formRefs.current.password) formRefs.current.password.textContent = newErrors.password
      if (inputRefs.current.password) {
        inputRefs.current.password.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.password.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    } else if (form.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      if (formRefs.current.password) formRefs.current.password.textContent = newErrors.password
      if (inputRefs.current.password) {
        inputRefs.current.password.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.password.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    }

    // for Confirm Password
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required"
      if (formRefs.current.confirmPassword) formRefs.current.confirmPassword.textContent = newErrors.confirmPassword
      if (inputRefs.current.confirmPassword) {
        inputRefs.current.confirmPassword.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.confirmPassword.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match"
      if (formRefs.current.confirmPassword) formRefs.current.confirmPassword.textContent = newErrors.confirmPassword
      if (inputRefs.current.confirmPassword) {
        inputRefs.current.confirmPassword.classList.add("border-red-500", "focus:ring-red-500")
        inputRefs.current.confirmPassword.classList.remove("border-gray-600", "focus:border-indigo-400")
      }
    }

    return newErrors
  }

  return (
    <>
      <div className='h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex justify-center items-center'>
        <div className='w-[420px] bg-black/80 rounded-2xl p-8 shadow-xl shadow-black/50 backdrop-blur-md'>
          <h1 className='text-4xl font-extrabold text-center mb-6 text-indigo-400 drop-shadow-lg'>
            Form Validator
          </h1>

          <div>
            <form className='space-y-5' onSubmit={handleSubmit}>
              <div className='relative'>
                <label htmlFor="username" className='block text-lg font-medium mb-1'>Username</label>
                <input
                  type="text"
                  id="username"
                  name='username'
                  ref={el => inputRefs.current.username = el}
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200'
                  placeholder='Enter your username' value={form.username} onChange={handleChange}
                />
                <small className='absolute left-0 -bottom-5 text-xs text-red-500' ref={el => formRefs.current.username = el}></small>
              </div>

              <div className='relative'>
                <label htmlFor="email" className='block text-lg font-medium mb-1'>Email</label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  ref={el => inputRefs.current.email = el}
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200'
                  placeholder='Enter your email' value={form.email} onChange={handleChange}
                />
                <small className='absolute left-0 -bottom-5 text-xs text-red-500' ref={el => formRefs.current.email = el}></small>
              </div>

              <div className='relative'>
                <label htmlFor="password" className='block text-lg font-medium mb-1'>Password</label>
                <input
                  type="password"
                  id="password"
                  name='password'
                  ref={el => inputRefs.current.password = el}
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200'
                  placeholder='Enter your password' value={form.password} onChange={handleChange}
                />
                <small className='absolute left-0 -bottom-5 text-xs text-red-500' ref={el => formRefs.current.password = el}></small>
              </div>

              <div className='relative'>
                <label htmlFor="confirm-password" className='block text-lg font-medium mb-1'>Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name='confirmPassword'
                  ref={el => inputRefs.current.confirmPassword = el}
                  className='w-full rounded-lg bg-gray-900/70 border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 text-lg px-3 py-2 outline-none transition duration-200'
                  placeholder='Confirm password' value={form.confirmPassword} onChange={handleChange}
                />
                <small className='absolute left-0 -bottom-5 text-xs text-red-500' ref={el => formRefs.current.confirmPassword = el}></small>
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
