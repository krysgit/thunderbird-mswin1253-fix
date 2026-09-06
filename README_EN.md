# MSWIN1253 Greek Fix for Thunderbird

![GitHub Downloads](https://img.shields.io/github/downloads/krysgit/thunderbird-mswin1253-fix/total)
![GitHub Release](https://img.shields.io/github/v/release/krysgit/thunderbird-mswin1253-fix)
![License](https://img.shields.io/github/license/krysgit/thunderbird-mswin1253-fix)

A small Thunderbird extension that fixes Greek text in emails whose HTML MIME part declares:

`charset=MSWIN1253`

instead of the standard:

`charset=windows-1253`

## Official installation from Thunderbird Add-ons

The extension is now available from the official Thunderbird Add-ons catalog:

**[MSWIN1253 Greek Fix on Thunderbird Add-ons](https://addons.thunderbird.net/en-US/thunderbird/addon/mswin1253-greek-fix/)**

This is the recommended installation method for most users.

## The problem

Some legacy email systems use Windows-1253 bytes for Greek HTML mail but declare the MIME charset as:

`charset=MSWIN1253`

On affected Thunderbird installations, Greek characters may appear as replacement characters such as:

`���`

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

## Installation

### Recommended

Install from the official Thunderbird Add-ons catalog:

**[MSWIN1253 Greek Fix](https://addons.thunderbird.net/en-US/thunderbird/addon/mswin1253-greek-fix/)**

### Manual installation from GitHub

Alternatively:

1. Go to the repository's **Releases** page.
2. Download the latest `.xpi`.
3. Open Thunderbird.
4. Go to **Add-ons and Themes**.
5. In **Extensions**, open the gear menu (⚙️).
6. Select **Install Add-on From File...**
7. Select the downloaded `.xpi`.

**[Latest GitHub Release](../../releases/latest)**

## Tested environment

Confirmed working on:

- Linux
- Thunderbird 140.8.0esr (64-bit)

The manifest requires **Thunderbird 128 or newer**.

Other compatible Thunderbird versions and operating systems may also work, but have not yet been verified.

## Example problematic MIME header

```text
Content-Type: text/html;
 charset=MSWIN1253
Content-Transfer-Encoding: base64
```

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

## Project structure

```text
.
├── messageDisplay/
│   └── fix.js
├── scripts/
│   ├── build.ps1
│   └── build.sh
├── background.js
├── manifest.json
├── CHANGELOG.md
├── LICENSE
├── PRIVACY_POLICY.md
├── README.md
├── README_EN.md
└── SUPPORT.md
```

## Ελληνική έκδοση

Δείτε το [README.md](README.md).

## Support

For bug reports or compatibility reports, use [GitHub Issues](https://github.com/krysgit/thunderbird-mswin1253-fix/issues).

## License

MIT License. See [LICENSE](LICENSE).
