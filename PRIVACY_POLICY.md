# Πολιτική Απορρήτου / Privacy Policy

**Τελευταία ενημέρωση / Last updated: 6 September 2026**

## Ελληνικά

Το **MSWIN1253 Greek Fix** επεξεργάζεται τοπικά στο Thunderbird μόνο το μήνυμα που προβάλλεται, όταν χρειάζεται να εντοπίσει και να διορθώσει `charset=MSWIN1253`.

- Δεν συλλέγει προσωπικά δεδομένα, περιεχόμενο email, metadata, analytics, telemetry ή αναγνωριστικά.
- Δεν αποστέλλει δεδομένα στον δημιουργό ή σε τρίτους.
- Δεν πραγματοποιεί network requests.
- Δεν αποθηκεύει μόνιμα το αποκωδικοποιημένο περιεχόμενο.
- Δεν τροποποιεί το πρωτότυπο email στον mail server ή στο τοπικό mailbox.
- Το αποκωδικοποιημένο HTML χρησιμοποιείται μόνο για την τρέχουσα προβολή και καθαρίζεται πριν εμφανιστεί.
- Δεν χρησιμοποιούνται τρίτες υπηρεσίες, SDKs, advertising ή remote code.

### Permissions

- `messagesRead`: απαιτείται για την ανάγνωση του raw MIME source του εμφανιζόμενου μηνύματος.
- `messagesModify`: απαιτείται από το Thunderbird `messageDisplayScripts` API για την αλλαγή της **προβολής** του μηνύματος. Η επέκταση δεν τροποποιεί μόνιμα το αποθηκευμένο email.

Source code / issues:

https://github.com/krysgit/thunderbird-mswin1253-fix

https://github.com/krysgit/thunderbird-mswin1253-fix/issues

---

## English

**MSWIN1253 Greek Fix** processes only the currently displayed message locally in Thunderbird when needed to detect and correct `charset=MSWIN1253`.

- It does not collect personal data, email content, metadata, analytics, telemetry, or identifiers.
- It does not transmit data to the developer or to third parties.
- It makes no network requests.
- It does not persistently store decoded message content.
- It does not modify the original email on the mail server or in the local mailbox.
- Decoded HTML is used only for the current display and is sanitized before being shown.
- No third-party services, SDKs, advertising, or remote code are used.

### Permissions

- `messagesRead`: required to read the raw MIME source of the displayed message.
- `messagesModify`: required by Thunderbird's `messageDisplayScripts` API to alter the **rendered view**. The extension does not permanently modify the stored email.

Source code / issues:

https://github.com/krysgit/thunderbird-mswin1253-fix

https://github.com/krysgit/thunderbird-mswin1253-fix/issues
