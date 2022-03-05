import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { changeBackground } from '../../store/slices/theme-slice';

const Backgorund = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeBackground(props.imageName));
  }, [dispatch, props.imageName]);
  return (
      <></>
  );
};

export default Backgorund;
