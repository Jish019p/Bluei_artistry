# 🦉 Bluie Artistry - Complete Deployment Guide

## ✨ Website Overview

Your Bluie Artistry website is now fully set up as a modern React application ready for deployment. This guide will help you:
1. Add your artwork images
2. Build the website for production
3. Deploy to Azure or any hosting platform
4. Customize further if needed

---

## 📁 Project Structure

```
blue-artistry/
├── public/
│   └── images/              ← Add all your images here
├── src/
│   ├── App.tsx             ← Main React component (images configured)
│   ├── App.css             ← All styling (responsive design)
│   └── main.tsx
├── package.json            ← Dependencies & scripts
├── vite.config.ts          ← Build configuration
└── tsconfig.json           ← TypeScript config
```

---

## 🖼️ Adding Your Images

### Step 1: Create Image Folder
The `public/images/` folder is already created and ready.

### Step 2: Add Images
Copy your 8 artwork images to `public/images/`:

| Category | Filename | Your Image |
|----------|----------|-----------|
| Logo/Owl | `owl-mascot.jpg` | The paper quilling owl |
| Sketching | `sketching.jpg` | Portrait sketch |
| Paper Quilling | `paper-quilling.jpg` | Flower composition |
| Thread Art | `thread-art.jpg` | Moon & star design |
| Paper Crafts | `paper-crafts.jpg` | OM/Ganesha design |
| Ribbon Bouquets | `ribbon-bouquets.jpg` | Ribbon flowers |
| Mud & Clay Art | `mud-clay.jpg` | Clay artwork |
| Painting | `painting.jpg` | Painting |

### Step 3: Image Specifications
- **Format:** JPG, PNG, or WebP
- **Size:** Compress to under 500KB each
- **Dimensions:**
  - Owl mascot: 400x450px (portrait)
  - Collection items: 300x300px (square)
- **Tools:** TinyPNG, ImageOptim, or Squoosh

### Step 4: Verify Images
```bash
# Check if images are in place
ls public/images/
# Should show: owl-mascot.jpg, sketching.jpg, paper-quilling.jpg, etc.
```

---

## 🚀 Development & Testing

### Start Development Server
```bash
npm run dev
# Opens http://localhost:5173
```

### Test Locally
- Navigate to each section (Home, About, Collections, etc.)
- Verify all images load correctly
- Test on mobile (use DevTools)
- Check browser console for errors (F12)

### Build for Production
```bash
npm run build
# Creates optimized dist/ folder
```

---

## 🌐 Deployment Options

### Option 1: Azure Static Web Apps (Recommended)

**Prerequisites:**
- Azure account
- GitHub repository (optional but recommended)

**Steps:**
1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy via Azure CLI:
   ```bash
   # Install Azure CLI if needed
   npm install -g @azure/cli
   
   # Login to Azure
   az login
   
   # Create Static Web App
   az staticwebapp create \
     --name bluie-artistry \
     --resource-group my-resource-group \
     --location eastus \
     --source ./dist
   ```

3. Or use Azure Portal:
   - Go to Azure Portal
   - Create "Static Web App"
   - Connect your GitHub repo
   - Set build folder to `dist`
   - Deploy!

### Option 2: Vercel (Easiest for React)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and your site will be live at vercel.com
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Or connect GitHub repo via Netlify dashboard
```

### Option 4: Traditional Hosting (Apache, Nginx, etc.)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your web server

3. Configure server to serve `index.html` for all routes:
   
   **Nginx:**
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```
   
   **Apache:**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option 5: Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build & Deploy:**
```bash
# Build image
docker build -t bluie-artistry .

# Run container
docker run -p 80:80 bluie-artistry

# Or push to Docker Hub/Azure Container Registry
docker tag bluie-artistry myusername/bluie-artistry:latest
docker push myusername/bluie-artistry:latest
```

---

## 🎨 Customization

