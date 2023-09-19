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
    isShowModal: false,
    selectedImage: '',
  };

  componentDidUpdate(_, prevState) {
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
        error: '',
        isShowButton: false,
      });
      const data = await getImagesBySearch(
        this.state.searchQuery,
        this.state.page
      );
      if (!data.hits.length) {
        Notify.info(`No images`);
        return
      }
      const numberOfPage = Math.ceil(data.totalHits / 12);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isShowButton: numberOfPage !== this.page,
      }));
    } catch ({ message }) {
      this.setState({ error: message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSetSearchQuery = value => {
    if (!value.trim() || value === this.state.searchQuery) {
      Notify.info(`Change your search query`)
      return
    }
    this.setState({ searchQuery: value, images: [], page: 1 });
  };

  handleMoreImage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = (largeImageURL = '') => {
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal,
      selectedImage: largeImageURL,
    }));
  };

  render() {
    const {
      images,
      error,
      isLoading,
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
        {!images.length ? null : <ImageGallery toggleModal={toggleModal} images={images} />}
        {isShowButton && <Button handleMoreImage={handleMoreImage} />}
        {isShowModal && (
          <Modal selectedImage={selectedImage} toggleModal={toggleModal} />
        )}
      </div>
    );
  }
}
