import { useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { IoSunnySharp } from 'react-icons/io5'
import { BsMoonStarsFill } from 'react-icons/bs'

const ToggleTheme = () => {
  const [isDark, setIsDark] = useLocalStorage('dark', true)

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    )
  }, [isDark])
  return (
    <button
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={toggleTheme}
    >
      {' '}
      {isDark ? (
        <BsMoonStarsFill size={'25px'} color='white' />
      ) : (
        <IoSunnySharp size={'25px'} color='bklack' />
      )}
    </button>
  )
}

export default ToggleTheme
