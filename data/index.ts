import raw from "./buldingprocess.json";

export type Service = {
  name: string;
  description: string;
  target?: string;
};

export type FeaturedProject = {
  name: string;
  description: string;
  type?: string;
  platform?: string;
  region?: string;
  link?: string;
  image?: string;
  video?: string;
  year?: string;
  thumbnailSrc?: string;
  videoSrc?: string;
};

export type SiteContent = {
  websiteInfo: typeof raw.website_info;
  brandIdentity: typeof raw.brand_identity;
  services: Service[];
  featured: FeaturedProject[];
  colors: typeof raw.visual_design.color_scheme;
  personal_info: typeof raw.personal_info;
  experience: typeof raw.experience;
};

const placeholderThumb = "/icons/placeholder.svg";

export const content: SiteContent = {
  websiteInfo: raw.website_info,
  brandIdentity: raw.brand_identity,
  services: raw.services.primary_services,
  featured: raw.portfolio_structure.featured_projects.map((p) => ({
    ...p,
    thumbnailSrc: p.image || placeholderThumb,
    videoSrc: p.video,
  })),
  colors: raw.visual_design.color_scheme,
  personal_info: raw.personal_info,
  experience: raw.experience,
};

export default raw;
