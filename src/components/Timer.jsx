import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTimer } from "../redux/quizSlice";

const Timer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};

export default Timer;
