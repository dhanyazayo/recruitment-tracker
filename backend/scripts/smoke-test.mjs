const base = 'http://127.0.0.1:3001';

async function request(path, options) {
  const response = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await response.json();
  return { status: response.status, body };
}

async function main() {
  const candidates = await request('/api/candidates');
  const david = candidates.body.find((item) => item.name === 'David Kim');

  const moveWithoutFeedback = await request('/api/pipeline/move', {
    method: 'POST',
    body: JSON.stringify({
      candidateId: david.id,
      targetStage: 'INITIAL_DISCUSSION',
    }),
  });
  console.log('Move without feedback:', moveWithoutFeedback.status, moveWithoutFeedback.body);

  const addFeedback = await request('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({
      candidateId: david.id,
      stage: 'FOUND',
      interviewerName: 'Sarah M.',
      rating: 4,
      content: 'Strong sourcing notes',
    }),
  });
  console.log('Add feedback:', addFeedback.status, addFeedback.body);

  const moveAfterFeedback = await request('/api/pipeline/move', {
    method: 'POST',
    body: JSON.stringify({
      candidateId: david.id,
      targetStage: 'INITIAL_DISCUSSION',
    }),
  });
  console.log('Move after feedback:', moveAfterFeedback.status, moveAfterFeedback.body);

  const skipStage = await request('/api/pipeline/move', {
    method: 'POST',
    body: JSON.stringify({
      candidateId: david.id,
      targetStage: 'FIRST_ROUND',
    }),
  });
  console.log('Skip stage attempt:', skipStage.status, skipStage.body);
}

main().catch(console.error);
