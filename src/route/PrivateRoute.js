import React from 'react';
import { Navigate } from 'react-router-dom';

// children :: React에서 쓰는 props
// 한마디로 자식 컴포넌트를 의미함!!
// PrivateRoute 컴포넌트 안에 TodoPage 컴포넌트가 있으므로 이것이 children이 됨
const PrivateRoute = ({ user, children }) => {
  return (
    <div>
      {/* user값이 있으면 ? TodoPage : redirect to /login */}
      {/* PrivateRoute는 공용으로 사용할 수 있는 것이어야 함!! 한 페이지에만 국한되어서는 안 됨 */}
      user ? children : <Navigate to="/login" />
    </div>
  );
};
export default PrivateRoute;
