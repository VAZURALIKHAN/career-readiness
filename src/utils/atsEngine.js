export function analyzeResumeAts(resumeText, roleBenchmark) {
  if (!resumeText || resumeText.trim().length === 0) {
    return {
      score: 45,
      matchedKeywords: [],
      missingKeywords: roleBenchmark.requiredSkills.map(s => s.name),
      formatSuggestions: [
        'Upload or paste your full resume text to analyze ATS compatibility.',
        'Ensure contact information, skills section, and project bullet points are clearly formatted.'
      ],
      summary: 'No resume text provided. Default baseline score generated.'
    };
  }

  const textLower = resumeText.toLowerCase();
  const matchedKeywords = [];
  const missingKeywords = [];

  roleBenchmark.requiredSkills.forEach(req => {
    const skillNameLower = req.name.toLowerCase();
    if (textLower.includes(skillNameLower)) {
      matchedKeywords.push(req.name);
    } else {
      missingKeywords.push(req.name);
    }
  });

  const genericTechKeywords = ['git', 'agile', 'rest api', 'projects', 'internship', 'deployment', 'sql', 'python', 'docker'];
  let extraMatches = 0;
  genericTechKeywords.forEach(kw => {
    if (textLower.includes(kw)) extraMatches++;
  });

  const baseRatio = roleBenchmark.requiredSkills.length > 0
    ? matchedKeywords.length / roleBenchmark.requiredSkills.length
    : 0.5;

  const score = Math.round(Math.min(Math.max((baseRatio * 70) + (extraMatches * 3) + 15, 20), 98));

  const formatSuggestions = [];
  if (missingKeywords.length > 0) {
    formatSuggestions.push(`Incorporate target role keywords explicitly: ${missingKeywords.join(', ')}.`);
  }
  if (!textLower.includes('project')) {
    formatSuggestions.push('Add a dedicated "Key Technical Projects" section with metric-driven outcomes.');
  }
  if (!textLower.includes('internship') && !textLower.includes('experience')) {
    formatSuggestions.push('Highlight practical hands-on experience, open-source PRs, or academic lab work.');
  }
  formatSuggestions.push('Use standard ATS font headings (Experience, Education, Skills, Projects).');

  return {
    score,
    matchedKeywords,
    missingKeywords,
    formatSuggestions,
    summary: score >= 80
      ? '🌟 Excellent ATS formatting! Highly likely to pass automated recruiter screeners.'
      : score >= 60
      ? '⚠️ Moderate ATS score. Incorporate missing role keywords to increase shortlist rate.'
      : '❌ Needs Improvement. Your resume is missing critical technical keywords for this role.'
  };
}
