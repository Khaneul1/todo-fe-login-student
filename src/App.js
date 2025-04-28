import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './route/PrivateRoute';

function App() {
  // user 정보가 다른 여러 페이지에서 필요할 수 있기 때문에
  // 모든 페이지 정보를 가지고 있는 App 컴포넌트에 user 정의
  const [user, setUser] = useState(null);
  // user 값 가져오는 건? 토큰 값으로 ~~~

  // 0. 로그인을 했으면 토큰을 저장함
  const getUser = async () => {
    try {
      // f12 확인해 보면 token은 sesstionStroage에 있음!!
      const token = sessionStorage.getItem('token');
      // const response = api.get('user/????');
    } catch (error) {}
  };

  return (
    <Routes>
      {/* 보호해야 하는 페이지 (권한에 따라) : todo-page */}
      {/* PrivateRoute를 통과해야 TodoPage로 이동 */}
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

// 1-2. 현재 로그인한 유저가 누군지 로그인 유저 정보를 알아야 한다
// 2. 할 일 생성 시 author 값을 추가한다
// 3. 프론트엔드는 작성자 이름도 함께 보여준다
