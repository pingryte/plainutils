import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout title="Contact">
      <section className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <div className="prose dark:prose-invert">
          <h1>📬 Contact</h1>
          <p>
            Got a bug to report? A tool suggestion? Or just want to say hello?
          </p>
          <p>
            The best way to reach us is via email:{" "}
            <a href="mailto:plainutils@pingryte.com" className="text-blue-600 dark:text-blue-400 underline">
              plainutils@pingryte.com
            </a>
          </p>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-blue-600 dark:text-blue-400">
            <li>
              <a href="https://github.com/pingryte/plainutils/issues" target="_blank" rel="noopener noreferrer" className="hover:underline">
                ➕ Submit a bug or feature request on GitHub
              </a>
            </li>
            <li>
              <a href="mailto:plainutils@pingryte.com" className="hover:underline">
                📧 Send feedback or tool ideas by email
              </a>
            </li>
            <li>
              <a href="https://coff.ee/pingryte" target="_blank" rel="noopener noreferrer" className="hover:underline">
                ☕ Buy me a coffee
              </a>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

