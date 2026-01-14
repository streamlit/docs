// Map language identifiers to display-friendly names
// Used by both components/blocks/code.js and components/blocks/autofunction.js
export const languageDisplayNames = {
  python: "Python",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  // Rename Bash to Terminal since Windows doesn't use Bash, and most of the commands we
  // mark as Bash here would actually work in any terminal.
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  toml: "TOML",
  markdown: "Markdown",
  md: "Markdown",
  jsx: "JSX",
  tsx: "TSX",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  java: "Java",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  scala: "Scala",
  r: "R",
  docker: "Docker",
  dockerfile: "Dockerfile",
  text: "Text",
  none: "",
};

// Map language identifiers to Prism component names (when they differ)
// Used for dynamically importing prismjs/components/prism-{name}
export const languageToPrism = {
  sh: "bash",
  shell: "bash",
  js: "javascript",
  ts: "typescript",
  yml: "yaml",
  md: "markdown",
  dockerfile: "docker",
};

// Helper to get the Prism-compatible language name
export const getPrismLanguage = (language) =>
  languageToPrism[language] || language;

export default languageDisplayNames;
