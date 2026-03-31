export function generateResult(saturation, tech, funding) {
  const scores = { Low: 0, Medium: 1, High: 2 };
  const riskScore = scores[saturation] + scores[tech];

  let risk, confidence, team, insight;

  if (riskScore <= 1) {
    risk = 'Low';
    confidence = Math.floor(Math.random() * 15) + 75;
    team = Math.floor(Math.random() * 3) + 2;
    insight =
      'Strong fundamentals with manageable complexity. This idea sits in a <strong>favorable risk zone</strong> — low competition and achievable technical scope make it a compelling opportunity. Focus on rapid prototyping and user validation in the first 60 days.';
  } else if (riskScore === 2) {
    risk = 'Medium';
    confidence = Math.floor(Math.random() * 20) + 55;
    team = Math.floor(Math.random() * 3) + 4;
    insight =
      'Moderate risk profile with <strong>identifiable challenges</strong>. Market dynamics are competitive but not saturated. Success depends heavily on differentiation and execution speed. Consider a focused niche before expanding scope.';
  } else {
    risk = 'High';
    confidence = Math.floor(Math.random() * 20) + 35;
    team = Math.floor(Math.random() * 3) + 6;
    insight =
      'Elevated risk detected across multiple dimensions. High market saturation combined with significant technical complexity creates <strong>execution pressure</strong>. A strong team with domain expertise and pre-committed funding is critical to de-risk this idea.';
  }

  return { risk, confidence, team, insight, funding };
}
