import Link from 'next/link';
import { useRouter } from 'next/router';
import { iconMap } from '../lib/iconMap';

const tools = [
    { title: 'Word Counter', href: '/tools/word-counter' },
    { title: 'JSON Formatter', href: '/tools/json-formatter' },
    { title: 'Base64 Encoder / Decoder', href: '/tools/base64' },
    { title: 'Case Converter', href: '/tools/case-converter' },
    { title: 'Unix Timestamp Converter', href: '/tools/unix-timestamp' },
    { title: 'Text Diff Checker', href: '/tools/text-diff' },
];

export default function ToolSwitcher() {
    const router = useRouter();

    return (
        <nav className="w-60 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 sticky top-0">
            <h2 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">Tools</h2>
            <ul className="space-y-3">
                {tools.map(({ title, href }) => {
                    const isActive = router.pathname === href;
                    const Icon = iconMap[title];
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`flex items-center gap-3 p-2 rounded-md ${isActive
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {Icon && <Icon className="w-5 h-5" />}
                                {title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
