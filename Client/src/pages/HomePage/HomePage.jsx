import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const { token, logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate.push('/login');
    };

    return (
        <div className='home-page'>
            <h1>Bienvenido a TravelNotes</h1>
            <h2>¡Descubre los lugares más increíbles para viajar!</h2>
            <nav className='buttons'>
                {user && <h3>"Bienvenido {user.username}"</h3>}
                {!token && (
                    <>
                        <div className='button-login'>
                            <NavLink className='clickable-button' to='/login'>
                                Login
                            </NavLink>
                        </div>
                        <div className='button-register'>
                            <NavLink
                                className='clickable-button'
                                to='/register'
                            >
                                Registro
                            </NavLink>
                        </div>
                    </>
                )}
                {token && (
                    <>
                        <div className='button-message'>
                            <NavLink className='clickable-button' to='/message'>
                                Nueva Nota
                            </NavLink>
                        </div>
                        <div className='button-notes'>
                            <NavLink className='clickable-button' to='/notes'>
                                Ver Notas
                            </NavLink>
                        </div>
                        <div className='button-logout'>
                            <NavLink
                                className='clickable-button'
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </NavLink>
                        </div>
                    </>
                )}
            </nav>
        </div>
    );
};

export default HomePage;
