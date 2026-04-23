import fs from 'node:fs';
import yaml from 'js-yaml';

const settings = yaml.load(fs.readFileSync('src/content/settings.yaml', 'utf8'));
const nav = yaml.load(fs.readFileSync('src/content/navigation.yaml', 'utf8'));

function getSlugFromPath(filePath) {
  var parts = filePath.split('/');
  var fileName = parts[parts.length - 1];
  return fileName.replace('.md', '');
}

export async function GET(context) {
  var siteUrl = (context.site || 'https://your-site.pages.dev').toString().replace(/\/$/, '');
  var today = new Date().toISOString().split('T')[0];

  const postFiles = import.meta.glob('../content/blog/*.md', { eager: true });

  var urls = [];

  urls.push({ loc: siteUrl + '/', priority: '1.0', changefreq: 'daily' });
  urls.push({ loc: siteUrl + '/blog/', priority: '0.8', changefreq: 'daily' });

  if (nav.show_about) {
    urls.push({ loc: siteUrl + '/about/', priority: '0.6', changefreq: 'monthly' });
  }
  if (nav.show_contact) {
    urls.push({ loc: siteUrl + '/contact/', priority: '0.6', changefreq: 'monthly' });
  }
  if (nav.show_tags) {
    urls.push({ loc: siteUrl + '/tags/', priority: '0.5', changefreq: 'weekly' });
  }

  var tagSet = {};
  for (var path of Object.keys(postFiles)) {
    var mod = postFiles[path];
    if (mod.frontmatter && !mod.frontmatter.draft && !mod.frontmatter.archived) {
      var slug = getSlugFromPath(path);
      var lastmod = mod.frontmatter.date || today;
      urls.push({ loc: siteUrl + '/blog/' + slug + '/', priority: '0.7', changefreq: 'monthly', lastmod: lastmod });

      if (mod.frontmatter.tags) {
        for (var tag of mod.frontmatter.tags) {
          tagSet[tag.toLowerCase()] = true;
        }
      }
    }
  }

  for (var tagKey of Object.keys(tagSet)) {
    urls.push({ loc: siteUrl + '/tags/' + tagKey + '/', priority: '0.4', changefreq: 'weekly' });
  }

  function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var urlEntries = urls.map(function(u) {
    var entry = '  <url>\n    <loc>' + escapeXml(u.loc) + '</loc>';
    if (u.lastmod) {
      entry += '\n    <lastmod>' + u.lastmod + '</lastmod>';
    }
    entry += '\n    <changefreq>' + u.changefreq + '</changefreq>';
    entry += '\n    <priority>' + u.priority + '</priority>';
    entry += '\n  </url>';
    return entry;
  }).join('\n');

  var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urlEntries + '\n' +
    '</urlset>';

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
