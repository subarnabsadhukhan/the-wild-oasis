import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { checkOutMutate, checkOutStatus } = useCheckOut();
  const { isBookingLoading, booking } = useBooking();
  const [deleteBookingMutate, deleteStatus] = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isBookingLoading) {
    return <Spinner />;
  }
  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkIn/${bookingId}`)}>
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            disabled={
              checkOutStatus === "pending" || checkOutStatus === "success"
            }
            onClick={() => checkOutMutate(bookingId)}
          >
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={() =>
                deleteBookingMutate(bookingId, {
                  onSuccess: () => {
                    navigate("/bookings");
                  },
                })
              }
              disabled={
                deleteStatus === "pending" || deleteStatus === "success"
              }
            />
          </Modal.Window>
        </Modal>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
