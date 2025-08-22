const CATEGORIES = ["ประปา", "แอร์", "ไฟฟ้า", "อื่นๆ"];

const KEYWORDS = {
  ประปา: ["น้ำ", "ท่อ", "ก๊อก", "รั่ว", "ปั๊ม"],
  แอร์: ["แอร์", "เครื่องปรับอากาศ", "คอมเพรสเซอร์", "ไม่เย็น", "รั่วน้ำ"],
  ไฟฟ้า: ["ไฟ", "ปลั๊ก", "สวิทช์", "เบรกเกอร์", "ไฟดับ"],
};

export function classify(text) {
  const score = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  const t = (text || "").toLowerCase();
  for (const [cat, kws] of Object.entries(KEYWORDS)) {
    kws.forEach((kw) => {
      if (t.includes(kw)) score[cat] += 1;
    });
  }
  let best = "อื่นๆ";
  let max = -1;
  Object.entries(score).forEach(([cat, s]) => {
    if (s > max) { best = cat; max = s; }
  });
  return max > 0 ? best : "อื่นๆ";
}

export { CATEGORIES };