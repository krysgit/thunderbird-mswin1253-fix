# thunderbird-mswin1253-fix
Thunderbird extension that fixes emails declaring the non-standard MSWIN1253 charset. Created for EKDDA (ΕΚΔΔΑ) email messages

# MSWIN1253 Greek Fix for Thunderbird

A small Thunderbird extension that fixes Greek text in HTML email messages that incorrectly declare their character encoding as:

```text
charset=MSWIN1253
```

instead of the standard Windows-1253 label:

```text
charset=windows-1253
```

## The problem

Some legacy mail systems still send Greek email using Windows-1253 encoding while declaring the MIME charset as `MSWIN1253`.

Recent Thunderbird versions may not interpret that non-standard charset label correctly, causing Greek characters to appear as replacement characters such as:

```text
�������
```

A typical affected MIME part looks like this:

```text
Content-Type: text/html;
 charset=MSWIN1253
Content-Transfer-Encoding: base64
```

Changing `MSWIN1253` to `windows-1253` makes the message display correctly. This extension performs the equivalent decoding automatically when the affected message is displayed.

## What the extension does

When Thunderbird displays a message containing an HTML MIME part with `charset=MSWIN1253`, the extension:

1. Reads the raw MIME message.
2. Locates the affected `text/html` MIME part.
3. Supports `base64`, `quoted-printable`, and unencoded message bodies.
4. Decodes the body as `windows-1253`.
5. Replaces only the displayed message content with the correctly decoded HTML.

The original email stored in Thunderbird or on the mail server is **not modified**.

Messages that do not contain `charset=MSWIN1253` are left untouched.

## Download

Download the latest `.xpi` file from the repository's **Releases** page:

**[Download the latest release](../../releases/latest)**

## Installation

1. Download the latest `.xpi` file from **Releases**.
2. Open Thunderbird.
3. Go to **Add-ons and Themes**.
4. Open **Extensions**.
5. Click the gear icon **⚙️**.
6. Select **Install Add-on From File...**.
7. Select the downloaded `.xpi` file.
8. Restart Thunderbird if necessary.
9. Open an affected email again.

## Compatibility

- Thunderbird **128.0 or newer**
- Manifest V2 Thunderbird extension

The minimum supported Thunderbird version is defined in `manifest.json`.

## Privacy and security

The extension works locally inside Thunderbird.

It does not send email content to an external server and does not modify the original message.

Before replacing the displayed HTML, it removes or restricts potentially unsafe content including scripts, iframes, forms, JavaScript URLs, event-handler attributes, and remote images.

## Permissions

The extension requests the Thunderbird permissions required to read and process displayed messages:

```json
"permissions": [
  "messagesRead",
  "messagesModify"
]
```

These permissions are used only to detect and correct messages affected by the `MSWIN1253` charset issue.

## How it works

The extension listens for Thunderbird's message-display event. When a message is opened, it checks its raw MIME source for:

```text
charset=MSWIN1253
```

If a matching HTML MIME part is found, the raw bytes are decoded using:

```javascript
new TextDecoder("windows-1253")
```

The corrected HTML is then rendered in the current message display.

## Repository structure

```text
.
├── manifest.json
├── background.js
├── messageDisplay/
│   └── fix.js
├── README.md
└── LICENSE
```

## Building the XPI

A Thunderbird `.xpi` file is a ZIP archive containing the extension files, with `manifest.json` at the root of the archive.

For example, from the repository root you can package the extension using your preferred ZIP tool and rename the resulting archive to `.xpi`.

Do **not** place the repository directory itself inside the archive. The archive should contain:

```text
manifest.json
background.js
messageDisplay/fix.js
```

directly at its root structure.

## Releases

Compiled `.xpi` files are published through **GitHub Releases** so users can install the extension without downloading or building the source code.

For each release, attach a file such as:

```text
mswin1253-greek-fix-v0.3.0.xpi
```

## License

This project can be distributed under the MIT License. Add a `LICENSE` file to the repository if you choose to use it.

## Disclaimer

This extension is intended as a workaround for email systems that send a non-standard `MSWIN1253` charset declaration. The preferred long-term fix is for the sending system to use a standard charset declaration such as `windows-1253`, or preferably UTF-8.


Correct charset name:

charset=windows-1253
