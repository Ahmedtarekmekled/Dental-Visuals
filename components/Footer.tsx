import { content } from "@/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-800 py-12 bg-garden-dark">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-medium">
              {content.websiteInfo.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {content.websiteInfo.description
                .split(" ")
                .slice(0, 10)
                .join(" ")}
              ...
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-gray-500">
              Contact
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${content.personal_info?.email ?? ""}`}
                className="block text-gray-300 hover:text-primary transition-colors"
              >
                {content.personal_info?.email}
              </a>
              <p className="text-gray-400">{content.personal_info?.location}</p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-gray-500">
              Services
            </h4>
            <div className="space-y-2 text-sm">
              {content.services.slice(0, 3).map((service) => (
                <p key={service.name} className="text-gray-400">
                  {service.name}
                </p>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-gray-500">
              Follow
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={content.websiteInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} {content.websiteInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">{content.websiteInfo.owner}</p>
        </div>
      </div>
    </footer>
  );
}
