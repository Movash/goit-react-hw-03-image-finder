import { getImagesBySearch } from './../api/Images';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    images: [],
    error: '',
    isLoading: false,
    searchQuery: '',
    page: 1,
    isShowButton: false,
    hasLoadedImages: false,
    isShowModal: false,
    selectedImage: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.images !== this.state.images) {
      this.setState({ error: '' });
    }
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({
        isLoading: true,
        hasLoadedImages: false,
        isShowButton: false,
      });
      const data = await getImagesBySearch(
        this.state.searchQuery,
        this.state.page
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isShowButton: data.hits.length > 0,
      }));
      const numberOfPage = Math.ceil(data.totalHits / 12);
      if (this.state.page === numberOfPage) {
        this.setState({ isShowButton: false });
      }
    } catch ({ message }) {
      this.setState({ error: message });
    } finally {
      this.setState({ isLoading: false, hasLoadedImages: true });
    }
  };

  handleSetSearchQuery = value => {
    if (value.trim() !== '') {
    this.setState({ searchQuery: value, images: [], page: 1 });
    } else {
      Notify.info(`Write something`);
    }
  };

  handleMoreImage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = largeImageURL => {
    this.setState({
      isShowModal: !this.state.isShowModal,
      selectedImage: largeImageURL,
    });
  };

  // Як реалізувати блокування скролу за модалкою?
  // А ще виникає проблема якщо зробити 2 однакових запити поспіль і щось не так з іконкою пошуку

  // const scrollController = {
  // scrollPosition: 0,
  // disabledScroll() {
  //   scrollController.scrollPosition = window.scrollY;
  //   document.body.style.cssText = `
  //     overflow: hidden;
  //     position: fixed;
  //     top: -${scrollController.scrollPosition}px;
  //     left: 0;
  //     height: 100vh;
  //     width: 100vw;
  //     padding-right: ${window.innerWidth - document.body.offsetWidth}px
  //   `;
  //   document.documentElement.style.scrollBehavior = 'unset';
  // },
  // enabledScroll() {
  //   document.body.style.cssText = '';
  //   window.scroll({top: scrollController.scrollPosition})
  //   document.documentElement.style.scrollBehavior = '';
  // },
  // }

  render() {
    const {
      images,
      error,
      isLoading,
      hasLoadedImages,
      isShowButton,
      isShowModal,
      selectedImage,
    } = this.state;
    const { handleSetSearchQuery, handleMoreImage, toggleModal } = this;
    return (
      <div className="App">
        {error && <h1>{error}</h1>}
        <Searchbar onSubmit={handleSetSearchQuery} />
        {isLoading && <Loader />}
        {hasLoadedImages &&
          (!images.length ? (
            <h1>No data found</h1>
          ) : (
            <ImageGallery toggleModal={toggleModal} images={images} />
          ))}
        {isShowButton && <Button handleMoreImage={handleMoreImage} />}
        {isShowModal && (
          <Modal selectedImage={selectedImage} toggleModal={toggleModal} />
        )}
      </div>
    );
  }
}
