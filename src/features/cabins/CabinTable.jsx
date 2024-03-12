import useCabin from "./useCabin";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isCabinsLoading, cabins } = useCabin();

  if (isCabinsLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  if (sortBy) {
    filteredCabins = filteredCabins.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "regularPrice-asc") {
        return a.regularPrice - b.regularPrice;
      } else if (sortBy === "regularPrice-desc") {
        return b.regularPrice - a.regularPrice;
      } else if (sortBy === "maxCapacity-asc") {
        return a.maxCapacity - b.maxCapacity;
      } else if (sortBy === "maxCapacity-desc") {
        return b.maxCapacity - a.maxCapacity;
      }
    });
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
