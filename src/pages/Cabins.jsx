import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showCabinForm, setShowCabinForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setShowCabinForm(!showCabinForm)}>
        Add new cabin
      </Button>
      {showCabinForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
