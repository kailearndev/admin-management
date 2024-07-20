import { Navigate, Outlet } from 'react-router-dom';

const ProtectPage = () => {
    let token = localStorage.getItem('token')

    return token ? <Outlet /> : <Navigate to={'login'} replace />
};

export default ProtectPage;