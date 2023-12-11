import { Component } from "react";
import ModalStyled from "./Modal.styled";

class Modal extends Component{
    componentDidMount() {
       window.addEventListener('keydown', this.props.closeModal)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.props.closeModal)
    }
    render() {
        const { pictureInfo, closeModal } = this.props;
        return (
        <ModalStyled onClick={closeModal}>
            <div >
                <img src={pictureInfo.largeImageURL} alt={pictureInfo.tags}/>
            </div>
        </ModalStyled>)
    }
}
export default Modal;