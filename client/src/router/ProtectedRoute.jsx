import {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export const ProtectedRoute = () => {

    // Get user authatication status 
    const {isUserAuth} = useSelector((state) => state.user)

    // Config navigate
    const navigate = useNavigate()

    useEffect(() => {
        if(!isUserAuth){
            navigate('/login')
            return
        }
    })
  
    return isUserAuth && <Outlet/>
  
}

