import fs from 'node:fs';
import yaml from 'js-yaml';

const settings = yaml.load(fs.readFileSync('src/content/settings.yaml', 'utf8'));

function getSlugFromPath(filePath) {
  var parts = filePath.split('/');
  var fileName = parts[parts.length - 1];
  return fileName.replace('.md', '');
}

export async function GET(context) {
  const postFiles = import.meta.glob('../content/blog/*.md', { eager: true });

  var posts = [];
  for (var path of Object.keys(postFiles)) {
    var mod = postFiles[path];
    if (mod.frontmatter && !mod.frontmatter.draft && !mod.frontmatter.archived) {
      posts.push({
        frontmatter: mod.frontmatter,
        slug: getSlugFromPath(path),
        compiledContent: mod.compiledContent ? mod.compiledContent() : '',
      });
    }
  }

  posts.sort(function(a, b) {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  var siteUrl = (context.site || 'https://your-site.pages.dev').toString().replace(/\/$/, '');

  function escapeXml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  var items = posts.slice(0, 20).map(function(post) {
    var link = siteUrl + '/blog/' + post.slug + '/';
    var pubDate = new Date(post.frontmatter.date).toUTCString();
    return '<item>' +
      '<title>' + escapeXml(post.frontmatter.title) + '</title>' +
      '<link>' + link + '</link>' +
      '<guid>' + link + '</guid>' +
      '<pubDate>' + pubDate + '</pubDate>' +
      '<description>' + escapeXml(post.frontmatter.description) + '</description>' +
      '</item>';
  }).join('\n    ');

  var rss = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    '  <channel>\n' +
    '    <title>' + escapeXml(settings.site_title) + '</title>\n' +
    '    <link>' + siteUrl + '</link>\n' +
    '    <description>' + escapeXml(settings.site_description) + '</description>\n' +
    '    <language>en</language>\n' +
    '    <atom:link href="' + siteUrl + '/rss.xml" rel="self" type="application/rss+xml" />\n' +
    '    ' + items + '\n' +
    '  </channel>\n' +
    '</rss>';

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
