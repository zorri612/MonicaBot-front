import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post(
      'https://monica-bot-back.vercel.app/api/auth/register', // usa esta si estás en producción
      form,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    setMessage(res.data.message);
    navigate('/login'); // redirigir al componente de login después de registrarse
  } catch (err) {
    setMessage(err.response?.data?.message || 'Error registrando');
  }
};


  return (
    <div className="auth-container">
      <h2 >Registro pa ya</h2>
      <form onSubmit={handleSubmit}>
        <p>Ingresa el nombre con el que te identificará el Chatbot</p>
        <input name="name" placeholder="Sofia" onChange={handleChange} required />
        <p>Ingresa el correo para guardar los mensajes</p>
        <input name="email" type="email" placeholder="sofiachat@usuario.com" onChange={handleChange} required />
        <p>Ingresa la contraseña con la que3 ingresarás</p>
        <input name="password" type="password" placeholder="abc123" onChange={handleChange} required />
        <button type="submit">Registrar</button>
        <center>
          <p>
            ¿Ya tienes una cuenta? <Link to="/register">Inicia sesión</Link>
          </p>
        </center>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
