'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  projectName: string;
}

export default function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;

    if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  return (
    <div className="image-gallery" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openLightbox(index)}
          >
            <div className="gallery-image-container">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="gallery-image"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button 
            className="lightbox-close" 
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <i className="fas fa-times"></i>
          </button>
          
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width}
              height={images[selectedImage].height}
              className="lightbox-image"
            />
            <div className="lightbox-caption">
              {projectName} - Image {selectedImage + 1} of {images.length}
            </div>
          </div>
          
          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
