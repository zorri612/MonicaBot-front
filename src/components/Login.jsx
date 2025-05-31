import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Asegúrate de tener un archivo CSS para estilos


function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://monica-bot-back.vercel.app/api/auth/login', form);
      setMessage('Bienvenido ' + res.data.user.name);
      localStorage.setItem('token', res.data.token); // Puedes guardar también el nombre/email si quieres
      navigate('/chat'); // redirigir al componente de chat
      
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al iniciar sesión');
    }

    
    navigate('/chat'); // Redirigir al chat después de iniciar sesión
  };

  return (
    <div className="auth-container">
      <h2 > Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Ingresar</button>
        <center><p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p></center>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
