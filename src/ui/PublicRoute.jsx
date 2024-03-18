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

function PublicRoute({ children }) {
  const { userStatus, user } = useUser();

  if (userStatus !== "success")
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  const isAuthenticated = user && user.role === "authenticated";

  if (userStatus === "success" && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PublicRoute;
