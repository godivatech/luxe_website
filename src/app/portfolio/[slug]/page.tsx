import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function ProjectPage({ params }: Props) {
  // Handle both Next.js 14 (object) and 15 (Promise) 
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Back Button */}
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors mb-12 uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <p className="text-accent tracking-widest uppercase text-sm mb-4">{project.category}</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-12">{project.title}</h1>
          
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg bg-white/5">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Description (Optional) */}
        {project.description && (
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-serif mb-6">About the Project</h2>
            <p className="text-foreground/80 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((img, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
                <img 
                  src={img} 
                  alt={`${project.title} gallery image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
