export type SidebarEntry = { text: string; slug: string };
type Sidebar = Record<string, SidebarEntry[] | Record<string, SidebarEntry[]>>;

type GeneratedSidebar = {
  header: string;
  depth: number;
  children: SidebarEntry[];
}[];

export const sidebar: Sidebar = {
  "Start Here": [
    { text: "Welcome", slug: "start-here" },
    { text: "JavaScript for Solid", slug: "start-here/js-for-solid" },
  ],
  Tutorials: {
    "Getting Started with Solid": [
      { text: "Introduction", slug: "tutorial" },
      { text: "Installing Solid", slug: "tutorial/installing-solid" },
    ],
  },
  "Core Concepts": [],
  "API Reference": {
    Router: [
      { text: "A", slug: "api/a" },
      { text: "B", slug: "api/b" },
    ],
  },
};

// Converts the sidebar object into a easier format for component-usage.
export function getSidebarEntries() {
  const entries: GeneratedSidebar = [];

  Object.entries(sidebar).map(([header, items]) => {
    if (Array.isArray(items)) {
      entries.push({
        header: header,
        depth: 1,
        children: items,
      });
    } else {
      entries.push({
        header: header,
        depth: 1,
        children: [],
      });

      Object.entries(items).map(([header, entry]) => {
        entries.push({
          header: header,
          depth: 2,
          children: entry,
        });
      });
    }
  });

  return entries;
}
