import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env.local', 'utf8');
const cloudName = env.match(/CLOUDINARY_CLOUD_NAME=["']?(.*?)["']?$/m)?.[1]?.trim();
const apiKey = env.match(/CLOUDINARY_API_KEY=["']?(.*?)["']?$/m)?.[1]?.trim();
const apiSecret = env.match(/CLOUDINARY_API_SECRET=["']?(.*?)["']?$/m)?.[1]?.trim();

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

const VIDEOS_DIR = path.join(process.cwd(), 'public', 'videos');
const CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'videos-cache.json');
const OUTPUT_TS = path.join(process.cwd(), 'src', 'data', 'videos.ts');

const VIDEO_LIST = [
  { fileName: 'VivahaFast 1080p30.mp4', id: 'vivahaa-palace', title: 'Vivahaa Palace', category: 'Commercial' },
  { fileName: 'ZooroFast 1080p30.mp4', id: 'zorro-desserts', title: 'Zorro Desserts', category: 'Commercial' },
  { fileName: 'SivakananFast 1080p30.mp4', id: 'siva-kannan-restaurant', title: 'Siva Kannan Restaurant', category: 'Commercial' },
  { fileName: 'Red 5Fast 1080p30.mp4', id: 'red-5-ganapathy', title: 'Red 5 Ganapathy', category: 'Residential' },
  { fileName: 'AntoFast 1080p30.mp4', id: 'dr-anto-clinic', title: 'Dr Anto Clinic', category: 'Commercial' },
  { fileName: 'ZeeyaFast 1080p30.mp4', id: 'zeeya-sulthans', title: 'Zeeya Sulthans', category: 'Commercial' },
  { fileName: 'Raja ResidenceFast 1080p30.mp4', id: 'mr-raja-residence', title: 'Mr Raja Residence', category: 'Residential' },
  { fileName: 'MgFast 1080p30.mp4', id: 'mg-hotel', title: 'MG Hotel', category: 'Commercial' },
  { fileName: 'OjasmontagefinalFast 1080p30.mp4', id: 'ojas-cafe', title: 'Ojas Cafe Montage', category: 'Commercial' },
  { fileName: 'Aludin 2Fast 1080p30.mp4', id: 'alaudin-residence-2', title: 'Alaudin Residence II', category: 'Residential' },
  { fileName: 'VilapuramFast 1080p30.mp4', id: 'villapuram-residence-1', title: 'Villapuram Residence I', category: 'Residential' },
  { fileName: 'Mfj PalanganathamFast 1080p30.mp4', id: 'madurai-famous-jigarthanda-palanganatham', title: 'Madurai Famous Jigarthanda', category: 'Commercial' },
  { fileName: 'AlaudinFast 1080p30.mp4', id: 'alaudin-residence', title: 'Alaudin Residence', category: 'Residential' },
  { fileName: 'Deen PlyFast 1080p30.mp4', id: 'deen-ply', title: 'Deen Ply', category: 'Commercial' },
  { fileName: 'Bvc FfFast 1080p30.mp4', id: 'bvc-first-floor', title: 'BVC First Floor', category: 'Commercial' },
  { fileName: 'ThangarajFast 1080p30.mp4', id: 'thangaraj-residence', title: 'Thangaraj Residence', category: 'Residential' },
  { fileName: 'SatishFast 1080p30.mp4', id: 'satish-residence', title: 'Satish Residence', category: 'Residential' },
  { fileName: 'Bvc SfFast 1080p30.mp4', id: 'bvc-second-floor', title: 'BVC Second Floor', category: 'Commercial' },
  { fileName: 'Sivakanan 1Fast 1080p30.mp4', id: 'siva-kannan-restaurant-1', title: 'Siva Kannan Restaurant I', category: 'Commercial' },
  { fileName: 'Anto 3DFast 1080p30.mp4', id: 'dr-anto-3d', title: 'Dr Anto 3D Walkthrough', category: 'Commercial' },
  { fileName: 'KmFast 1080p30.mp4', id: 'km-residence', title: 'KM Residence', category: 'Residential' },
  { fileName: 'DarbarFast 1080p30.mp4', id: 'madras-darbar', title: 'Madras Darbar', category: 'Commercial' },
  { fileName: 'VillapuramFast 1080p30.mp4', id: 'villapuram-residence-2', title: 'Villapuram Residence II', category: 'Residential' },
  { fileName: 'Zeeya 3DFast 1080p30.mp4', id: 'zeeya-sulthans-3d', title: 'Zeeya Sulthans 3D', category: 'Commercial' },
  { fileName: 'AasifeFast 1080p30.mp4', id: 'asife-restaurant', title: 'Asife Restaurant', category: 'Commercial' },
  { fileName: 'KemFast 1080p30.mp4', id: 'kem-residence', title: 'KEM Residence', category: 'Residential' },
  { fileName: 'ThirunelveliFast 1080p30.mp4', id: 'thirunelveli-residence', title: 'Thirunelveli Residence', category: 'Residential' }
];

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

function saveCacheAndTs(data) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf8');

  const tsContent = `// Auto-generated video showcase catalog
export interface VideoProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial';
  videoUrl: string;
  posterUrl: string;
  duration?: number;
  width?: number;
  height?: number;
}

export const videos: VideoProject[] = ${JSON.stringify(Object.values(data), null, 2)};
`;
  fs.writeFileSync(OUTPUT_TS, tsContent, 'utf8');
}

async function uploadOne(item, index, total) {
  const filePath = path.join(VIDEOS_DIR, item.fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`[${index}/${total}] ⚠️ File not found: ${item.fileName}`);
    return null;
  }

  if (cache[item.id]) {
    console.log(`[${index}/${total}] ⏩ Already cached: ${item.title}`);
    return cache[item.id];
  }

  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
  console.log(`\n[${index}/${total}] 🚀 Uploading "${item.title}" (${sizeMB} MB)...`);

  const folder = 'luxe website/videos';
  const publicId = item.id;

  let result;
  if (stat.size >= 20 * 1024 * 1024) {
    // Large file: chunked upload
    result = await cloudinary.uploader.upload_large(filePath, {
      resource_type: 'video',
      chunk_size: 20000000,
      folder,
      public_id: publicId,
      overwrite: true
    });
  } else {
    // Direct upload
    result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      folder,
      public_id: publicId,
      overwrite: true
    });
  }

  const posterUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_1,w_800,c_scale/f_auto,q_auto/${result.public_id}.jpg`;

  const videoRecord = {
    id: item.id,
    title: item.title,
    category: item.category,
    videoUrl: result.secure_url,
    posterUrl: posterUrl,
    duration: Math.round(result.duration || 0),
    width: result.width,
    height: result.height
  };

  cache[item.id] = videoRecord;
  saveCacheAndTs(cache);

  console.log(`  ✅ Done! Duration: ${videoRecord.duration}s | Poster: ${posterUrl}`);
  return videoRecord;
}

async function main() {
  console.log('=== Syncing 27 Videos to Cloudinary (luxe website/videos) ===\n');

  for (let i = 0; i < VIDEO_LIST.length; i++) {
    try {
      await uploadOne(VIDEO_LIST[i], i + 1, VIDEO_LIST.length);
    } catch (err) {
      console.error(`  ❌ Failed to upload ${VIDEO_LIST[i].title}:`, err.message || err);
    }
  }

  console.log('\n=============================================');
  console.log(`🎉 Video Sync Complete! Total videos in catalog: ${Object.keys(cache).length}`);
  console.log('=============================================');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
