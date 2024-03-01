import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <Heading as="h1">Hello</Heading>
        <Heading as="h2">Hello</Heading>
        <Heading as="h3">Hello</Heading>
      </div>
    </>
  );
}

export default App;
