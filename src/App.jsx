import { useState } from 'react';
import dataArtikel from './data.json';

function App() {
  const [keyword, setKeyword] = useState('');
  const [hasilCari, setHasilCari] = useState(dataArtikel);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      setHasilCari(dataArtikel);
      return;
    }

    const kataKunciLow = keyword.toLowerCase();

    const hasilFilter = dataArtikel.filter((artikel) => {
      return (
        artikel.judul.toLowerCase().includes(kataKunciLow) ||
        artikel.konten.toLowerCase().includes(kataKunciLow) ||
        artikel.kategori.toLowerCase().includes(kataKunciLow)
      );
    });

    setHasilCari(hasilFilter);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#0070f3', fontSize: '2.5rem', marginBottom: '10px' }}>Renjun Search Engine</h1>
        <p style={{ color: '#666' }}>Sistem Temu Kembali Informasi - Artikel & Riset Sejarah Renjun</p>
      </header>

      {/* Kotak Pencarian */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Ketik kata kunci... (contoh: Solo, Hiatus, Naive Bayes, Vokal)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 15px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 25px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cari
        </button>
      </form>

      {/* Informasi Jumlah Hasil */}
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
        Menampilkan {hasilCari.length} hasil untuk kata kunci: <strong>"{keyword || 'Semua Data'}"</strong>
      </p>

      {/* List Hasil Pencarian */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {hasilCari.length > 0 ? (
          hasilCari.map((artikel) => (
            <div
              key={artikel.id}
              style={{
                padding: '20px',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                backgroundColor: '#fff'
              }}
            >
              <span style={{
                backgroundColor: '#f0f0f0',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#555'
              }}>
                {artikel.kategori}
              </span>
              <h3 style={{ color: '#0070f3', margin: '10px 0 5px 0', fontSize: '18px' }}>
                {artikel.judul}
              </h3>
              <p style={{ color: '#444', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>
                {artikel.konten}
              </p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            Artikel tidak ditemukan. Coba kata kunci lain.
          </div>
        )}
      </div>

    </div>
  );
}

export default App;