import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Pokedex } from './Pokedex'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} index />
      </Routes>
    </BrowserRouter>
  )
}

