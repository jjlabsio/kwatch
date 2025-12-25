import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/jaejin-song",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jaejin-song-77944713a/",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:wowlxx28@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 단기과열종목 계산기
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              투자 판단의 참고용으로만 사용하세요.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
