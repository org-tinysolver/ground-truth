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
├── .claude/                 # Claude Code configuration
│   ├── settings.json       # Permissions & hooks config
│   ├── skills/             # AI role-specific skills
│   │   ├── ai-pm.md        # PM role guidelines
│   │   ├── ai-dev.md       # Dev role guidelines
│   │   ├── ai-research.md  # Research role guidelines
│   │   └── org-issue.md    # Issue creation protocol
│   └── commands/           # Slash commands
│       ├── issue.md        # Create GitHub issues
│       ├── pm-cycle.md     # PM workflow cycle
│       ├── dev-cycle.md    # Dev workflow cycle
│       ├── research-cycle.md # Research workflow cycle
│       └── check-delegation.md # Verify delegation rules
├── docs/                    # Documentation source files (MDX)
│   ├── intro.mdx           # Landing page (route: /)
│   ├── agents/             # AI Agent documentation
│   │   ├── overview.mdx
│   │   ├── org-rules.mdx   # Organization-wide agent rules
│   │   ├── slack-integration.mdx
│   │   ├── rules/          # Agent boundaries & protocols
│   │   │   ├── overview.mdx
│   │   │   ├── hitl-boundary.mdx  # Human-in-the-loop boundaries
│   │   │   ├── branch-protection.mdx
│   │   │   └── delegation-protocol.mdx
│   │   └── teams/          # Team structure documentation
│   │       ├── overview.mdx
│   │       ├── ai-pm.mdx
│   │       ├── ai-dev.mdx
│   │       ├── ai-research.mdx
│   │       ├── workqueue-manager.mdx
│   │       └── github-projects.mdx
│   └── humans/             # Human-readable documentation
│       ├── overview.mdx
│       ├── builders/       # Builder culture guides
│       │   ├── overview.mdx
│       │   ├── poc-guide.mdx
│       │   ├── mvp-guide.mdx
│       │   └── open-contribution.mdx
│       ├── devops/         # DevOps & infrastructure
│       │   ├── overview.mdx
│       │   ├── cicd-pipeline.mdx
│       │   └── cloud-setup/  # Cloud provider setup guides
│       │       ├── overview.mdx
│       │       ├── aws-setup.mdx
│       │       ├── gcp-setup.mdx
│       │       └── azure-setup.mdx
│       ├── products/       # Product documentation
│       │   ├── overview.mdx
│       │   ├── ai-pm/      # AI PM product
│       │   ├── ai-devteam/ # AI Dev Team product
│       │   ├── ai-research/# AI Research product
│       │   ├── merrymatch/
│       │   └── tinysolver-plugins/
│       ├── contributing.mdx
│       └── examples.mdx
├── scripts/
│   └── claude-code/
│       └── session-start.sh  # SessionStart hook (gh CLI auto-install)
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

## Claude Code Configuration

This repository includes Claude Code configuration in `.claude/`:

### Settings (`.claude/settings.json`)

```json
{
  "permissions": {
    "allow": ["Bash(gh:*)", "Bash(git:*)"]
  },
  "hooks": {
    "SessionStart": [...]
  }
}
```

**Auto-approved commands:**
- `gh` - GitHub CLI commands
- `git` - Git commands

### SessionStart Hook

The `scripts/claude-code/session-start.sh` hook runs at session start and:
- Detects Claude Code Web environment (`CLAUDE_CODE_REMOTE=true`)
- Auto-installs GitHub CLI in web environments
- Skips installation in local environments

### Skills

Skills provide role-specific guidelines in `.claude/skills/`:

| Skill | Purpose |
|-------|---------|
| `ai-pm.md` | PM role: spec writing, prioritization, micro-cycles |
| `ai-dev.md` | Dev role: implementation, code review, testing |
| `ai-research.md` | Research role: analysis, data gathering |
| `org-issue.md` | Standard protocol for creating GitHub issues |

### Slash Commands

Available commands in `.claude/commands/`:

| Command | Usage | Description |
|---------|-------|-------------|
| `/issue` | `/issue <type> <title> [repo]` | Create GitHub issues with org standard labels |
| `/pm-cycle` | `/pm-cycle` | Run PM micro-cycle workflow |
| `/dev-cycle` | `/dev-cycle` | Run Dev micro-cycle workflow |
| `/research-cycle` | `/research-cycle` | Run Research workflow |
| `/check-delegation` | `/check-delegation` | Verify delegation boundaries |

**Issue types:** `to-dev`, `to-pm`, `to-research`, `review`, `all-hands`, `blocked`

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
| AI Agents | `docs/agents/` | Structured instructions, checklists, rules |

### Agent Rules (`docs/agents/rules/`)

Critical boundaries for AI agents:
- **HITL Boundary**: When human approval is required
- **Branch Protection**: Git workflow rules
- **Delegation Protocol**: How agents delegate to sub-agents

### Team Structure (`docs/agents/teams/`)

AI team organization:
- **AI PM**: Product management, spec writing
- **AI Dev**: Implementation, code review
- **AI Research**: Analysis, data gathering
- **Workqueue Manager**: Task management
- **GitHub Projects**: Project tracking

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

### Adding Claude Code Skills

1. Create `.md` file in `.claude/skills/`
2. Define role-specific guidelines and checklists
3. Reference in team documentation

### Adding Slash Commands

1. Create `.md` file in `.claude/commands/`
2. Include usage instructions and examples
3. Use `$ARGUMENTS` placeholder for command arguments

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

### SessionStart Hook Issues
- Check `/tmp/session-start-hook.log` for debug logs
- Verify `CLAUDE_CODE_REMOTE` environment variable in web environments
- Ensure `~/.local/bin` is in PATH after gh CLI installation
