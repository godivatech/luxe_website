import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background relative text-foreground pt-32 pb-12 px-6 md:px-12 border-t border-border" id="connect">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
        <div className="lg:col-span-5">
          <Image
            src="/LUXE LOGO.png"
            alt="LUXE Interior Decors"
            width={200}
            height={200}
            className="w-32 h-32 md:w-40 md:h-40 mb-8 object-contain opacity-80"
          />
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Let&apos;s craft <br /> <span className="text-accent italic">your vision</span>
          </h2>
          <p className="text-foreground/60 max-w-sm mb-10 text-lg">
            Award-winning luxury interior design based in Madurai, transforming spaces into timeless experiences.
          </p>
        </div>
        <div className="flex flex-col md:items-start justify-start pt-4 lg:col-span-7">
          <div className="flex flex-wrap gap-12 md:gap-16 lg:gap-24 font-sans w-full">
            <div className="flex flex-col gap-4 min-w-[120px]">
              <h4 className="uppercase tracking-widest text-xs text-foreground/40 mb-2 font-medium">Explore</h4>
              <Link href="/#gallery" className="hover:text-accent transition-colors">Spaces</Link>
              <Link href="/philosophy" className="hover:text-accent transition-colors">Philosophy</Link>
              <Link href="/portfolio" className="hover:text-accent transition-colors">Portfolio</Link>
              <Link href="/connect" className="hover:text-accent transition-colors">Connect</Link>
            </div>
            <div className="flex flex-col gap-4 min-w-[120px]">
              <h4 className="uppercase tracking-widest text-xs text-foreground/40 mb-2 font-medium">Socials</h4>
              <Link href="#" className="hover:text-accent transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-accent transition-colors">Pinterest</Link>
              <Link href="#" className="hover:text-accent transition-colors">LinkedIn</Link>
            </div>
            <div className="flex flex-col gap-4 min-w-[200px]">
              <h4 className="uppercase tracking-widest text-xs text-foreground/40 mb-2 font-medium">Studio</h4>
              <p className="text-foreground/80 leading-relaxed">
                11a Navalar nagar 3rd street,<br />
                ss colony, Madurai - 625010<br />
                Tamil Nadu, India
              </p>
              <a href="mailto:luxeinteriordecors@gmail.com" className="text-foreground/80 hover:text-accent transition-colors mt-2">
                luxeinteriordecors@gmail.com
              </a>
              <a href="tel:+917868016007" className="text-foreground/80 hover:text-accent transition-colors">
                +91 78680 16007
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-sm text-foreground/50">
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