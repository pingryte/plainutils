import Layout from '../components/Layout';
import FakeTerminal from '../components/FakeTerminal';
import RateThisStack from '../components/RateThisStack'; // ✅ Keep this only
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const tailwindConfigCode = `// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

const fileStructure = `pages/
├── tools/
│   ├── word-counter.js
│   ├── json-formatter.js
│   └── base64.js
├── about.js
├── index.js
components/
├── Layout.js
├── DarkModeToggle.js
lib/
├── iconMap.js
`;

const darkModeSnippet = `const [isDark, setIsDark] = useState(() => {
  return localStorage.getItem('theme') === 'dark';
});`;

const packageJson = `{
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start"
  }
}`;

export default function About() {
  return (
    <Layout title="About PlainUtils">
      <section className="max-w-3xl mx-auto px-6 py-12 space-y-12 prose prose-blue dark:prose-invert">

        <div>
          <h1><span className="emoji-hover">👋</span> About PlainUtils</h1>
          <p>
            Welcome to <strong>PlainUtils</strong> — a minimalist, open-source toolbox 🧰 for developers, tinkerers, and keyboard wizards.
          </p>
          <p>
            <em>No accounts. No fluff. Just fast, useful web tools.</em>
          </p>
        </div>

        <FakeTerminal />

        <hr />

        <div>
          <h2><span className="emoji-hover">⚙️</span> Tech Stack</h2>
          <ul>
            <li><strong>Next.js</strong> – SSR + SSG for speed and SEO. Tools live under <code>/tools/</code>.</li>
            <li><strong>React</strong> – Hooks, interactivity, component logic.</li>
            <li><strong>Tailwind CSS</strong> – Utility-first styling for responsive UI.</li>
            <li><strong>Lucide Icons</strong> – Clean SVG icon set used across the app.</li>
            <li><strong>Dark Mode</strong> – Controlled via React context, stored in <code>localStorage</code>.</li>
          </ul>

          <SyntaxHighlighter language="javascript" style={oneDark}>
            {tailwindConfigCode}
          </SyntaxHighlighter>
        </div>

        <hr />

        <div>
          <h2><span className="emoji-hover">🗂️</span> File Structure</h2>
          <p>Each tool lives in <code>/pages/tools/</code> and is auto-routed via Next.js.</p>

          <SyntaxHighlighter language="bash" style={oneDark}>
            {fileStructure}
          </SyntaxHighlighter>
        </div>

        <hr />

        <div>
          <h2><span className="emoji-hover">🧱</span> Reusable Components</h2>
          <ul>
            <li><code>&lt;Layout /&gt;</code> – Provides consistent page layout with sidebar + footer.</li>
            <li><code>&lt;DarkModeToggle /&gt;</code> – React + CSS variables + <code>localStorage</code>.</li>
          </ul>

          <SyntaxHighlighter language="javascript" style={oneDark}>
            {darkModeSnippet}
          </SyntaxHighlighter>
        </div>

        <hr />

        <div>
          <h2><span className="emoji-hover">🚀</span> Deployment</h2>
          <ul>
            <li><strong>Platform:</strong> Deployed via <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">Netlify</a></li>
            <li><strong>CI/CD:</strong> Auto-push from <a href="https://github.com/pingryte/plainutils" target="_blank" rel="noopener noreferrer">GitHub</a> on commit to <code>main</code>.</li>
            <li><strong>Stack:</strong> Fully static — no backend needed.</li>
          </ul>

          <SyntaxHighlighter language="json" style={oneDark}>
            {packageJson}
          </SyntaxHighlighter>
        </div>

        <hr />

        <div>
          <h2><span className="emoji-hover">💡</span> Philosophy</h2>
          <ul>
            <li>Tools should load in under 1 second ⏱️</li>
            <li>No JavaScript bloat. No tracking. No nonsense.</li>
            <li>Mobile responsive, keyboard friendly, and built for devs.</li>
          </ul>
        </div>

        <hr />

        <div>
          <h2><span className="emoji-hover">🤝</span> Contribute</h2>
          <p>
            Want to add a tool or improve one? Star the repo on <a href="https://github.com/pingryte/plainutils" target="_blank" rel="noopener noreferrer">GitHub</a> and open an issue or PR.
          </p>
          <p>
            Or drop ideas to <a href="mailto:plainutils@pingryte.com">plainutils@pingryte.com</a>
          </p>
        </div>

        <hr />

        <RateThisStack />
      </section>
    </Layout>
  );
}
