# Portfolio Videos

Place your dental animation videos in this directory with the following names:

## Required Video Files:

- `dental-brand.mp4` - Dental Visuals Instagram Brand video
- `european-clinic.mp4` - European Clinic Animations video
- `south-america.mp4` - South American Projects video
- `orthodontic-cases.mp4` - Orthodontic Case Studies video
- `surgical-animation.mp4` - Surgical Procedure Animations video
- `implant-animation.mp4` - Implant Placement Animation video

## Video Requirements:

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 or 1280x720 minimum
- **Duration**: 10-30 seconds for best hover experience
- **File Size**: Keep under 10MB per video for optimal loading
- **Audio**: Optional (videos will be muted on hover)

## Optimization Tips:

1. **Compress videos** using tools like FFmpeg or online compressors
2. **Use short loops** - videos will loop continuously on hover
3. **Start with action** - first frame should be engaging
4. **Test on mobile** - ensure videos load quickly on slower connections

## Example FFmpeg Compression:

```bash
ffmpeg -i input.mov -vcodec libx264 -crf 28 -preset medium -vf scale=1280:720 output.mp4
```

## How It Works:

- **Hover to Play**: Videos start playing when user hovers over portfolio cards
- **Auto-stop**: Videos pause and reset when hover ends
- **Fallback**: If video fails to load, thumbnail image is shown
- **Mobile-friendly**: Uses `playsInline` for iOS compatibility

Once you add videos to this folder, they will automatically appear in the portfolio cards with smooth hover-to-play functionality!
