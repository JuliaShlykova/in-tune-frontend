import { Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path='/*' element={<PrivateRoutes />} />
    </Routes>
    </>
  );
}

export default App;