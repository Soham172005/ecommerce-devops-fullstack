# Architecture

## High-Level Flow

The application uses a React/Vite frontend served by Nginx. Browser requests to `/api` are reverse-proxied by Nginx to the Django REST Framework backend. The backend exposes JWT authentication, product catalog, product detail, and authenticated cart APIs. PostgreSQL stores Django users, products, carts, cart items, orders, and order items.

## Runtime Topology

- Frontend: React static assets in an Nginx container.
- Backend: Django REST Framework served by Gunicorn.
- Database: PostgreSQL with persistent storage in Kubernetes and a named volume in Docker Compose.
- Authentication: SimpleJWT access and refresh tokens.
- Local networking: Docker Compose service DNS names.
- Kubernetes networking: frontend and backend NodePort services, internal PostgreSQL ClusterIP service.
- CI/CD: GitHub Actions runs tests, builds images, pushes to Docker Hub, and applies Kubernetes manifests.
- Infrastructure: Terraform creates an AWS EC2 instance, security group, Docker, and k3s.

## Folder Structure

```text
project-root/
  frontend/
  backend/
  docker/
  k8s/
  terraform/
  docs/
  .github/workflows/
```
