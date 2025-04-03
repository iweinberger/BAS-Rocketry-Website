# BAS Rocketry Website

The main website for BAS Rocketry showcasing our projects, team, and sponsors.

## Project Structure

```typescript
BAS_rocketry/
├── app/
│   ├── page.tsx              # Main page component
│   ├── sponsors/
│   │   └── page.tsx         # Sponsors page component
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout component
├── public/
│   ├── logo.png            # Main website logo
│   ├── pattern.png         # Background pattern
│   ├── projects/           # Images for the upcomming projects
│   │   ├── alpha.png      # Initial Rocket project image
│   │   ├── beta.png       # Project Fluid image
│   │   └── gamma.png      # Project End Game image
│   └── sponsors/          # Logos for the sponsors page
│       ├── bas.png        # BAS logo
│       └── alpha.png      # Placeholder sponsor logo
└── package.json           # Project dependencies
```

## Image Requirements

### Project Images (`/public/projects/`)

- Format: PNG
- Recommended size: 800x400px
- Aspect ratio: 2:1
- Background: Transparent or dark theme compatible

### Sponsor Logos (`/public/sponsors/`)

- Format: PNG
- Size: 180x180px
- Aspect ratio: 1:1
- Background: Transparent
- Clear visibility on light background

### Website Logo (`/public/logo.png`)

- Format: PNG
- Size: 60x60px
- Aspect ratio: 1:1
- Background: Transparent

## Development

1. Install dependencies:

```bash
npm install
```

2. Run the development server for local testing:

```bash
npm run dev
```

## Dependencies

- Next.js 13+
- React
- Font Awesome
- TypeScript


## Notes

- All images should be optimized for web use

- **Sponsor logos should be placed in the `/public/sponsors/` directory**

- **Project images should be placed in the `/public/projects/` directory**

- The website uses a dark theme with green accents for visual appeal