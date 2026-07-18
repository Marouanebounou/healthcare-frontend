import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#f0f0f0' }}>
      <Link to="/">Accueil</Link>
      <Link to="/dashboard">Tableau de bord</Link>
      <Link to="/patients">Patients</Link>
      <Link to="/doctors">Médecins</Link>
      <Link to="/appointments">Rendez-vous</Link>
      <Link to="/records">Dossiers Médicaux</Link>
      <Link to="/about">À propos</Link>
    </nav>
  );
}