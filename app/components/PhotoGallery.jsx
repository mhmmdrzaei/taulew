// components/PhotoGallery.jsx
'use client';

import { useState, useCallback } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function PhotoGallery({ slideImages = [] }) {
  console.log(slideImages)
  const photos = slideImages.map((img) => ({
    src: img.asset.url,
    width: img.w || 4,    // you can pass real dimensions if you have them
    height: img.h || 3,
    alt: img.altText,
    title: img.caption,
  }));

  const [index, setIndex] = useState(-1);
  const openLightbox = useCallback((event, photo, idx) => {
    setIndex(idx);
  }, []);

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        onClick={openLightbox}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos.map(p => ({ src: p.src, title: p.title }))}
        index={index}
      />
    </>
  );
}
