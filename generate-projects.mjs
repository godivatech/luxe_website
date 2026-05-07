import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
let imageKitUrl = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const urlMatch = envContent.match(/^NEXT_PUBLIC_IMAGEKIT_URL=["']?(.*?)["']?$/m);
  if (urlMatch) imageKitUrl = urlMatch[1].trim();
}

if (!imageKitUrl) {
  console.error("ERROR: Missing ImageKit credentials in .env.local");
  process.exit(1);
}

const IMAGEKIT_BASE_URL = `${imageKitUrl}/luxe/products`;

const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
const outputFile = path.join(process.cwd(), 'src', 'data', 'projects.ts');

const IK_TRANSFORM = '?tr=w-1200,f-auto,q-auto';

function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getCategory(slug) {
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes('residence') || lowerSlug.includes('villa') || lowerSlug.includes('apartment') || lowerSlug.includes('nagar')) {
    return 'Residential';
  }
  return 'Commercial';
}

function generate() {
  const folders = fs.readdirSync(projectsDir).filter(file => {
    return fs.statSync(path.join(projectsDir, file)).isDirectory();
  });

  const activeProjects = [];

  for (const slug of folders) {
    const folderPath = path.join(projectsDir, slug);
    const files = fs.readdirSync(folderPath).filter(file => {
      return /\.(jpg|jpeg|png|webp|gif)$/i.test(file);
    });

    if (files.length > 0) {
      files.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '999');
        const numB = parseInt(b.match(/\d+/)?.[0] || '999');
        return numA - numB;
      });

      // Use ImageKit URLs instead of local URLs
      const gallery = files.map(f => `${IMAGEKIT_BASE_URL}/${slug}/${f}${IK_TRANSFORM}`);
      const coverImage = gallery[0];

      activeProjects.push({
        id: slug,
        title: formatTitle(slug),
        category: getCategory(slug),
        coverImage,
        gallery
      });
    }
  }

  const fileContent = `// Auto-generated file based on images in public/images/projects
// Images are served via ImageKit for optimal performance

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial';
  coverImage: string;
  gallery: string[];
  description?: string;
}

export const projects: Project[] = ${JSON.stringify(activeProjects, null, 2)};
`;

  fs.writeFileSync(outputFile, fileContent);
  console.log(`Generated projects.ts with ${activeProjects.length} active projects connected to ImageKit.`);
}

generate();
