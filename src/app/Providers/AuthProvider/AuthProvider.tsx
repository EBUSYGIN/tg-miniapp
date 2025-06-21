import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { getUserById } from '../../../entities/user/model/asyncActions';

export function AuthProvider() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  useEffect(() => {
    if (user.isRegistered === null) return;

    if (user.isRegistered === true) {
      if (user.profile?.is_admin) {
        navigate('/admin');
      } else {
        navigate('/main');
      }
    } else {
      navigate('/register');
    }
  }, [user, navigate]);

  console.log(user);

  return (
    <>
      <Outlet />
    </>
  );
}