### Change Brand Colors
Edit `src/App.css` (lines 5-12):
```css
:root {
  --primary-color: #5a4fa3;    /* Main purple */
  --secondary-color: #d4a5d9;  /* Light purple */
  --accent-color: #ff6b6b;     /* Red accents */
  --text-dark: #2c1a3a;        /* Text color */
}
```

### Update Social Links
In `src/App.tsx`, change:
- Instagram: `https://instagram.com/bluie_artistry`
- WhatsApp: `https://wa.me/1234567890` (replace with your number)

### Add More Collections
In `src/App.tsx`, add to the `collections` array:
```javascript
{ 
  id: 8, 
  name: 'New Category', 
  desc: 'Description here', 
  image: '/images/new-category.jpg' 
}
```

### Update Text Content
All text is in `src/App.tsx` - simply edit the strings to match your brand voice.

---

## 📦 Performance Optimization

### Image Optimization
```bash
# Compress images before uploading
# Using ImageMagick:
mogrify -resize 1200x1200 -quality 85 public/images/*

# Or use online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim.com
```

### Build Optimization
```bash
# Check bundle size
npm run build

# Analyze bundle
npm install -g analyze-bundle
analyze-bundle dist/
```

### Enable Caching
Set proper HTTP headers on your server:
```
Cache-Control: max-age=31536000  # For static files
Cache-Control: no-cache          # For index.html
```

---

## ✅ Pre-Deployment Checklist

- [ ] All 8 images added to `public/images/`
- [ ] Images are compressed and optimized
- [ ] Website tested locally with `npm run dev`
- [ ] All images load correctly in browser
- [ ] Mobile responsiveness checked (use DevTools)
- [ ] Social links updated (Instagram, WhatsApp)
- [ ] Text content proofread
- [ ] Brand colors verified
- [ ] Build successful: `npm run build`
- [ ] No console errors in DevTools
- [ ] `dist/` folder ready for upload

---

## 🐛 Troubleshooting

### Images Not Showing
1. **Check file paths:** Images must be in `public/images/`
2. **Check filenames:** Must match exactly (case-sensitive on Linux/Mac)
3. **Clear cache:** Hard refresh (Ctrl+Shift+R)
4. **Check console:** F12 → Console tab for error messages
5. **Verify URLs:** In `src/App.tsx`, paths should be `/images/filename.jpg`

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Then rebuild
npm run build
```

### Website Slow
1. Optimize images (use TinyPNG)
2. Check bundle size with `npm run build`
3. Enable gzip compression on server
4. Use CDN for static assets

---

## 📞 Support Resources

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **TypeScript:** https://www.typescriptlang.org
- **CSS Tips:** https://web.dev/responsive-web-design-basics/
- **Image Optimization:** https://web.dev/optimize-images/

---

## 🎯 Next Steps

1. **Add Images:** Copy your 8 artworks to `public/images/`
2. **Test Locally:** Run `npm run dev` and check everything
3. **Build:** Run `npm run build` when ready
4. **Deploy:** Choose your hosting and deploy the `dist/` folder
5. **Monitor:** Check analytics and user feedback

---

## 📝 File Format Reference

### Required Files Already Created:
- ✅ `src/App.tsx` - Main component with image references
- ✅ `src/App.css` - All styling
- ✅ `package.json` - Dependencies
- ✅ `vite.config.ts` - Build config
- ✅ `public/images/` - Image folder

### To Add:
- 📸 `public/images/owl-mascot.jpg`
- 📸 `public/images/sketching.jpg`
- 📸 `public/images/paper-quilling.jpg`
- 📸 `public/images/thread-art.jpg`
- 📸 `public/images/paper-crafts.jpg`
- 📸 `public/images/ribbon-bouquets.jpg`
- 📸 `public/images/mud-clay.jpg`
- 📸 `public/images/painting.jpg`

---

**Your website is production-ready! Just add images and deploy. Good luck! 🚀💜**
