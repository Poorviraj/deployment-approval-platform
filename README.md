# 🚀 Deployment Approval Platform

A modern internal deployment management platform where developers can create deployment requests and administrators can review, approve, or reject them.

This project is intentionally kept small from a business perspective so the primary focus can be on implementing real-world DevOps practices such as Docker, CI/CD, Infrastructure as Code, Kubernetes, GitOps, Monitoring, Logging, and Security.


## ✨ Features

- JWT Authentication
- Role Based Authorization
- Dashboard
- Deployment Management
- Deployment Approval Workflow
- Deployment History
- REST API
- PostgreSQL Database
- Prisma ORM
- Swagger Documentation


## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

### Documentation
- Swagger
- Postman


## 📁 Project Structure

deployment-approval-platform/

frontend/

backend/

docs/

postman/

README.md


## ⚙️ Run Locally

### Clone

```bash
git clone <repository-url>

cd backend

npm install

npx prisma migrate dev

npx prisma db seed

npm run dev

cd frontend

npm install

npm run dev



## 📌 API Endpoints

### Authentication

POST /api/auth/login

POST /api/auth/register

---

### Dashboard

GET /api/dashboard/stats

---

### Deployments

GET /api/deployments

GET /api/deployments/:id

POST /api/deployments

PATCH /api/deployments/:id/approve

PATCH /api/deployments/:id/reject

DELETE /api/deployments/:id


## 📂 Backend Structure

src/

controllers/

services/

routes/

middleware/

config/

validations/

types/

utils/


## 🗺 Roadmap

### Phase 1

- ✅ Full Stack Application

### Phase 2

- Docker
- Docker Compose
- Multi-stage Builds

### Phase 3

- GitHub Actions CI/CD
- SonarQube
- Trivy

### Phase 4

- AWS Infrastructure
- Terraform
- ECR
- EKS

### Phase 5

- Kubernetes
- Helm
- ArgoCD

### Phase 6

- Prometheus
- Grafana
- Fluent Bit
- Loki

### Phase 7

- Autoscaling
- Disaster Recovery
- Production Deployment


## 🏗 Architecture

Architecture diagrams will be added during the DevOps implementation phase.


## 📄 License

This project is created for educational and portfolio purposes.