import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyles />
      <Row>
        <Heading as="h1">Hello</Heading>
        <div>
          <Button>Hello</Button>
          <Button size="medium" variation="danger">
            world
          </Button>
        </div>
      </Row>
      <Row type="horizontal">
        <Heading as="h2">Hello</Heading>
        <div>
          <Button size="small" variation="secondary">
            Hello
          </Button>
          <Button size="large" variation="secondary">
            world
          </Button>
        </div>
      </Row>
      <Heading as="h3">Hello</Heading>
    </>
  );
}

export default App;
