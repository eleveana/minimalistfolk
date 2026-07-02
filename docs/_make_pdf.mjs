import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222;
const FILE = `file://${process.cwd()}/metafields-guide.html`;
const OUT = 'metafields-guide.pdf';
const WIDTH = 1120; // layout width -> 2 columns

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  `--window-size=${WIDTH},2000`,
  'about:blank',
]);

// wait for devtools endpoint
let wsUrl;
for (let i = 0; i < 50; i++) {
  try {
    const list = await (await fetch(`http://localhost:${PORT}/json`)).json();
    const page = list.find((t) => t.type === 'page');
    if (page?.webSocketDebuggerUrl) { wsUrl = page.webSocketDebuggerUrl; break; }
  } catch {}
  await sleep(150);
}
if (!wsUrl) { console.error('no devtools ws'); chrome.kill(); process.exit(1); }

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else if (msg.method) events.push(msg);
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.enable');
await send('Emulation.setEmulatedMedia', { media: 'print' });
await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 2000, deviceScaleFactor: 2, mobile: false });

await send('Page.navigate', { url: FILE });
// wait for load event
for (let i = 0; i < 100; i++) {
  if (events.some((e) => e.method === 'Page.loadEventFired')) break;
  await sleep(100);
}
// wait for web fonts to settle
await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>true)', awaitPromise: true });
await sleep(600);

const metrics = (await send('Page.getLayoutMetrics')).result;
const css = metrics.cssContentSize || metrics.contentSize;
const heightPx = Math.ceil(css.height) + 4;
console.log('content size:', Math.round(css.width), 'x', heightPx, 'px');

const pdf = (await send('Page.printToPDF', {
  printBackground: true,
  preferCSSPageSize: false,
  paperWidth: WIDTH / 96,
  paperHeight: heightPx / 96,
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  scale: 1,
})).result;

writeFileSync(OUT, Buffer.from(pdf.data, 'base64'));
console.log('wrote', OUT);
ws.close();
chrome.kill();
process.exit(0);
