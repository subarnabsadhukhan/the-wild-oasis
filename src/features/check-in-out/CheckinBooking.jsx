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
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { isSettingsLoading, settings } = useSettings();
  const { checkInMutate, checkInStatus } = useCheckIn();
  const moveBack = useMoveBack();

  const { booking, isBookingLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState("unconfirmed");

  if (isBookingLoading || isSettingsLoading) {
    return <Spinner />;
  }

  const { breakfastPrice } = settings;

  const {
    id: bookingId,
    guests: { fullName },
    isPaid,
    totalPrice,
    numGuests,
    numNights,
    hasBreakfast,
    status,
  } = booking;

  const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (addBreakfast === "confirmed") {
      checkInMutate({
        bookingId,
        addBreakfast: {
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkInMutate({ bookingId, addBreakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast === "confirmed"}
            onChange={() =>
              setAddBreakfast((breakfast) =>
                breakfast === "unconfirmed"
                  ? "confirmed"
                  : breakfast === "confirmed"
                  ? "no-need"
                  : "confirmed"
              )
            }
          >
            Want to add breakfast for ${optionalBreakfastPrice}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          checked={
            (isPaid &&
              (addBreakfast === "unconfirmed" || addBreakfast === "no-need")) ||
            confirmPaid
          }
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={
            isPaid &&
            (addBreakfast === "unconfirmed" || addBreakfast === "no-need")
          }
        >
          I confirm that <b>{fullName}</b> has paid the total amount of{" "}
          {addBreakfast === "confirmed"
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            disabled={
              (addBreakfast === "unconfirmed"
                ? !confirmPaid && !isPaid
                : !confirmPaid) ||
              checkInStatus === "pending" ||
              status === "checked-in"
            }
            onClick={handleCheckin}
          >
            Check in booking #{bookingId}
          </Button>
        )}
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
