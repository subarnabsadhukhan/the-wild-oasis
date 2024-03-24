import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isDateLoading, bookings } = useRecentBookings();
  const { isStaysLoading, stays, confirmedStays, numdays } = useRecentStays();

  const { isCabinsLoading, cabins } = useCabin();

  if (isDateLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numdays={numdays}
        numCabins={cabins.length}
      />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numdays={numdays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
