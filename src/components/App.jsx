import { Component } from "react";
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

class App extends Component{
    state={
        imagesArray: [],
        searchValue: '',
        isLoad: false,
        page: 1,
        totalHits: 0,
        pictureInfo: null,
        isOpenModal: false,
    }

    componentDidUpdate(_, prevState) {
        if (prevState.searchValue !== this.state.searchValue ) {
            this.setState({
                isLoad: true,
                page: 1,
                totalHits: 0,
                imagesArray:[],
            });
            this.handleFetchPictures();
            
        }
        
        if (prevState.page !== this.state.page && this.state.page !==1) {
            this.handleFetchPictures();
        }
    } 

    handleFetchPictures = async() => {
        try {
            const resp = await fetchPictures(this.state.searchValue, this.state.page);
            // this.setState((prev)=>({imagesArray: [...prev.imagesArray, ...resp.data.hits]}))
            // this.setState((prev) => ({ imagesArray: [...prev.imagesArray, ...resp.data.hits.filter((item) => (!this.state.imagesArray.find(({ id }) => id === item.id)))] }))
            this.setState((prev) => ({
                imagesArray: [...prev.imagesArray, ...resp.data.hits.map((item) => {
                        item.id = nanoid();
                        return item; 
                })]
            }))
           
            if (this.state.page === 1) {
                if (resp.data.totalHits === 0 || resp.data.hits.length === 0) {
                    Notify.warning("There are no images to your request. Change search word!")
                    return;
                }
                else if (resp.data.totalHits <= resp.data.hits.length) {
                    Notify.success(`Hooray! We found ${resp.data.totalHits} images`);
                    Notify.info("There are all found images");
                    return;    
                }
                else {
                    this.setState({
                        totalHits: resp.data.totalHits,
                        isLoadMore: true,
                    })
                    Notify.success(`Hooray! We found ${resp.data.totalHits} images`)
                    return;
                }
            }  
            }
        catch (error) {
            Notify.failure(`${error.message}`)
        }
        finally{
            this.setState({
                isLoad: false,
            })
        }
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchValue === e.target.elements.search.value) return;
        this.setState({ searchValue: e.target.elements.search.value, imagesArray: [], page: 1 });
    }
    handleClick = () => {
        let page = this.state.page;
        this.setState({ page: page += 1 });
    }
    
    handleOpenModal = ({currentTarget, target}) => {
        if (currentTarget === target) return;
        const picId = this.state.imagesArray.find((item) => (item.id === target.id));
        this.setState({
            pictureInfo: picId ,
            isOpenModal: true,
        });
    }

    closeModal = (e) => {
        const { currentTarget, target } = e;
        if (currentTarget === target || e.key === "Escape") this.setState({ isOpenModal: false });
        return;
    }

    
    render() {
      const  { isLoad, imagesArray, totalHits, isOpenModal, pictureInfo } = this.state;
        return (
            <Container>
                <Searchbar onSubmit={this.onSubmit} />
                {isLoad ? (<Loader styles="left: 50%"/>) : (<>
                    <ImageGallery onClick={this.handleOpenModal}>
                        <ImageGalleryItem array={imagesArray} />
                    </ImageGallery>
                    {(imagesArray.length < totalHits && totalHits !== 0) && (
                        <Button onClick={this.handleClick} />
                    )}
                    {(imagesArray.length >= totalHits && totalHits !== 0) && Notify.info("There are all found images))))")}
                </>)}
                {isOpenModal && (<Modal pictureInfo={pictureInfo} closeModal={this.closeModal} />)}
            </Container>
        )
    }
}
export default App;