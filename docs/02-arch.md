# Technikai tervek

- Bejelentkezés: AuthSCH (AD?)
  - Role for user: admin, guest
  - Jelenleg csak admin jogosultsággal folytatható a munka (más ha bejelentkezik, akkor vissza lesz dobva, hogy egyelőre csak adminok léphetnek be)
- Kétféle dolgot lehet létrehozni
  - Live stream
    - Lehet ez már egy létező stream embeddelése a website-ba pl. Twitch, Youtube, stb.
    - Lehet ez egy új stream, amit a felhasználó a weboldalon keresztül indít el, kap egy kulcsot, OBS-ben beállítja, és mehet a stream
  - VOD
    - Ehhez lehet feltölteni egy videót, amelyet a weboldal elment, és a felhasználó később publikálhatja, amikor véget ér a feldolgozása (előkészíti a HLS-en keresztüli streamingre a szegmentálást stb.)
- Settings
  - **Kiemelt videó**: ki kell jelölni egyet, amelyik a főoldalon megjelenik
  - **Hírek**: lehetőség van híreket írni, amelyek a főoldalon megjelennek (állítható, hogy látható-e, törölhetőek)
    - Markdownban szerkeszthető
  - Keresőmező működése később lesz implementálva (fuzzy search via Elasticsearch)
  - **Kapcsolat adatok** (email, telefonszám, körvezető neve, megkeresések how-to linkje)
- Baromi sok tárhelyet fog igényelni
  - Eredeti videó, amit feltölt a felhasználó + Szegmentált videók (HLS)
- UI: Konzisite copy (dark mode miatt)
