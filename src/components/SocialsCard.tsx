// components/SocialsCard.tsx
import { SiGithub, SiDiscord } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";
import type { ReactNode } from "react";

function Button({ icon, href, label }: { icon: ReactNode; href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-[#171717] cursor-pointer rounded-2xl p-3 flex items-center justify-center hover:bg-[#1f1f1f] transition"
    >
      {icon}
    </a>
  );
}

export default function SocialsCard({ className = "" }: { className?: string }) {
  return (
    <section className={`relative rounded-2xl text-white/90 bg-[#0c0c0c] ${className}`}>
      <div className="absolute top-4 left-4"><Button icon={<SiGithub size={35} />} href="https://github.com/cheetahbyte" label="GitHub" /></div>
      <div className="absolute top-4 right-4"><Button icon={<SiDiscord size={35} />} href="https://discord.com/users/545238456645845023" label="Discord" /></div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button icon={<Linkedin size={35} />} href="https://www.linkedin.com/in/leonhard-breuer-866a2a280/" label="LinkedIn" />
      </div>
    </section>
  );
}
