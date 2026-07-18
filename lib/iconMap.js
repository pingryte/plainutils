import { toolByTitle } from './tools';

export const iconMap = Object.fromEntries(
  Object.entries(toolByTitle).map(([title, tool]) => [title, tool.icon]),
);
