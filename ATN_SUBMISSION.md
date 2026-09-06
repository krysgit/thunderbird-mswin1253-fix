# Thunderbird Add-ons submission notes

## Name

MSWIN1253 Greek Fix

## Summary

Fixes Greek HTML messages that incorrectly declare charset=MSWIN1253 by decoding those MIME parts as windows-1253 for display only.

## Suggested categories

- Message and News Reading
- Language Support

## Support website

https://github.com/krysgit/thunderbird-mswin1253-fix/issues

## License

MIT/X11 License

## Notes to Reviewer

This extension addresses a MIME charset interoperability issue affecting Greek HTML email messages that declare:

charset=MSWIN1253

instead of the standard:

charset=windows-1253

A representative affected message contains:

Content-Type: text/html;
 charset=MSWIN1253
Content-Transfer-Encoding: base64

The issue was reproduced by saving an affected message as .eml and changing only the charset label from MSWIN1253 to windows-1253. Thunderbird then displayed the Greek content correctly.

The extension performs this correction only at display time and does not modify the original stored message.

Processing is entirely local:

1. messageDisplay.onMessageDisplayed detects the displayed message.
2. messages.getRaw() reads its raw MIME source.
3. The extension checks for charset=MSWIN1253.
4. The affected text/html MIME part is decoded as windows-1253.
5. The decoded HTML is sanitized.
6. Only the rendered message body is replaced.

Permission justification:

- messagesRead is required to access the raw MIME source using messages.getRaw().
- messagesModify is required by Thunderbird's messageDisplayScripts API to alter the displayed rendering. Despite the permission name, the stored email, its headers, attachments, IMAP copy, and local mailbox data are not modified.

The extension makes no network requests and includes no telemetry, analytics, advertising, remote code, or third-party services.

Source code:
https://github.com/krysgit/thunderbird-mswin1253-fix

Tested and confirmed working on:
Linux
Thunderbird 140.8.0esr (64-bit)
