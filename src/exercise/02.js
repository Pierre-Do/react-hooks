// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useState} from 'react'

function readFromStorage(key) {
  const value = window.localStorage.getItem(key)
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    window.localStorage.removeItem(key)
    return value
  }
}

function writeToStorage(key, name) {
  window.localStorage.setItem(key, JSON.stringify(name))
}

function useLocalStorageState(key, initialValue = '') {
  const [state, setState] = useState('')

  useEffect(() => {
    setState(readFromStorage(key) || initialValue)
  }, [initialValue, key])

  useEffect(() => {
    writeToStorage(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
