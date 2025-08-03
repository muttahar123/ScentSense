# Fragrance - Vercel Deployment Guide

## Quick Deployment to Vercel

### Option 1: Deploy Client Only (Static Site)
This is the easiest way to deploy your Fragrance website to Vercel.

1. **Navigate to the client folder:**
   ```bash
   cd client
   ```

2. **Install Vercel CLI (if not installed):**
   ```bash
   npm i -g vercel
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy: Y
   - Which scope: Select your account
   - Link to existing project: N (for first deployment)
   - What's your project's name: fragrance-store
   - In which directory is your code located: ./

### Option 2: Full-Stack Deployment (Client + API)

1. **From the root directory, deploy the entire project:**
   ```bash
   vercel --prod
   ```

## Environment Variables (if using database)

If you want to connect to a real database, add these environment variables in Vercel dashboard:

- `DATABASE_URL` - Your PostgreSQL connection string
- `NODE_ENV` - Set to "production"

## Build Configuration

The project is already configured with:
- ✅ `vercel.json` configuration files
- ✅ Separate `package.json` for client deployment
- ✅ Optimized build settings
- ✅ Static asset handling
- ✅ SPA routing support

## Post-Deployment

After deployment:
1. Your site will be available at `https://your-project-name.vercel.app`
2. All features work including:
   - Product browsing
   - Shopping cart
   - Checkout process
   - Admin dashboard
   - Blog section
   - Parallax scrolling

## Custom Domain (Optional)

To use a custom domain:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain

## Real-time Updates

The deployment includes:
- ✅ Hot reload in development
- ✅ Automatic builds on git push
- ✅ CDN distribution
- ✅ HTTPS by default
- ✅ Mobile optimization

Your Fragrance e-commerce website is now ready for production!