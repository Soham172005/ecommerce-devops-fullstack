# Deployment Guide

## 1. Local Docker Compose

1. Copy environment templates:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
2. Build and run:
   ```bash
   docker compose up --build
   ```
3. The backend automatically runs migrations and loads 15 starter products on startup.
4. Create an admin user:
   ```bash
   docker compose exec backend python manage.py createsuperuser
   ```
5. Visit:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000/api/products/

## 2. Kubernetes Local Deployment

1. Build and push images:
   ```bash
   docker build -t your-dockerhub-username/ecommerce-backend:latest backend
   docker build -t your-dockerhub-username/ecommerce-frontend:latest frontend
   docker push your-dockerhub-username/ecommerce-backend:latest
   docker push your-dockerhub-username/ecommerce-frontend:latest
   ```
2. Update image names in:
   - `k8s/backend-deployment.yaml`
   - `k8s/frontend-deployment.yaml`
3. Replace secrets in `k8s/secret.yaml` and set `CORS_ALLOWED_ORIGINS` in `k8s/configmap.yaml` for your frontend origin.
4. Deploy:
   ```bash
   kubectl apply -k k8s
   kubectl get pods -n ecommerce
   ```
5. The `seed-products` Kubernetes Job runs migrations and loads 15 starter products.
6. Access services:
   - Frontend NodePort: http://NODE_IP:30000
   - Backend NodePort: http://NODE_IP:30080/api/products/

## 3. AWS EC2 With Terraform

1. Configure AWS credentials locally.
2. Create `terraform/terraform.tfvars`:
   ```hcl
   key_name         = "your-existing-keypair"
   allowed_ssh_cidr = "YOUR_PUBLIC_IP/32"
   ```
3. Provision:
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```
4. SSH to the instance:
   ```bash
   ssh -i path/to/key.pem ubuntu@PUBLIC_IP
   ```
5. Install kubectl locally or use the k3s kubectl on the instance:
   ```bash
   sudo k3s kubectl get nodes
   ```
6. Copy this repository to the instance or configure CI/CD to deploy through `KUBE_CONFIG`.
7. Apply manifests after replacing Docker Hub image names and secrets:
   ```bash
   kubectl apply -k k8s
   ```
8. Open:
   - Frontend: `http://PUBLIC_IP:30000`
   - Backend: `http://PUBLIC_IP:30080/api/products/`

## 4. GitHub Actions CI/CD

Add repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `KUBE_CONFIG`: base64-encoded kubeconfig for the target cluster

The workflow tests backend and frontend, builds both Docker images, pushes them to Docker Hub, and applies Kubernetes manifests.
