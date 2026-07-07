/**
 * Direct mailto: helper.
 *
 * Builds a `mailto:` URL that opens the user's mail client with all form
 * fields pre-filled (to, subject, body). The recipient is hard-coded to
 * the address this project is configured for.
 *
 * No API keys, no external services, no backend required. Attachments
 * (e.g. a CV) cannot be added via `mailto:` in browsers — the applicant
 * attaches the file manually in their mail client.
 */

export const CONTACT_EMAIL = "abdullah.al.mahi2003@gmail.com";

export type MailPayload = {
  subject: string;
  body: string;
};

/**
 * Build a fully-encoded mailto: URL.
 */
export function buildMailto({ subject, body }: MailPayload): string {
  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

/**
 * Open the user's mail client with the given subject and body pre-filled.
 * Returns the mailto URL in case the caller wants to show it.
 */
export function openMailClient(payload: MailPayload): string {
  const href = buildMailto(payload);
  window.location.href = href;
  return href;
}