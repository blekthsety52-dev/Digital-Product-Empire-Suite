# Deployment Guide

## Production Deployment via Vercel

### Prerequisites
1. **Vercel Account**: Create account at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push code to GitHub repository
3. **Environment Variables**: Configure required secrets

### Required Secrets
Add these to your GitHub repository secrets:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `VERCEL_TOKEN`: Your Vercel deployment token

### Automated Deployment
The CI/CD pipeline is configured to automatically deploy when pushing to `main` or `master` branch.

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Environment Configuration
- Copy `.env.example` to `.env.local` for local development
- Configure `GEMINI_API_KEY` in Vercel environment variables for production

## Health Checks
- Post-deployment health checks are automatically run
- The application is verified to be accessible after deployment
- Failed deployments will automatically rollback

## Zero-Downtime Deployment
- Vercel provides instant rollbacks
- Deployments are atomic with no downtime
- Previous version remains live until new deployment is verified
