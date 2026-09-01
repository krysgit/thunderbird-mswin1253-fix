# Changelog

All notable changes to this project will be documented in this file.

## 1.0.0 - 2026-09-01

- First public release.
- Detects messages declaring `charset=MSWIN1253`.
- Decodes affected HTML MIME parts as `windows-1253`.
- Supports base64, quoted-printable, and 7/8-bit fallback bodies.
- Uses Thunderbird's message-display event to target the exact displayed message.
- Uses the exact multipart MIME boundary from the message headers.
- Sanitizes corrected HTML before displaying it.
- Does not alter the stored message.
