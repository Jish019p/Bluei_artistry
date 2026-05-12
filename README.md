# 🦉 Bluie Artistry - Handmade Crafts Website

A beautiful, responsive React website showcasing handmade paper quilling, sketching, thread art, and other creative crafts. Built with modern web technologies for optimal performance and user experience.

## ✨ Features

- 🎨 **Beautiful Design** - Modern, responsive UI with smooth animations
- 📱 **Mobile-Friendly** - Works perfectly on all devices (mobile, tablet, desktop)
- ⚡ **Fast Performance** - Built with Vite for instant page loads
- 🖼️ **Image-Optimized** - Ready for artwork and portfolio images
- 🎯 **SEO-Ready** - Semantic HTML structure
- 🔧 **Easy to Customize** - Simple React components and CSS
- 📦 **Production-Ready** - Deploy to Azure, Vercel, Netlify, or any hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Add Your Artwork
1. Place 8 artwork images in `public/images/`:
   - `owl-mascot.jpg` - Main mascot
   - `sketching.jpg` - Sketches
   - `paper-quilling.jpg` - Quilling art
   - `thread-art.jpg` - Thread art
   - `paper-crafts.jpg` - Paper crafts
   - `ribbon-bouquets.jpg` - Ribbon bouquets
   - `mud-clay.jpg` - Clay art
   - `painting.jpg` - Paintings

2. Images will automatically appear on the website!

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
blue-artistry/
├── src/
│   ├── App.tsx              # Main component with all sections
│   ├── App.css              # Responsive styling
│   └── main.tsx             # Entry point
├── public/
│   └── images/              # Add your artwork here
├── package.json             # Dependencies
├── vite.config.ts           # Build configuration
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
└── IMAGE_GUIDE.md           # Image placement guide
```

## 📚 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## 🎨 Customization

### Change Colors
Edit `src/App.css` (variables at top):
```css
--primary-color: #5a4fa3;
--secondary-color: #d4a5d9;
--accent-color: #ff6b6b;
```

### Update Social Links
In `src/App.tsx`:
- Instagram: Change the URL in the navbar
- WhatsApp: Update the phone number in links

### Add More Collections
In `src/App.tsx`, add to collections array:
```javascript
{ id: 8, name: 'New Art', desc: 'Description', image: '/images/new-art.jpg' }
```

## 🌐 Deployment

### One-Click Deploy Options:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Azure Static Web Apps:**
- Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps

**Traditional Hosting:**
- Build: `npm run build`
- Upload `dist/` folder to your server
- See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for server config

## 🖼️ Image Specifications

- **Format:** JPG, PNG, or WebP
- **Size:** Compress to < 500KB each
- **Dimensions:**
  - Mascot: 400x450px (portrait)
  - Collections: 300x300px (square)
- **Quality:** High quality for best results

**Optimization Tools:**
- [TinyPNG](https://tinypng.com) - Easy compression
- [Squoosh](https://squoosh.app) - Advanced options
- [ImageOptim](https://imageoptim.com) - Desktop app

## 📖 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [IMAGE_GUIDE.md](./IMAGE_GUIDE.md) - Detailed image placement guide

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **CSS3** - Modern styling with animations
- **Responsive Design** - Mobile-first approach

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ✅ Pre-Launch Checklist

- [ ] All 8 images added to `public/images/`
- [ ] Images compressed and optimized
- [ ] Website tested with `npm run dev`
- [ ] Mobile responsiveness verified
- [ ] Social links updated
- [ ] Brand colors customized (if needed)
- [ ] Built successfully with `npm run build`
- [ ] Deployment target selected
- [ ] Deploy `dist/` folder

## 🐛 Troubleshooting

### Images not displaying?
- Check filenames match exactly in `public/images/`
- Hard refresh browser (Ctrl+Shift+R)
- Open DevTools (F12) and check console for errors

### Build fails?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Website slow?
- Optimize images with TinyPNG
- Check bundle size: `npm run build`
- Enable gzip compression on server

## 📞 Support

- React: https://react.dev
- Vite: https://vitejs.dev
- TypeScript: https://typescriptlang.org
- CSS Help: https://web.dev

## 📄 License

Created for Bluie Artistry. All rights reserved.

---

**Ready to showcase your beautiful handmade creations? Add your images and deploy! 🎨✨**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
