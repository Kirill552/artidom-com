export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ minHeight: '80vh', padding: '6rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Sector Solutions</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px' }}>
          We provide turnkey furnishing for Hospitality (HoReCa), Corporate Workspaces, and Educational Facilities.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {['Restaurants & Cafes', 'Hotels & Resorts', 'Educational Facilities', 'Corporate Offices'].map((sector) => (
            <div key={sector} style={{ padding: '3rem', background: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-soft)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>{sector}</h2>
              <p style={{ opacity: 0.7 }}>Tailored furniture solutions meeting European commercial standards.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
