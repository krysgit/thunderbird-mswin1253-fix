# MSWIN1253 Greek Fix for Thunderbird

Μικρή επέκταση για το Thunderbird που διορθώνει την εμφάνιση ελληνικών χαρακτήρων σε emails τα οποία δηλώνουν:

`charset=MSWIN1253`

αντί για:

`charset=windows-1253`

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

Η επέκταση διορθώνει την εμφάνιση αυτών των μηνυμάτων χωρίς να τροποποιεί το πρωτότυπο email που είναι αποθηκευμένο στον mail server.

## Τι κάνει η επέκταση

Όταν εμφανίζεται ένα email που περιέχει:

`charset=MSWIN1253`

η επέκταση:

1. Διαβάζει το raw MIME περιεχόμενο του μηνύματος.
2. Εντοπίζει το επηρεαζόμενο HTML τμήμα.
3. Αποκωδικοποιεί το περιεχόμενο ως Windows-1253.
4. Εμφανίζει σωστά το ελληνικό κείμενο στο Thunderbird.

Τα υπόλοιπα emails δεν επηρεάζονται.

Το αρχικό μήνυμα στον mail server δεν τροποποιείται.

## Εγκατάσταση

1. Μεταβείτε στη σελίδα **Releases** του repository.
2. Κατεβάστε το πιο πρόσφατο αρχείο `.xpi`.
3. Ανοίξτε το Thunderbird.
4. Μεταβείτε στο **Add-ons and Themes**.
5. Πατήστε το γρανάζι ⚙️.
6. Επιλέξτε **Install Add-on From File...**
7. Επιλέξτε το αρχείο `.xpi` που κατεβάσατε.

## Περιβάλλον δοκιμής

Η επέκταση έχει ελεγχθεί και επιβεβαιωθεί ότι λειτουργεί σε:

- Linux
- Thunderbird 140.8.0esr (64-bit)

Ενδέχεται να λειτουργεί και σε άλλες εκδόσεις του Thunderbird ή άλλα λειτουργικά συστήματα, αλλά αυτά δεν έχουν ακόμη ελεγχθεί.

## Παράδειγμα προβληματικού MIME header

```text
Content-Type: text/html;
 charset=MSWIN1253
Content-Transfer-Encoding: base64
```

## Συμβατότητα

Το `manifest.json` απαιτεί **Thunderbird 128 ή νεότερο**.

Η επέκταση χρησιμοποιεί τα Thunderbird APIs:

- `messages.getRaw`
- `messageDisplayScripts`
- `messageDisplay.onMessageDisplayed`

## Υποστηριζόμενα Content-Transfer-Encoding

Για επηρεαζόμενα `text/html` MIME parts που δηλώνουν `MSWIN1253`, η επέκταση χειρίζεται:

- `base64`
- `quoted-printable`
- σώματα τύπου 7-bit / 8-bit ως fallback

Το αρχικό περιστατικό για το οποίο δημιουργήθηκε η επέκταση χρησιμοποιεί `base64`.

## Ασφάλεια και ιδιωτικότητα

- Κανένα περιεχόμενο email δεν αποστέλλεται σε εξωτερική υπηρεσία.
- Η επέκταση δεν πραγματοποιεί network requests.
- Το αρχικό email δεν τροποποιείται.
- Το αποκωδικοποιημένο HTML καθαρίζεται πριν εισαχθεί στην προβολή του μηνύματος.
- Αφαιρούνται scripts, forms, iframes, embedded objects, JavaScript URLs, event-handler attributes και remote image sources.

## Δημιουργία του XPI τοπικά

Ένα αρχείο XPI είναι ουσιαστικά ένα ZIP archive, στη ρίζα του οποίου βρίσκεται το `manifest.json`.

### Linux / macOS / Git Bash

```bash
./scripts/build.sh
```

### PowerShell

```powershell
./scripts/build.ps1
```

Το παραγόμενο `.xpi` αποθηκεύεται στον φάκελο:

```text
dist/
```

## Δημοσίευση GitHub Release

Το repository περιλαμβάνει GitHub Actions workflow.

Για αυτόματη δημιουργία release, δημιουργήστε και ανεβάστε ένα version tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Το GitHub Actions θα:

1. δημιουργήσει το `.xpi`,
2. δημιουργήσει το αντίστοιχο GitHub Release,
3. επισυνάψει το `.xpi` ως downloadable release asset.

Για μελλοντικές εκδόσεις, ενημερώστε πρώτα το version στο `manifest.json`, κάντε commit την αλλαγή και δημιουργήστε αντίστοιχο tag, π.χ.:

`v1.0.1`

## Δομή του project

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
├── README.md
└── README_EN.md
```

## English version

Η αγγλική έκδοση του README είναι διαθέσιμη εδώ:

[README_EN.md](README_EN.md)

## Άδεια χρήσης

MIT License. Δείτε το αρχείο [LICENSE](LICENSE).
