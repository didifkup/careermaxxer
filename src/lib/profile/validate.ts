/**
 * Profile update validation. Pure functions.
 */

const USERNAME_REGEX = /^[a-z0-9_]+$/;
const USERNAME_MIN = 3;
const USERNAME_MAX = 20;

export function validateUsername(value: unknown): { ok: true; username: string } | { ok: false; error: string } {
  const s = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (s.length < USERNAME_MIN) {
    return { ok: false, error: `Username must be at least ${USERNAME_MIN} characters` };
  }
  if (s.length > USERNAME_MAX) {
    return { ok: false, error: `Username must be at most ${USERNAME_MAX} characters` };
  }
  if (!USERNAME_REGEX.test(s)) {
    return { ok: false, error: "Username may only contain lowercase letters, numbers, and underscores" };
  }
  return { ok: true, username: s };
}

export function normalizeUsernameInput(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}
