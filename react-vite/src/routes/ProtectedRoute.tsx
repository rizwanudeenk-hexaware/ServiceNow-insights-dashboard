import path from 'path';
import { useAuth } from 'context/AuthContext'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import paths from './paths';
import PageLoader from 'components/loading/PageLoader';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {session, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && !session){
            navigate(paths.login,{replace: true}); // navigate to login page if no session is present
        }
    },[session, loading, navigate]);

    if(loading){
        return <PageLoader/>;
    }

    if(session){
        return <>{children}</>;
    }

    return null;
}

export default ProtectedRoute;