import Link from "next/link";
import DaText from "@/components/ui/typography/DaText";
import DaIcon from "@/components/ui/icon/DaIcon";

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

const socialIcons = [
  { name: "Twitter", href: "#", iconName: "twitter" },
  { name: "LinkedIn", href: "#", iconName: "linkedin" },
  { name: "Instagram", href: "#", iconName: "instagram" },
  { name: "Dribbble", href: "#", iconName: "dribbble" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-20 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
        
        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-3xl font-bold tracking-tighter">
            OMLIVION
          </Link>
          <DaText variant="bodyMd" className="text-zinc-400 max-w-xs">
            Crafting digital experiences with precision, motion, and a touch of the extraordinary.
          </DaText>
          <div className="flex gap-4">
            {socialIcons.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label={social.name}
              >
                <DaIcon name={social.iconName as any} size="md" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:items-end justify-between gap-12">
          {/* Contact Details */}
          <div className="flex flex-col md:items-end gap-2">
            <DaText variant="titleLg" className="text-white">
              Get in touch
            </DaText>
            <a href="mailto:hello@omlivion.com" className="text-zinc-400 hover:text-white transition-colors">
              hello@omlivion.com
            </a>
            <a href="tel:+1234567890" className="text-zinc-400 hover:text-white transition-colors">
              +1 (234) 567-890
            </a>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-sm font-medium hover:text-zinc-400 transition-colors uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <DaText variant="captionSm" className="text-zinc-600">
          © {new Date().getFullYear()} Omlivion Studios. All rights reserved.
        </DaText>
        <DaText variant="captionSm" className="text-zinc-600">
          Privacy Policy • Terms of Service
        </DaText>
      </div>
    </footer>
  );
}
