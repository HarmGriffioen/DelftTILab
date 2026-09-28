// Generates grid-style (design system Motif) thumbnails for papers.
// 15x10 grid of 16px cells, 12px squares; colours come from CSS classes
// (motif-*) so the inlined SVGs follow the site's light/dark theme.
const fs = require("fs");
const path = require("path");
const OUT = process.argv[2];

const W = 15, H = 10, P = 16;

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}
function hash(str) { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }

function art(slug, draw, density = 0.14) {
  const cells = new Map(), over = [];
  const api = {
    cell: (x, y, cls = "accent") => { if (x >= 0 && x < W && y >= 0 && y < H) cells.set(`${x},${y}`, cls); },
    fill: (x0, y0, x1, y1, cls = "accent") => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) api.cell(x, y, cls); },
    cells: (list, cls = "accent") => list.forEach(([x, y]) => api.cell(x, y, cls)),
    box: (x, y) => over.push(`<rect class="motif-box" x="${x * P - 1}" y="${y * P - 1}" width="18" height="18"/>`),
    frame: (x0, y0, x1, y1) => over.push(`<rect class="motif-frame" x="${x0 * P}" y="${y0 * P}" width="${(x1 - x0 + 1) * P}" height="${(y1 - y0 + 1) * P}"/>`),
    link: (a, b, cls = "motif-link") => over.push(`<path class="${cls}" d="M${a[0] * P + 8} ${a[1] * P + 8} L${b[0] * P + 8} ${b[1] * P + 8}"/>`),
    arc: (a, b, bend = 1) => {
      const sx = a[0] * P + 8, sy = a[1] * P - 1, ex = b[0] * P + 8, ey = b[1] * P - 1;
      const dx = Math.abs(ex - sx), dy = Math.abs(ey - sy);
      let cx = (sx + ex) / 2, cy = Math.min(sy, ey) - bend * (0.3 * dx + 10);
      if (dx < dy) cx += bend * 0.45 * dy;
      cy = Math.max(4, cy);
      over.push(`<path class="motif-arc" d="M${sx} ${sy} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex} ${ey}"/>`);
    },
  };
  draw(api);
  // quiet address-space background, never over the picture
  const r = rng(hash(slug));
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const n = r();
    if (!cells.has(`${x},${y}`) && n < density) cells.set(`${x},${y}`, "soft");
  }
  const rects = [...cells].sort((a, b) => (a[1] === "soft" ? 0 : 1) - (b[1] === "soft" ? 0 : 1)).map(([k, cls]) => {
    const [x, y] = k.split(",").map(Number);
    return `<rect class="motif-${cls}" x="${x * P + 2}" y="${y * P + 2}" width="12" height="12"/>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="motif" viewBox="0 0 240 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">\n${rects.join("\n")}\n${over.join("\n")}\n</svg>\n`;
  fs.writeFileSync(path.join(OUT, `${slug}.svg`), svg);
}

// ---- one pictogram per paper ----

// Decoy Databases: three database stacks, attackers converge on the decoy
art("decoy-databases", (a) => {
  for (const x0 of [1, 6, 11]) {
    a.fill(x0, 4, x0 + 2, 4, "accent");
    a.fill(x0, 5, x0 + 2, 5, "line");
    a.fill(x0, 6, x0 + 2, 6, "accent");
    a.fill(x0, 7, x0 + 2, 7, "line");
    a.fill(x0, 8, x0 + 2, 8, "accent");
  }
  a.cells([[1, 1], [13, 1], [4, 0]], "signal");
  a.box(1, 1); a.box(13, 1); a.box(4, 0);
  a.arc([1, 1], [6, 4]); a.arc([4, 0], [7, 4], 0.6); a.arc([13, 1], [8, 4]);
}, 0.08);

// Have you SYN me? Ten years of scanning: ten yearly bars, still growing
art("syn-ten-years", (a) => {
  const h = [2, 2, 3, 3, 4, 5, 5, 6, 7, 8];
  h.forEach((n, i) => a.fill(2 + i, 9 - n + 1, 2 + i, 9, i % 2 ? "accent" : "line"));
  h.forEach((n, i) => a.cell(2 + i, 9 - n + 1, "accent"));
  a.cell(11, 2, "signal"); a.box(11, 2);
  a.arc([2, 8], [11, 2], 0.4);
});

// Examining Mirai's battle over IoT: two botnets fight over the same devices
art("mirai-battle", (a) => {
  a.fill(5, 3, 9, 7, "line");
  a.cells([[1, 3], [2, 4], [1, 5]], "signal");
  a.cells([[13, 4], [12, 5], [13, 6]], "ink");
  a.cells([[6, 4], [7, 6]], "signal");
  a.cells([[8, 4], [9, 6]], "ink");
  a.box(6, 4); a.box(7, 6);
  a.arc([2, 4], [6, 4]); a.arc([1, 5], [7, 6]);
  a.link([12, 5], [8, 4], "motif-link-ink"); a.link([12, 5], [9, 6], "motif-link-ink");
}, 0.08);

// Quality evaluation of CTI feeds: five feeds, one indicator seen by only some
art("cti-feeds", (a) => {
  const r = rng(11);
  for (const y of [1, 3, 5, 7, 9]) for (let x = 1; x <= 13; x++) a.cell(x, y, r() < 0.45 ? "accent" : "line");
  for (const y of [7, 9]) a.cell(9, y, "line");
  for (const y of [1, 3, 5]) { a.cell(9, y, "signal"); a.box(9, y); }
}, 0);

// Quantifying AS IP churn: the same bot reappears in other address blocks
art("as-churn", (a) => {
  for (const x0 of [0, 5, 10]) { a.fill(x0, 3, x0 + 3, 6, "line"); a.frame(x0, 3, x0 + 3, 6); }
  a.cell(2, 4, "accent"); a.cell(6, 5, "accent"); a.cell(12, 4, "signal");
  a.box(12, 4);
  a.arc([2, 4], [6, 5]); a.arc([6, 5], [12, 4]);
});

// SIP brute-forcing: a keypad with the guessed digits
art("sip-bruteforce", (a) => {
  for (const y of [1, 3, 5, 7]) for (const x of [5, 7, 9]) a.cell(x, y, "accent");
  const pressed = [[5, 1], [9, 3], [7, 5], [7, 7]];
  pressed.forEach(([x, y]) => { a.cell(x, y, "signal"); a.box(x, y); });
  a.cell(1, 8, "signal"); a.box(1, 8);
  a.arc([1, 8], [5, 1], 0.5); a.arc([5, 1], [9, 3]); a.arc([9, 3], [7, 5]); a.arc([7, 5], [7, 7]);
}, 0.1);

// Scan, test, execute: attacker probes reflectors, then amplifies at a victim
art("scan-test-execute", (a) => {
  a.cell(1, 5, "signal"); a.box(1, 5);
  for (const y of [2, 5, 8]) { a.cell(6, y, "accent"); a.box(6, y); }
  a.fill(11, 3, 13, 7, "ink");
  a.arc([1, 5], [6, 2]); a.arc([1, 5], [6, 5], 0.6); a.arc([1, 5], [6, 8], 0.4);
  for (const [y, t] of [[2, 3], [5, 5], [8, 7]]) a.link([6, y], [11, t], "motif-link-signal-heavy");
}, 0.08);

// Pony malware: a C2 address hidden in a chain of bitcoin blocks
art("pony-bitcoin", (a) => {
  for (const x0 of [0, 4, 8, 12]) a.fill(x0, 6, x0 + 1, 7, "accent");
  a.link([1, 6], [4, 6]); a.link([5, 6], [8, 6]); a.link([9, 6], [12, 6]);
  a.cell(9, 7, "signal"); a.box(9, 7);
  a.cell(11, 1, "signal"); a.box(11, 1);
  a.arc([9, 7], [11, 1], 0.6);
}, 0.1);

// Cyber threat intelligence (thesis): a lens over one group of adversaries
art("thesis-cti", (a) => {
  a.cells([[4, 3], [5, 4], [6, 3], [5, 5]], "signal");
  a.cells([[11, 2], [12, 3], [1, 8], [2, 7], [12, 8]], "ink");
  a.frame(3, 2, 7, 6);
  a.link([8, 7], [10, 9], "motif-link-heavy");
  a.box(5, 4);
}, 0.14);

// How to operate a meta-telescope: four telescopes feeding one view
art("meta-telescope", (a) => {
  const r = rng(5);
  for (const [x0, y0] of [[0, 0], [12, 0], [0, 7], [12, 7]])
    for (let y = y0; y < y0 + 3; y++) for (let x = x0; x < x0 + 3; x++) a.cell(x, y, r() < 0.35 ? "accent" : "line");
  a.fill(6, 3, 8, 6, "accent");
  a.link([2, 2], [6, 3]); a.link([12, 2], [8, 3]); a.link([2, 7], [6, 6]); a.link([12, 7], [8, 6]);
  a.cell(7, 4, "signal"); a.box(7, 4);
}, 0);

// Discovering collaboration: slow scanners far apart, sharing one header pattern
art("discovering-collaboration", (a) => {
  const pts = [[1, 2], [4, 7], [8, 3], [11, 8], [13, 2]];
  pts.forEach(([x, y]) => { a.cell(x, y, "signal"); a.cell(x + 1, y, "accent"); a.box(x, y); });
  for (let i = 1; i < pts.length; i++) a.arc(pts[i - 1], pts[i], 0.5);
}, 0.2);

// Random subdomain attacks: a DNS tree with a burst of random leaves
art("random-subdomain", (a) => {
  a.cell(7, 0, "ink");
  a.cell(3, 3, "accent"); a.cell(11, 3, "accent");
  a.link([7, 0], [3, 3], "motif-link-ink"); a.link([7, 0], [11, 3], "motif-link-ink");
  a.cells([[2, 6], [4, 6]], "accent");
  a.link([3, 3], [2, 6]); a.link([3, 3], [4, 6]);
  const leaves = [[8, 6], [10, 7], [12, 6], [14, 7], [9, 8], [13, 8], [11, 9], [7, 8]];
  a.cells(leaves, "signal");
  for (const l of [[8, 6], [12, 6], [10, 7]]) a.arc([11, 3], l, 0.3);
  a.box(11, 3);
}, 0.06);

// Decoys cannot go everywhere: an ATT&CK matrix only partly covered by decoys
art("decoys-attack", (a) => {
  const heights = [8, 6, 9, 7, 5, 8, 6];
  heights.forEach((n, i) => {
    const x = 1 + i * 2;
    a.cell(x, 0, "ink");
    for (let y = 1; y <= n; y++) a.cell(x, y, i < 3 && y <= n - 2 ? "accent" : "line");
  });
  a.cell(9, 3, "signal"); a.box(9, 3);
  a.frame(0, 1, 6, 7);
}, 0);

// From Mirai to Gorilla: a botnet that keeps growing across generations
art("mirai-to-gorilla", (a) => {
  a.cells([[1, 6], [2, 7]], "signal");
  a.cells([[5, 5], [6, 5], [5, 6], [6, 7], [4, 7]], "signal");
  a.fill(9, 3, 12, 7, "signal");
  a.cells([[13, 4], [13, 6], [9, 2], [11, 8]], "signal");
  a.box(2, 7); a.box(6, 5); a.box(12, 3);
  a.arc([2, 7], [5, 5]); a.arc([6, 5], [9, 3]);
}, 0.1);

// MoZombie: a self-sustaining peer-to-peer ring
art("mozombie", (a) => {
  const ring = [[7, 1], [11, 2], [13, 5], [11, 8], [7, 9], [3, 8], [1, 5], [3, 2]];
  a.cells(ring, "signal");
  ring.forEach((p, i) => a.link(p, ring[(i + 1) % ring.length], "motif-link-signal"));
  a.arc([3, 2], [11, 8], 0.2); a.arc([7, 1], [7, 9], 0.3);
  a.box(7, 1); a.box(11, 8);
  a.cell(7, 5, "accent");
}, 0.08);

// Trust but verify: vulnerability tags checked one by one
art("trust-verify", (a) => {
  const verdict = ["accent", "accent", "signal", "accent"];
  [1, 3, 5, 7].forEach((y, i) => {
    a.fill(1, y, 4, y, "accent");
    for (let x = 6; x <= 10; x += 2) a.cell(x, y, "line");
    a.cell(12, y, verdict[i]);
  });
  a.box(12, 5);
  a.arc([4, 5], [12, 5], 0.4);
}, 0.08);

// Visualising network data for forensics: a traffic chart with one spike in focus
art("visualising-forensics", (a) => {
  const h = [2, 3, 2, 4, 3, 8, 3, 2, 4, 3, 2, 3, 2];
  a.fill(0, 9, 14, 9, "ink");
  h.forEach((n, i) => a.fill(1 + i, 9 - n, 1 + i, 8, i === 5 ? "signal" : i % 2 ? "accent" : "line"));
  a.frame(4, 0, 8, 8);
  a.box(6, 1);
}, 0.06);

// Estimating the amplification factor: three protocols, small request, big reply
art("amplification-factor", (a) => {
  [[1, 3, 3], [5, 7, 6], [9, 11, 9]].forEach(([req, col, n]) => {
    a.cell(req, 9, "accent");
    a.fill(col, 10 - n, col + 1, 9, "accent");
    a.fill(col, 10 - n, col + 1, 10 - n, "signal");
    a.arc([req, 9], [col, 10 - n], 0.5);
  });
  a.box(11, 1);
}, 0.06);

// Quantifying TCP SYN DDoS resilience: a service under SYN floods, year after year
art("syn-resilience", (a) => {
  a.fill(11, 2, 13, 6, "accent");
  const src = [[1, 1], [2, 5], [1, 7], [3, 3]];
  a.cells(src, "signal");
  src.forEach((s, i) => a.arc(s, [11, 2 + i], 0.4));
  a.box(3, 3);
  for (let x = 0; x < 15; x++) a.cell(x, 9, [4, 5, 10].includes(x) ? "signal" : "line");
}, 0.06);

// A different cup of TI: commercial and open feeds overlap, with a little extra
art("cup-of-ti", (a) => {
  const r = rng(21);
  for (let y = 1; y <= 7; y++) for (let x = 1; x <= 7; x++) if (r() < 0.5) a.cell(x, y, "line");
  for (let y = 3; y <= 9; y++) for (let x = 6; x <= 12; x++) if (r() < 0.5) a.cell(x, y, "line");
  a.fill(6, 3, 7, 7, "accent");
  a.frame(1, 1, 7, 7); a.frame(6, 3, 12, 9);
  a.cell(11, 8, "signal"); a.box(11, 8);
}, 0);

// Fingerprinting SSH tooling: a terminal prompt next to a nested fingerprint
art("ssh-fingerprint", (a) => {
  a.frame(0, 1, 7, 8);
  a.fill(0, 1, 7, 1, "line");
  a.cells([[2, 4], [3, 5], [2, 6]], "accent");
  a.cells([[4, 6], [5, 6]], "accent");
  a.frame(8, 1, 14, 8); a.frame(9, 2, 13, 7); a.frame(10, 3, 12, 6);
  a.cell(11, 4, "signal"); a.box(11, 4);
}, 0.05);

// Scanners (master's thesis): slow distributed scanners across telescope data
art("thesis-scanners", (a) => {
  const pts = [[1, 8], [5, 6], [9, 4], [13, 2]];
  pts.forEach(([x, y]) => { a.cell(x, y, "signal"); a.box(x, y); });
  for (let i = 1; i < pts.length; i++) a.arc(pts[i - 1], pts[i], 0.6);
}, 0.32);

console.log(fs.readdirSync(OUT).length, "files");
