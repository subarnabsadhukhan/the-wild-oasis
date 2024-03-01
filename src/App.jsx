import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  color: red;
  font-size: 4rem;
  background-color: blue;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <H1>Hello</H1>
      </div>
    </>
  );
}

export default App;
