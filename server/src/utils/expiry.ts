export const isProjectTemplateExpired = (expiresAt: Date | null): boolean => {
  if (!expiresAt) return false; // No expiry set
  return new Date() > expiresAt;
};
