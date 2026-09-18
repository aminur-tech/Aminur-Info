import { unstable_cache } from "next/cache";
import { env } from "../env";

export type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
};

export const getGitHubRepositories = unstable_cache(async (): Promise<GitHubRepository[]> => {
  if (!env.GITHUB_USERNAME) return [];
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(env.GITHUB_USERNAME)}/repos?sort=updated&per_page=100`, {
    headers: { Accept: "application/vnd.github+json", ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}) },
    next: { revalidate: 3600 },
  });
  if (!response.ok) return [];
  return response.json() as Promise<GitHubRepository[]>;
}, ["github-repositories"], { revalidate: 3600 });