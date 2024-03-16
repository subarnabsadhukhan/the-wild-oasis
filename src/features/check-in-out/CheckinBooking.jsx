import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { checkInMutate, checkInStatus } = useCheckIn();
  const moveBack = useMoveBack();

  const { booking, isBookingLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);

  if (isBookingLoading) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests: { fullName },
    isPaid,
    totalPrice,
  } = booking;

  function handleCheckin() {
    if (isPaid || confirmPaid) {
      checkInMutate(bookingId);
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="confirm"
          checked={isPaid ? true : confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={isPaid}
        >
          I confirm that <b>{fullName}</b> has paid the total amount of{" "}
          {formatCurrency(totalPrice)}.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={(!isPaid && !confirmPaid) || checkInStatus === "pending"}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button
          disabled={checkInStatus === "pending"}
          $variation="secondary"
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
