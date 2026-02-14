"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const USERNAME_REGEX = /^[a-z0-9_]+$/;
const USERNAME_MIN = 3;
const USERNAME_MAX = 20;

export type SchoolOption = { id: string; name: string };

export type InitialProfile = {
  username: string | null;
  school_id: string | null;
};

interface ProfileSettingsFormProps {
  initialProfile: InitialProfile;
  schools: SchoolOption[];
}

function normalizeUsername(s: string): string {
  return s.trim().toLowerCase();
}

function isValidUsername(s: string): boolean {
  const n = normalizeUsername(s);
  if (n.length === 0) return true;
  return n.length >= USERNAME_MIN && n.length <= USERNAME_MAX && USERNAME_REGEX.test(n);
}

export function ProfileSettingsForm({
  initialProfile,
  schools,
}: ProfileSettingsFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(initialProfile.username ?? "");
  const [schoolId, setSchoolId] = useState<string | null>(initialProfile.school_id);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalizedUsername = useMemo(() => normalizeUsername(username), [username]);
  const usernameValid = useMemo(
    () => normalizedUsername.length === 0 || isValidUsername(username),
    [normalizedUsername, username]
  );

  const filteredSchools = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  }, [schools, search]);

  const selectedSchool = useMemo(
    () => schools.find((s) => s.id === schoolId) ?? null,
    [schools, schoolId]
  );

  const hasChanges =
    (normalizedUsername !== (initialProfile.username ?? "")) ||
    (schoolId !== initialProfile.school_id);

  const canSave =
    hasChanges &&
    usernameValid &&
    (normalizedUsername.length === 0 || (normalizedUsername.length >= USERNAME_MIN && normalizedUsername.length <= USERNAME_MAX));

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!canSave || saving) return;

    const payload: { username?: string | null; school_id?: string | null } = {};
    if (normalizedUsername !== (initialProfile.username ?? "")) {
      payload.username = normalizedUsername || null;
    }
    if (schoolId !== initialProfile.school_id) {
      payload.school_id = schoolId;
    }
    if (Object.keys(payload).length === 0) return;

    setSaving(true);
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 409 && data.code === "USERNAME_TAKEN") {
        setError("That username is already taken.");
        return;
      }
      if (res.status === 409) {
        setError("That username is already taken.");
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="profile-username" className="block text-sm font-medium text-text-primary">
          Username
        </label>
        <input
          id="profile-username"
          type="text"
          placeholder="yourname"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
        {username.length > 0 && !usernameValid && (
          <p className="mt-1 text-xs text-destructive">
            {normalizedUsername.length < USERNAME_MIN
              ? `At least ${USERNAME_MIN} characters`
              : normalizedUsername.length > USERNAME_MAX
                ? `At most ${USERNAME_MAX} characters`
                : "Only letters, numbers, and underscores"}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary">
          School
        </label>
        <div className="relative mt-1" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search schools..."
            value={open ? search : selectedSchool?.name ?? ""}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          {open && (
            <div className="absolute top-full z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-black/10 bg-surface-raised py-1 shadow-elevated">
              <button
                type="button"
                onClick={() => {
                  setSchoolId(null);
                  setSearch("");
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-text-secondary transition hover:bg-black/5"
              >
                Clear selection
              </button>
              {filteredSchools.length === 0 ? (
                <p className="px-4 py-2 text-sm text-text-secondary">No schools found</p>
              ) : (
                filteredSchools.map((school) => (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => {
                      setSchoolId(school.id);
                      setSearch("");
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary transition hover:bg-black/5"
                  >
                    {school.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        {selectedSchool && !open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-1 text-xs text-text-secondary hover:underline"
          >
            Change school
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {saved && (
        <p className="text-sm text-green-600" role="status">
          Saved
        </p>
      )}

      <Button type="submit" disabled={!canSave || saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
