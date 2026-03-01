export default async function CatalogPage() {
  return (
    <main style={{ minHeight: '80vh', padding: '6rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Product Catalog</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px' }}>
          Explore our range of bespoke manufacturing capabilities. Every piece is crafted in Montenegro.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem' }}>
          {['Professional Kitchens', 'Smart Storage Systems', 'Bar Counters', 'Seating & Tables'].map((category) => (
            <div key={category} style={{ aspectRatio: '16/9', background: 'var(--color-muted)', borderRadius: '30px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>{category}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
