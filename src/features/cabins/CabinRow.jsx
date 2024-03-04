import styled from "styled-components";
import { useState } from "react";
import useDeleteCabin from "./useDeleteCabin";

import { formatCurrency } from "../../utils/helpers";
import EditCabinForm from "./EditCabinForm";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useDuplicateCabin from "./useDuplicateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const [deleteCabinMutate, deleteStatus] = useDeleteCabin();
  const [duplicateCabinMutate, duplicateCabinStatus] = useDuplicateCabin();

  const isProcessing =
    deleteStatus === "pending" ||
    deleteStatus === "success" ||
    duplicateCabinStatus === "pending";
  function handleDuplicate() {
    duplicateCabinMutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isProcessing}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm(!showForm)}>
            <HiPencil />
          </button>
          <button
            disabled={isProcessing}
            onClick={() => deleteCabinMutate(cabinId)}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <EditCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
