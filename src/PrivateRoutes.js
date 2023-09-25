import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Friends from './routes/Friends';
import Posts from './routes/Posts';
import ProfileRoute from './routes/ProfileRoute';
import ButtonToTop from './components/ButtonToTop';
import { useEffect } from 'react';
import { isJwtExpired } from 'jwt-check-expiration';
import { getLocalValue, clearLocal } from './localStorage';

function PrivateRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalValue('token');
    const user = getLocalValue('user');
    if (!token||isJwtExpired(token)||!user) {
      clearLocal();
      navigate('/login');
    }
  })

  return (
    <>
    <Header />
    <main>
    <Routes>
    <Route path="friends" element={<Friends />} />
    <Route path="" element={<Posts />} />
    <Route path=":userId/profile" element={<ProfileRoute/>} />
    <Route path="*" element={<Navigate to='/not-found' replace />} />
    </Routes>
    </main>
    <ButtonToTop />
    </>
  )
}

export default PrivateRoutes;