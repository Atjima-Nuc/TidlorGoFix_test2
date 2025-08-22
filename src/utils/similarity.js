export function similarity(a, b) {
  const A = new Set((a || "").toLowerCase().split(/[^a-zA-Z\u0E00-\u0E7F0-9]+/).filter(Boolean));
  const B = new Set((b || "").toLowerCase().split(/[^a-zA-Z\u0E00-\u0E7F0-9]+/).filter(Boolean));
  if (!A.size && !B.size) return 0;
  let inter = 0;
  A.forEach((x) => { if (B.has(x)) inter++; });
  return inter / new Set([...A, ...B]).size;
}