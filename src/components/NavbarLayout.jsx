import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function NavbarLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </>
  );
}