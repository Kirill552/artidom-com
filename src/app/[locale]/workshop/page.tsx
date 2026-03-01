export default async function WorkshopPage() {
  return (
    <main style={{ minHeight: '80vh', padding: '6rem 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>The Workshop</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '2rem' }}>
            Located in the heart of Montenegro, our woodworking atelier is equipped with modern panel saws, edge banders, and precision tools. 
            We do not claim to be a giant factory; instead, we are a transparent, highly efficient workshop focused on exceptional craftsmanship and strict European quality control.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['25 Years of Woodworking', 'Premium Materials', 'Direct B2B Pricing', 'Custom Dimensions'].map((item) => (
              <li key={item} style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-accent)', fontWeight: '500' }}>✓ {item}</li>
            ))}
          </ul>
        </div>
        <div style={{ aspectRatio: '4/5', background: 'var(--color-muted)', borderRadius: '40px', boxShadow: 'var(--shadow-soft)' }}>
          {/* Workshop photo */}
        </div>
      </div>
    </main>
  );
}
