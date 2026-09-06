# Changelog

All notable changes to this project are documented here.

## 1.0.1 - 2026-09-06

- Prepared the extension for Thunderbird Add-ons submission.
- Replaced the temporary local add-on ID with a stable add-on ID.
- Added author and homepage metadata.
- Added Greek and English README files.
- Added Privacy Policy and Support documentation.
- Added GitHub Actions release workflow.
- Extension runtime behavior is unchanged from the working 1.0.0 version.

## 1.0.0 - 2026-09-01

- First public release.
- Detects messages declaring `charset=MSWIN1253`.
- Decodes affected HTML MIME parts as `windows-1253`.
- Supports base64, quoted-printable, and 7/8-bit fallback bodies.
- Uses Thunderbird's message-display event to target the exact displayed message.
- Uses the exact multipart MIME boundary from the message headers.
- Sanitizes corrected HTML before displaying it.
- Does not alter the stored message.
