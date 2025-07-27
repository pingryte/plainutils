import {
  FileText,
  Code,
  Image as ImageIcon,
  CaseSensitive,
  Clock,
  Diff,
  Globe2,
  MapPin,
} from 'lucide-react';

export const iconMap = {
  'Word Counter': (props) => <FileText {...props} />,
  'JSON Formatter': (props) => <Code {...props} />,
  'Base64 Encoder / Decoder': (props) => <ImageIcon {...props} />,
  'Case Converter': (props) => <CaseSensitive {...props} />,
  'Unix Timestamp Converter': (props) => <Clock {...props} />,
  'Text Diff Checker': (props) => <Diff {...props} />,
  'DNS Lookup': (props) => <Globe2 {...props} />,
  'IP Location Lookup': (props) => <MapPin {...props} />,
};
