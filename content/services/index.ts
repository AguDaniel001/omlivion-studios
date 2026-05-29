import { ServiceConfig } from "./types";
import { websiteDesignConfig } from "./website-design";
import { uiUxDesignConfig } from "./ui-ux-design";

export const SERVICES_CONFIG: Record<string, ServiceConfig> = {
  "website-design": websiteDesignConfig,
  "ui-ux-design": uiUxDesignConfig,
};

export type { ServiceConfig, ServiceHeroConfig, ServiceMainContentConfig, ServiceRecentWorkConfig, RelatedService } from "./types";
