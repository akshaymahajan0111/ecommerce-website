import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const loogedInUser = useSelector(selectLoggedInUser);
  if (!loogedInUser) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}
