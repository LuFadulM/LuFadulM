/**
 * Mock analytics seed — 30 days of realistic data for each featured placement.
 * Today = 2026-03-21 | Range = 2026-02-20 → 2026-03-21
 */

export interface DailyRecord {
  date: string;
  placementId: string;
  impressions: number;
  card_clicks: number;
  profile_views: number;
  saves: number;
  shares: number;
  website_clicks: number;
  instagram_clicks: number;
  phone_clicks: number;
  directions_clicks: number;
}

/** Deterministic pseudo-random 0–1 */
function pr(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const PLACEMENT_PARAMS: Array<{ id: string; baseImp: number; baseCtr: number }> = [
  { id: "fp-001", baseImp: 105, baseCtr: 0.105 }, // homepage_featured, priority 10
  { id: "fp-002", baseImp: 68,  baseCtr: 0.082 }, // category_top, priority 8
  { id: "fp-003", baseImp: 47,  baseCtr: 0.072 }, // category_top, priority 7
  { id: "fp-004", baseImp: 58,  baseCtr: 0.083 }, // city_spotlight, priority 8
  { id: "fp-005", baseImp: 84,  baseCtr: 0.092 }, // city_spotlight, priority 9
];

function generateSeries(): DailyRecord[] {
  const records: DailyRecord[] = [];
  const start = new Date("2026-02-20");

  for (let d = 0; d < 30; d++) {
    const date = new Date(start);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];
    const dow = date.getDay(); // 0=Sun 6=Sat
    const weekendBoost = dow === 0 || dow === 6 ? 1.28 : 1.0;

    PLACEMENT_PARAMS.forEach(({ id, baseImp, baseCtr }, pi) => {
      const impVar = 0.68 + pr(d * 31 + pi * 7) * 0.64;
      const impressions = Math.max(1, Math.round(baseImp * weekendBoost * impVar));

      const ctrVar = 0.78 + pr(d * 19 + pi * 11 + 5) * 0.44;
      const card_clicks = Math.max(0, Math.round(impressions * baseCtr * ctrVar));

      const pv = 0.6 + pr(d * 13 + pi * 3 + 1) * 0.2; // 60–80% of clicks
      const profile_views    = Math.round(card_clicks * pv);
      const saves            = Math.round(profile_views * (0.05 + pr(d * 11 + pi * 5 + 2) * 0.1));   // 5–15%
      const shares           = Math.round(profile_views * (0.02 + pr(d * 41 + pi * 3 + 8) * 0.06));  // 2–8%
      const website_clicks   = Math.round(profile_views * (0.05 + pr(d * 17 + pi * 9 + 3) * 0.1));   // 5–15%
      const instagram_clicks = Math.round(profile_views * (0.08 + pr(d * 23 + pi * 2 + 4) * 0.1));   // 8–18%
      const phone_clicks     = Math.round(profile_views * (0.03 + pr(d * 29 + pi * 4 + 6) * 0.07));  // 3–10%
      const directions_clicks= Math.round(profile_views * (0.10 + pr(d * 37 + pi * 6 + 7) * 0.10));  // 10–20%

      records.push({
        date: dateStr,
        placementId: id,
        impressions,
        card_clicks,
        profile_views,
        saves,
        shares,
        website_clicks,
        instagram_clicks,
        phone_clicks,
        directions_clicks,
      });
    });
  }

  return records;
}

export const ANALYTICS_SEED: DailyRecord[] = generateSeries();
