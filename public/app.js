const knowledgeBase = [
  {
    category: 'Home Affairs',
    keywords: ['id', 'passport', 'birth certificate', 'marriage certificate', 'citizenship', 'home affairs', 'identity'],
    department: 'Department of Home Affairs',
    summary: 'This is a Home Affairs matter. Submit a formal application or correction request through the nearest office or online booking portal.',
    priority: 'High',
    process: 'Book an appointment, verify your documents, and track the submission with the office reference number.'
  },
  {
    category: 'SASSA',
    keywords: ['grant', 'social grant', 'sassa', 'child support', 'old age', 'disability', 'payment', 'relief'],
    department: 'SASSA',
    summary: 'This is a social grant issue. The request should be routed to SASSA for eligibility review and payment status support.',
    priority: 'High',
    process: 'Check your grant type, confirm your ID and banking details, and open a case with SASSA if payments are delayed.'
  },
  {
    category: 'Municipal Complaint',
    keywords: ['electricity', 'water', 'rates', 'billing', 'refuse', 'housing', 'municipal', 'service delivery', 'sewer'],
    department: 'Municipal Services',
    summary: 'This is a municipal service complaint. It should be logged with the local municipality for service delivery follow-up.',
    priority: 'Medium',
    process: 'Open a municipal service request, record the reference number, and follow up with the ward office or call centre.'
  }
];

function normalize(text) {
  return text.toLowerCase();
}

function routeQuery(query) {
  const normalized = normalize(query);
  const match = knowledgeBase.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));

  if (!match) {
    return {
      category: 'General',
      department: 'Citizen Help Desk',
      summary: 'Your issue does not clearly match a known category. A human agent will review it and route it manually.',
      priority: 'Medium',
      process: 'Submit the request to the help desk and include any reference numbers or supporting documents.'
    };
  }

  return {
    ...match,
    ticketId: `CRT-${Math.floor(1000 + Math.random() * 9000)}`
  };
}

function createStatusUpdate(result) {
  return [
    `Ticket ID: ${result.ticketId}`,
    `Department: ${result.department}`,
    `Status: Received and queued for triage`,
    `Next action: ${result.process}`,
    `Estimated handling: 2-5 working days`
  ].join('\n');
}

const issueInput = document.getElementById('issue');
const submitButton = document.getElementById('submit');
const output = document.getElementById('output');

submitButton.addEventListener('click', () => {
  const issue = issueInput.value.trim();
  if (!issue) {
    output.style.display = 'block';
    output.innerHTML = '<div class="status">Please describe your issue first.</div>';
    return;
  }

  const result = routeQuery(issue);
  const status = createStatusUpdate(result);
  output.style.display = 'block';
  output.innerHTML = `
    <div class="status">${result.department}</div>
    <div>${result.summary}</div>
    <div style="margin-top:12px">
      <span class="tag">${result.category}</span>
      <span class="tag">Priority: ${result.priority}</span>
    </div>
    <h3 style="margin-bottom:8px">Next steps</h3>
    <div class="result">${status}</div>
  `;
});
