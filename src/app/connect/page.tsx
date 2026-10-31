import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function ConnectPage() {
  return (
    <div className="bg-background">
      <section className="pt-48 pb-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 leading-tight text-foreground">
              Let&apos;s talk about <br />
              <span className="text-accent italic">your project</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-foreground/65 max-w-2xl leading-relaxed">
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
              <div className="w-12 h-12 bg-surface-muted border border-border rounded-full flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">Our Studio</h4>
                <p className="text-xl text-foreground">
                  11a Navalar nagar 3rd street,<br />
                  ss colony, Madurai - 625010<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-surface-muted border border-border rounded-full flex items-center justify-center text-accent shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">Email Us</h4>
                <p className="text-xl font-medium text-foreground">luxeinteriordecors@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] shrink-0">
                <FaWhatsapp size={24} />
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">Connect Instantly</h4>
                <p className="text-xl font-medium mb-2 text-foreground">+91 78680 16007</p>
                <a 
                  href="https://wa.me/917868016007?text=Hello%20LUXE%20Interiors%2C%20I%20would%20like%20to%20inquire%20about%20a%20design%20consultation%20for%20my%20space." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:underline flex items-center gap-2 font-medium"
                >
                  Chat on WhatsApp <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-border space-y-4">
              <h4 className="text-sm uppercase tracking-widest text-foreground/40 font-medium">Direct Contact</h4>
              <div>
                <p className="text-lg font-medium text-foreground">Asraf ali.s</p>
                <p className="text-foreground/60">+91 97513 48944</p>
              </div>
              <div className="pt-4">
                <h4 className="text-sm uppercase tracking-widest text-foreground/40 mb-2 font-medium">Office Hours</h4>
                <p className="text-foreground/80">Mon - Sat: 10.00 AM - 7.00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface p-8 md:p-12 rounded-2xl border border-border shadow-[0_8px_30px_rgba(22,21,20,0.04)]">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40 font-medium">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-foreground/30"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-foreground/40 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-foreground/30"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/40 font-medium">Subject</label>
                <select className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors appearance-none text-foreground">
                  <option className="bg-surface text-foreground">Residential Design</option>
                  <option className="bg-surface text-foreground">Commercial Design</option>
                  <option className="bg-surface text-foreground">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-foreground/40 font-medium">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent transition-colors resize-none text-foreground placeholder:text-foreground/30"
                  placeholder="How can we help?"
                />
              </div>

              <button className="flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity shadow-md">
                Send Inquiry <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}