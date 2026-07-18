export default function CharacterDiff({ before = '', after = '', side = 'before' }) {
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start += 1;
  let leftEnd = before.length - 1; let rightEnd = after.length - 1;
  while (leftEnd >= start && rightEnd >= start && before[leftEnd] === after[rightEnd]) { leftEnd -= 1; rightEnd -= 1; }
  const value = side === 'before' ? before : after; const end = side === 'before' ? leftEnd : rightEnd;
  return <span className="whitespace-pre-wrap">{value.slice(0, start)}{value.slice(start, end + 1) && <mark className={side === 'before' ? 'bg-red-300 dark:bg-red-800' : 'bg-green-300 dark:bg-green-800'}>{value.slice(start, end + 1)}</mark>}{value.slice(end + 1)}</span>;
}
