import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout, switchDemoRole } from '../store/authSlice';

export default function useAuth() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  return {
    ...auth,
    login: (payload) => dispatch(loginUser(payload)),
    logout: () => dispatch(logout()),
    switchRole: (role) => dispatch(switchDemoRole(role)),
  };
}
