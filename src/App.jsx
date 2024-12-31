// import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routers from "./routes"
import SearchProvider from './context/SearchProvider'
// import dotenv from 'dotenv'
// dotenv.config()
const App = () => {
  return (
    <SearchProvider>
      <BrowserRouter>
      <Routers />
    </BrowserRouter>
    </SearchProvider>

  )
}

export default App;