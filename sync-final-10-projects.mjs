import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECTS_ROOT = path.join(process.cwd(), 'public', 'images', 'projects');
const OUTPUT_ROOT = path.join(process.cwd(), 'public', 'images', 'optimized-projects');
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'projects.ts');

const FINAL_10_PROJECTS = [
  { folderName: 'AKBAR RESIDENCE', slug: 'akbar-residence', title: 'Akbar Residence', category: 'Residential' },
  { folderName: 'ASIFE RESTAURANT', slug: 'asife-restaurant', title: 'Asife Restaurant', category: 'Commercial' },
  { folderName: 'BVC', slug: 'bvc', title: 'BVC', category: 'Commercial' },
  { folderName: 'JIGARTHANDA', slug: 'jigarthanda', title: 'Jigarthanda', category: 'Commercial' },
  { folderName: 'MG hotel', slug: 'mg-hotel', title: 'MG Hotel', category: 'Commercial' },
  { folderName: 'MYSORE WAITING HALL', slug: 'mysore-waiting-hall', title: 'Mysore Waiting Hall', category: 'Commercial' },
  { folderName: 'OJAS CAFE', slug: 'ojas-cafe', title: 'Ojas Cafe', category: 'Commercial' },
  { folderName: 'red 5 ganapathy', slug: 'red-5-ganapathy', title: 'Red 5 Ganapathy', category: 'Residential' },
  { folderName: 'VILLAPURAM RESIDENCE', slug: 'villapuram-residence', title: 'Villapuram Residence', category: 'Residential' },
  { folderName: 'ZEEYA SULTHANS', slug: 'zeeya-sulthans', title: 'Zeeya Sulthans', category: 'Commercial' }
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
  if (lower.includes('elevation') || lower.includes('exterior') || lower.includes('front')) return 100;
  if (lower.includes('living') || lower.includes('liv-') || lower.includes('hall') || lower.includes('lobby') || lower.includes('reception')) return 95;
  if (lower.includes('banquote') || lower.includes('banquet')) return 90;
  if (lower.includes('dining') || lower.includes('din-')) return 85;
  
  const sceneMatch = lower.match(/(?:scene[_\s]*)(\d+)/);
  if (sceneMatch) {
    const num = parseInt(sceneMatch[1], 10);
    if (num >= 1 && num <= 5) return 80 - num;
    return Math.max(10, 60 - num);
  }

  const numMatch = lower.match(/^(\d+)/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (num >= 1 && num <= 5) return 75 - num;
    return Math.max(10, 55 - num);
  }

  return 10;
}

// Case-insensitive folder resolver
function findFolder(baseDir, targetName) {
  if (!fs.existsSync(baseDir)) return null;
  const directPath = path.join(baseDir, targetName);
  if (fs.existsSync(directPath)) return directPath;

  const entries = fs.readdirSync(baseDir);
  const match = entries.find(e => e.toLowerCase() === targetName.toLowerCase());
  return match ? path.join(baseDir, match) : null;
}

async function main() {
  console.log('=== Checking & Optimizing Final 10 Projects ===');

  if (!fs.existsSync(OUTPUT_ROOT)) {
    fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  }

  // Load existing projects from projects.ts
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
  const processedProjects = [];
  const missingFolders = [];

  for (let pIdx = 0; pIdx < FINAL_10_PROJECTS.length; pIdx++) {
    const p = FINAL_10_PROJECTS[pIdx];
    const sourceDir = findFolder(PROJECTS_ROOT, p.folderName);

    if (!sourceDir) {
      missingFolders.push(p.folderName);
      continue;
    }

    const images = getAllImages(sourceDir);
    if (images.length === 0) {
      console.log(`[${pIdx + 1}/${FINAL_10_PROJECTS.length}] Skipping "${p.title}" - folder found but contains 0 images.`);
      missingFolders.push(p.folderName);
      continue;
    }

    const targetDir = path.join(OUTPUT_ROOT, p.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Sort images with hero priority
    images.sort((a, b) => {
      const scoreDiff = scoreHero(b.name) - scoreHero(a.name);
      if (scoreDiff !== 0) return scoreDiff;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    console.log(`\n[${pIdx + 1}/${FINAL_10_PROJECTS.length}] Processing: ${p.title} (${images.length} images)`);
    console.log(`  🌟 Selected Hero Cover: "${images[0].name}"`);

    const gallery = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const seqName = `${i + 1}.webp`;
      const outputPath = path.join(targetDir, seqName);

      const inStat = fs.statSync(img.fullPath);
      totalOriginalSize += inStat.size;

      await sharp(img.fullPath)
        .rotate()
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      totalOptimizedSize += outStat.size;
      totalOptimized++;

      gallery.push(`/images/optimized-projects/${p.slug}/${seqName}`);
    }

    const projectEntry = {
      id: p.slug,
      title: p.title,
      category: p.category,
      coverImage: gallery[0],
      gallery
    };

    existingMap.set(p.slug, projectEntry);
    processedProjects.push(p.title);
  }

  // Update projects.ts if any were processed
  if (processedProjects.length > 0) {
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
    console.log(`\n✅ Updated projects.ts with ${processedProjects.length} new project(s). Total projects: ${allProjects.length}`);
  }

  console.log('\n=============================================');
  console.log(`Processed projects (${processedProjects.length}):`, processedProjects);
  console.log(`Missing folders (${missingFolders.length}):`, missingFolders);
  console.log('=============================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

