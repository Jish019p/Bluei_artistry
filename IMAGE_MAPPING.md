🎨 IMAGE MAPPING - Where Each of Your Images Goes
==================================================

Based on the images you provided, here's exactly where to place each one:

FROM YOUR ATTACHMENTS:
======================

IMAGE #1: PORTRAIT SKETCH (Girl with pencil)
  → Place in: public/images/sketching.jpg
  → Used in: Collections grid - Sketching category (1st item)
  → Size: Keep square 300x300px if possible

IMAGE #2: OWL MASCOT (Paper quilling, colorful)
  → Place in: public/images/owl-mascot.jpg
  → Used in: 
     • Hero section (main image)
     • About section (circular)
     • Custom Orders section
  → Size: Portrait 400x450px

IMAGE #3: THREAD ART (Moon and star on dark background)
  → Place in: public/images/thread-art.jpg
  → Used in: Collections grid - Thread Art category (3rd item)
  → Size: Keep square 300x300px

IMAGE #4: PAPER QUILLING (Colorful flower composition with blue center)
  → Place in: public/images/paper-quilling.jpg
  → Used in: Collections grid - Paper Quilling category (2nd item)
  → Size: Keep square 300x300px

IMAGE #5: OM GANESHA (Red OM symbol on white/craft background)
  → Place in: public/images/paper-crafts.jpg
  → Used in: Collections grid - Paper Crafts category (4th item)
  → Size: Keep square 300x300px

IMAGE #6: NEWSPAPER FLOWER (White/grey flower with newspaper texture)
  → Place in: public/images/ribbon-bouquets.jpg
  → Used in: Collections grid - Ribbon Bouquets category (5th item)
  → Size: Keep square 300x300px

IMAGE #7: (For Mud & Clay Art)
  → Place in: public/images/mud-clay.jpg
  → Used in: Collections grid - Mud & Clay Art category (6th item)
  → Size: Keep square 300x300px
  → Status: ⚠️ NOT PROVIDED - Add any clay/mud artwork

IMAGE #8: (For Painting)
  → Place in: public/images/painting.jpg
  → Used in: Collections grid - Painting category (7th item)
  → Size: Keep square 300x300px
  → Status: ⚠️ NOT PROVIDED - Add any painting artwork

---

FOLDER STRUCTURE NEEDED:
========================

blue-artistry/
└── public/
    └── images/
        ├── owl-mascot.jpg           ← OWL MASCOT IMAGE
        ├── sketching.jpg            ← PORTRAIT SKETCH
        ├── paper-quilling.jpg       ← FLOWER COMPOSITION
        ├── thread-art.jpg           ← MOON & STAR
        ├── paper-crafts.jpg         ← OM/GANESHA DESIGN
        ├── ribbon-bouquets.jpg      ← NEWSPAPER FLOWER
        ├── mud-clay.jpg             ← (NEEDS: Clay art)
        └── painting.jpg             ← (NEEDS: Painting)

---

STEP-BY-STEP INSTRUCTIONS:
===========================

1. Open Windows Explorer
2. Navigate to: e:\blue Artistry\public\images\
3. Copy your 6 images:
   - portrait sketch → rename to "sketching.jpg"
   - owl mascot → rename to "owl-mascot.jpg"
   - moon & star thread art → rename to "thread-art.jpg"
   - flower composition → rename to "paper-quilling.jpg"
   - OM ganesha → rename to "paper-crafts.jpg"
   - newspaper flower → rename to "ribbon-bouquets.jpg"
4. Add any clay artwork → rename to "mud-clay.jpg"
5. Add any painting → rename to "painting.jpg"

OR use PowerShell:

```powershell
# From your images source folder
$source = "C:\Users\YourName\Pictures\BluieImages"
$dest = "e:\blue Artistry\public\images"

Copy-Item "$source\portrait-sketch.jpg" "$dest\sketching.jpg"
Copy-Item "$source\owl-mascot.jpg" "$dest\owl-mascot.jpg"
Copy-Item "$source\thread-art-moon.jpg" "$dest\thread-art.jpg"
Copy-Item "$source\paper-quilling-flowers.jpg" "$dest\paper-quilling.jpg"
Copy-Item "$source\om-ganesha.jpg" "$dest\paper-crafts.jpg"
Copy-Item "$source\newspaper-flower.jpg" "$dest\ribbon-bouquets.jpg"
Copy-Item "$source\clay-artwork.jpg" "$dest\mud-clay.jpg"
Copy-Item "$source\painting.jpg" "$dest\painting.jpg"
```

