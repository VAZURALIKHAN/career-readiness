export const QUESTION_BANK = {
  'Python': [
    {
      id: 'py-1',
      skillName: 'Python',
      question: 'What is the difference between deepcopy and shallow copy in Python?',
      difficulty: 'Intermediate',
      sampleAnswer: 'A shallow copy constructs a new object and inserts references into it. A deepcopy recursively copies all child objects so mutations do not affect the original.',
      tips: 'Mention the copy module (copy.copy() vs copy.deepcopy()) and nested object behavior.'
    },
    {
      id: 'py-2',
      skillName: 'Python',
      question: 'How do Python decorators work under the hood?',
      difficulty: 'Intermediate',
      sampleAnswer: 'Decorators are callable functions that accept another function as an argument, wrap its execution, and return the mutated wrapper function using @functools.wraps.',
      tips: 'Explain closure state and decorator syntax syntax sugar.'
    }
  ],
  'Machine Learning': [
    {
      id: 'ml-1',
      skillName: 'Machine Learning',
      question: 'How do you handle severe class imbalance in a classification dataset?',
      difficulty: 'Advanced',
      sampleAnswer: 'Use techniques like SMOTE oversampling, Random Undersampling, class-weighted loss functions (e.g. scale_pos_weight in XGBoost), and evaluate using F1-score/PR-AUC instead of Accuracy.',
      tips: 'Never suggest accuracy for imbalanced datasets!'
    },
    {
      id: 'ml-2',
      skillName: 'Machine Learning',
      question: 'Explain the bias-variance tradeoff and how regularization helps.',
      difficulty: 'Intermediate',
      sampleAnswer: 'Bias is error from underfitting; variance is error from overfitting. L1 (Lasso) and L2 (Ridge) regularization penalize large coefficients to control model complexity.',
      tips: 'Mention Lasso does feature selection by driving weights to zero.'
    }
  ],
  'Docker': [
    {
      id: 'doc-1',
      skillName: 'Docker',
      question: 'What is the difference between a Docker Image and a Docker Container?',
      difficulty: 'Beginner',
      sampleAnswer: 'A Docker Image is an immutable read-only blueprint template. A Docker Container is a live, executable isolated instance running an image.',
      tips: 'Compare Image to a class blueprint and Container to an instantiated object.'
    },
    {
      id: 'doc-2',
      skillName: 'Docker',
      question: 'How does multi-stage Docker building optimize container image sizes?',
      difficulty: 'Intermediate',
      sampleAnswer: 'Multi-stage builds allow you to use heavy SDK build images in stage 1, compile binaries, and copy only the final build output into a minimal runtime image like Alpine/Distroless.',
      tips: 'Explain how it reduces production image size from ~1GB to ~100MB.'
    }
  ],
  'SQL': [
    {
      id: 'sql-1',
      skillName: 'SQL',
      question: 'Explain the difference between WHERE and HAVING clauses in SQL.',
      difficulty: 'Beginner',
      sampleAnswer: 'WHERE filters rows before any aggregation (GROUP BY) occurs. HAVING filters aggregated group records resulting from GROUP BY.',
      tips: 'Mention HAVING can use aggregate functions like COUNT(), AVG().'
    }
  ],
  'React': [
    {
      id: 'react-1',
      skillName: 'React',
      question: 'What is the Virtual DOM and how does React diffing algorithm work?',
      difficulty: 'Intermediate',
      sampleAnswer: 'The Virtual DOM is a lightweight in-memory JSON representation of the real DOM. React reconciles changes using a heuristic O(n) diffing algorithm comparing element keys and types.',
      tips: 'Explain the importance of stable unique key props in lists.'
    }
  ]
};

export function generateMockInterview(skillGaps) {
  const selectedQuestions = [];
  
  skillGaps.forEach(gap => {
    const questionsForSkill = QUESTION_BANK[gap.skillName];
    if (questionsForSkill && questionsForSkill.length > 0) {
      selectedQuestions.push(...questionsForSkill);
    }
  });

  if (selectedQuestions.length < 3) {
    if (QUESTION_BANK['Python']) selectedQuestions.push(...QUESTION_BANK['Python']);
    if (QUESTION_BANK['Docker']) selectedQuestions.push(...QUESTION_BANK['Docker']);
  }

  return selectedQuestions.slice(0, 5);
}
