// Import useModal context for modal management
import { useModal } from '../../context/Modal';

// Component for rendering a menu item that opens a modal
function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  // Track modal open state (currently unused)
  const isModalOpen = false;

  // Handles click event to open modal and trigger callbacks
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  // Render the menu item that triggers the modal
  return (
    <li onClick={onClick}>{itemText}</li>
  );
}

// Export the OpenModalMenuItem component
export default OpenModalMenuItem;
