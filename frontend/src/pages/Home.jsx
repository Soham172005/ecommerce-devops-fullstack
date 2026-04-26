import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Production-ready commerce starter</p>
        <h1>CommerceOps</h1>
        <p>
          A clean storefront backed by Django REST APIs, PostgreSQL, containers,
          Kubernetes manifests, CI/CD, and Terraform infrastructure.
        </p>
        <Link className="primary-button" to="/products">Shop products</Link>
      </div>
    </section>
  );
}
