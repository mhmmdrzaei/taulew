import Image from 'next/image'; // if using next/image, or just use <img>

export default function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', height: '13px', width: '17px' }}>
      <img
        src="/tl.png"
        alt="Dusk Dances"
        style={{  }}
      />
    </div>
  );
}
