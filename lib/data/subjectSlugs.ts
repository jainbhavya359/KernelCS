/**
 * Bidirectional map between URL slugs and internal curriculum subject IDs.
 * URL slugs are used in `/subjects/[slug]` routes.
 * Internal IDs match CURRICULUM_SUBJECTS_MAP keys.
 */
export const SLUG_TO_ID: Record<string, string> = {
  'os': 'os',
  'dbms': 'dbms',
  'computer-networks': 'cn',
  'oop': 'oop',
  'dsa': 'dsa',
  'system-design': 'sysdesign',
  'git': 'git',
  'computer-architecture': 'architecture',
};

export const ID_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_ID).map(([slug, id]) => [id, slug])
);

export function slugToId(slug: string): string | undefined {
  return SLUG_TO_ID[slug];
}

export function idToSlug(id: string): string | undefined {
  return ID_TO_SLUG[id];
}

export const ALL_SUBJECT_SLUGS = Object.keys(SLUG_TO_ID);

