import { useNavigate } from "react-router-dom";
import { useName } from "../../stores/useUserStore";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useName();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return children;
};
