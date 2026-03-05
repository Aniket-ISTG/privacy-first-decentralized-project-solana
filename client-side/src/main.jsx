import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import App from './App.jsx'
import SolanaWalletProvider from './WalletProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SolanaWalletProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          "--toastify-color-dark": "var(--bg-surface)",
        }}
      />
    </SolanaWalletProvider>
  </StrictMode>,
)
