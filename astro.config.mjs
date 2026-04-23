import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import yaml from 'js-yaml';

const settings = yaml.load(fs.readFileSync('src/content/settings.yaml', 'utf8'));

export default defineConfig({
  site: settings.site_url || undefined,
});
