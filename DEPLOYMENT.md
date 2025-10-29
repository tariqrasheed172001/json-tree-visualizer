# Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: JSON Tree Visualizer"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Deploy to Vercel:
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

That's it! Your app will be live in minutes.

### Option 2: Netlify

1. Push your code to GitHub (same as above)

2. Deploy to Netlify:
   - Go to https://netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

### Option 3: GitHub Pages

For GitHub Pages deployment, you need to configure static export:

1. Update `next.config.ts`:

```typescript
const nextConfig = {
  output: "export",
};
```

2. Add a GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - run: npm run export
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 📝 Environment Variables

No environment variables are required for this project.

## ✅ Pre-deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] README updated with your deployment URL
- [ ] Code pushed to GitHub

## 🔗 Custom Domain

### Vercel

1. Go to Project Settings > Domains
2. Add your domain
3. Follow DNS configuration instructions

### Netlify

1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS

## 🐛 Troubleshooting

### Build Errors

- Ensure all dependencies are installed
- Check Node.js version (18+)
- Review console output for specific errors

### Styling Issues

- Clear browser cache
- Check Tailwind CSS configuration
- Verify globals.css is imported in layout

### React Flow Issues

- Ensure React Flow is properly installed
- Check that `reactflow/dist/style.css` is imported

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 🌐 Live Deployment URLs

After deployment, update these in your README:

- Production URL: [Add your Vercel/Netlify URL]
- GitHub Repository: [Add your GitHub URL]
