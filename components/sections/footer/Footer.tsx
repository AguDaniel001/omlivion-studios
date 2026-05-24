import Link from "next/link";
import DaText from "@/components/ui/typography/DaText";
import DaIcon from "@/components/ui/icon/DaIcon";

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/blog" },
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
    <div className="bg-neutral-900 text-white py-50 px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-3xl font-bold tracking-tighter">
            {/* Logo Icon SVG */}
              <svg width="56" height="56" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.2793 48.5293C24.5269 49.4745 19.6007 48.9891 15.124 47.1348C10.6474 45.2804 6.82093 42.1402 4.1289 38.1113C1.43687 34.0824 1.65726e-05 29.3456 -5.11432e-06 24.5C-5.11432e-06 18.0022 2.58118 11.7704 7.17578 7.17579C11.7704 2.58116 18.0022 2.09342e-05 24.5 6.67333e-06C29.3456 6.67333e-06 34.0823 1.43687 38.1113 4.12891C42.1403 6.82096 45.2804 10.6473 47.1348 15.124C48.9891 19.6007 49.4746 24.5269 48.5293 29.2793C47.584 34.0318 45.2506 38.3978 41.8242 41.8242C38.3978 45.2506 34.0318 47.584 29.2793 48.5293ZM24.5 45.3955C28.6343 45.3966 32.6762 44.1712 36.1143 41.875C39.5522 39.5788 42.2318 36.3145 43.8144 32.4951C45.397 28.6758 45.8121 24.4728 45.0059 20.418C44.1995 16.3631 42.2085 12.6382 39.2852 9.71485C36.3618 6.79147 32.6369 4.80047 28.582 3.99415C24.5272 3.18786 20.3242 3.60301 16.5049 5.18555C12.6855 6.76819 9.42026 9.44773 7.12402 12.8857C4.82787 16.3237 3.60341 20.3658 3.60449 24.5C3.61172 30.0397 5.81528 35.3505 9.73242 39.2676C13.6496 43.1847 18.9603 45.3883 24.5 45.3955ZM22.8281 37.3272L14.7764 15.2715H17.8525C18.2642 15.2709 18.6658 15.4003 19 15.6406C19.334 15.881 19.5845 16.22 19.7148 16.6104L20.5693 19.1748L21.7129 22.7959L24.4072 30.8203L27.1953 22.7959L28.4033 19.1748L29.2861 16.5947C29.4197 16.2086 29.6702 15.8729 30.0029 15.6357C30.3356 15.3988 30.7342 15.2717 31.1426 15.2715H34.2295L26.2041 37.3272H22.8281Z" fill="#F9F9F9"/>
              </svg>

          </Link>
          <DaText variant="bodyMd" className="text-zinc-400 max-w-xs">
            Making great things in Africa.
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
           <DaText variant="captionSm" className="text-zinc-600">
          © {new Date().getFullYear()} Omlivion Studios. All rights reserved.
        </DaText>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:items-start justify-between gap-12">
          {/* Contact Details */}
          <div className="flex flex-col gap-2">
            <DaText variant="titleSm" className="text-white">
              Get in touch
            </DaText>
            <a href="mailto:hello@omlivion.com" className="text-zinc-400 hover:text-white transition-colors">
              hello@omlivion.com
            </a>
            <a href="tel:+1234567890" className="text-zinc-400 hover:text-white transition-colors">
              +1 (234) 567-890
            </a>
          </div>
          <DaText variant="titleSm" className="text-white">
              explore
            </DaText>

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
           <DaText variant="bodySm" className="text-zinc-400 ">
            75 E Santa Clara St, Ste 1425 San Jose, California 95113
          </DaText>
        </div>
      </div>
    </div>
  );
}
