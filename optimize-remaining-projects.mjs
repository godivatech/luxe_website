import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECTS_ROOT = path.join(process.cwd(), 'public', 'images', 'projects');
const OUTPUT_ROOT = path.join(process.cwd(), 'public', 'images', 'optimized-projects');
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'projects.ts');

const REMAINING_PROJECTS = [
  { folderName: 'SG APARTMENT', slug: 'sg-apartment', title: 'SG Apartment', category: 'Residential' },
  { folderName: 'SHANMUGAM NAGAR', slug: 'shanmugam-nagar', title: 'Shanmugam Nagar', category: 'Residential' },
  { folderName: 'SR PROMOTERS', slug: 'sr-promoters', title: 'SR Promoters', category: 'Commercial' },
  { folderName: 'St.JOHNS KINDERGARDEN', slug: 'st-johns-kindergarden', title: "St. John's Kindergarten", category: 'Commercial' },
  { folderName: 'THANGARAJ RESIDENCE', slug: 'thangaraj-residence', title: 'Thangaraj Residence', category: 'Residential' },
  { folderName: 'UNIQUE STAY RESORT OFFICE', slug: 'unique-stay-resort-office', title: 'Unique Stay Resort Office', category: 'Commercial' },
  { folderName: 'VINOTH BEDROOM', slug: 'vinoth-bedroom', title: 'Vinoth Bedroom', category: 'Residential' },
  { folderName: 'VIVAHAA PALACE', slug: 'vivahaa-palace', title: 'Vivahaa Palace', category: 'Commercial' },
  { folderName: 'ZAIKA BANQUET', slug: 'zaika-banquet', title: 'Zaika Banquet', category: 'Commercial' },
  { folderName: 'ZORRO DESSERTS', slug: 'zorro-desserts', title: 'Zorro Desserts', category: 'Commercial' }
];

function getAllImages(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllImages(fullPath));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(item)) {
      results.push({ name: item, fullPath });
    }
  }
  return results;
}

function scoreHero(name) {
  const lower = name.toLowerCase();
  if (lower.includes('elevation') || lower.includes('exterior')) return 100;
  if (lower.includes('living') || lower.includes('liv-') || lower.includes('hall')) return 90;
  if (lower.includes('banquote') || lower.includes('banquet')) return 85;
  if (lower.includes('dining') || lower.includes('din-')) return 75;
  if (lower.startsWith('1.') || lower.startsWith('01.') || lower.startsWith('01 ')) return 70;
  if (lower.includes('scene 4.')) return 68;
  if (lower.includes('scene 1.') || lower.includes('scene 1_')) return 65;
  if (lower.match(/\b(1|01)\b/) && !lower.includes('(')) return 60;
  return 10;
}

async function main() {
  console.log('=== Optimizing Remaining 10 Projects Locally with Sharp ===');

  if (!fs.existsSync(OUTPUT_ROOT)) {
    fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  }

  // Load existing 22 projects from projects.ts
  const currentContent = fs.readFileSync(DATA_FILE, 'utf8');
  const jsonMatch = currentContent.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);
  let existingProjects = [];
  if (jsonMatch) {
    existingProjects = JSON.parse(jsonMatch[1]);
  }

  const existingMap = new Map(existingProjects.map(p => [p.id, p]));
  let totalOptimized = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (let pIdx = 0; pIdx < REMAINING_PROJECTS.length; pIdx++) {
    const p = REMAINING_PROJECTS[pIdx];
    const sourceDir = path.join(PROJECTS_ROOT, p.folderName);
    const targetDir = path.join(OUTPUT_ROOT, p.slug);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const images = getAllImages(sourceDir);
    if (images.length === 0) {
      console.log(`[${pIdx + 1}/${REMAINING_PROJECTS.length}] Skipping ${p.title} (No images found)`);
      continue;
    }

    // Sort images with hero priority
    images.sort((a, b) => {
      const scoreDiff = scoreHero(b.name) - scoreHero(a.name);
      if (scoreDiff !== 0) return scoreDiff;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    console.log(`\n[${pIdx + 1}/${REMAINING_PROJECTS.length}] ${p.title} (${images.length} images)`);
    console.log(`  🌟 Cover selected: "${images[0].name}"`);

    const gallery = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const seqName = `${i + 1}.webp`;
      const outputPath = path.join(targetDir, seqName);

      const inStat = fs.statSync(img.fullPath);
      totalOriginalSize += inStat.size;

      // Optimize: resize to 1200px max width, convert to webp (quality 82)
      await sharp(img.fullPath)
        .rotate() // auto-orient based on EXIF
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      totalOptimizedSize += outStat.size;
      totalOptimized++;

      const inKB = Math.round(inStat.size / 1024);
      const outKB = Math.round(outStat.size / 1024);
      console.log(`  [${i + 1}/${images.length}] ${seqName} (${inKB} KB -> ${outKB} KB)`);

      gallery.push(`/images/optimized-projects/${p.slug}/${seqName}`);
    }

    const coverImage = gallery[0];
    const projectEntry = {
      id: p.slug,
      title: p.title,
      category: p.category,
      coverImage,
      gallery
    };

    existingMap.set(p.slug, projectEntry);
  }

  // Write updated projects.ts with all 32 projects
  const allProjects = Array.from(existingMap.values());
  const fileOutput = `// Auto-generated file based on projects data
// Images are optimized (ImageKit CDN for cloud items, WebP for local items)

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial';
  coverImage: string;
  gallery: string[];
  description?: string;
}

export const projects: Project[] = ${JSON.stringify(allProjects, null, 2)};
`;

  fs.writeFileSync(DATA_FILE, fileOutput, 'utf8');

  console.log('\n=============================================');
  console.log(`🎉 Optimization Complete!`);
  console.log(`Total images optimized: ${totalOptimized}`);
  console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Space saved: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`Total live projects on site: ${allProjects.length}`);
  console.log('=============================================');
}

main().catch(err => {
  console.error('Fatal error during optimization:', err);
  process.exit(1);
});

