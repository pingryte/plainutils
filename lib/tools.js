import {
  Braces, CaseSensitive, Clock, Code, Diff, FileCode2, FileJson, FileText,
  Fingerprint, Globe2, Hash, Image as ImageIcon, KeyRound, Link2, MapPin,
  Palette, Regex, ShieldCheck, TextCursorInput, Timer, WandSparkles,
} from 'lucide-react';

export const tools = [
  { title: 'Word Counter', href: '/tools/word-counter', category: 'Text Tools', description: 'Count words, characters, sentences, paragraphs, reading time, and keywords.', icon: FileText },
  { title: 'Case Converter', href: '/tools/case-converter', category: 'Text Tools', description: 'Convert text between common naming and writing styles.', icon: CaseSensitive },
  { title: 'Text Diff Checker', href: '/tools/text-diff', category: 'Text Tools', description: 'Compare text with inline or side-by-side line highlighting.', icon: Diff },
  { title: 'Lorem & Random Generator', href: '/tools/random-generator', category: 'Text Tools', description: 'Generate placeholder copy and cryptographically secure random strings.', icon: WandSparkles },
  { title: 'JSON Formatter', href: '/tools/json-formatter', category: 'Data Tools', description: 'Validate, format, minify, sort, and inspect JSON.', icon: Code },
  { title: 'YAML ↔ JSON Converter', href: '/tools/yaml-json', category: 'Data Tools', description: 'Convert simple YAML documents to JSON and JSON back to YAML.', icon: FileJson },
  { title: 'Base64 Encoder / Decoder', href: '/tools/base64', category: 'Encoding Tools', description: 'Encode Unicode text or files and decode standard or URL-safe Base64.', icon: ImageIcon },
  { title: 'URL Encoder / Decoder', href: '/tools/url-encoder', category: 'Encoding Tools', description: 'Encode URLs and inspect query-string parameters.', icon: Link2 },
  { title: 'Unix Timestamp Converter', href: '/tools/unix-timestamp', category: 'Date & Time', description: 'Convert epoch seconds or milliseconds in local time or UTC.', icon: Clock },
  { title: 'Cron Expression Explainer', href: '/tools/cron-explainer', category: 'Date & Time', description: 'Validate and explain standard five-field cron schedules.', icon: Timer },
  { title: 'UUID Generator / Validator', href: '/tools/uuid', category: 'Developer Tools', description: 'Generate secure UUIDs and validate their version and variant.', icon: Fingerprint },
  { title: 'JWT Decoder', href: '/tools/jwt-decoder', category: 'Developer Tools', description: 'Inspect JWT headers and payloads locally without verifying signatures.', icon: KeyRound },
  { title: 'Hash Generator', href: '/tools/hash-generator', category: 'Developer Tools', description: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 digests locally.', icon: Hash },
  { title: 'Regex Tester', href: '/tools/regex-tester', category: 'Developer Tools', description: 'Test regular expressions and inspect captured matches.', icon: Regex },
  { title: 'Code Minifier', href: '/tools/code-minifier', category: 'Developer Tools', description: 'Apply lightweight minification to HTML, CSS, or JavaScript.', icon: FileCode2 },
  { title: 'Color Converter', href: '/tools/color-converter', category: 'Design Tools', description: 'Convert colours between HEX, RGB, and HSL.', icon: Palette },
  { title: 'DNS Lookup', href: '/tools/dns-lookup', category: 'Network Tools', description: 'Query common DNS records with readable results.', icon: Globe2, external: 'Google Public DNS' },
  { title: 'IP Location Lookup', href: '/tools/ip-lookup', category: 'Network Tools', description: 'Inspect geolocation, timezone, coordinates, and network details for an IP.', icon: MapPin, external: 'ipapi and ipify' },
];

export const toolByHref = Object.fromEntries(tools.map((tool) => [tool.href, tool]));
export const toolByTitle = Object.fromEntries(tools.map((tool) => [tool.title, tool]));

