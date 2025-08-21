export function cosineSim(a: number[], b: number[]) {
  const n = Math.min(a.length, b.length);
  let dot = 0, na = 0, nb = 0;
  for (let i=0;i<n;i++){ dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}