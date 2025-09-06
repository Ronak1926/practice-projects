import { useEffect, useState, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const HomePage = () => {
  const [isUpperCaseAllowed, setIsUpperCaseAllowed] = useState(false)
  const [isLowerCaseAllowed, setIsLowerCaseAllowed] = useState(true)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isSymbolAllowed, setIsSymbolAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const copyRef = useRef(null)
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const handleSaveNavigate = () => {
    if (!password) return;
    if (!user) {
      navigate("/login");
    } else {
      navigate("/password_description", { state: { password } });
    }
  };
  useEffect(() => {
    if (!isUpperCaseAllowed && !isLowerCaseAllowed && !isNumberAllowed && !isSymbolAllowed) {
      setPassword("")
      return
    }
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-="

    let genPassword = ""

    let allowedChars = []

    if (isUpperCaseAllowed) allowedChars.push(...uppercase)
    if (isLowerCaseAllowed) allowedChars.push(...lowercase)
    if (isNumberAllowed) allowedChars.push(...numbers)
    if (isSymbolAllowed) allowedChars.push(...symbols)

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length)
      genPassword += allowedChars[randomIndex]
    }

    setPassword(genPassword)

  }, [isUpperCaseAllowed, isLowerCaseAllowed, isNumberAllowed, isSymbolAllowed, length])


  const handleCopy = () => {
    navigator.clipboard.writeText(copyRef.current.value)
    setCopied(true)
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  // Simple strength calculation based on length and variety
  const strength = (() => {
    let score = 0
    if (length >= 10) score++
    if (length >= 14) score++
    const variety = [isUpperCaseAllowed, isLowerCaseAllowed, isNumberAllowed, isSymbolAllowed].filter(Boolean).length
    score += Math.max(0, variety - 1) // adds up to +3
    if (!password) score = 0
    const clamp = Math.min(4, Math.max(0, score))
    console.log(clamp)
    const label = ["Very weak", "Weak", "Fair", "Strong", "Very strong"][clamp]
    const color = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"][clamp]
    return { score: clamp, label, color }
  })()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-gray-100">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl md:p-10">
          <div className="mb-6 text-center md:mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Password Generator</h1>
            <p className="mt-2 text-sm text-gray-300">Create secure, unique passwords with customizable options.</p>
          </div>

          {/* Password Display */}
          <div className="mb-6 flex items-stretch gap-3">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              readOnly
              ref={copyRef}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-mono text-lg tracking-wider text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Your secure password will appear here"
            />
            <button
              onClick={handleCopy}
              aria-label="Copy password"
              className={`group inline-flex items-center justify-center rounded-xl border px-4 text-sm font-medium transition ${copied
                  ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200'
                  : 'border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30'
                }`}
            >
              {copied ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="h-5 w-5" /> Copied
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Copy className="h-5 w-5" /> Copy
                </span>
              )}
            </button>

            <button
              onClick={handleSaveNavigate}
              disabled={!password}
              className="group inline-flex items-center justify-center rounded-xl border px-4 text-sm font-medium transition border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30 disabled:opacity-50"
            >
              Save
            </button>
          </div>

          {/* Strength Meter */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-gray-300">Strength</span>
              <span className="text-gray-200">{strength.label}</span>
              {/* strength.label from the above function */}
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-full flex-1 ${i <= strength.score - 1 ? strength.color : 'bg-white/10'} ${i !== 3 ? 'mr-1' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-sm md:text-base">Include Uppercase (A-Z)</span>
              <input
                type="checkbox"
                className="h-5 w-5 accent-indigo-500"
                checked={isUpperCaseAllowed}
                onChange={() => setIsUpperCaseAllowed(!isUpperCaseAllowed)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-sm md:text-base">Include Lowercase (a-z)</span>
              <input
                type="checkbox"
                className="h-5 w-5 accent-indigo-500"
                checked={isLowerCaseAllowed}
                onChange={() => setIsLowerCaseAllowed(!isLowerCaseAllowed)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-sm md:text-base">Include Numbers (0-9)</span>
              <input
                type="checkbox"
                className="h-5 w-5 accent-indigo-500"
                checked={isNumberAllowed}
                onChange={() => setIsNumberAllowed(!isNumberAllowed)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="text-sm md:text-base">Include Symbols (!@#$%^&*)</span>
              <input
                type="checkbox"
                className="h-5 w-5 accent-indigo-500"
                checked={isSymbolAllowed}
                onChange={() => setIsSymbolAllowed(!isSymbolAllowed)}
              />
            </label>
          </div>

          {/* Length Slider */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-300">Length</span>
              <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium">{length}</span>
            </div>
            <input
              type="range"
              min={8}
              max={24}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 [accent-color:#6366f1]"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>8</span>
              <span>24</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">Tip: Use at least 14 characters with letters, numbers and symbols for a strong password.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
