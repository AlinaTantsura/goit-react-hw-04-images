import Gallery from "./Gallery.styled";

const ImageGallery = ({onClick, children}) => {
    return (
        <Gallery onClick={onClick}>{children}</Gallery>
    )
    
}
export default ImageGallery;