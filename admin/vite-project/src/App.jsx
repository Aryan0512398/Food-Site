import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import  List  from './pages/List/List.jsx'
import Order  from './pages/Order/Order.jsx'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar></Navbar>
      <hr />
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/add' element={<Add url={url}></Add>}></Route>
          <Route path='/order' element={<Order url={url}></Order>}></Route>
          <Route path='/list' element={<List url={url}></List>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
