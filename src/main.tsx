import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import AuthContextProvider from './context/AuthContext.tsx'

const theme = extendTheme({
  initialColorMode: "system",
  useSystemColorMode: false,
  colors: {
    light: {},
    dark: {}
  }
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
