export function getUserNameFromEmail(
  email: string | null | undefined
): string | null {
  if (email !== null && email !== undefined) {
    return email.substring(0, email.lastIndexOf("@"));
  }
  return null;
}
