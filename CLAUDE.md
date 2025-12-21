# CLAUDE.md - Ground Truth Documentation

This document provides guidance for AI assistants working with this codebase.

## Project Overview

**Ground Truth** is a documentation hub serving as the "source of truth" for an AI company. It provides documentation for both humans and AI agents, built with Docusaurus 3.6.3.

- **Primary Language**: Korean (ko)
- **Framework**: Docusaurus 3.6.3 with React 18
- **Deployment**: GitHub Pages + Cloudflare Pages (dual deployment)
- **URL**: https://org-tinysolver.github.io/ground-truth/

## Directory Structure

```
ground-truth/
├── docs/                    # Documentation source files (MDX)
│   ├── intro.mdx           # Landing page (route: /)
│   ├── agents/             # AI Agent documentation
│   │   ├── overview.mdx
│   │   └── slack-integration.mdx
│   └── humans/             # Human-readable documentation
│       ├── overview.mdx
│       ├── builders/       # Builder culture guides
│       ├── devops/         # DevOps & infrastructure
│       ├── products/       # Product documentation
│       ├── contributing.mdx
│       └── examples.mdx
├── src/
│   ├── components/         # React components
│   │   ├── Checklist.jsx   # Interactive checklist
│   │   ├── CloudStatus.jsx # Cloud provider status cards
│   │   └── InteractiveDemo.jsx  # Tabs, Accordion, Quiz, StepGuide
│   └── css/
│       └── custom.css      # Custom styles (Tailwind-like colors)
├── static/
│   └── img/                # Static assets
├── workqueue/              # Task management system
│   ├── README.md           # Workqueue guide
│   ├── work-template.md    # Task template
│   ├── bug/                # Bug fixes
│   ├── docs/               # Documentation tasks
│   ├── infra/              # Infrastructure tasks
│   ├── huddle/             # Meetings/discussions
│   └── chore/              # Maintenance tasks
├── .github/workflows/
│   └── deploy.yml          # CI/CD pipeline
├── docusaurus.config.js    # Docusaurus configuration
├── sidebars.js             # Sidebar navigation
├── package.json            # Dependencies
├── Dockerfile              # Container build (nginx-based)
└── docker-compose.yml      # Local development
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run start

# Build static site
npm run build

# Serve built site locally
npm run serve

# Clear Docusaurus cache
npm run clear

# Using Docker for local development (port 3100)
docker-compose up
```

## Key Conventions

### Documentation Files

1. **File Format**: Use `.mdx` for documentation (supports JSX components)
2. **Frontmatter**: Required `sidebar_position` for ordering
   ```yaml
   ---
   sidebar_position: 1
   ---
   ```
3. **Language**: Primary content in Korean
4. **Diagrams**: Use Mermaid for flowcharts and diagrams (enabled in config)

### Documentation Structure

The docs are split into two audiences:

| Audience | Path | Purpose |
|----------|------|---------|
| Humans | `docs/humans/` | Learning, context, examples |
| AI Agents | `docs/agents/` | Structured instructions, checklists |

### React Components

Available custom components (import from `@site/src/components/`):

- **Checklist**: Interactive progress tracker
  ```jsx
  import Checklist from '@site/src/components/Checklist';
  <Checklist items={[{ id: 'item1', label: 'Task 1' }]} />
  ```

- **StepGuide**: Multi-step interactive guide
- **Accordion**: Collapsible sections
- **Quiz**: Interactive quizzes
- **Tabs**: Tabbed content
- **CloudStatus**: Cloud provider status display

### Workqueue System

Task management uses a file-based queue system following the "Why-What-How" structure:

1. **Create tasks** in the appropriate folder (`bug/`, `docs/`, `infra/`, `huddle/`, `chore/`)
2. **Use the template** from `workqueue/work-template.md`
3. **Required sections**:
   - Why (Purpose): Why this task matters
   - What (Goal): What needs to be achieved
   - How (Method): How to accomplish it
   - Why This Way: Rationale for chosen approach

**Task States**: `대기` (pending) | `진행중` (in-progress) | `블락` (blocked) | `완료` (completed)

**Priority**: `🔴 높음` (high) | `🟡 중간` (medium) | `🟢 낮음` (low)

## CI/CD Pipeline

### Automatic Deployment

Triggered on push to `main` branch when these files change:
- `docs/**`, `src/**`, `static/**`
- `package.json`, `docusaurus.config.js`, `sidebars.js`

### Pipeline Steps

1. **Build**: Install deps, run `npm run build`
2. **Deploy GitHub Pages**: Push to GitHub Pages
3. **Deploy Cloudflare Pages**: Push to Cloudflare
4. **Notify**: Send Slack notification with results

### Required Secrets

- `SLACK_WEBHOOK_URL`: Slack notifications
- `CLOUDFLARE_API_TOKEN`: Cloudflare deployment
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account

## Styling

- **Theme Colors**: Blue primary (`#2563eb` light / `#60a5fa` dark)
- **CSS Variables**: Uses Docusaurus Infima variables (`--ifm-*`)
- **Cloud Badges**: AWS (orange), GCP (blue), Azure (blue)

## Important Patterns

### Adding New Documentation

1. Create `.mdx` file in appropriate `docs/` subdirectory
2. Add `sidebar_position` in frontmatter
3. Update `sidebars.js` if adding new categories
4. Use Mermaid for diagrams where helpful

### Modifying Navigation

Edit `sidebars.js` to change sidebar structure:
```js
{
  type: 'category',
  label: 'Category Name',
  items: ['path/to/doc', 'another/doc'],
}
```

### Adding React Components

1. Create component in `src/components/`
2. Import in MDX files: `import Component from '@site/src/components/Component'`
3. Add any required CSS to `src/css/custom.css`

## Build & Deployment Notes

- **Node.js**: Requires Node 20+
- **Build Output**: Static files in `build/` directory
- **Base URL**: `/ground-truth/` (for GitHub Pages subdirectory)
- **Broken Links**: Build fails on broken links (`onBrokenLinks: 'throw'`)

## Git Workflow

1. Create feature branch from `main`
2. Make changes and test locally (`npm run build`)
3. Create PR to `main`
4. After merge, automatic deployment triggers
5. Verify deployment via Slack notification

## Troubleshooting

### Build Failures
- Check MDX syntax errors
- Verify all imported components exist
- Run `npm run build` locally first

### Broken Links
- Use relative paths for internal links
- Check `onBrokenLinks` setting in `docusaurus.config.js`

### Hot Reload Not Working
- Run `npm run clear` then restart dev server
- Check `docker-compose.yml` volume mounts if using Docker
