# 🦷 Dental Visuals Portfolio

A premium, minimalist portfolio website for dental motion graphics specialist **Osama Mohammed Eldeeb**. Built with cutting-edge web technologies and inspired by Garden Eight's sophisticated design aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)

## ✨ Features

### 🎨 **Premium Design**

- **Dark Theme**: Sophisticated black/white/gray palette
- **Garden Eight Inspired**: Minimalist, high-end aesthetic
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Premium Typography**: Fredericka the Great + Inter fonts

### 🎬 **Interactive Portfolio**

- **Hover-to-Play Videos**: Smooth video previews on portfolio cards
- **3D Dental Models**: Interactive Sketchfab embeds with transparent backgrounds
- **Smooth Animations**: GSAP + Lenis for buttery scroll experiences
- **Smart Loading**: Optimized performance with lazy loading

### 🚀 **Performance Optimized**

- **Next.js 14**: App Router with server-side rendering
- **Zero Console Errors**: Comprehensive error suppression
- **SEO Ready**: Optimized meta tags and structured data
- **Vercel Ready**: One-click deployment configuration

## 🛠 Tech Stack

| Category        | Technology                                 |
| --------------- | ------------------------------------------ |
| **Framework**   | Next.js 14 (App Router)                    |
| **Language**    | TypeScript                                 |
| **Styling**     | Tailwind CSS                               |
| **Animations**  | GSAP, Lenis                                |
| **3D Models**   | Sketchfab Embeds                           |
| **Fonts**       | Google Fonts (Fredericka the Great, Inter) |
| **Deployment**  | Vercel                                     |
| **Performance** | Optimized images, videos, and assets       |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/dental-visuals.git
cd dental-visuals
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (after connecting to GitHub)
# Automatic deployment on push to main branch
```

## 📁 Project Structure

```
dental-visuals/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── robots.ts          # SEO robots
├── components/            # React components
│   ├── SketchfabEmbed.tsx # 3D model embeds
│   ├── PortfolioItem.tsx  # Portfolio cards
│   ├── HeroSection.tsx    # Hero section
│   └── ...
├── data/                  # Content management
│   └── buldingprocess.json # All site content
├── public/               # Static assets
│   ├── videos/          # Portfolio videos
│   └── icons/           # Icons and images
├── styles/              # Global styles
└── lib/                 # Utilities (GSAP, Lenis)
```

## 🎬 Adding Portfolio Videos

### Video Requirements

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720 minimum (1920x1080 preferred)
- **Duration**: 10-30 seconds for optimal hover experience
- **File Size**: Under 10MB per video
- **Audio**: Optional (muted on autoplay)

### Video Files Needed

Place these files in `/public/videos/`:

```
public/videos/
├── dental-brand.mp4        # Instagram brand development
├── european-clinic.mp4     # Swedish clinic animations
├── south-america.mp4       # Brazilian client work
├── orthodontic-cases.mp4   # Treatment documentation
├── surgical-animation.mp4  # Surgical procedures
└── implant-animation.mp4   # 3D implant placement
```

### Video Optimization

```bash
# Example FFmpeg compression
ffmpeg -i input.mov -vcodec libx264 -crf 28 -preset medium -vf scale=1280:720 output.mp4
```

## 🎨 Customization

### Content Management

All content is managed through `/data/buldingprocess.json`:

```json
{
  "website_info": {
    "name": "Your Name",
    "description": "Your description"
  },
  "services": {
    "primary_services": [...]
  },
  "portfolio_structure": {
    "featured_projects": [...]
  }
}
```

### Design Customization

- **Colors**: Update `tailwind.config.ts`
- **Fonts**: Modify `app/layout.tsx`
- **Animations**: Adjust GSAP settings in `/lib/gsap.ts`
- **3D Models**: Replace Sketchfab model IDs in components

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Auto-deployment** on every push to main

### Manual Deployment

```bash
npm run build
npm start
```

### Environment Variables (if needed)

```env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🔧 Performance Features

- ✅ **Optimized Images**: Next.js Image component with lazy loading
- ✅ **Video Streaming**: Efficient video loading with hover-to-play
- ✅ **3D Model Optimization**: Sketchfab embeds with quality controls
- ✅ **Error Suppression**: Clean console with Sentry blocking
- ✅ **Smooth Animations**: 60fps animations with GSAP
- ✅ **SEO Optimized**: Meta tags, sitemap, robots.txt

## 🎯 Portfolio Showcase

This website showcases **Osama Mohammed Eldeeb's** dental motion graphics work:

- 🏥 **International Client Work**: Sweden, Brazil
- 🦷 **Orthodontic Animations**: Treatment documentation
- 🔬 **Surgical Procedures**: 3D educational content
- 📱 **Brand Development**: Instagram content creation
- 🎓 **Educational Content**: Dental student resources

## 📞 Contact & Support

**Osama Mohammed Eldeeb**

- 📧 Email: 0samaeldeeb1011@gmail.com
- 📱 Phone: +201092532321
- 📸 Instagram: [@dentalvisuals](https://www.instagram.com/dentalvisuals/)
- 💼 LinkedIn: [Osama Eldeeb](https://linkedin.com/in/osama-eldeeb-16b630293)

## 📄 License

This project is created for **Osama Mohammed Eldeeb's** portfolio.

---

**Built with ❤️ for dental professionals worldwide**
