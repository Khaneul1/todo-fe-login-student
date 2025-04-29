import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './route/PrivateRoute';
import api from './utils/api';

function App() {
  // user 정보가 다른 여러 페이지에서 필요할 수 있기 때문에
  // 모든 페이지 정보를 가지고 있는 App 컴포넌트에 user 정의
  const [user, setUser] = useState(null);
  // user 값 가져오는 건? 토큰 값으로 ~~~

  // 0. 로그인을 했으면 토큰을 저장함
  // 토큰값을 읽어오는 함수 getUser
  const getUser = async () => {
    //getUser의 목표 : 토큰을 통해 유저 정보를 가져온다
    try {
      // f12 확인해 보면 token은 sesstionStroage에 있음!!
      // LoginPage에 token에 값을 넣어 줬기 때문에 불러올 때도 token이라 해 줘야 함
      const StoredToken = sessionStorage.getItem('token'); //이미 저장되어 있는 토큰 가지고 올 것
      if (StoredToken) {
        // api.defaults.headers['authorization'] = 'Bearer ' + StoredToken;
        // 여기서 해도 좋지만 api.js에 하는 것도 좋음
        // 맨 처음 앱 세팅할 때 해 줘도 좋으니까
        const response = await api.get('/user/me'); //api 호출
        // 유저 정보 저장
        setUser(response.data.user);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      setUser(null);
    }
  };

  // useEffect : React Hook
  // useEffect(funtcion, deps)
  useEffect(() => {
    // 웹사이트 시작하자마자 권한이 있는 사용자인지 확인
    getUser();
  }, []);

  return (
    <Routes>
      {/* 보호해야 하는 페이지 (권한에 따라) : todo-page */}
      {/* PrivateRoute를 통과해야 TodoPage로 이동 */}

      {/* 유저 정보 있다 -> 투두 페이지 */}
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      {/* 유저 정보 없다 -> 로그인 페이지 */}
      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;

// 1-2. 현재 로그인한 유저가 누군지 로그인 유저 정보를 알아야 한다
// 2. 할 일 생성 시 author 값을 추가한다
// 3. 프론트엔드는 작성자 이름도 함께 보여준다
