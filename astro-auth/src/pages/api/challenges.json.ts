import type { APIRoute } from 'astro';

import { getUserChallenges, addUserChallenge } from '../../lib/db';

export const GET: APIRoute = async ({ locals }) => {
  // const user = await locals.currentUser();
  // if (!user) return new Response('Unauthorized', { status: 401 });
  const user = { id: 'testUser' }; // Mock user for testing
  const challenges = await getUserChallenges(user.id);

  return new Response(JSON.stringify({ challenges }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ locals, request }) => {
  // const user = await locals.currentUser();
  const user = { id: 'testUser' }; // Mock user for testing
  if (!user) return new Response('Unauthorized', { status: 401 });

  const data = await request.json();
  const { challenge } = data;

  if (typeof challenge === 'string' && challenge.trim().length > 0) {
    await addUserChallenge(user.id, challenge.trim());
    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  }

  return new Response(
    JSON.stringify({ ok: false, error: 'Challenge inválido' }),
    { status: 400 }
  );
};
