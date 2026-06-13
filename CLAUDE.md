# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A portfolio site for Mike Delmonaco, built with [Projection](https://github.com/quasarbright/projection) — a static site generator. All content lives in `projects.yaml` and `projection.config.json`. The `dist/` directory is the generated output.

## Commands

```bash
projection admin    # Content management UI (add/edit projects)
projection dev      # Dev server with live reload
projection build    # Build to dist/
projection deploy   # Deploy to GitHub Pages
```

## How to Add or Update Projects

Edit `projects.yaml` directly, or use `projection admin` for a UI. Each project entry supports:
- `id`, `title`, `description`, `creationDate`, `tags`
- `pageLink`, `sourceLink` — external URLs
- `screenshot` — path relative to repo root (e.g. `screenshots/my-project.png`)
- `featured: true` — promotes project to the top

Screenshots go in `screenshots/` as `.png` files.

## Site Configuration

`projection.config.json` controls the site title, base URL, `dynamicBackgrounds` (iframes cycling in the hero), and output directory. The `projects.yaml` `config:` block also has per-site settings (items per page, default screenshot, etc.) — `projection.config.json` takes precedence for overlapping keys.
