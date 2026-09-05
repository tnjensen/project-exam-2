import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ensureGuestSession } from "../../shared/apiClient";

export const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;
    ensureGuestSession()
      .then(() => {
        if (mounted) setStatus("ready");
      })
      .catch(() => {
        if (mounted) setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (status === "error") {
    return (
      <div style={{ padding: 40 }}>
        Kunne ikke koble til API-en. Prøv igjen litt senere.
      </div>
    );
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};