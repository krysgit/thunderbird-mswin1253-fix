# MSWIN1253 Greek Fix for Thunderbird

![GitHub Downloads](https://img.shields.io/github/downloads/krysgit/thunderbird-mswin1253-fix/total)
![GitHub Release](https://img.shields.io/github/v/release/krysgit/thunderbird-mswin1253-fix)
![License](https://img.shields.io/github/license/krysgit/thunderbird-mswin1253-fix)

Μικρή επέκταση για το Thunderbird που διορθώνει την εμφάνιση ελληνικών χαρακτήρων σε emails τα οποία δηλώνουν:

`charset=MSWIN1253`

αντί για:

`charset=windows-1253`

## Επίσημη εγκατάσταση από το Thunderbird Add-ons

Η επέκταση είναι πλέον διαθέσιμη στον επίσημο κατάλογο προσθέτων του Thunderbird:

**[MSWIN1253 Greek Fix στο Thunderbird Add-ons](https://addons.thunderbird.net/en-US/thunderbird/addon/mswin1253-greek-fix/)**

Αυτός είναι ο προτεινόμενος τρόπος εγκατάστασης για τους περισσότερους χρήστες.

## Το πρόβλημα

Ορισμένα παλαιότερα συστήματα αποστολής email χρησιμοποιούν την κωδικοποίηση Windows-1253 για ελληνικό κείμενο, αλλά δηλώνουν στο MIME header:

`charset=MSWIN1253`

Το συγκεκριμένο charset label ενδέχεται να μην αναγνωρίζεται σωστά από σύγχρονες εκδόσεις του Thunderbird, με αποτέλεσμα οι ελληνικοί χαρακτήρες να εμφανίζονται ως σύμβολα αντικατάστασης, για παράδειγμα:

`���`

## Χρήση για emails του ΕΚΔΔΑ

Η επέκταση είναι ιδιαίτερα χρήσιμη για δημόσιους υπαλλήλους που λαμβάνουν ενημερωτικά emails από το **ΕΚΔΔΑ (Εθνικό Κέντρο Δημόσιας Διοίκησης και Αυτοδιοίκησης)** σχετικά με επιμορφωτικά προγράμματα και σεμινάρια στα οποία έχουν εγγραφεί ή επιλεγεί να συμμετάσχουν.

Έχει παρατηρηθεί ότι ορισμένα από αυτά τα emails αποστέλλονται με:

`charset=MSWIN1253`

με αποτέλεσμα τα ελληνικά να μην εμφανίζονται σωστά στο Thunderbird.

Η επέκταση δεν περιορίζεται στο ΕΚΔΔΑ. Μπορεί να βοηθήσει και σε άλλα emails που χρησιμοποιούν την ίδια δήλωση charset.

## Τι κάνει η επέκταση

Όταν εμφανίζεται ένα email που περιέχει `charset=MSWIN1253`, η επέκταση:

1. Διαβάζει το raw MIME περιεχόμενο του μηνύματος.
2. Εντοπίζει το επηρεαζόμενο `text/html` MIME part.
3. Αποκωδικοποιεί το περιεχόμενο ως Windows-1253.
4. Καθαρίζει το HTML πριν από την εμφάνισή του.
5. Αντικαθιστά μόνο την προβολή του μηνύματος με το σωστά αποκωδικοποιημένο περιεχόμενο.

Το πρωτότυπο email που είναι αποθηκευμένο τοπικά ή στον mail server **δεν τροποποιείται**.

Emails που δεν περιέχουν `charset=MSWIN1253` αγνοούνται.

## Εγκατάσταση

### Προτεινόμενος τρόπος

Εγκαταστήστε την επέκταση από το επίσημο Thunderbird Add-ons:

**[MSWIN1253 Greek Fix](https://addons.thunderbird.net/en-US/thunderbird/addon/mswin1253-greek-fix/)**

### Χειροκίνητη εγκατάσταση από GitHub

Εναλλακτικά:

1. Μεταβείτε στη σελίδα **Releases** του repository.
2. Κατεβάστε το πιο πρόσφατο αρχείο `.xpi`.
3. Ανοίξτε το Thunderbird.
4. Μεταβείτε στο **Add-ons and Themes**.
5. Στην ενότητα **Extensions**, ανοίξτε το μενού με το γρανάζι ⚙️.
6. Επιλέξτε **Install Add-on From File...**
7. Επιλέξτε το αρχείο `.xpi`.

**[Latest GitHub Release](../../releases/latest)**

## Περιβάλλον δοκιμής

Η επέκταση έχει ελεγχθεί και επιβεβαιωθεί ότι λειτουργεί σε:

- Linux
- Thunderbird 140.8.0esr (64-bit)

Το `manifest.json` απαιτεί **Thunderbird 128 ή νεότερο**.

Ενδέχεται να λειτουργεί και σε άλλες συμβατές εκδόσεις του Thunderbird ή άλλα λειτουργικά συστήματα, αλλά αυτά δεν έχουν ακόμη ελεγχθεί.

## Παράδειγμα προβληματικού MIME header

```text
Content-Type: text/html;
 charset=MSWIN1253
Content-Transfer-Encoding: base64
```

## Υποστηριζόμενα Content-Transfer-Encoding

Για επηρεαζόμενα `text/html` MIME parts που δηλώνουν `MSWIN1253`, η επέκταση χειρίζεται:

- `base64`
- `quoted-printable`
- 7-bit / 8-bit bodies ως fallback

Το αρχικό περιστατικό για το οποίο δημιουργήθηκε η επέκταση χρησιμοποιεί `base64`.

## Ασφάλεια και ιδιωτικότητα

- Κανένα περιεχόμενο email δεν αποστέλλεται σε εξωτερική υπηρεσία.
- Δεν χρησιμοποιούνται analytics ή telemetry.
- Η επέκταση δεν πραγματοποιεί network requests.
- Το αρχικό email δεν ξαναγράφεται ή τροποποιείται.
- Το αποκωδικοποιημένο HTML καθαρίζεται πριν εμφανιστεί.
- Αφαιρούνται scripts, forms, iframes, embedded objects, JavaScript URLs, event-handler attributes και remote image sources.

Δείτε επίσης την [Πολιτική Απορρήτου](PRIVACY_POLICY.md).

## Δημιουργία του XPI τοπικά

### Linux / macOS / Git Bash

```bash
./scripts/build.sh
```

### PowerShell

```powershell
./scripts/build.ps1
```

Το παραγόμενο `.xpi` αποθηκεύεται στον φάκελο `dist/`.

## Δομή του project

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

## English version

Η αγγλική έκδοση είναι διαθέσιμη στο [README_EN.md](README_EN.md).

## Υποστήριξη

Για bug reports ή compatibility reports χρησιμοποιήστε τα [GitHub Issues](https://github.com/krysgit/thunderbird-mswin1253-fix/issues).

## Άδεια χρήσης

MIT License. Δείτε το [LICENSE](LICENSE).
