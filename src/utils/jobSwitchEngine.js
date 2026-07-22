import { TARGET_ROLES } from '../data/rolesData';

export function computeJobSwitchDiff(currentRole, targetRoleId, userSkills) {
  const targetRole = TARGET_ROLES.find(r => r.id === targetRoleId) || TARGET_ROLES[0];
  
  const transferableSkills = [];
  const deltaMissingSkills = [];

  targetRole.requiredSkills.forEach(req => {
    const userLevel = userSkills[req.name] || 0;
    if (userLevel >= 50) {
      transferableSkills.push({
        name: req.name,
        level: userLevel,
        relevance: `Directly transferable to ${targetRole.title}`
      });
    } else {
      let curve = 'Moderate';
      if (req.name === 'Docker' || req.name === 'Git' || req.name === 'SQL') curve = 'Easy';
      if (req.name === 'Deep Learning' || req.name === 'Kubernetes' || req.name === 'PyTorch/TensorFlow') curve = 'Steep';

      deltaMissingSkills.push({
        name: req.name,
        requiredLevel: req.minRequired,
        learningCurve: curve
      });
    }
  });

  const missingRatio = deltaMissingSkills.length / targetRole.requiredSkills.length;
  const steepCount = deltaMissingSkills.filter(s => s.learningCurve === 'Steep').length;
  
  let transitionDifficultyScore = Math.round(missingRatio * 7 + steepCount * 1.5 + 2);
  transitionDifficultyScore = Math.min(Math.max(transitionDifficultyScore, 1), 10);

  const estimatedTransitionMonths = Math.max(Math.ceil(deltaMissingSkills.length * 1.2 + steepCount * 1.5), 2);

  const strategicRoadmap = [
    {
      phase: 'Phase 1',
      title: 'Foundation & Core Delta Skills',
      action: `Master ${deltaMissingSkills.slice(0, 2).map(s => s.name).join(' & ')} basics and bridge technical syntax gaps.`,
      duration: `${Math.ceil(estimatedTransitionMonths * 0.3)} Months`
    },
    {
      phase: 'Phase 2',
      title: 'Domain Transition Capstone Project',
      action: `Build 2 real-world projects highlighting both transferable ${transferableSkills.map(s => s.name).slice(0, 2).join(', ')} and new ${targetRole.title} skills.`,
      duration: `${Math.ceil(estimatedTransitionMonths * 0.4)} Months`
    },
    {
      phase: 'Phase 3',
      title: 'Resume Rebranding & Switcher Networking',
      action: 'Re-align experience bullets for target role ATS systems and engage with domain hiring managers.',
      duration: `${Math.ceil(estimatedTransitionMonths * 0.3)} Months`
    }
  ];

  return {
    currentRole,
    targetRole: targetRole.title,
    transferableSkills,
    deltaMissingSkills,
    transitionDifficultyScore,
    estimatedTransitionMonths,
    strategicRoadmap
  };
}
