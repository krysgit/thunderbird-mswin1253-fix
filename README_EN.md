# MSWIN1253 Greek Fix for Thunderbird

![GitHub Downloads](https://img.shields.io/github/downloads/krysgit/thunderbird-mswin1253-fix/total)
![GitHub Release](https://img.shields.io/github/v/release/krysgit/thunderbird-mswin1253-fix)
![License](https://img.shields.io/github/license/krysgit/thunderbird-mswin1253-fix)

A small Thunderbird extension that fixes Greek text in emails whose HTML MIME part declares:

`charset=MSWIN1253`

instead of the standard:

`charset=windows-1253`

## The problem

Some legacy email systems use Windows-1253 bytes for Greek HTML mail but declare the MIME charset as `MSWIN1253`.

On affected Thunderbird installations, Greek characters may appear as replacement characters such as `���`.

## EKDDA use case

The extension was created after this problem was observed in seminar and training notification emails from **EKDDA — the National Centre for Public Administration and Local Government in Greece**.

It is particularly useful for Greek public-sector employees who receive EKDDA training-programme notifications.

The extension is not limited to EKDDA. It can also help with other messages that use the same `MSWIN1253` charset declaration.

## What the extension does

When a displayed message contains `charset=MSWIN1253`, the extension:

1. Reads the raw MIME message.
2. Locates the affected `text/html` MIME part.
3. Decodes its bytes as Windows-1253.
4. Sanitizes the resulting HTML.
5. Replaces only the rendered message view.

The original message stored locally or on the mail server is **not modified**.

Messages that do not contain `charset=MSWIN1253` are ignored.

## Download

Download the latest `.xpi` from:

**[Latest Release](../../releases/latest)**

## Installation

1. Download the `.xpi` from the Releases page.
2. Open Thunderbird.
3. Go to **Add-ons and Themes**.
4. In **Extensions**, open the gear menu (⚙️).
5. Select **Install Add-on From File...**
6. Select the downloaded `.xpi`.
7. Reopen an affected message.

## Tested environment

Confirmed working on:

- Linux
- Thunderbird 140.8.0esr (64-bit)

The manifest requires **Thunderbird 128 or newer**.

Other compatible Thunderbird versions and operating systems may also work, but have not yet been verified.

## Supported transfer encodings

For affected `text/html` MIME parts declaring `MSWIN1253`, the extension handles:

- `base64`
- `quoted-printable`
- 7-bit / 8-bit style bodies as a fallback

The original reported case uses `base64`.

## Security and privacy

- No message content is sent anywhere.
- No analytics or telemetry are used.
- The extension makes no network requests.
- The original email is not rewritten.
- Decoded HTML is sanitized before display.
- Scripts, forms, iframes, embedded objects, JavaScript URLs, event-handler attributes, and remote image sources are removed.

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md).

## Build locally

### Linux / macOS / Git Bash

```bash
./scripts/build.sh
```

### PowerShell

```powershell
./scripts/build.ps1
```

The generated XPI is written to `dist/`.

## Support

Use [GitHub Issues](https://github.com/krysgit/thunderbird-mswin1253-fix/issues).

## Ελληνική έκδοση

Δείτε το [README.md](README.md).

## License

MIT License. See [LICENSE](LICENSE).
