// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonDataView,
  PokemonErrorBoundary,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({status: pokemonName ? 'pending' : 'idle'})

  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(data => {
        setState({status: 'resolved', pokemon: data})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  const {status, error, pokemon} = state
  switch (status) {
    default:
    case 'idle':
      return 'Submit a pokemon'
    case 'rejected':
      throw new Error(error.message)
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
