import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido/a a FerreMonica </h1>
      <h3>Inicia Sesion o Regístrate para continuar al Chat </h3>
      <div className="home-buttons">
        <Link to="/login" className="btn">Iniciar Sesión</Link>
        <Link to="/register" className="btn">Registrarse</Link>
      </div>
    </div>
  );
}

export default Home;
