import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'
import Home from '../pages/Auth/Home'
import AddEmployee from '../pages/Auth/AddEmployee'




const AllRoutes = () => {


    return (


        <>

            <BrowserRouter>
              
                <Routes>
                

                    
                   <Route path='/home' element={
                       <Home />
                    } />
                    <Route path='/' element={
                       <Register />
                    } />
                    <Route path='/login' element={
                        <Login />
                    } />
                     <Route path='/add-employee' element={
                        <AddEmployee />
                    } />
                 
                 





                     





                </Routes>

            </BrowserRouter>

        </>
    )
}

export default AllRoutes