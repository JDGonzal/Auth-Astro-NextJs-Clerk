import { promises as fs } from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.resolve('/tmp/data/challenges');

async function getUserFile(userId: string) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  return path.join(DATA_DIR, `${userId}.json`);
}

export async function getUserChallenges(userId: string): Promise<string[]> {
  const file = await getUserFile(userId);
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function addUserChallenge(userId: string, challenge: string): Promise<void> {
  const file = await getUserFile(userId);
  let challenges: string[] = [];
  try {
    const content = await fs.readFile(file, 'utf8');
    challenges = JSON.parse(content);
  } catch {}
  challenges.push(challenge);
  await fs.writeFile(file, JSON.stringify(challenges, null, 2), 'utf8');
}
