import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { userStatus, user } = useUser();

  // 2. While loading, show a loading indicator
  if (userStatus !== "success")
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const isAuthenticated = user && user.role === "authenticated";

  // 3. If the user is not authenticated, redirect to the login page
  if (userStatus === "success" && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 4. If the user is authenticated, render the children
  if (userStatus === "success" && isAuthenticated) {
    <Navigate to="/dashboard" />;
    return children;
  }
}

export default ProtectedRoute;
