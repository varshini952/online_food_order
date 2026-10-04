import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registered: ${form.username}`);
  };

  return (
    <div style={styles.wrap}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account 🍔</h2>
        <input style={styles.input} type="text" name="username" placeholder="Username"
          value={form.username} onChange={handleChange} required />
        <input style={styles.input} type="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} required />
        <input style={styles.input} type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} required />
        <button style={styles.btn} type="submit">Register</button>
        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
      </form>
    </div>
  );
}

const styles = {
  wrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#fff8f3', fontFamily: "'Segoe UI', Arial, sans-serif" },
  card: { background: '#fff', padding: '36px', borderRadius: '14px', width: '320px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  title: { textAlign: 'center', marginBottom: '20px', color: '#222' },
  input: { width: '100%', padding: '12px', marginBottom: '14px', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#ff5200', color: '#fff',
    border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' },
  text: { textAlign: 'center', marginTop: '14px', fontSize: '13px', color: '#666' },
  link: { color: '#ff5200', fontWeight: 700, textDecoration: 'none' },
  backLink: { display: 'block', textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#999', textDecoration: 'none' },
};

export default Register;