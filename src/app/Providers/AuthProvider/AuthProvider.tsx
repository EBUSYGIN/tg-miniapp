import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { getUserById } from '../../../entities/user/model/asyncActions';

export function AuthProvider() {
  const isRegistered = useSelector(
    (state: RootState) => state.user.isRegistered
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  useEffect(() => {
    if (isRegistered === null) return;

    if (isRegistered === true) {
      navigate('/main');
    } else {
      navigate('/register');
    }
  }, [isRegistered]);

  return (
    <>
      <Outlet />
    </>
  );
}
