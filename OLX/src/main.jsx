import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {FirebaseContext} from './store/Context.jsx'
import {app} from './firebase/config';
import {Context} from './store/Context.jsx'

createRoot(document.getElementById('root')).render(

    <FirebaseContext.Provider value={{app}}> 
      <Context>
      

        <App/>
        
      </Context>
    </FirebaseContext.Provider>

)
