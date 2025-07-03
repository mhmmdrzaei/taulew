'use client';

import Image from 'next/image';

/**
 * Renders a single photo with Next.js Image and an overlayed caption.
 */
export default function NextJsImage({ photo, width, height, onClick }) {
  return (
    <div
      style={{ width, height, position: 'relative', cursor: 'pointer' }}
      onClick={onClick}
    >
      <Image
        src={photo.src}
        alt={photo.alt || photo.caption}
        width={800}
        height={800}
        style={{ objectFit: 'cover' }}
        draggable={false}
      />

      {photo.caption && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          padding: '4px',
          fontSize: '0.75rem',
          textAlign: 'center',
        }}>
          {photo.caption}
        </div>
      )}
    </div>
  );
}