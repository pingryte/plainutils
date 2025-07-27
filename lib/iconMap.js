import {
  FileText,
  Code,
  Image as ImageIcon,
  CaseSensitive,
  Clock,
  Diff,
} from 'lucide-react';

export const iconMap = {
  'Word Counter': (props) => <FileText {...props} />,
  'JSON Formatter': (props) => <Code {...props} />,
  'Base64 Encoder / Decoder': (props) => <ImageIcon {...props} />,
  'Case Converter': (props) => <CaseSensitive {...props} />,
  'Unix Timestamp Converter': (props) => <Clock {...props} />,
  'Text Diff Checker': (props) => <Diff {...props} />,
};
