// components/PhotoGallery.jsx
'use client';

import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function PhotoGallery({ slideImages = [] }) {
  // 1️⃣ Normalize your Sanity images
  const photos = slideImages.map(img => ({
    src: img.asset.url,
    width: img.w || 4,
    height: img.h || 3,
    alt: img.altText ?? '',                             // used for the <img> alt attribute
    title: img.caption ?? img.altText ?? 'No caption',   // fallback to altText if caption is missing
  }));

  const [index, setIndex] = useState(-1);

  return (
    <>
      <PhotoAlbum
        layout="columns"
        columns={photos.length >= 4 ? 4 : 2}   // 4-up if ≥4 photos, otherwise 2-up
        photos={photos}
        onClick={({ index }) => setIndex(index)}  // open lightbox at this index

        // 2️⃣ render each photo + its caption
        renderPhoto={({
          wrapperStyle,
          renderDefaultPhoto,
          onClick,
          photo
        }) => (
          <div style={wrapperStyle} onClick={onClick}>
            {renderDefaultPhoto()}
            <div style={{
              textAlign: 'center',
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#555'
            }}>
              <p>{photo.title}</p>
              
            </div>
          </div>
        )}
      />

      {/* 3️⃣ Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos.map(p => ({ src: p.src, title: p.title }))}
        index={index}
      />
    </>
  );
}
