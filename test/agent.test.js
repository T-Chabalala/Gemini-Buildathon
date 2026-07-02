import test from 'node:test';
import assert from 'node:assert/strict';
import { routeQuery, createStatusUpdate } from '../src/agent.js';

test('routes home affairs queries to the correct department', () => {
  const result = routeQuery('I need a new passport and my ID is expired');
  assert.equal(result.department, 'Department of Home Affairs');
  assert.match(result.category, /Home Affairs/);
});

test('routes SASSA queries to SASSA', () => {
  const result = routeQuery('My child support grant payment is late');
  assert.equal(result.department, 'SASSA');
});

test('creates a status update with a ticket and next steps', () => {
  const result = routeQuery('My water bill is incorrect');
  const update = createStatusUpdate(result);
  assert.match(update, /Ticket ID:/);
  assert.match(update, /Status: Received and queued for triage/);
});
