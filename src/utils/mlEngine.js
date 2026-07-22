export function predictCareerReadiness(profile, roleBenchmark) {
  const { requiredSkills, targetCgpa, baseSalaryMin, baseSalaryMax } = roleBenchmark;

  // 1. Technical Skill Score Calculation
  let totalSkillWeight = 0;
  let weightedSkillScore = 0;
  const skillGaps = [];

  requiredSkills.forEach((req) => {
    const studentLevel = profile.technicalSkills[req.name] || 0;
    const ratio = Math.min(studentLevel / req.minRequired, 1.2);
    weightedSkillScore += ratio * req.weight * 100;
    totalSkillWeight += req.weight;

    if (studentLevel < req.minRequired) {
      const gapDelta = req.minRequired - studentLevel;
      const priority = gapDelta > 40 ? 'High' : gapDelta > 20 ? 'Medium' : 'Low';
      const estimatedWeeks = Math.ceil(gapDelta / 15);

      skillGaps.push({
        skillName: req.name,
        currentLevel: studentLevel,
        requiredLevel: req.minRequired,
        gapDelta,
        priority,
        estimatedWeeks
      });
    }
  });

  const baseTechnicalScore = totalSkillWeight > 0 ? weightedSkillScore / totalSkillWeight : 50;

  // 2. Experience Score Calculation
  const internshipPoints = Math.min(profile.internships * 12, 24);
  const projectPoints = Math.min(profile.projectsCount * 6, 24);
  const hackathonPoints = Math.min(profile.hackathonsCount * 4, 12);
  const openSourcePoints = Math.min(profile.openSourceContributions * 4, 12);
  const experienceScore = Math.min(internshipPoints + projectPoints + hackathonPoints + openSourcePoints, 100);

  // 3. Aptitude & Soft Skills Score Calculation
  const softSkillScore = (profile.communicationScore * 0.25) +
                         (profile.problemSolvingScore * 0.35) +
                         (profile.codingTestScore * 0.40);

  // 4. CGPA Score Calculation
  const cgpaDelta = profile.cgpa - targetCgpa;
  const cgpaScore = Math.min(Math.max((profile.cgpa / 10) * 100, 40), 100);

  // Composite Readiness Calculation
  let rawReadiness = (baseTechnicalScore * 0.50) +
                     (experienceScore * 0.25) +
                     (softSkillScore * 0.15) +
                     (cgpaScore * 0.10);

  const readinessScore = Math.round(Math.min(Math.max(rawReadiness, 15), 98));

  // 5. Classification
  let classification;
  if (readinessScore >= 78) {
    classification = 'Ready';
  } else if (readinessScore >= 58) {
    classification = 'Nearly Ready';
  } else {
    classification = 'Needs Improvement';
  }

  // 6. Placement Probability Regression
  const tierMultiplier = profile.collegeTier === 'Tier 1' ? 1.08 : profile.collegeTier === 'Tier 2' ? 1.0 : 0.94;
  const probFactor = (readinessScore * 0.85 + (profile.internships > 0 ? 10 : 0) + (profile.codingTestScore * 0.1)) * tierMultiplier;
  const placementProbability = Math.round(Math.min(Math.max(probFactor, 10), 96));

  // 7. Salary Regression Calculation
  const salaryScale = (readinessScore / 100) * 0.8 + 0.6;
  const expectedMin = (baseSalaryMin * salaryScale).toFixed(1);
  const expectedMax = (baseSalaryMax * salaryScale).toFixed(1);
  const expectedSalaryRange = `₹${expectedMin} – ${expectedMax} LPA`;

  // 8. SHAP Explainable AI Drivers
  const topPositiveDrivers = [];
  const topNegativeDrivers = [];

  requiredSkills.forEach((req) => {
    const level = profile.technicalSkills[req.name] || 0;
    if (level >= req.minRequired) {
      topPositiveDrivers.push({
        featureName: `${req.name} Mastery`,
        impactValue: Math.round(req.weight * 35),
        impactType: 'positive',
        description: `Exceeds role benchmark (${level}% vs required ${req.minRequired}%)`
      });
    } else {
      topNegativeDrivers.push({
        featureName: `Missing ${req.name} Proficiency`,
        impactValue: Math.round(req.weight * -30),
        impactType: 'negative',
        description: `Below benchmark (${level}% vs target ${req.minRequired}%)`
      });
    }
  });

  if (profile.internships > 0) {
    topPositiveDrivers.push({
      featureName: 'Industry Internship Experience',
      impactValue: profile.internships * 8,
      impactType: 'positive',
      description: `${profile.internships} prior internship(s) boosts real-world readiness.`
    });
  } else {
    topNegativeDrivers.push({
      featureName: 'Lack of Internship Experience',
      impactValue: -10,
      impactType: 'negative',
      description: 'No prior internship recorded for this candidate.'
    });
  }

  if (profile.codingTestScore >= 75) {
    topPositiveDrivers.push({
      featureName: 'Strong DSA / Coding Test Rating',
      impactValue: 12,
      impactType: 'positive',
      description: `Coding test score of ${profile.codingTestScore}% increases shortlist odds.`
    });
  } else if (profile.codingTestScore < 55) {
    topNegativeDrivers.push({
      featureName: 'Low Problem Solving Score',
      impactValue: -8,
      impactType: 'negative',
      description: 'Coding test rating is below optimal technical screening criteria.'
    });
  }

  if (cgpaDelta >= 0.5) {
    topPositiveDrivers.push({
      featureName: 'Above-Average CGPA',
      impactValue: 6,
      impactType: 'positive',
      description: `CGPA ${profile.cgpa} satisfies campus shortlist thresholds.`
    });
  }

  // 9. Generate Actionable Recommendations
  const recommendations = [];

  skillGaps.forEach((gap) => {
    recommendations.push({
      id: `rec-learn-${gap.skillName}`,
      type: 'Learn',
      title: `Learn & Master ${gap.skillName}`,
      description: `Bridge the ${gap.gapDelta}% proficiency gap to meet the ${roleBenchmark.title} benchmark.`,
      priority: gap.priority,
      estimatedTime: `${gap.estimatedWeeks} Weeks`,
      skillName: gap.skillName,
      actionText: `Enroll in ${gap.skillName} Intensive`
    });
  });

  if (profile.projectsCount < 3) {
    recommendations.push({
      id: 'rec-project-build',
      type: 'Project',
      title: `Build 2-3 Production Capstone Projects`,
      description: `Construct full-stack/ML projects incorporating ${roleBenchmark.requiredSkills.map(s => s.name).slice(0, 3).join(', ')}.`,
      priority: 'High',
      estimatedTime: '3 Weeks',
      skillName: 'Projects',
      actionText: 'Explore Project Ideas'
    });
  }

  if (profile.codingTestScore < 75) {
    recommendations.push({
      id: 'rec-practice-leetcode',
      type: 'Practice',
      title: 'Practice 75+ LeetCode Medium Problems',
      description: 'Focus on Data Structures: HashMaps, Dynamic Programming, Graphs, and Trees to crack technical rounds.',
      priority: 'High',
      estimatedTime: '4 Weeks',
      skillName: 'Data Structures & Algorithms',
      actionText: 'Start DSA Benchmark Track'
    });
  }

  recommendations.push({
    id: 'rec-cert-industry',
    type: 'Certify',
    title: `Earn Recognized ${roleBenchmark.title} Certification`,
    description: `Validate your expertise with AWS Cloud Practitioner, TensorFlow Developer, or meta full-stack certificates.`,
    priority: 'Medium',
    estimatedTime: '2 Weeks',
    skillName: 'Industry Credentials',
    actionText: 'View Recommended Certifications'
  });

  return {
    readinessScore,
    classification,
    placementProbability,
    expectedSalaryRange,
    topPositiveDrivers: topPositiveDrivers.slice(0, 4),
    topNegativeDrivers: topNegativeDrivers.slice(0, 4),
    skillGaps,
    recommendations
  };
}

export function calculateJobMatch(profile, job) {
  let matchedCount = 0;
  const missingSkills = [];

  job.requiredSkills.forEach((skill) => {
    const studentSkillLevel = profile.technicalSkills[skill] || 0;
    if (studentSkillLevel >= 60) {
      matchedCount += 1;
    } else {
      missingSkills.push(skill);
    }
  });

  const baseSkillMatch = (matchedCount / job.requiredSkills.length) * 75;
  const experienceBoost = profile.internships > 0 ? 15 : 5;
  const cgpaBoost = profile.cgpa >= 7.5 ? 10 : 5;

  const matchScore = Math.round(Math.min(baseSkillMatch + experienceBoost + cgpaBoost, 98));

  return {
    matchScore,
    missingSkills
  };
}
