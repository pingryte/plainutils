import {
  FileText,
  Code,
  Image as ImageIcon,
  CaseSensitive,
  Clock,
  Diff,
} from 'lucide-react';

export const iconMap = {
  'Word Counter': <FileText className="w-6 h-6" />,
  'JSON Formatter': <Code className="w-6 h-6" />,
  'Base64 Encoder / Decoder': <ImageIcon className="w-6 h-6" />,
  'Case Converter': <CaseSensitive className="w-6 h-6" />,
  'Unix Timestamp Converter': <Clock className="w-6 h-6" />,
  'Text Diff Checker': <Diff className="w-6 h-6" />,
};
