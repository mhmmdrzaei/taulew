// components/NextJsImage.jsx
'use client';

import Image from 'next/image';

/**
 * Renders a single photo with Next.js Image and an overlayed, truncated caption.
 * Only the first 5 words of the caption are shown, followed by an ellipsis if longer.
 */
export default function NextJsImage({ photo, width, height, onClick }) {
  // Build and truncate the caption
  const fullCaption = photo.caption || photo.alt || '';
  const words = fullCaption.trim().split(/\s+/);
  const truncatedCaption = words.length > 10
    ? words.slice(0, 10).join(' ') + '...'
    : fullCaption;

  return (
    <div
      style={{ width, height, position: 'relative', cursor: 'pointer' }}
      onClick={onClick}
    >
      <Image
        src={photo.src}
        alt={photo.alt || truncatedCaption}
        width={800}
        height={800}
        style={{ objectFit: 'cover' }}
        draggable={false}
      />

      {truncatedCaption && (
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
          {truncatedCaption}
        </div>
      )}
    </div>
  );
}

