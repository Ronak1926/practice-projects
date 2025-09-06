import {useEffect, useState, useRef} from 'react'
import { Copy, Check } from 'lucide-react'

const HomePage = () => {
  const [isUpperCaseAllowed, setIsUpperCaseAllowed] = useState(false)
  const [isLowerCaseAllowed, setIsLowerCaseAllowed] = useState(true)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isSymbolAllowed, setIsSymbolAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const copyRef = useRef(null)

  useEffect(()=>{
    if(!isUpperCaseAllowed && !isLowerCaseAllowed && !isNumberAllowed && !isSymbolAllowed){
      setPassword("")
      return
    }
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-="
    
    let genPassword = ""

    let allowedChars = []

    if(isUpperCaseAllowed) allowedChars.push(...uppercase)
    if(isLowerCaseAllowed) allowedChars.push(...lowercase)
    if(isNumberAllowed) allowedChars.push(...numbers)
    if(isSymbolAllowed) allowedChars.push(...symbols)
    
    for(let i=0; i<length; i++){
      const randomIndex = Math.floor(Math.random() * allowedChars.length)
      genPassword += allowedChars[randomIndex]
    }

    setPassword(genPassword)

  }, [isUpperCaseAllowed, isLowerCaseAllowed, isNumberAllowed, isSymbolAllowed, length])


  const handleCopy = () =>{
    navigator.clipboard.writeText(copyRef.current.value)
    setCopied(true)
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-4 dark:bg-gray-800 bg-white rounded shadow-md min-h-96 min-w-96 text-center'>
      <h1 className='text-2xl font-bold my-2'>Password generator</h1>

      <div className='flex gap-2'>
        <input type="text"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        disabled={true}
        className='border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 w-full text-xl'
        ref={copyRef}
        />
        <button onClick={handleCopy}>
           {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
        </button>
      </div>

      <div className='my-2 flex justify-between p-2'>
        <span className='text-xl'>Include UpperCase (A-Z)</span>
        <input type="checkbox" checked={isUpperCaseAllowed} onChange={() => setIsUpperCaseAllowed(!isUpperCaseAllowed)}/>
      </div>
      <div className='my-2 flex justify-between p-2'>
        <span className='text-xl'>Include LowerCase (a-z)</span>
        <input type="checkbox" checked={isLowerCaseAllowed} onChange={() => setIsLowerCaseAllowed(!isLowerCaseAllowed)}/>
      </div>
      <div className='my-2 flex justify-between p-2'>
        <span className='text-xl'>Include Numbers (0-9)</span>
        <input type="checkbox" checked={isNumberAllowed} onChange={() => setIsNumberAllowed(!isNumberAllowed)}/>
      </div>
      <div className='my-2 flex justify-between p-2'>
        <span className='text-xl'>Include Symbols (!@#$%^&*)</span>
        <input type="checkbox" checked={isSymbolAllowed} onChange={() => setIsSymbolAllowed(!isSymbolAllowed)}/>
      </div>
        
        <div className='w-full my-4 flex justify-between'>
          <div>
            <span className='text-[20px] px-2 py-1'>length :</span>
            <input type="range" min={8} max={24} value={length} onChange={(e) => setLength(e.target.value)} className='text-xl '/>

          </div>

          <span>{length}</span>

        </div>
      </div>
    </div>
  )
}

export default HomePage
