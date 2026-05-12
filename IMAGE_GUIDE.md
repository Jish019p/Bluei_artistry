# Bluie Artistry - Image Integration Guide

This guide explains how to add your images to the website for proper deployment.

## Image Folder Structure

All images should be placed in the `public/images/` folder:

```
public/
└── images/
    ├── owl-mascot.jpg          (Main owl mascot - Paper Quilling)
    ├── sketching.jpg           (Portrait sketch for Sketching category)
    ├── paper-quilling.jpg      (Flower composition for Paper Quilling)
    ├── thread-art.jpg          (Moon & Star thread art for Thread Art)
    ├── paper-crafts.jpg        (OM/Ganesha design or newspaper flower)
    ├── ribbon-bouquets.jpg     (Ribbon bouquets artwork)
    ├── mud-clay.jpg            (Mud & Clay art)
    └── painting.jpg            (Painting artwork)
```

## Image Details & Placement

### 1. **owl-mascot.jpg** (Main Owl)
- **Used in:** Hero section, About section, Custom Orders section
- **Dimensions:** Recommended 400x450px minimum
- **Image:** The paper quilling owl mascot from your collection
- **Placement:** `public/images/owl-mascot.jpg`

### 2. **sketching.jpg** (Sketching Category)
- **Used in:** Collections grid (1st item)
- **Dimensions:** 300x300px (square)
- **Image:** Portrait sketch with pencils
- **Placement:** `public/images/sketching.jpg`

### 3. **paper-quilling.jpg** (Paper Quilling Category)
- **Used in:** Collections grid (2nd item)
- **Dimensions:** 300x300px (square)
- **Image:** Colorful paper quilling flower composition
- **Placement:** `public/images/paper-quilling.jpg`

### 4. **thread-art.jpg** (Thread Art Category)
- **Used in:** Collections grid (3rd item)
- **Dimensions:** 300x300px (square)
- **Image:** Moon and star thread art design
- **Placement:** `public/images/thread-art.jpg`

### 5. **paper-crafts.jpg** (Paper Crafts Category)
- **Used in:** Collections grid (4th item)
- **Dimensions:** 300x300px (square)
- **Image:** OM/Ganesha design or newspaper craft flower
- **Placement:** `public/images/paper-crafts.jpg`

### 6. **ribbon-bouquets.jpg** (Ribbon Bouquets Category)
- **Used in:** Collections grid (5th item)
- **Dimensions:** 300x300px (square)
- **Image:** Ribbon flower bouquet or similar craft
- **Placement:** `public/images/ribbon-bouquets.jpg`

### 7. **mud-clay.jpg** (Mud & Clay Art Category)
- **Used in:** Collections grid (6th item)
- **Dimensions:** 300x300px (square)
- **Image:** Mud or clay art creation
- **Placement:** `public/images/mud-clay.jpg`

### 8. **painting.jpg** (Painting Category)
- **Used in:** Collections grid (7th item)
- **Dimensions:** 300x300px (square)
- **Image:** Painting artwork or similar
- **Placement:** `public/images/painting.jpg`

## Image Specifications

### General Requirements:
- **Format:** JPG, PNG, or WebP (JPG recommended for smaller file size)
- **Quality:** High quality for best appearance
- **Compression:** Optimize for web (under 500KB per image)
- **Aspect Ratio:**
  - Collection items: Square (1:1)
  - Owl mascot: Portrait (3:4 or similar)

### Recommended Tools for Optimization:
- Online: TinyPNG, ImageOptim, Squoosh
- Command line: ImageMagick, FFmpeg
- GUI: Adobe Lightroom, GIMP

## How to Add Images

### Option 1: Drag & Drop (Windows/Explorer)
1. Open `public/images/` folder in Windows Explorer
2. Drag your images into the folder
3. Run `npm run dev` to see changes

### Option 2: Command Line (Git Bash / PowerShell)
```bash
# Navigate to images folder
cd public/images

# Copy images from your source folder
cp /path/to/your/images/* .

# Or on Windows:
copy C:\Users\YourName\Pictures\*.jpg .
```

### Option 3: Using VS Code
1. In VS Code Explorer, navigate to `public/images/`
2. Right-click and select "Reveal in File Explorer"
3. Drag images into the folder
4. Refresh the dev server

## Testing Locally

```bash
# Start development server
npm run dev

# Visit http://localhost:5173 in your browser
# All images should load and display correctly
```

## Deployment

### For Azure Static Web Apps:
```bash
npm run build
# Images are included in the dist/ folder automatically
```

### For Other Hosting:
1. Build the project: `npm run build`
2. Upload the entire `dist/` folder
3. Images in `public/images/` are included in the build

### For Docker:
Images are automatically included in the Docker build process.

## Troubleshooting

### Images not showing:
1. **Check path:** Verify image names match exactly in `public/images/`
2. **Clear cache:** Hard refresh browser (Ctrl+Shift+R)
3. **Check console:** Open DevTools (F12) for error messages
4. **File format:** Ensure images are valid JPG/PNG/WebP

### Images too large:
1. Compress using TinyPNG or similar
2. Use JPG format instead of PNG
3. Resize to appropriate dimensions

### Image quality issues:
1. Use high-resolution source images (at least 1200x1200px)
2. Use JPG quality 80-85 for best balance
3. Avoid heavy compression

## File Size Guidelines

| Image Type | Max Size | Recommended |
|-----------|----------|-------------|
| Owl Mascot | 2 MB | 200-400 KB |
| Collection Items | 1 MB | 100-200 KB each |
| Total Assets | 5 MB | 1-2 MB total |

## Quick Start Summary

1. Create `public/images/` folder (already created)
2. Add 8 image files as listed above
3. Ensure filenames match exactly (case-sensitive on Linux/Mac)
4. Run `npm run dev` to test locally
5. Run `npm run build` for production deployment

For any issues, check the browser console (F12) for detailed error messages.
