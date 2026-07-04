import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
      <BrowserRouter>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
            },
            success: {
              style: { background: "#2563eb", color: "#fff" },
            },
            error: {
              style: { background: "#ef4444", color: "#fff" },
            },
          }}
        />
      </BrowserRouter>
    </>
  )
}

export default App
