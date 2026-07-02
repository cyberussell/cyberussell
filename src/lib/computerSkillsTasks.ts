export type CSCategory =
  | "Keyboard & Mouse Control"
  | "File & Folder Management"
  | "Uploads & Downloads"
  | "Windows & Mac Navigation"
  | "Word Processing"
  | "Spreadsheets & Data Entry";

export const csCategories: CSCategory[] = [
  "Keyboard & Mouse Control",
  "File & Folder Management",
  "Uploads & Downloads",
  "Windows & Mac Navigation",
  "Word Processing",
  "Spreadsheets & Data Entry",
];

export interface CSTaskMeta {
  id: string;
  category: CSCategory;
  title: string;
}

// Ordered list of tasks presented to the user. Content/logic for each lives in
// the matching sub-component in ComputerSkillsAnalyzer.tsx — this registry is
// only used for headers, progress, and category grouping.
export const csTasks: CSTaskMeta[] = [
  { id: "type-speed", category: "Keyboard & Mouse Control", title: "Typing Accuracy & Speed" },
  { id: "copy-paste", category: "Keyboard & Mouse Control", title: "Copy & Paste" },
  { id: "rename-file", category: "File & Folder Management", title: "Rename a File" },
  { id: "organize-files", category: "File & Folder Management", title: "Organize Files Into Folders" },
  { id: "zip-scenario", category: "File & Folder Management", title: "Sending Multiple Files" },
  { id: "spot-download", category: "Uploads & Downloads", title: "Find the Real Download Button" },
  { id: "upload-file", category: "Uploads & Downloads", title: "Upload the Right File" },
  { id: "window-switch", category: "Windows & Mac Navigation", title: "Switching Between Windows" },
  { id: "screenshot-shortcut", category: "Windows & Mac Navigation", title: "Taking a Screenshot" },
  { id: "bold-text", category: "Word Processing", title: "Format Text" },
  { id: "docs-feature", category: "Word Processing", title: "Document Collaboration" },
  { id: "sort-table", category: "Spreadsheets & Data Entry", title: "Sort a Spreadsheet" },
  { id: "data-entry", category: "Spreadsheets & Data Entry", title: "Data Entry Accuracy" },
];

export const taskIds = csTasks.map((t) => t.id);
