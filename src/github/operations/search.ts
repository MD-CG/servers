import { z } from "zod";
import { githubRequest, buildUrl, getApiBaseUrl } from "../common/utils.js";

export const SearchOptions = z.object({
  q: z.string(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).optional(),
  per_page: z.number().min(1).max(100).optional(),
});

export const SearchUsersOptions = SearchOptions.extend({
  sort: z.enum(["followers", "repositories", "joined"]).optional(),
});

export const SearchIssuesOptions = SearchOptions.extend({
  sort: z.enum([
    "comments",
    "reactions",
    "reactions-+1",
    "reactions--1",
    "reactions-smile",
    "reactions-thinking_face",
    "reactions-heart",
    "reactions-tada",
    "interactions",
    "created",
    "updated",
  ]).optional(),
});

export const SearchCodeSchema = SearchOptions;
export const SearchUsersSchema = SearchUsersOptions;
export const SearchIssuesSchema = SearchIssuesOptions;

export async function searchCode(params: z.infer<typeof SearchCodeSchema>) {
  const baseUrl = getApiBaseUrl();
  return githubRequest(buildUrl(`${baseUrl}/search/code`, params));
}

export async function searchIssues(params: z.infer<typeof SearchIssuesSchema>) {
  const baseUrl = getApiBaseUrl();
  return githubRequest(buildUrl(`${baseUrl}/search/issues`, params));
}

export async function searchUsers(params: z.infer<typeof SearchUsersSchema>) {
  const baseUrl = getApiBaseUrl();
  return githubRequest(buildUrl(`${baseUrl}/search/users`, params));
}