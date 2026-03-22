# GitHub Repository Configuration Guide

## 🔐 Configure Repository Secrets

### Step 1: Navigate to GitHub Secrets
1. Go to your GitHub repository: `https://github.com/blekthsety52-dev/Digital-Product-Empire-Suite`
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Step 2: Add GEMINI_API_KEY
- **Name**: `GEMINI_API_KEY`
- **Secret**: Your Google AI Studio API key
- **Source**: Obtain from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Step 3: Add VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Secret**: Your Vercel deployment token
- **Source**: Obtain from Vercel dashboard → Settings → Tokens

## 📊 Monitor Deployment Pipeline

### Step 1: Access GitHub Actions
1. Go to your repository's **Actions** tab
2. Click on the **CI/CD Pipeline** workflow
3. Monitor the running workflow in real-time

### Step 2: Review Job Execution
- **build-and-test**: Verifies code quality, runs tests, builds application
- **deploy**: Deploys to Vercel production environment
- Check each step's logs for detailed execution information

### Step 3: Troubleshooting Failed Steps
If any step fails:
1. Click the failed step to view detailed logs
2. Review error messages and stack traces
3. Check for missing environment variables or dependency issues

## ✅ Verify Production Deployment

### Step 1: Get Deployment URL
After successful deployment, the workflow will output the deployment URL or you can find it in your Vercel dashboard.

### Step 2: Comprehensive Testing Checklist

#### Basic Functionality
- [ ] Page loads completely without errors
- [ ] All UI components render correctly
- [ ] Navigation works properly
- [ ] Responsive design on mobile/tablet/desktop

#### API Integration
- [ ] Gemini API calls work correctly
- [ ] Error handling for API failures
- [ ] Loading states display properly
- [ ] Data renders as expected

#### Performance
- [ ] Page load time under 3 seconds
- [ ] No console errors in browser
- [ ] All assets load successfully
- [ ] Memory usage is reasonable

#### Cross-Browser Testing
- [ ] Chrome/Chromium: Full functionality
- [ ] Firefox: Full functionality
- [ ] Safari: Full functionality (if available)
- [ ] Edge: Full functionality

### Step 3: Production Health Monitoring
- Monitor Vercel analytics for performance metrics
- Check error rates in production
- Verify uptime and availability

## 🚨 Rollback Procedures

If deployment fails or issues are detected:
1. **Immediate Rollback**: Use Vercel dashboard to revert to previous deployment
2. **Hotfix**: Create hotfix branch and push updates
3. **Monitor**: Ensure rollback resolves all issues

## 📞 Support Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **Vercel Deployment Guide**: https://vercel.com/docs/deployments
- **Google AI Studio API**: https://aistudio.google.com/app/apikey
