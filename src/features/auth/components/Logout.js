import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });

  // but useEffect runs after render, so navigating to login page after signing out the user
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}
export default Logout;
