import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Friends from './routes/Friends';
import Posts from './routes/Posts';
import ProfileRoute from './routes/ProfileRoute';
import ButtonToTop from './components/ButtonToTop';

function PrivateRoutes() {


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
    <Footer />
    </>
  )
}

export default PrivateRoutes;