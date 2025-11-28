/// backend/utils/salaryCalc.js
const RULES = {
  production: {
    je: { hra: 20, da: 10, pf: 12 },
    se: { hra: 22, da: 12, pf: 12 },
  },
  marketing: {
    asm: { hra: 18, da: 9, pf: 11 },
    me:  { hra: 20, da: 10, pf: 11 },
  },
  accounts: {
    cs: { hra: 16, da: 8, pf: 10 },
    ca: { hra: 18, da: 9, pf: 10 },
  },
};

function calculateSalary(basic = 0, department = 'production', designation = 'je') {
  const dept = RULES[department] || {};
  const rule = dept[designation] || { hra: 0, da: 0, pf: 0 };

  const hra = Number((basic * (rule.hra / 100)).toFixed(2));
  const da  = Number((basic * (rule.da  / 100)).toFixed(2));
  const pf  = Number((basic * (rule.pf  / 100)).toFixed(2));
  const gross = Number((basic + hra + da - pf).toFixed(2));

  return { hra, da, pf, gross };
}

module.exports = { calculateSalary, RULES };
