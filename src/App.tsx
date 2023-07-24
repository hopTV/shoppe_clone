import './App.css'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function App() {
  const routeElement = useRouteElement()
  return (
    <div>
      <ToastContainer />
      {routeElement}
    </div>
  )
}

export default App