---

HOW IMAGES APPEAR ON WEBSITE:
=============================

🏠 HERO SECTION:
  Location: Top of homepage
  Image: owl-mascot.jpg
  Size: Large (floats with animation)
  With: "Meet Bluie! Our little mascot..." info box

👤 ABOUT SECTION:
  Location: Second section below hero
  Image: owl-mascot.jpg (same, displayed in circle)
  Size: 300x300px circular crop
  With: Artist bio and services list

🎨 COLLECTIONS GRID (7 items):
  Location: Collections section
  Layout: Responsive grid (3 items on desktop, 1-2 on mobile)
  Items:
  1. Sketching (sketching.jpg)
  2. Paper Quilling (paper-quilling.jpg)
  3. Thread Art (thread-art.jpg)
  4. Paper Crafts (paper-crafts.jpg)
  5. Ribbon Bouquets (ribbon-bouquets.jpg)
  6. Mud & Clay Art (mud-clay.jpg)
  7. Painting (painting.jpg)

💬 CUSTOM ORDERS SECTION:
  Location: Near footer
  Image: owl-mascot.jpg (shows mascot again)
  Size: 300x300px
  With: "Have something special..." CTA

---

IMAGE REQUIREMENTS:
===================

Format: JPG (recommended), PNG, or WebP
Quality: High (good quality artwork looks best)
Size: Before uploading
  - Compress to under 500KB per image
  - Collections grid items: 300x300px square
  - Owl mascot: 400x450px portrait
  
Tools to compress:
  Free online: TinyPNG.com, Squoosh.app
  Desktop: ImageOptim (Mac), ImageMagick (Windows/Linux)

---

VERIFICATION CHECKLIST:
=======================

After adding images, verify:

☐ All files in public/images/ folder:
  ☐ owl-mascot.jpg
  ☐ sketching.jpg
  ☐ paper-quilling.jpg
  ☐ thread-art.jpg
  ☐ paper-crafts.jpg
  ☐ ribbon-bouquets.jpg
  ☐ mud-clay.jpg
  ☐ painting.jpg

☐ Run npm run dev to test locally
☐ Images load on hero section
☐ Images load on about section
☐ All 7 collection items have images
☐ Custom orders section shows owl
☐ No broken image icons (🖼️ with X)
☐ Open DevTools (F12) → Console tab shows no errors
☐ Mobile view looks good (image sizes adjust)

---

TROUBLESHOOTING:
================

Empty boxes showing? (Images not loading)
  1. Check filenames spell exactly (owl-mascot.jpg not owl-Mascot.JPG)
  2. Clear browser cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
  3. Check console (F12) for error messages
  4. Make sure images are in public/images/ folder

Wrong images displaying?
  1. Double-check filenames match the mapping above
  2. Ensure images are renamed correctly
  3. Verify no duplicate files

Images too large/slow?
  1. Compress with TinyPNG before uploading
  2. Check file sizes (should be < 500KB each)
  3. Use JPG format instead of PNG when possible

---

📝 FILENAMES MUST BE EXACT:

✅ CORRECT:
  owl-mascot.jpg
  sketching.jpg
  paper-quilling.jpg

❌ WRONG (will NOT work):
  Owl-Mascot.JPG
  Sketching.jpg
  paper-quilling.JPG
  PAPER_QUILLING.jpg

---

READY TO ADD IMAGES?

1. Gather your 6-8 artworks
2. Compress them (TinyPNG)
3. Rename them exactly as shown above
4. Copy to public/images/ folder
5. Run: npm run dev
6. Check: http://localhost:5173
7. Deploy! 🚀

Questions? See DEPLOYMENT_GUIDE.md or IMAGE_GUIDE.md
