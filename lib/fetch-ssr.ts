import api from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProfileSSR() {
  const res = await fetch(`${API_URL}/profile`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.profile;
}

export async function getProjectsSSR() {
  const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.projects;
}

export async function getSkillsSSR() {
  const res = await fetch(`${API_URL}/skills`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.skills;
}

export async function getExperiencesSSR() {
  const res = await fetch(`${API_URL}/experience`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.experiences;
}
