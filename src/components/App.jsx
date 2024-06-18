import React from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';

const API_KEY = '42456544-e55c7a4295ba52a4d79edc728';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      page: 1,
      isLoading: false,
      selectedImage: null,
    };
  }

  fetchImages = async () => {
    const { query, page, images } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits.filter(
        image => !images.some(img => img.id === image.id)
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = query => {
    this.setState({ query, page: 1, images: [] }, () => {
      this.fetchImages();
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  openModal = imageId => {
    const { images } = this.state;
    const selectedImage = images.find(image => image.id === imageId);
    this.setState({ selectedImage });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  componentDidMount() {
    const { query } = this.state;
    if (query) {
      this.fetchImages();
    }
  }

  render() {
    const { images, isLoading, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} openModal={this.openModal} />
        {images.length > 0 && (
          <Button onClick={this.handleLoadMore} isLoading={isLoading} />
        )}
        {selectedImage && (
          <Modal
            imageUrl={selectedImage.largeImageURL}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
