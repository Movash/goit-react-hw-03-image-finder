import { getImagesBySearch } from './../api/Images';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { InfinitySpin } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    error: '',
    isLoading: false,
    searchQuery: '',
    page: 1,
    isVisible: false,
    hasLoadedImages: false,
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
      this.setState({ isLoading: true });
      const data = await getImagesBySearch(
        this.state.searchQuery,
        this.state.page
      );
      // this.setState({ images: data.hits });
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        hasLoadedImages: true,
      }));
      // const numberOfPage = Math.ceil(data.totalHits / 12);
      // if (this.state.page === numberOfPage) {
      //   this.setState({isVisible: false})
      // }
    } catch ({ message }) {
      this.setState({ error: message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSetSearchQuery = value => {
    this.setState({ searchQuery: value, images: [], page: 1 });
  };

  handleMoreImage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { images, error, isLoading, hasLoadedImages, isVisible } = this.state;
    const { handleSetSearchQuery, handleMoreImage } = this;
    return (
      <div className="App">
        {error && <h1>{error}</h1>}
        <Searchbar onSubmit={handleSetSearchQuery} />
        {isLoading && <InfinitySpin />}
        {hasLoadedImages &&
          (!images.length ? (
            <h1>No data found</h1>
          ) : (
            <ImageGallery images={images} />
          ))}
        {isVisible&&<button onClick={handleMoreImage} type="button" className="load-more">
          Load more
        </button>}
      </div>
    );
  }
}
