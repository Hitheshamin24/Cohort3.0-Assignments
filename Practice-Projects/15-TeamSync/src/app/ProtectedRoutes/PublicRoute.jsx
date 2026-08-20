import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
    let { employee, isLoading } = useSelector((store) => store.auth);

    if (isLoading) return null;

    if (employee) {
        return <Navigate to="/home" />
    }
  return (
    <div><Outlet/></div>
  )
}

export default PublicRoute