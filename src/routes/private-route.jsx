import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, login } from 'src/redux/authSlice';

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();



  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
