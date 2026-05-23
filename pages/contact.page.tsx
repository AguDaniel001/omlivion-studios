
import ContactInfoSection from "@/components/sections/main/contact/ContactInfoSection";
import ContactSection from "@/components/sections/main/contact/ContactSection";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <ContactSection />
      <ContactInfoSection />
    </div>
  );
}
