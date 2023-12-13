import { useEffect, useState } from "react";
import Searchbar from "./Searchbar/Searchbar";
import {fetchPictures} from "../API"
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";
import Container from "./Container.styled";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { Notify } from "notiflix";
import { nanoid } from "nanoid";

const App = () => {
    const [images, setImages] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);
    const [pictureInfo, setPictureInfo] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    
    useEffect(() => {
        if (searchValue || page!==1) {
            handleFetchPictures();
        } 
        
        async function handleFetchPictures() {
            try {
                const resp = await fetchPictures(searchValue, page);
                setImages((prevImages) => {
                    return [...prevImages, ...resp.data.hits.map((item) => {
                        item.id = nanoid();
                        return item;
                    })]
                })
            if (page === 1) {
                 if (resp.data.totalHits === 0) {
                    Notify.warning("There are no images to your request. Change search word!")
                    return;
                }
                 else if (resp.data.totalHits <= resp.data.hits.length) {
                     setIsLoadMore(false);
                    Notify.success(`Hooray! We found ${resp.data.totalHits} images`);
                    Notify.info("There are all found images");
                    return;
                }
                else {
                     setTotalHits(resp.data.totalHits);
                     setIsLoadMore(true);
                    Notify.success(`Hooray! We found ${resp.data.totalHits} images`)
                    return;
                }
            }
            }
        catch (error) {
            Notify.failure(`${error.message}`)
        }
        finally{
            setIsLoad(false);
        }
        
    }
    }, [searchValue, page]);

    function onSubmit(e) {
        e.preventDefault();
        if (searchValue === e.target.elements.search.value) return;
        setSearchValue(e.target.elements.search.value);
        setImages([]);
        setPage(1);
        setTotalHits(0);
        setIsLoad(true);
    }

     function handleClick(){
         setPage((prevPage) => prevPage += 1);
    }
    
    function handleOpenModal ({currentTarget, target}) {
        if (currentTarget === target) return;
        const picId = images.find((item) => (item.id === target.id));
        if (picId) {
            setPictureInfo(picId);
            setIsOpenModal(true)
        };
    }

     function closeModal ({ currentTarget, target, key}){
        if (currentTarget === target || key === "Escape") setIsOpenModal(false);
        return;
    }

    return (
            <Container>
                <Searchbar onSubmit={onSubmit} />
                {isLoad ? (<Loader styles="left: 50%"/>) : (<>
                    <ImageGallery onClick={handleOpenModal}>
                        <ImageGalleryItem array={images} />
                    </ImageGallery>
                    {(isLoadMore && images.length < totalHits) && (
                        <Button onClick={handleClick} />
                    )}
                    {(images.length >= totalHits && totalHits !== 0) && Notify.info("There are all found images))))")}
                </>)}
                {isOpenModal && (<Modal pictureInfo={pictureInfo} closeModal={closeModal}/>)}
            </Container>
        )



}
export default App;