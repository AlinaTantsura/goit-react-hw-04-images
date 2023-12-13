import { useEffect } from "react";
import ModalStyled from "./Modal.styled";

const Modal = ({ pictureInfo, closeModal }) => {
    useEffect(() => {
        window.addEventListener('keydown', closeModal);

        return () => {
            window.removeEventListener('keydown', closeModal)
        }
    }, [closeModal])
    
    return (
        <ModalStyled onClick={closeModal}>
            <div >
                <img src={pictureInfo.largeImageURL} alt={pictureInfo.tags}/>
            </div>
        </ModalStyled>)
}
export default Modal;