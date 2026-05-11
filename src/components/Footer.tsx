import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background relative text-foreground pt-32 pb-12 px-6 md:px-12 border-t border-white/5" id="connect">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div>
          <Image
            src="/LUXE LOGO.png"
            alt="LUXE Interior Decors"
            width={200}
            height={200}
            className="w-32 h-32 md:w-40 md:h-40 mb-8 object-contain brightness-0 invert opacity-80"
          />
          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Let&apos;s craft <br /> <span className="text-accent italic">your vision.</span>
          </h2>
          <p className="text-foreground/60 max-w-sm mb-10 text-lg">
            Award-winning luxury interior design based in Madurai, transforming spaces into timeless experiences.
          </p>
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
