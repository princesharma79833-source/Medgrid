# Medgrid Wellness Compass

Build a modern, responsive Medical Value Travel (MVT) web application named MedGrid using React, Tailwind CSS, and Lucide React icons.

Global Theme & Navbar:

Header bar with logo 'MedGrid' (health icon), navigation links ('Home', 'Treatments', 'Compare Packages', 'Travel Help'), a language selector dropdown ('English', 'Arabic', 'Russian'), and a highlighted red 'Emergency SOS' button linking to /sos.

Aesthetic: Clean slate background (bg-slate-50), white card containers, primary ocean blue (#0284c7) for Allopathy, and rich emerald green (#059669) for AYUSH/Ayurveda components.

Homepage Hero & Search Section:

Headline: "Verified Healthcare & AYUSH Wellness in India"

Subtitle: "Compare fixed-price surgical & Ayurveda packages with transparent pricing and instant emergency support."

Main Search Bar: Input box to search by treatment, specialty, or hospital, with a 'Search' button.

System Filter Tabs: Toggle buttons between 'Allopathy Care' and 'AYUSH & Wellness'.

Featured Package Cards Grid:

Show two preview sections based on the selected tab:

Allopathy: Display cards like "Total Knee Replacement" and "Cardiac CABG Surgery" with USD price range, stay duration, room type (Private/ICU), and NABH/JCI verified badges.

AYUSH: Display cards like "14-Day Panchakarma Detox" and "Spine & Joint Care" with duration, NABH-AYUSH grade, daily diet inclusions, and an 'Evidence-based care' label.

Routing Structure:

Setup base routes for /, /treatments, /compare, /quote, and /sos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fa1a62ca-8774-4b55-8a5f-9d64add36f6d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
