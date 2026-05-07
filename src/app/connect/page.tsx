import { ArrowRight, MessageCircle, MapPin, Mail, Phone } from "lucide-react";

export default function ConnectPage() {
  return (
    <div className="bg-background">
      <section className="pt-48 pb-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Let&apos;s talk about <br />
              <span className="text-accent italic">your project.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-foreground/60 max-w-2xl">
              Whether you have a specific vision or just want to explore possibilities, 
              we&apos;re here to help you create a space that reflects your luxury lifestyle.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Our Studio</h4>
                <p className="text-xl">
                  Iyerbungalow<br />
                  Madurai, TN<br />
                  India
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Email Us</h4>
                <p className="text-xl">hello@luxedecors.com</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">WhatsApp</h4>
                <a 
                  href="https://wa.me/91XXXXXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl hover:text-accent transition-colors"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/5">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/40">Subject</label>
                <select className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors appearance-none">
                  <option className="bg-background">Residential Design</option>
                  <option className="bg-background">Commercial Design</option>
                  <option className="bg-background">Custom Furniture</option>
                  <option className="bg-background">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/40">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button className="flex items-center gap-3 bg-accent text-accent-foreground px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                Send Inquiry <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
