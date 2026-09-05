import { useUserStore } from "../stores/useUserStore";
import { loginUrl, apiKeyUrl } from "../constants/api";

const GUEST_EMAIL = "demo2026@stud.noroff.no";
const GUEST_PASSWORD = "DemoPassword123!";

export function getAuthHeaders(extra = {}) {
  const user = useUserStore.getState().user;
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + (user?.accessToken || ""),
    "X-Noroff-API-Key": user?.apiKey || "",
    ...extra,
  };
}

export function unwrap(json) {
  return json?.data ?? json;
}

function urlOf(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.url ?? "";
}

export function normalizeProfile(profile) {
  if (!profile || typeof profile !== "object") return profile;
  return {
    ...profile,
    avatar: urlOf(profile.avatar),
    banner: urlOf(profile.banner),
    followers: Array.isArray(profile.followers)
      ? profile.followers.map(normalizeProfile)
      : profile.followers,
    following: Array.isArray(profile.following)
      ? profile.following.map(normalizeProfile)
      : profile.following,
    posts: Array.isArray(profile.posts) ? profile.posts : profile.posts,
  };
}

export function normalizeComment(comment) {
  if (!comment || typeof comment !== "object") return comment;
  return { ...comment, author: normalizeProfile(comment.author) };
}

export function normalizePost(post) {
  if (!post || typeof post !== "object") return post;
  return {
    ...post,
    media: urlOf(post.media) || post.media,
    author: normalizeProfile(post.author),
    comments: Array.isArray(post.comments)
      ? post.comments.map(normalizeComment)
      : post.comments,
    reactions: Array.isArray(post.reactions)
      ? post.reactions.map((reaction) => ({ ...reaction }))
      : post.reactions,
  };
}

function normalizeItem(item) {
  if (
    item &&
    typeof item === "object" &&
    (item.body !== undefined || "media" in item || "author" in item)
  ) {
    return normalizePost(item);
  }
  return normalizeProfile(item);
}

export function normalize(data) {
  if (Array.isArray(data)) return data.map(normalizeItem);
  return normalizeItem(data);
}

async function fetchApiKey(token) {
  try {
    const response = await fetch(apiKeyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ name: "sentire-app" }),
    });
    const json = await response.json();
    return json?.data?.key ?? "";
  } catch {
    return "";
  }
}

export async function completeLogin(email, password) {
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  const user = unwrap(json);
  const apiKey = await fetchApiKey(user.accessToken);
  const normalized = normalizeProfile({ ...user, apiKey });

  useUserStore.getState().setUser(normalized);
  return normalized;
}

export async function ensureGuestSession() {
  const user = useUserStore.getState().user;
  if (user?.accessToken) return user;

  return completeLogin(GUEST_EMAIL, GUEST_PASSWORD);
}