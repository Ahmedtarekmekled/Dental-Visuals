# Dental Visuals - Professional Dental Animation Studio

A modern, responsive website for a dental visualization studio showcasing 3D animations, portfolio work, and professional services.

## 🎯 Features

- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **3D Model Integration**: Interactive Sketchfab embeds (desktop only)
- **Smooth Animations**: GSAP-powered scroll animations
- **Mobile Optimized**: iOS-safe with fallback content
- **Performance Focused**: Optimized for all devices
- **Modern UI**: Clean, professional design inspired by Garden Eight

## 🛠️ Tech Stack

| Category        | Technology                                      |
| --------------- | ----------------------------------------------- |
| **Framework**   | Next.js 14 (App Router)                         |
| **Styling**     | Tailwind CSS                                    |
| **Animations**  | GSAP, Lenis                                     |
| **3D Models**   | Sketchfab Embeds (Desktop) / Fallbacks (Mobile) |
| **Fonts**       | Google Fonts (Fredericka the Great, Inter)      |
| **Deployment**  | Vercel                                          |
| **Performance** | Optimized images, videos, and assets            |

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

## 📱 Mobile & iOS Compatibility

### iOS-Safe Design

- **3D Content Fallbacks**: Automatic fallback to static content on iOS devices
- **WebGL Disabled**: Prevents crashes from heavy 3D content
- **Memory Optimization**: Reduced resource usage on mobile devices
- **Touch Optimized**: Smooth scrolling and touch interactions

### Device Detection

The site automatically detects device capabilities and adjusts content accordingly:

- **Desktop**: Full 3D interactive experience
- **Mobile (Non-iOS)**: Fallback content with performance optimizations
- **iOS Devices**: Static fallback content to prevent crashes

### Performance Optimizations

- Lazy loading for 3D content
- Conditional rendering based on device capabilities
- Error suppression for WebGL and 3D-related issues
- Memory-efficient animations and transitions

## 📁 Project Structure

```
dental-visuals/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── robots.ts          # SEO robots
├── components/            # React components
│   ├── SketchfabEmbed.tsx # 3D model embeds (iOS-safe)
│   ├── PortfolioItem.tsx  # Portfolio cards
│   ├── HeroSection.tsx    # Hero section
│   └── ...
├── lib/                   # Utilities
│   ├── deviceDetection.ts # Device capability detection
│   ├── gsap.ts           # GSAP configuration
│   └── lenis.ts          # Smooth scrolling
├── data/                  # Content management
│   └── buldingprocess.json # All site content
├── public/               # Static assets
│   ├── videos/          # Portfolio videos
│   └── icons/           # Icons and images
├── styles/              # Global styles
└── tailwind.config.ts   # Tailwind configuration
```

## 🎬 Adding Portfolio Videos

### Video Requirements

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720 minimum (1920x1080 preferred)
- **Duration**: 10-30 seconds for optimal hover experience
- **File Size**: Under 10MB per video
- **Audio**: Optional (muted on autoplay)

### Adding Videos

1. Place video files in `public/videos/`
2. Update `data/buldingprocess.json` with video information
3. Videos automatically support mobile fallbacks

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Content Management

All content is managed through `data/buldingprocess.json`:

- Website information
- Services offered
- Portfolio projects
- Contact details

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Performance

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Mobile Performance

- Optimized for iOS Safari
- Reduced bundle size on mobile
- Efficient resource loading
- Touch-friendly interactions

## 🐛 Troubleshooting

### iOS Issues

If experiencing crashes on iOS:

1. Ensure ErrorSuppressor component is loaded
2. Check device detection is working
3. Verify fallback content is displaying

### 3D Model Issues

If 3D models aren't loading:

1. Check Sketchfab model IDs are correct
2. Verify internet connection
3. Try on desktop for full experience

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## 📞 Support

For support or questions:

- Email: hello@dentalvisuals.com
- Issues: [GitHub Issues](https://github.com/yourusername/dental-visuals/issues)

---

Built with ❤️ for the dental community
