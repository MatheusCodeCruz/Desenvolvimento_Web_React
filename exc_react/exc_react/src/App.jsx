import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ListaBandas from './components/Bandas'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./components/css/index.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="title">
      <h1>Bandas Brabas</h1>
        <ListaBandas/>
    </div>
  )
}

export default App
