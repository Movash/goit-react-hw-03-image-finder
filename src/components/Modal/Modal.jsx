import { Component } from 'react';

class Modal extends Component {

  componentDidMount() { 
    document.addEventListener('keydown', this.handleKeyEsc)
    document.body.style.overflowY = 'hidden'
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEsc);
    document.body.style.removeProperty('overflow-y');
  }

  handleKeyEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.toggleModal();
    }
  }
  
  render() { 
    const { selectedImage, toggleModal } = this.props;
    return (
    <div className="Overlay" onClick={() => toggleModal()}>
      <div className="Modal" onClick={evt => evt.stopPropagation()}>
        <img src={selectedImage} alt="large img" />
      </div>
    </div>
    );
  }
}

export default Modal;