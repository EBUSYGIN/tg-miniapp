import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store/store';
import { useEffect } from 'react';
import { getUserById } from '../../entities/user/model/asyncActions';
import { getUserId } from '../../shared/lib';

export function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = getUserId();

  useEffect(() => {
    dispatch(getUserById('7'));
  }, []);

  return <div>Привет</div>;
}
