# MSWIN1253 Greek Fix for Thunderbird

A small Thunderbird extension that fixes Greek text in emails that incorrectly declare the MIME character set as `MSWIN1253` instead of the standard `windows-1253` label.

## The problem

Some legacy mail systems send Greek HTML mail using Windows-1253 bytes but use a header such as:

```text
Content-Type: text/html;
 charset=MSWIN1253
Content-Transfer-Encoding: base64
```

Thunderbird may fail to interpret that non-standard charset label correctly, so Greek text is displayed as replacement characters such as `���`.

Changing the label to `windows-1253` makes the same message render correctly.

## What the extension does

When a displayed message contains `charset=MSWIN1253`, the extension:

1. Reads the raw MIME message using Thunderbird's extension APIs.
2. Finds the affected `text/html` MIME part.
3. Decodes its bytes as `windows-1253`.
4. Sanitizes the resulting HTML.
5. Replaces only the displayed document with the correctly decoded content.

The original email stored locally or on the mail server is **not modified**.

Messages that do not contain `charset=MSWIN1253` are ignored.

## Tested environment

This extension has been tested and confirmed to work on:

- Linux
- Thunderbird 140.8.0esr (64-bit)

Other operating systems and Thunderbird versions may also work, but have not been verified yet.

## Download

Go to **Releases** and download the latest `.xpi` asset:

**[Latest release](../../releases/latest)**

The release asset is named like:

```text
mswin1253-greek-fix-v1.0.0.xpi
```

## Installation

1. Download the `.xpi` from the Releases page.
2. Open Thunderbird.
3. Open **Add-ons and Themes**.
4. In **Extensions**, open the gear menu (⚙).
5. Select **Install Add-on From File…**.
6. Choose the downloaded `.xpi` file.
7. Reopen an affected email.

## Compatibility

The manifest requires **Thunderbird 128 or newer**.

This project uses Thunderbird's `messages.getRaw`, `messageDisplayScripts`, and `messageDisplay.onMessageDisplayed` APIs.

## Supported message encodings

For an affected `text/html` MIME part declaring `MSWIN1253`, the extension handles:

- `base64`
- `quoted-printable`
- 7-bit / 8-bit style bodies as a fallback

The original reported case uses `base64`.

## Security / privacy

- No message content is sent anywhere.
- There are no network requests in the extension.
- The original email is not rewritten.
- The decoded HTML is sanitized before being inserted into the message display.
- Scripts, forms, iframes, embedded objects, JavaScript URLs, event-handler attributes, and remote image sources are removed.

## Build the XPI locally

An XPI is just a ZIP archive whose root contains `manifest.json`.

### Linux / macOS / Git Bash

```bash
./scripts/build.sh
```

### PowerShell

```powershell
./scripts/build.ps1
```

The output is written to `dist/`.

## Publishing a GitHub Release

This repository includes a GitHub Actions workflow. To publish a release automatically, push a version tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will build the `.xpi`, create the corresponding GitHub Release, and attach the `.xpi` as a downloadable release asset.

For future versions, update the version in `manifest.json`, commit the change, and create a matching tag such as `v1.0.1`.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── release.yml
├── messageDisplay/
│   └── fix.js
├── scripts/
│   ├── build.ps1
│   └── build.sh
├── background.js
├── manifest.json
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## License

MIT License. See [LICENSE](LICENSE).
