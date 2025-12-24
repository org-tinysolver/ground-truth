# TinySolver.me Project

Personal landing page for branding and portfolio showcase.

## Quick Info

| Property | Value |
|----------|-------|
| Repository | [org-tinysolver/tinysolver.me](https://github.com/org-tinysolver/tinysolver.me) |
| Live URL | https://tinysolver.me |
| Platform | Cloudflare Pages |
| Framework | Remix (React Router v7) |

## Tech Stack

- **Framework**: React + Remix
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Routing**: File-based router
- **Deploy**: Cloudflare Pages

## Local Development

```bash
# Clone the repository
git clone git@github.com:org-tinysolver/tinysolver.me.git
cd tinysolver.me

# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs at: http://localhost:5173

## Deployment

### Automatic
- Push to `main` branch triggers automatic deployment
- Preview deployments created for PRs

### Manual
```bash
# Build
npm run build

# Deploy (requires wrangler auth)
npx wrangler pages deploy build/client
```

## Task Examples

### Request Formats for AI PM

```
"Update the hero section tagline"
"Add a new portfolio item"
"Fix mobile navigation on homepage"
"Update contact information on landing page"
```

### Common Task Types

| Type | Description | Priority |
|------|-------------|----------|
| Feature | New functionality | P2 |
| Content | Text/image updates | P3 |
| Bugfix | Fix broken functionality | P1 |
| Style | Design/UI changes | P3 |

## HITL Checkpoints

Required approval before:
- Production deployment
- Major layout changes
- SEO-related updates

## Preview Deployment

Preview URLs follow this pattern:
- PR Preview: `https://{branch}.tinysolver-me.pages.dev`
- Commit Preview: `https://{commit-hash}.tinysolver-me.pages.dev`
