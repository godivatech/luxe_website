import fs from 'fs';
import path from 'path';
import ImageKit from 'imagekit';

// 1. Load credentials from .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const pubKey = envContent.match(/IMAGEKIT_PUBLIC_KEY=["']?(.*?)["']?$/m)?.[1]?.trim();
const privKey = envContent.match(/IMAGEKIT_PRIVATE_KEY=["']?(.*?)["']?$/m)?.[1]?.trim();
const imageKitUrl = envContent.match(/NEXT_PUBLIC_IMAGEKIT_URL=["']?(.*?)["']?$/m)?.[1]?.trim();

if (!pubKey || !privKey || !imageKitUrl) {
  console.error('ERROR: Missing ImageKit credentials in .env.local');
  process.exit(1);
}

const ik = new ImageKit({
  publicKey: pubKey,
  privateKey: privKey,
  urlEndpoint: imageKitUrl
});

const IMAGEKIT_BASE_URL = `${imageKitUrl}/luxe/products`;
const IK_TRANSFORM = '?tr=w-1200,f-auto,q-auto';
const PROJECTS_ROOT = path.join(process.cwd(), 'public', 'images', 'projects');
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'projects.ts');

const NEW_PROJECTS = [
  { folderName: 'AEROSHIELD', slug: 'aeroshield', title: 'Aeroshield', category: 'Commercial' },
  { folderName: 'MR.KAMARDEEN', slug: 'mr-kamardeen', title: 'Mr Kamardeen', category: 'Residential' },
  { folderName: 'MR.RAJANEETHI RESIDENCE', slug: 'mr-rajaneethi-residence', title: 'Mr Rajaneethi Residence', category: 'Residential' },
  { folderName: 'MR.RAJAPANDIAN RESIDENCE', slug: 'mr-rajapandian-residence', title: 'Mr Rajapandian Residence', category: 'Residential' },
  { folderName: 'NANAL BOTIQUE', slug: 'nanal-botique', title: 'Nanal Boutique', category: 'Commercial' },
  { folderName: 'PANDITHURAI RESIDENCE', slug: 'pandithurai-residence', title: 'Pandithurai Residence', category: 'Residential' },
  { folderName: 'PATTU RAJAN VILLA', slug: 'pattu-rajan-villa', title: 'Pattu Rajan Villa', category: 'Residential' },
  { folderName: 'SANA_S BRIDAL BOTIQUE', slug: 'sanas-bridal-botique', title: "Sana's Bridal Boutique", category: 'Commercial' },
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
  if (lower.includes('scene 4.')) return 68; // For Aeroshield
  if (lower.includes('scene 1.') || lower.includes('scene 1_')) return 65;
  if (lower.match(/\b(1|01)\b/) && !lower.includes('(')) return 60;
  return 10;
}

async function uploadFileWithRetry(fileBuffer, fileName, folderPath, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await ik.upload({
        file: fileBuffer,
        fileName,
        folder: folderPath,
        useUniqueFileName: false
      });
      return res;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      console.warn(`  ⚠️ Retry ${attempt}/${maxRetries} for ${fileName}: ${err.message}`);
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

async function main() {
  console.log('=== ImageKit Cloud Sync Started ===');
  console.log(`Processing ${NEW_PROJECTS.length} new projects...`);

  // Load existing projects from projects.ts
  const currentContent = fs.readFileSync(DATA_FILE, 'utf8');
  const jsonMatch = currentContent.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);
  let existingProjects = [];
  if (jsonMatch) {
    try {
      existingProjects = JSON.parse(jsonMatch[1]);
    } catch (e) {
      console.error('Could not parse existing projects JSON, will retain existing array from file');
    }
  }

  const existingSlugMap = new Map(existingProjects.map(p => [p.id, p]));
  let uploadedCount = 0;

  for (let pIdx = 0; pIdx < NEW_PROJECTS.length; pIdx++) {
    const p = NEW_PROJECTS[pIdx];
    const sourceDir = path.join(PROJECTS_ROOT, p.folderName);
    const targetDir = path.join(PROJECTS_ROOT, p.slug);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const images = getAllImages(sourceDir);
    if (images.length === 0) {
      console.log(`[${pIdx + 1}/${NEW_PROJECTS.length}] Skipping ${p.title} (No images found)`);
      continue;
    }

    // Sort images with hero score priority
    images.sort((a, b) => {
      const scoreDiff = scoreHero(b.name) - scoreHero(a.name);
      if (scoreDiff !== 0) return scoreDiff;
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    console.log(`\n[${pIdx + 1}/${NEW_PROJECTS.length}] Processing ${p.title} (${images.length} images)`);

    // Fetch existing files on ImageKit for this project
    const remoteFiles = await new Promise((res) => {
      ik.listFiles({ path: `/luxe/products/${p.slug}`, limit: 100 }, (err, result) => {
        if (err) res([]); else res(result || []);
      });
    });
    const remoteFileNames = new Set(remoteFiles.map(f => f.name));

    const gallery = [];

    for (let i = 0; i < images.length; i++) {
      const ext = path.extname(images[i].name).toLowerCase() || '.jpg';
      const seqName = `${i + 1}${ext}`;
      const targetLocalPath = path.join(targetDir, seqName);

      // Copy locally to standardized folder if needed
      if (!fs.existsSync(targetLocalPath)) {
        fs.copyFileSync(images[i].fullPath, targetLocalPath);
      }

      // Check if already uploaded
      if (remoteFileNames.has(seqName)) {
        process.stdout.write(`  [${i + 1}/${images.length}] ${seqName} (already uploaded)\n`);
      } else {
        process.stdout.write(`  [${i + 1}/${images.length}] Uploading ${seqName}... `);
        const fileBuffer = fs.readFileSync(images[i].fullPath);
        await uploadFileWithRetry(fileBuffer, seqName, `/luxe/products/${p.slug}`);
        uploadedCount++;
        process.stdout.write(`Done\n`);
        // Small throttle pause between uploads
        await new Promise(r => setTimeout(r, 200));
      }

      gallery.push(`${IMAGEKIT_BASE_URL}/${p.slug}/${seqName}${IK_TRANSFORM}`);
    }

    const coverImage = gallery[0];
    const projectEntry = {
      id: p.slug,
      title: p.title,
      category: p.category,
      coverImage,
      gallery
    };

    existingSlugMap.set(p.slug, projectEntry);

    // Save progress to projects.ts incrementally after every project
    const updatedList = Array.from(existingSlugMap.values());
    const fileOutput = `// Auto-generated file based on images in public/images/projects
// Images are served via ImageKit for optimal performance

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial';
  coverImage: string;
  gallery: string[];
  description?: string;
}

export const projects: Project[] = ${JSON.stringify(updatedList, null, 2)};
`;
    fs.writeFileSync(DATA_FILE, fileOutput, 'utf8');
    console.log(`  ✅ ${p.title} synced to projects.ts!`);
  }

  console.log(`\n🎉 All projects synced successfully! Total newly uploaded files: ${uploadedCount}`);
  console.log(`Total live projects on website: ${existingSlugMap.size}`);
}

main().catch(err => {
  console.error('Fatal error during sync:', err);
  process.exit(1);
});

