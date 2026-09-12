# Spark Salon — Public Assets Directory

This is the Next.js static assets directory. Any file placed inside `public/` is served directly by the web server at the root URL path (`/`).

---

## Recommended Folder Structure

- **`images/`**: General photography, logos, icons, and hero banners.
  - E.g., `public/images/spark-logo.png` is accessible in code as `"/images/spark-logo.png"`.
  - **`images/studios/`**: Studio category photos (Hair, Nail, Beauty, Bridal, Spa, Tattoo).
  - **`images/gallery/`**: Salon interior, reception, styling stations, and treatment photos.
- **`models/`**: 3D assets (`.glb` / `.gltf`) for Three.js / React Three Fiber models.
  - E.g., `public/models/dryer.glb` is loaded in R3F with `useGLTF('/models/dryer.glb')`.
- **`videos/`**: Cinematic salon brand film, background loops, or reels (`.mp4`, `.webm`).
- **`audio/`**: Ambient salon spatial audio loops (`.mp3`, `.wav`).

---

## How to Reference in Code

In any Next.js component:

```tsx
// Using Next.js Image component or HTML <img>:
<img src="/images/spark-logo.png" alt="Spark Logo" />

// Or using Next.js Image:
import Image from 'next/image';
<Image src="/images/gallery/reception.jpg" width={800} height={600} alt="Reception" />
```
