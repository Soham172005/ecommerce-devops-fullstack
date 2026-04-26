import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Premium essentials, engineered to scale</p>
          <h1>CommerceOps</h1>
          <p>
            Discover a curated storefront experience powered by a production-ready
            Django, React, PostgreSQL, Docker, Kubernetes, and Terraform stack.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/products">Shop collection</Link>
            <span className="hero-note">15 curated products live now</span>
          </div>
        </div>
        <div className="hero-panel" aria-label="Store highlights">
          <div>
            <span>Inventory</span>
            <strong>15</strong>
          </div>
          <div>
            <span>API</span>
            <strong>JWT</strong>
          </div>
          <div>
            <span>Deploy</span>
            <strong>K8s</strong>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div>
          <span>01</span>
          <strong>Curated catalog</strong>
          <p>Polished product cards with responsive imagery and clean pricing.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Secure accounts</strong>
          <p>JWT authentication keeps shopping sessions clear and predictable.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Cloud ready</strong>
          <p>Docker, Kubernetes, CI/CD, and Terraform are built into the project.</p>
        </div>
      </section>
    </>
  );
}
