import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Notes from '../pages/Notes';
import SingleNotes from '../pages/SingleNotes';
import PrivateRoute from './PrivateRoute';

function AllRoutes(props) {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/notes' element={<PrivateRoute><Notes/></PrivateRoute>}/>
            <Route path='/notes/:id' element={<PrivateRoute><SingleNotes/></PrivateRoute>}/>
        </Routes>
    );
}

export default AllRoutes;