# AminaPad

A free, whitelabel blog template built with **Astro 5**, **[Pages CMS](https://pagescms.org)**, and **Cloudflare Pages**. Made for writers who want a beautiful blog without the complexity. Every piece of text, branding, and content is editable through a browser-based admin panel. No code editing required.

---

## Features

- **Full CMS control** - Edit everything from your browser at [app.pagescms.org](https://app.pagescms.org)
- **Blog posts** - Write in a markdown editor with formatting, tags, excerpts, featured images, and drafts
- **Inline image uploads** - Drag and drop images directly into your posts
- **Featured posts** - Pin important posts to the top of the homepage
- **Draft and archive modes** - Save drafts or archive older posts without deleting them
- **Tags system** - Auto-generated tag archive pages
- **Togglable pages** - Show or hide About, Contact, and Tags from your navigation
- **SEO controls** - Custom title, description, and social share image per post and page
- **Author profile** - Name, bio, photo, social links, all editable
- **Site branding** - Site title, tagline, accent color, dark/light mode, custom favicon
- **Display toggles** - Reading time, author block, homepage image, social links placement
- **Reading time** - Auto-calculated for every post
- **RSS feed** at `/rss.xml` and **XML sitemap** at `/sitemap.xml`
- **Structured data** - JSON-LD article schema for Google
- **Responsive design** - Clean editorial layout that works on every device
- **Custom navigation links** - Add external links (newsletter, portfolio, etc.) from the CMS
- **Fast and static** - Pure HTML output, no client-side framework

---

## Setup

You need a **GitHub account** and a **Cloudflare account**. No code editing required.

### 1. Create your repo

Click the green **"Use this template"** button at the top of this repository. Give your copy a name and click Create. This creates a clean copy under your own GitHub account.

### 2. Deploy to Cloudflare Pages

- Go to Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git
- Select your new repo
- Build command: `npm run build`
- Build output directory: `dist`
- Add an environment variable: `NODE_VERSION` = `22`
- Click Save and Deploy

Once it finishes, Cloudflare gives you a URL (something like `your-repo.pages.dev`). Copy it.

### 3. Connect Pages CMS

- Go to [app.pagescms.org](https://app.pagescms.org)
- Sign in with GitHub
- Install the Pages CMS GitHub App on your account
- Grant it access to your blog repo
- Open the repo in Pages CMS

### 4. Set your Site URL

In Pages CMS, open **Site Settings**, scroll to the bottom, and paste your Cloudflare Pages URL into the **Site URL** field. Save. This is used for your RSS feed and sitemap.

### 5. Start writing

Edit your site title, author info, and branding. Create your first blog post. Every save commits to GitHub, Cloudflare rebuilds automatically (~60 seconds), and your changes go live.

---

## How Updates Work

When a new version of AminaPad is released, updating is safe and simple.

**Keep these two things (they belong to you):**
1. `src/content/` - all your posts, pages, and settings
2. `public/images/uploads/` - your uploaded images

**Replace everything else with the update.**

Your content and configuration are untouched. After replacing the template files, commit to GitHub and Cloudflare Pages rebuilds automatically.

---

## Project Structure

```
.pages.yml                - CMS configuration (field definitions)
astro.config.mjs
package.json
public/
  images/uploads/         - CMS image uploads
  styles/global.css       - Stylesheet
  favicon.png             - Default favicon
  robots.txt
src/
  content/
    blog/                 - Blog posts (markdown)
    pages/                - About, Contact content
    navigation.yaml       - Nav toggles
    settings.yaml         - All site and author settings
  layouts/
    Base.astro
  pages/
    index.astro           - Homepage
    about.astro
    contact.astro
    404.astro
    rss.xml.js
    sitemap.xml.js
    blog/
    tags/
```

---

## Customization

- **Accent color** - Edit in the CMS under Site Settings
- **Dark/Light mode** - Toggle in the CMS under Site Settings
- **Favicon** - Upload a custom favicon in the CMS, or replace `public/favicon.png`
- **Fonts** - Edit `src/layouts/Base.astro` (Google Fonts link) and `public/styles/global.css`
- **Layout and design** - All styling is in `public/styles/global.css`

---

## Technical Notes

- **Node.js v22 LTS required** - Node 24+ causes Astro render errors
- **Astro 5** - Do not downgrade to Astro 4
- **`.pages.yml` must live at the repo root** - Pages CMS reads it from there
