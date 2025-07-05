'use client';

import { useState, useEffect } from 'react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

import NextJsImage from './NextJsImage';

/**
 * PhotoGallery renders a masonry layout of images with captions,
 * and a lightbox that shows the same captions.
 */
export default function PhotoGallery({ slideImages = [] }) {
  const photos = slideImages.map(img => ({
    src: img.asset.url,
    key: img._key,
    width: img.w || 400,
    height: img.h || 300,
    alt: img.altText || '',
    caption: img.caption || img.altText || '',
  }));
const [columns, setColumns] = useState(photos.length >= 4 ? 4 : 2);

  useEffect(() => {
    function updateColumns() {
      const w = window.innerWidth;
      if (w <= 768) {
        setColumns(1);
      } else {
        setColumns(photos.length >= 4 ? 4 : 2);
      }
    }
    // Set initial
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [photos.length]);

  const [index, setIndex] = useState(-1);

  return (
    <>
      <MasonryPhotoAlbum
        photos={photos}
        columns={columns}
        spacing={5}
        padding={10}
        render={{
          photo: ({ onClick }, { photo, key, caption }) => (
            <NextJsImage
              key={photo.key}
              photo={photo}

 
              onClick={onClick}
              caption={caption}
            />
          ),
        }}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map((p) => ({ src: p.src, description: p.caption }))}
        plugins={[Captions]}
      />
    </>
  );
}
