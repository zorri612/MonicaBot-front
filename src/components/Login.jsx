import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Asegúrate de tener un archivo CSS para estilos
import { Link } from 'react-router-dom';


function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();

  try {
  const res = await axios.post(
    'https://monica-bot-back.vercel.app/api/auth/login',
    form,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  setMessage('Bienvenido ' + res.data.user.name);
  localStorage.setItem('token', res.data.token);
  navigate('/chat');
} catch (err) {
  setMessage(err.response?.data?.message || 'Error al iniciar sesión');
}
  }

  return (
    <div className="auth-container">
      <h2 > Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Ingresar</button>
        <center>
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </center>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
