import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomeScreen, ListScreen } from '../screens'

const MyRouter = () => {
    return (
        <Routes>
            <Route path='/list' element={<ListScreen />} />
            <Route path='*' element={<HomeScreen />} />
        </Routes>
    )
}

export default MyRouter