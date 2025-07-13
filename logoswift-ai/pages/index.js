import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [brand, setBrand] = useState('');
  const [style, setStyle] = useState('Minimal');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLogo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/generate', { brand, style });
      setImageUrl(res.data.url);
    } catch (err) {
      setError('Error generating logo');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>LogoSwift AI</title>
      </Head>
      <h1 className="text-4xl font-bold mb-4">LogoSwift AI</h1>
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="border p-2 mb-2 w-full max-w-sm"
        placeholder="Enter your brand name"
      />
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="border p-2 mb-4 w-full max-w-sm"
      >
        <option>Minimal</option>
        <option>Bold</option>
        <option>Modern</option>
        <option>Elegant</option>
      </select>
      <button
        onClick={generateLogo}
        disabled={loading || !brand}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate Logo'}
      </button>
      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Generated Logo" className="w-64 h-64 object-contain border" />
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
