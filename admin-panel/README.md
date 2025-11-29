# Epsilon Mathematics Institute - Admin Panel

A comprehensive admin panel for managing the Epsilon Mathematics Institute website content, built with Next.js and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Hero Management**: Upload and manage hero background images with automatic slideshow
- **YouTube Integration**: Manage YouTube playlist and sync latest videos automatically
- **Announcements**: Create and manage announcement ticker with images and emojis
- **Downloads**: Upload and organize PDF files for students
- **Gallery**: Manage gallery images with categories and captions
- **Courses & Faculty**: Complete course management with faculty information

### 🚀 Technical Features
- Modern React with Next.js 15
- Responsive design with Tailwind CSS
- Real-time preview of changes
- Drag & drop file uploads
- Toast notifications for user feedback
- Mobile-friendly interface

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Admin Modules

### 1. Hero Management (`/hero`)
- Upload multiple hero background images
- Set display order and timing (5-second intervals)
- Enable/disable specific images
- Preview slideshow functionality

### 2. YouTube Integration (`/youtube`)
- Configure YouTube channel ID and playlist ID
- Add YouTube Data API v3 key
- Auto-sync videos from channel
- Manage latest video display

### 3. Announcements (`/announcements`)
- Create announcement ticker content
- Add thumbnail images and emojis
- Set display order and status
- Live preview of ticker

### 4. Downloads (`/downloads`)
- Upload PDF files with categories
- Set file descriptions and metadata
- Track download statistics
- Organize by subject/topic

### 5. Gallery (`/gallery`)
- Upload and categorize images
- Add captions and descriptions
- Set display order
- Masonry layout preview

### 6. Courses & Faculty (`/courses`)
- Manage course information
- Add/edit faculty members
- Set course pricing and duration
- Link faculty to courses

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# YouTube API Configuration
NEXT_PUBLIC_YT_API_KEY=your_youtube_api_key
NEXT_PUBLIC_YT_CHANNEL_ID=your_channel_id
NEXT_PUBLIC_YT_PLAYLIST_ID=your_playlist_id

# File Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/*,application/pdf
```

### YouTube API Setup
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key in the admin panel

## File Structure

```
admin-panel/
├── src/
│   ├── app/
│   │   ├── hero/           # Hero image management
│   │   ├── youtube/        # YouTube integration
│   │   ├── announcements/  # Announcement management
│   │   ├── downloads/      # PDF file management
│   │   ├── gallery/        # Gallery management
│   │   ├── courses/        # Course & faculty management
│   │   ├── globals.css     # Global styles
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Dashboard
│   ├── components/         # Reusable components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── next.config.mjs        # Next.js configuration
```

## Customization

### Styling
- Modify `src/app/globals.css` for custom CSS
- Update `tailwind.config.js` for theme customization
- Use the existing design system classes

### Adding New Modules
1. Create a new directory in `src/app/`
2. Add the module to the dashboard navigation
3. Implement the required functionality
4. Update the stats calculation

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **AWS Amplify**: Build settings for Next.js
- **Traditional hosting**: Build and upload the `out` directory

## Security Considerations

- Admin panel should be protected with authentication
- File uploads should be validated and sanitized
- API keys should be kept secure
- Regular backups of content data
- Rate limiting for file uploads

## Support

For technical support or feature requests, please contact the development team.

## License

This project is proprietary software for Epsilon Mathematics Institute.

---

**Built with ❤️ for Epsilon Mathematics Institute**
