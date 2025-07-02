import Image from 'next/image'; // if using next/image, or just use <img>

export default function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', height: '13px', width: '20px' }}>
      <img
        src="/bgk.png"
        alt="Dusk Dances"
        style={{  }}
      />
    </div>
  );
}
