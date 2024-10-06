import { useState } from 'react';
import '../index.css'; // Assuming you put the CSS here

const ImageProcessor = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const baseOutputUrl = 'http://20.81.208.230:5000/output/';

  const imageUrls = [
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179558/0cb41355-f4c6-45c0-a74e-36b60ccb014f.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179463/2c8a5d23-fa83-48bc-b1ea-bbc550d1d169.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179442/bf5e4a2d-63a1-4990-8c1a-444a27c801bf.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179437/51f7d6f8-bf6f-499e-bf70-8cdded31b44b.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179364/89afc256-aa51-4fa2-8e49-f1697978d110.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179325/66924727-d065-482a-87b7-d71d5dc3ba65.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179287/95e0980f-0d0f-4060-83b1-f00619d1853e.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179254/58677359-730d-4f97-a53a-bdde5f1757ee.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179231/2cbb4b5b-74dd-486a-9b89-4ccf08eaefae.png',
    'https://res.cloudinary.com/dsaw5z3ot/image/upload/v1728179209/9b58d9ad-563d-4b5d-9ba6-3b9019fd32a5.png'
  ];

  const processImage = async (imageUrl) => {
    setIsLoading(true);
    setError(null);
    setProcessedImage(null);
    setAudioUrl(null);
    
    const interval = document.getElementById('interval').value;
    const starLimit = document.getElementById('limit').value;

    try {
      const response = await fetch('/api/procesar_imagen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: imageUrl,
          star_limit: parseInt(starLimit),
          interval: parseInt(interval)
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const resultData = await response.json();
      setResult(resultData);
      
      if (resultData.image_file && resultData.audio_file) {
        setProcessedImage(`${baseOutputUrl}${resultData.image_file}`);
        setAudioUrl(`${baseOutputUrl}${resultData.audio_file}`);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#313131',
      textAlign: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <style>
        {`
          .loader { width: 32px; height: 90px; display: block; margin: 20px auto; position: relative; border-radius: 50% 50% 0 0; border-bottom: 10px solid #FF3D00; background-color: #FFF; background-image: radial-gradient(ellipse at center, #FFF 34%, #FF3D00 35%, #FF3D00 54%, #FFF 55%), linear-gradient(#FF3D00 10px, transparent 0); background-size: 28px 28px; background-position: center 20px , center 2px; background-repeat: no-repeat; box-sizing: border-box; animation: animloaderBack 1s linear infinite alternate; }
          .loader::before { content: ''; box-sizing: border-box; position: absolute; left: 50%; transform: translateX(-50%); width: 64px; height: 44px; border-radius: 50%; box-shadow: 0px 15px #FF3D00 inset; top: 67px; }
          .loader::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%) rotate(45deg); width: 34px; height: 34px; top: 112%; background: radial-gradient(ellipse at center, #ffdf00 8%, rgba(249, 62, 0, 0.6) 24%, rgba(0, 0, 0, 0) 100%); border-radius: 50% 50% 0; background-repeat: no-repeat; background-position: -44px -44px; background-size: 100px 100px; box-shadow: 4px 4px 12px 0px rgba(255, 61, 0, 0.5); box-sizing: border-box; animation: animloader 1s linear infinite alternate; }
          @keyframes animloaderBack { 0%, 30%, 70% { transform: translateY(0px); } 20%, 40%, 100% { transform: translateY(-5px); } }
          @keyframes animloader { 0% { box-shadow: 4px 4px 12px 2px rgba(255, 61, 0, 0.75); width: 34px; height: 34px; background-position: -44px -44px; background-size: 100px 100px; } 100% { box-shadow: 2px 2px 8px 0px rgba(255, 61, 0, 0.5); width: 30px; height: 28px; background-position: -36px -36px; background-size: 80px 80px; } }
        `}
      </style>
      <div style={{
        width: '80%',
        margin: '50px auto',
        backgroundColor: '#6d6d6d',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: 'white' }}>POLARIS</h1>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>melody of the stars</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          alignItems: 'start'
        }}>
          {/* Left column: Controls */}
          <div style={{ textAlign: 'center' }}>
  <div style={{ marginBottom: '100px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>
      <h2>Interval Between Stars (ms)</h2>
    </label>
    <input
      type="number"
      id="interval"
      defaultValue="350"
      min="1"
      max="10000"
      required
      style={{
        padding: '30px',
        fontSize: '1.5em',  // Increased font size
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        border: '2px solid #000',
        borderRadius: '50px'
      }}
    />
  </div>
  <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'white' }}>
      <h2>Limit Stars</h2>
    </label>
    <input
      type="number"
      id="limit"
      defaultValue="50"
      min="1"
      max="100"
      required
      style={{
        padding: '30px',
        fontSize: '1.5em',  // Increased font size
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        border: '2px solid #000',
        borderRadius: '50px'
      }}
    />
  </div>
  <button
    onClick={() => window.location.reload()}
    style={{
      padding: '10px 20px',
      fontSize: '1.2em',
      backgroundColor: 'rgb(255, 0, 0)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      marginTop: '10px'
    }}
  >
    Cancel
  </button>
</div>


          {/* Right column: Processed Image */}
          <div>
            {processedImage && (
              <div>
                <h3 style={{ color: 'white', marginBottom: '10px' }}>Processed Image</h3>
                <img 
                  src={processedImage} 
                  alt="Processed star map" 
                  style={{
                    maxWidth: '50%',
                    borderRadius: '10px'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <h2 style={{ color: 'white', marginTop: '20px' }}>Select an Image</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px'
        }}>
          {imageUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => processImage(url)}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '20px 40px',
                fontSize: '1.5em',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                margin: '10px'
              }}
            >
              Image {index + 1}
            </button>
          ))}
        </div>

        {isLoading && (
  <div>
    <span className="loader"></span>
    <p style={{ color: 'white', marginTop: '10px' }}>Processing image...</p>
  </div>
)}

        {error && <div style={{ color: 'red', marginTop: '20px' }}>Error: {error}</div>}
        
        {audioUrl && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: 'white' }}>Generated Audio</h3>
            <audio 
              controls 
              style={{
                width: '100%',
                marginTop: '10px'
              }}
            >
              <source src={audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageProcessor;