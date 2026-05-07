import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background relative text-foreground pt-32 pb-12 px-6 md:px-12 border-t border-white/5" id="connect">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Let&apos;s craft <br/> <span className="text-accent italic">your vision.</span>
          </h2>
          <p className="text-foreground/60 max-w-sm mb-10 text-lg">
            Award-winning luxury interior design based in Madurai, transforming spaces into timeless experiences.
          </p>
          <a href="mailto:hello@luxedecors.com" className="inline-flex items-center gap-2 border-b border-accent text-accent uppercase tracking-widest pb-1 hover:opacity-80 transition-opacity">
            Start a project <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="flex flex-col md:items-end justify-between">
          <div className="flex gap-12 font-sans w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="uppercase tracking-widest text-xs text-foreground/40 mb-2">Socials</h4>
              <Link href="#" className="hover:text-accent transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-accent transition-colors">Pinterest</Link>
              <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="uppercase tracking-widest text-xs text-foreground/40 mb-2">Studio</h4>
              <p className="text-foreground/80">
                Iyerbungalow<br/>
                Madurai, TN<br/>
                India
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-foreground/40">
        <p>&copy; {new Date().getFullYear()} LUXE Interior Decors. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <p>
            Designed and Developed by <a href="https://www.godivatech.com" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground hover:text-accent transition-colors">Godivatech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
