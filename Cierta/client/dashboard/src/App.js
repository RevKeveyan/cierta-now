import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AdminChoicePage from './pages/AdminCoicePage';
import LoginPage from './pages/LoginPage';
import AddUserPage from './pages/AddUserPage';
import { useAuth } from './context/userContext';
import { useEffect, useState } from 'react';
import Menu from './componenets/navbar';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (token && user && user._id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    // Можно заменить на компонент загрузки
    return null;
  }

  return (
    <>
        {isLoggedIn && <Menu/>}
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {isLoggedIn ? (
        <>
      

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/choice" element={<AdminChoicePage />} />
          <Route path="/admin/add-user" element={<AddUserPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
    </>
  );
}

export default App;
