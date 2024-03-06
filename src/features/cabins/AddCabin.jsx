import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="add-cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="add-cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

/*
/////////// MODAL Implementation v1

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>
        Add New Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

*/

export default AddCabin;
