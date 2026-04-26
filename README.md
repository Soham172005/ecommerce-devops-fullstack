# Production E-Commerce Platform

Full-stack e-commerce reference application with React, Django REST Framework, PostgreSQL, Docker, Kubernetes, GitHub Actions, and Terraform for AWS EC2 provisioning.

## Stack

- Frontend: React, Vite, Axios, React Router
- Backend: Django, Django REST Framework, SimpleJWT
- Database: PostgreSQL
- DevOps: Docker, Docker Compose, Kubernetes manifests, HPA, GitHub Actions, Terraform AWS EC2

## Local Quick Start

1. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
2. Start all services:
   ```bash
   docker compose up --build
   ```
3. Open:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/

## Deployment

See `docs/deployment-guide.md` for local, Kubernetes, and AWS EC2 deployment steps.
