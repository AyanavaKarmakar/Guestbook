export function getUserNameFromEmail(email: string | null | undefined): string {
  if (email !== null && email !== undefined) {
    return email.substring(0, email.lastIndexOf("@"));
  }
  return "emailIdNotFound";
}
