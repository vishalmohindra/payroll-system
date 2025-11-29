// src/utils/salaryCalc.js

// Percentage rules for each department + designation
export const RULES = {
  production: {
    je: { hra: 20, da: 10, pf: 12 },
    se: { hra: 22, da: 12, pf: 12 },
  },
  marketing: {
    asm: { hra: 18, da: 9, pf: 11 },
    me:  { hra: 20, da: 10, pf: 11 },
    // If you want SE allowed in marketing, uncomment and adjust:
    // se:  { hra: 20, da: 10, pf: 11 },
  },
  accounts: {
    cs: { hra: 16, da: 8, pf: 10 },
    ca: { hra: 18, da: 9, pf: 10 },
  },
};

export function calculateSalary(
  basic = 0,
  department = 'production',
  designation = 'je'
) {
  const dept = RULES[department] || {};
  const rule = dept[designation] || { hra: 0, da: 0, pf: 0 };

  // Round each component to 2 decimals
  const hra = Number((basic * (rule.hra / 100)).toFixed(2));
  const da  = Number((basic * (rule.da  / 100)).toFixed(2));
  const pf  = Number((basic * (rule.pf  / 100)).toFixed(2));

  // Whole‑rupee gross, computed from rounded parts
  const grossRaw = basic + hra + da - pf;
  const gross = Math.round(grossRaw);

  return { hra, da, pf, gross };
}
