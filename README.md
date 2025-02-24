# One Community Landing Page

A modern, mobile-first landing page for One Community focused on energy type discovery and name vibration analysis. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## Features

- **Mobile-Optimized**: Designed for a seamless experience on mobile devices, especially for leads from YouTube Shorts
- **Interactive Questionnaire**: Engaging flow with questions, interlude facts, and smooth transitions
- **Real-time Calculation**: Determines energy type based on responses and calculates name vibration using Pythagorean numerology
- **Modern UI/UX**: Uses card-based design, subtle animations, and a cohesive visual style
- **Background Video**: Atmospheric looping video with fallback for better mobile performance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Ready for Vercel or similar platforms

## Getting Started

1. **Clone the repository**

2. **Install dependencies**

```bash
npm install
```

3. **Add video assets**

Place your background video in the `public/videos` directory as `energy-background.mp4`.
Add a fallback image in `public/images` as `fallback-bg.jpg`.

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

- `app/`: Main application code
  - `components/`: Reusable UI components
  - `utils/`: Utility functions and data
  - `page.tsx`: Main page component
  - `layout.tsx`: Root layout
  - `globals.css`: Global styles
- `public/`: Static assets
  - `videos/`: Video backgrounds
  - `images/`: Images and fallbacks

## Customization

- **Colors**: Edit the Tailwind configuration in `tailwind.config.js`
- **Questions**: Modify the questionnaire content in `app/utils/questionnaireData.ts`
- **Vibration Calculation**: Adjust the algorithm in `app/utils/nameVibration.ts`

## License

All rights reserved. This project is proprietary and confidential. 