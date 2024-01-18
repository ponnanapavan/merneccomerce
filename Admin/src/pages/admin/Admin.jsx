import React from 'react'
import './admin.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../components/addproduct/AddProduct'
import ListProduct from '../../components/listproduct/ListProduct'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}></Route>
        <Route path='/listproduct' element={<ListProduct/>}></Route>
      </Routes>
    </div>
  )
}

export default Admin
