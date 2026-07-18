export async function minifyHtml(source) {
  const parser = new DOMParser(); const document = parser.parseFromString(source, 'text/html');
  const comments = []; const walker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT);
  while (walker.nextNode()) comments.push(walker.currentNode); comments.forEach((node) => node.remove());
  const textWalker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT); const textNodes = [];
  while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
  textNodes.forEach((node) => { if (!['PRE','TEXTAREA','SCRIPT','STYLE'].includes(node.parentElement?.tagName)) node.textContent = node.textContent.replace(/\s+/g, ' '); });
  const CSSO = await import('csso'); const Terser = await import('terser');
  document.querySelectorAll('style').forEach((element) => { element.textContent = CSSO.minify(element.textContent, { restructure: true }).css; });
  for (const script of document.querySelectorAll('script:not([src])')) { if (!script.type || /javascript|module/.test(script.type)) { const result = await Terser.minify(script.textContent, { module: script.type === 'module' }); script.textContent = result.code || ''; } }
  const fullDocument = /<!doctype|<html[\s>]/i.test(source);
  return `${fullDocument && document.doctype ? '<!doctype html>' : ''}${fullDocument ? document.documentElement.outerHTML : document.body.innerHTML}`.replace(/>\s+</g, '><').trim();
}
