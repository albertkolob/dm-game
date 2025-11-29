# Doctrinal Mastery Game

A mobile-first PWA for teens (14-18) to learn, recall, and apply Doctrinal Mastery scriptures and ACE principles.

## Features

- **All Standard Works**: Old Testament, New Testament, Book of Mormon, Doctrine & Covenants, Pearl of Great Price
- **Tri-lingual**: English, Spanish, Portuguese (hot-switch at runtime)
- **100% Offline**: Works offline after first load
- **No Database**: All data embedded in the app
- **5 Game Modes**:
  - Reference Rush: Match key phrases to references
  - Fill the Verse: Complete cloze passages
  - ACE Match: Apply ACE principles to scriptures
  - Lightning Ladder: Mixed questions with lives
  - Team Mode: Classroom competition

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Teacher Quick Start (1 minute)

1. Open app on device/projector
2. Tap language picker → Select ES/PT if needed
3. Tap **Teacher Settings** (gear icon)
4. Go to **Sets** tab → Select preset or custom verses
5. Go to **Teams** tab → Enable team mode, add teams
6. Go to **Settings** tab → Adjust time (20-25s recommended)
7. Tap **Start Game**

### After Round
- Review missed verses with class
- Tap any verse → Invite students to highlight 5-7 key words
- Exit ticket: Each student writes 1 action + 1 reference

## Game Modes

### Reference Rush
- See key phrase, pick the correct reference
- +100 correct, -25 wrong
- Streak bonus: +10 every 5 correct

### Fill the Verse
- Complete the blanks in the verse
- Same scoring as Reference Rush

### ACE Match
- Choose ACE principle + supporting verse
- +50 for each correct (partial credit)
- ACE Principles:
  - **Act in Faith**: Exercise faith and take righteous action
  - **Eternal Perspective**: View life through the lens of eternity
  - **Divinely Appointed Sources**: Trust in prophets, scriptures, and the Spirit

### Lightning Ladder
- Mixed question types
- 3 lives (gain 1 every 5-streak)
- Time pressure increases

### Team Mode
- Single device, multiple teams
- Captain taps answer after team decides
- Scoreboard shows team standings

## Project Structure

```
dm-game/
├── public/
│   ├── manifest.webmanifest
│   ├── sw.js
│   └── favicon.svg
├── src/
│   ├── components/       # UI components
│   ├── data/            # Scripture data (embedded TS)
│   ├── i18n/            # Translations (EN/ES/PT)
│   ├── lib/             # Utilities, generators
│   ├── pages/           # Route pages
│   ├── store/           # Zustand state
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Data Format

Each Doctrinal Mastery item follows this structure:

```typescript
interface DMItem {
  id: string;           // e.g., "dc-84-20-22"
  work: Work;           // OT | NT | BOM | DC | PGP
  book: string;         // e.g., "D&C", "Alma"
  reference: string;    // e.g., "D&C 84:20-22"
  keyPhrase: {
    en: string;
    es: string;
    pt: string;
  };
  cloze: {
    en: string;         // With __________ blanks
    es: string;
    pt: string;
  };
  tags: string[];       // ["ordinances", "priesthood"]
  aceLinks: ACE[];      // Related ACE principles
}
```

## Presets

- **all_dm**: All Doctrinal Mastery scriptures
- **old_testament**: OT only
- **new_testament**: NT only
- **book_of_mormon**: BoM only
- **doctrine_covenants**: D&C only
- **pearl_great_price**: PGP only
- **bom_core**: Core BoM verses
- **dc_76_131**: D&C 76-131 focus
- **faith_action**: Act in Faith verses
- **eternal_perspective**: Eternal Perspective verses
- **divine_sources**: Divinely Appointed Sources verses

## Adding Custom Verses

1. Edit `src/data/dm-*.ts` files
2. Add new `DMItem` objects
3. Update presets in `src/data/index.ts` if needed

## CSV Template for Custom Data

```csv
id,work,book,reference,keyPhrase_en,keyPhrase_es,keyPhrase_pt,cloze_en,cloze_es,cloze_pt,tags,aceLinks
dc-84-20-22,DC,D&C,D&C 84:20-22,"In the ordinances...","En sus ordenanzas...","Nas ordenanças...","In the ________...","En sus __________...","Nas __________...","ordinances|power","eternal_perspective|divinely_appointed_sources"
```

## Accessibility

- WCAG AA contrast ratios
- Focus rings visible
- Keyboard navigation
- Screen reader announcements
- 44px+ tap targets
- Adjustable timer
- Sound/haptics toggleable

## Technology Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- Framer Motion (animations)
- Zustand (state management)
- i18next (internationalization)
- Workbox (PWA/offline)

## Browser Support

- Chrome 90+
- Safari 14+
- Firefox 90+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Android

## License

Educational use only. Scripture content used under fair use for educational purposes.

---

Built with care for seminary and institute classrooms.
