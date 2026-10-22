<!-- This document must be updated on every future prompt that changes the project. -->

# Project Report: Microsys Computer & Accessories

> **Single Source of Truth & Developer Onboarding Manual**  
> *Established: October 13, 2026*  
> *Notice: Any future prompt modifying this codebase MUST update this document in accordance with Section 16.*

---

## 1. Project Overview

| Attribute | Details |
| :--- | :--- |
| **Project Name** | Microsys Computer & Accessories |
| **Business Entity** | Offline Computer & Tech Hardware Retail Showroom |
| **Operating Model** | Physical retail showroom — inquiry-led discovery (no e-commerce cart/checkout) |
| **Physical Address** | Ramchandrapur, Bihar Sharif, Nalanda, Bihar 803216 |
| **Showroom Landmark** | Opposite/Near Ramchandarpur Bus Stand |
| **Primary Telephone** | `+919431687928` |
| **WhatsApp Business** | `+919431687928` (international format: `919431687928`) |
| **Operating Hours** | 10:00 AM – 9:00 PM, all 7 days (Saturday – Friday) |
| **Primary Objective** | Drive foot traffic and qualified inquiries via WhatsApp, phone calls, and in-person store visits |
| **Catalog Scope** | Laptops, Desktop PCs, Custom Gaming Rigs, Computer Components, Printers, Monitors, Peripherals, and Tech Support Services |

---

## 2. Tech Stack

- **Markup**: Pure HTML5 utilizing semantic page outlines, accessible ARIA attributes, Open Graph meta tags, Twitter Card tags, and Schema.org JSON-LD structured data.
- **Styling**: Vanilla CSS3 split into two modular stylesheets:
  - `styles/design-system.css`: Centralized design token repository (colors, spacing, typography, radii, shadows, motion, breakpoints).
  - `styles/home.css`: Component architecture, layout rules, keyframe animations, and responsive media queries.
- **Logic**: Vanilla ES6+ JavaScript embedded directly within document script tags. Zero external runtime dependencies, bundlers, or CDNs.
- **Architecture**: Static Web Application — zero compilation step, zero npm run commands, zero transpilation.
- **Media Formats**: WebP (compressed photography), SVG (crisp iconography & vector logos), PNG (brand marks), MP4 (H.264 video streams).

---

## 3. File Structure

```text
microsys/
├── aboutus.html                  # Standalone About Us page (Company overview, Repair Services)
├── AUDIT.md                      # Comprehensive codebase audit, placeholder log, and gap analysis
├── AUDIT-FIELDS.md               # 17-field product standard frontend audit report
├── COMPONENT-product-card.html   # Master product card reference template (Phase 0 Step 3)
├── components.html               # Dedicated Components category page (8 hardware sub-sections)
├── desktop-pcs.html              # Dedicated Desktop PCs category page
├── FIELD-NAMING-CONVENTION.md    # Locked 17-field naming convention and PHP mapping standard
├── FORM-FIELD-MAP.md             # Master form field to SQL column mapping reference (Phase 0 Step 4)
├── gaming.html                   # Dedicated Gaming category page
├── index.html                    # Main homepage (Header, Hero, Categories, Showcase, Contact, Footer)
├── laptops.html                  # Dedicated Laptops category page
├── PHP-DEV-GUIDE.md              # Consolidated onboarding manual for PHP backend developer (Phase 2 Review)
├── PROJECT-REPORT.md             # This document — master project documentation and onboarding manual
├── assets/                       # Static media asset repository
│   ├── README.md                 # Asset directory guidelines
│   ├── microsys-logo.svg         # Primary brand identity vector logo
│   ├── brands/                   # Brand manufacturer logos for looping ticker (11 PNG files)
│   ├── campaign/                 # Promotional campaign banners (poster.webp, poster.png)
│   ├── categoryimage/            # Hardware category showcase illustrations (12 WebP, 1 PNG)
│   ├── hero/                     # Hero background video assets and fallback posters (MP4, WebP, PNG)
│   └── productimage/             # Laptop catalog photography (4 WebP files)
└── styles/                       # Stylesheet directory
    ├── design-system.css         # Central design token variables (Locked)
    └── home.css                  # UI component library and responsive layout styles
```

### Legacy / Unused Scripts
*No leftover or legacy scripts are currently present at the project root.*

---

## 4. Design System Summary

All styling tokens are declared in `styles/design-system.css` and are strictly locked:

| Category | Token Range | Description & Key Values |
| :--- | :--- | :--- |
| **Palette** | `--color-white` to `--color-whatsapp` | `--color-blue-primary: #245BDB`, `--color-blue-hover: #1947B8`, `--color-gray-soft: #F5F7FA`, `--color-navy-dark: #101828`, `--color-whatsapp: #25D366`, `--color-amber-warning: #B45309` |
| **Spacing** | `--space-xs` to `--space-6xl` | Strict 4px/8px rhythm: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `88px`, `112px` |
| **Border Radius** | `--radius-badge` to `--radius-circular` | `--radius-badge: 6px`, `--radius-input: 10px`, `--radius-button: 10px`, `--radius-card: 14px`, `--radius-banner: 20px`, `--radius-circular: 50%` |
| **Elevation** | `--shadow-card` to `--shadow-modal` | Ambient shadows ranging from subtle cards (`0 2px 8px rgba(16,24,40,0.04)`) to elevated modals (`0 24px 64px rgba(16,24,40,0.18)`) |
| **Breakpoints** | `--bp-mobile` to `--bp-desktop-max` | `--bp-mobile: 480px`, `--bp-tablet: 768px`, `--bp-tablet-wide: 992px`, `--bp-desktop: 1200px`, `--bp-desktop-max: 1440px` |
| **Transitions** | `--motion-button` to `--motion-bg-transition` | `--motion-button: 180ms`, `--motion-card: 250ms`, `--motion-dropdown: 210ms`, `--motion-scroll-reveal: 500ms`, `--motion-hero: 700ms` |
| **Typography** | `--font-primary`, `--font-display` | Primary: `'Inter', sans-serif`; Display: `'Space Grotesk', sans-serif` |
| **Type Scales** | `--type-hero` to `--type-eyebrow` | Fluid clamp scales for heading titles down to 12px uppercase eyebrows |
| **Containers** | `--container-max`, `--container-pad-*` | Max-width 1320px/1440px with responsive horizontal gutting (`16px` mobile, `24px` tablet, `40px` desktop) |

*Rule: Do NOT invent ad-hoc hex codes or arbitrary spacings in component stylesheets. Always bind to established tokens.*

---

## 5. Pages Built

### Homepage (`index.html`)
1. **Landing Overlay (`#landing-overlay`)**: First-time visitor welcome modal with grid backdrop, tagline, and interactive explore trigger. Features auto-skip via `sessionStorage` and `prefers-reduced-motion` compliance.
2. **Top Announcement Bar (`#announcement-bar`)**: Dismissible top banner highlighting active showroom deals, mapped to `promotions` table with close button and inline PHP placeholder.
3. **Utility Bar (`.utility-bar`)**: Floating brand-blue pill strip showing address, tap-to-call link, and operating hours.
4. **Main Header (`#main-header`)**: Sticky brand header with logo, pill-shaped live search input, WhatsApp shortcut, and contact button.
5. **Category Navigation (`.category-nav`)**: Rounded pill navigation bar with 12 hardware departments and desktop mega-menu dropdown.
6. **Hero Section (`#hero`)**: High-impact showroom presentation featuring 4.8 customer rating pill, primary heading, trust badges row, dual CTAs (Explore & WhatsApp), and encased showroom preview video.
7. **Trust Strip (`#trust-strip`)**: 6 core service guarantees running in an infinite right-to-left marquee loop.
8. **Brand Strip (`#brands-strip`)**: 11 authorized hardware manufacturer marks running in a left-to-right marquee loop.
9. **Shop by Category (`#shop-by-category`)**: 12 responsive department cards with custom vector imagery, wrapped in PHP `foreach($categories as $category)` loop comments.
10. **Featured Campaign (`#featured-campaign`)**: Highlighted seasonal upgrade banner with staggered scroll reveal.
11. **New Arrivals Auto-Slider (`#new-arrivals`)**: 2-column layout (40% text, 60% image) showcasing new inventory with 2500ms auto-rotation, navigation dots, and arrow controls.
12. **Popular Products (`#popular-products`)**: Tabbed hardware catalog (Laptops, Desktops, Gaming, Components) with active HP, Lenovo, Dell, and ASUS laptop cards wrapped in PHP `foreach($products as $product)` comments.
13. **Section 9 Marker**: Comment placeholder noting removal of Gaming Zone (`#gaming-zone`) for future re-use.
14. **Section 10 Marker**: Comment placeholder noting removal of Computer Components (`#components`) for future re-use.
15. **Custom PC Building (`#custom-pc`)**: Two-column workstation and rig consultation block with use-case list.
16. **Section 12 Marker**: Comment placeholder noting removal of Business Computing (`#business`) for future re-use.
17. **Section 13 Marker**: Comment placeholder noting relocation of Repair Services to `aboutus.html`.
18. **Section 14 Marker**: Comment placeholder noting clean removal of Featured Brands for future reinstatement.
19. **Why Choose Us (`#why-choose-us`)**: 6 value proposition blocks emphasizing expertise, transparency, and local support.
20. **Section 16 Marker**: Comment placeholder noting relocation of Buying Guides to `aboutus.html`.
21. **Final Contact CTA (`#contact`)**: Showroom directions, interactive Google Maps embed, and multi-field enquiry form (`#mainContactForm`) with locked field names, hidden `form_source`, and dual-action simulated async submit + WhatsApp redirect.
22. **Footer (`#footer`)**: 5-column navigation footer with brand synopsis, direct links, and copyright timestamp.
23. **Session-Based Promo Popup (`#promo-popup-overlay`)**: First-time session modal card triggered after 1500ms delay with special offer poster and dismiss action.
24. **Mobile Sticky Bottom Bar (`#mobile-sticky-bar`)**: Fixed bottom navigation bar (<768px) with quick-action triggers for Call, WhatsApp, and Google Maps Directions.

### About Us Page (`aboutus.html`)
1. **Chrome Parity**: Shares identical Utility Bar, Header, Category Bar, Mobile Drawer, and Footer structures with the homepage.
2. **About Hero (`#about-hero`)**: Dedicated introduction highlighting Microsys as Bihar Sharif’s tech anchor at Ramchandarpur Bus Stand.
3. **About Narrative (`#about-description`)**: 5 structured copy paragraphs detailing company legacy, accessibility mission, and customer-first values.
4. **Repair Services (`#repair-services`)**: 9 comprehensive technical service cards moved from homepage Section 13.
5. **Section 16 Marker**: Comment placeholder noting removal of Buying Guides for future re-use.
6. **Structured Data**: Implements Google-compliant `ComputerStore` and `AboutPage` Schema.org JSON-LD graphs.

### Dedicated Category Pages (Hybrid Architecture)
1. **Laptops Page (`laptops.html`)**: Dedicated catalog page featuring category hero, 6 placeholder laptop cards (`<!-- DATA-BIND: products.laptops -->`), bottom enquiry CTA, and complete header/footer parity.
2. **Desktop PCs Page (`desktop-pcs.html`)**: Dedicated catalog page featuring category hero, 6 placeholder desktop cards (`<!-- DATA-BIND: products.desktops -->`), bottom enquiry CTA, and complete header/footer parity.
3. **Components Page (`components.html`)**: Modular multi-section hardware page featuring category hero, 8 dedicated sub-sections (`#processors`, `#motherboards`, `#graphics-cards`, `#ram`, `#storage`, `#power-supplies`, `#cabinets`, `#cooling`), 16 placeholder component cards (2 per sub-section, `<!-- DATA-BIND: products.components.<slug> -->`), bottom consultation CTA, and complete header/footer parity.
4. **Gaming Page (`gaming.html`)**: Dedicated catalog page featuring category hero, 6 placeholder gaming system cards (`<!-- DATA-BIND: products.gaming -->`), bottom consultation CTA, and complete header/footer parity.

---

## 6. Component Inventory

| Component Name | File Location | Key Selector / Wrapper | Interactivity / Capabilities |
| :--- | :--- | :--- | :--- |
| **Landing Overlay** | `index.html` | `.landing-overlay` | Zoom/fade animation on click, wheel/touch dismissal, escape key dismiss, session persistence |
| **Floating Utility Bar** | `index.html`, `aboutus.html` | `.utility-bar` | Floating rounded layout, tap-to-call link, inline SVG icons |
| **Main Sticky Header** | `index.html`, `aboutus.html` | `.main-header` | Shrinks on scroll (`.is-compact`), mobile drawer trigger, desktop search bar |
| **Category Pill Nav** | `index.html`, `aboutus.html` | `.category-nav` | Floating inset pill, hover/focus states, overflow visible for mega menu |
| **Desktop Mega Menu** | `index.html`, `aboutus.html` | `.mega-menu-wrapper` | 3-column dropdown, hover activation, click toggle, escape key dismiss, focus return |
| **Mobile Drawer** | `index.html`, `aboutus.html` | `.drawer` | Off-canvas slide-in, background dimming overlay, accordion details, mobile search |
| **Live Search Input** | `index.html`, `aboutus.html` | `.search-wrapper` | Pill styling, input event listener, dynamic suggestion box, keyboard escape |
| **Hero Rating Pill** | `index.html` | `.hero-rating-badge` | Amber-tinted background, SVG star icon, verified customer social proof |
| **Hero Trust Row** | `index.html` | `.hero-trust-badges` | 3 circular badge indicators (EMI Available, Authorized Dealer, Since 2015) |
| **Dual Hero CTAs** | `index.html` | `.hero-ctas` | Primary blue pill with arrow; secondary WhatsApp green pill with WhatsApp SVG |
| **Hero Video Card** | `index.html` | `.hero-video-card` | White elevated card wrapper, high border-radius, soft shadow, auto-muted video loop |
| **Dual Marquee Strips** | `index.html` | `.trust-strip`, `.brands-strip` | Infinite keyframe CSS translation, dual sets for seamless continuous loop |
| **Catalog Tabs** | `index.html` | `.products-tabs` | ARIA tablist/tabpanel implementation with arrow key keyboard navigation |
| **Enquiry Form** | `index.html` | `#mainContactForm` | Dual-action submit handler (simulated DB async delay + prefilled WhatsApp redirect with URL encoding), hidden form_source, locked field names |
| **Category Hero** | `laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html` | `.category-hero` | High-impact category introduction with uppercase eyebrow, primary heading, and descriptive subtitle |
| **Category Product Grid** | `laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html` | `.products-grid` | 4-column responsive grid container housing data-bind product cards |
| **Category Sub-Sections** | `components.html` | `section[id]` | 8 dedicated hardware anchors (`#processors` to `#cooling`) with section titles, copy, and 2-card grids |
| **Category Consultation CTA** | `laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html` | `.category-cta-section` | Full-width bottom consultation strip with dual WhatsApp prefill and showroom contact triggers |
| **Master Product Card Template** | `COMPONENT-product-card.html` | `.product-card` | Canonical 17-field reference snippet with standardized data attributes, decoupled badge/availability, and PHP comments |
| **Master Form Field Map** | `FORM-FIELD-MAP.md` | `FORM-FIELD-MAP.md` | Single source of truth mapping all public and admin form fields to MySQL columns |
| **Mobile Sticky Bar** | `index.html` (global mobile views) | `#mobile-sticky-bar` | Fixed mobile-only bottom contact bar with Call, WhatsApp, and Directions quick triggers, safe-area padding |
| **Announcement Bar** | `index.html` | `#announcement-bar` | Top dismissal promotional strip mapped to `promotions` table with close button |
| **Promo Popup Modal** | `index.html` | `#promo-popup-overlay` | Centered modal card triggered on 1500ms delay via `sessionStorage` (`microsys_promo_shown`) |
| **New Arrivals Slider** | `index.html` | `#new-arrivals` | 2-column auto-slider (40% text, 60% image) with 2500ms interval, dot navigation, and arrow triggers |
| **Category Showcase Loops** | `index.html` | `#shop-by-category` | PHP foreach comment markers (`$categories as $category`) wrapping 12 category showcase cards |
| **Popular Products Loops** | `index.html` | `#popular-products` | PHP foreach comment markers (`$products as $product`) wrapping initial 4-card laptops tab panel |

---

## 7. JavaScript Behavior

1. **Header Compaction**: Attaches to window scroll; toggles `.is-compact` when vertical scroll offset exceeds 40px.
2. **Mobile Drawer System**: Handles open/close state toggles, locks `body` scroll overflow, manages backdrop click dismiss, and returns focus to toggle button on close.
3. **Mega Menu Desktop Controller**: Manages hover and click events on the Components nav item, closes on click-outside or Escape key, and restores focus.
4. **Search Autocomplete**: Filters predefined hardware keyword array on input, populates floating suggestion items, and handles blur/escape events.
5. **Accessible Tabs**: Listens for click and arrow key navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`) across tab buttons, swapping `aria-selected` and toggling panel `hidden` states with animation staggering.
6. **WhatsApp Message Prefill**: Scrapes product card names from data attributes and formats localized customer pre-fill URLs.
7. **Hero Video Guard**: Ensures muted inline playback across mobile browsers and swaps to mobile poster when screen width is under 768px.
8. **Scroll Reveal Engine**: Employs `IntersectionObserver` with a 50ms stagger on elements within `.reveal-group` containers across sections 7, 8, and 11. Bypassed under `prefers-reduced-motion`.
9. **Landing Intro Controller**: Enforces one-time modal display using `sessionStorage`, provides smooth zoom-out/fade dismiss on button click, wheel roll, or touch drag.
10. **Hybrid Navigation & Anchor Routing**: Maps 4 primary computing categories (`laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html`) to dedicated standalone catalog pages; routes 5 secondary retail categories (`Monitors`, `Peripherals`, `Printers`, `Networking`, `Accessories`) via in-page smooth scrolling to `#shop-by-category`; routes `Services` to `aboutus.html#repair-services`, `Offers` to `#featured-campaign`, and `Contact` to `#final-cta`; maps Components mega menu and mobile sub-links to hardware sub-sections (`#processors`, `#motherboards`, `#graphics-cards`, `#ram`, `#storage`, `#power-supplies`, `#cabinets`, `#cooling`).
11. **Announcement Bar Dismissal**: Handles close click on `#close-announcement`, adding `.hidden` class to dismiss top promo bar.
12. **Promo Popup Session Manager**: Checks `sessionStorage` for `microsys_promo_shown`; triggers modal reveal after 1500ms delay on first session visit; handles close click on `#close-promo-popup`.
13. **New Arrivals Auto-Rotation Slider**: Calculates slide indices, builds dynamic indicator dots (`.slider-dot`), translates track every 2500ms via `setInterval`, and binds manual previous/next arrows and dot navigation.
14. **Dual-Action Form Controller**: Intercepts `#mainContactForm` submit event, validates inputs, simulates database submission delay, constructs branded URL-encoded WhatsApp enquiry string, launches WhatsApp in a new tab, displays success state, and resets the form.

---

## 8. Business Data (Locked Values)

*These values represent verified physical showroom facts and must never be altered without explicit client instruction:*

- **Official Entity Name**: Microsys Computer & Accessories
- **Physical Address**: Ramchandrapur, Bihar Sharif, Bihar 803216
- **Telephone Number**: `+919431687928` / `9431687928`
- **WhatsApp Channel**: `+919431687928` (`https://wa.me/919431687928`)
- **Showroom Schedule**: 10:00 AM – 9:00 PM (Monday through Sunday)
- **Primary Brand Tagline**: "Biharsharif’s Most Complete Computer Store — Laptops, PCs, Gaming & More."
- **Regional Motto**: "Microsys — Bihar ka apna computer showroom."

---

## 9. Locked Content Strings

*The following content strings have been approved by client leadership and are locked against unauthorized rewrites:*

- **Homepage Hero Eyebrow**: `YOUR COMPLETE TECH DESTINATION`
- **Homepage Hero Heading**: `Biharsharif's Biggest PC Showroom`
- **Homepage Hero Subheading**: `Microsys is Biharsharif’s leading computer showroom, offering the widest range of laptops, desktop PCs, gaming computers, printers, tablets, and PC components in Nalanda, Bihar.`
- **Hero Primary Action**: `Explore Laptops - 30+ Models`
- **Hero Secondary Action**: `Ask Price on WhatsApp`
- **Hero Social Proof Badge**: `4.8 Rated | 5000+ Customers in Nalanda`
- **Trust Strip Headlines**: `Genuine Products`, `Warranty Information`, `Expert Guidance`, `Technical Support`, `Affordable Prices`, `After-Sales Support`
- **About Page Eyebrow**: `ABOUT MICROsys`
- **About Page Heading**: `Bihar Sharif’s Most Trusted Computer Showroom`
- **About Page Subtitle**: `Your complete destination for laptops, PCs, gaming, printers, and everything computing — right at Ramchandarpur Bus Stand.`
- **Final Contact Heading**: `Need Help Choosing the Right Computer?`
- **Final Contact Subtitle**: `Tell us what you need. Our team can help you explore suitable options.`

---

## 10. Pending Placeholders

Placeholders currently preserved across the templates:

### A. Intentional Placeholders (Awaiting Client Assets / Inventory Data)
- **Top Announcement Bar (`#announcement-bar`)**: Active promotional deal copy text mapped to `promotions` table where `type='announcement_bar'`.
- **Promo Popup Modal (`#promo-popup-overlay`)**: Campaign poster image URL and offer copy text mapped to `promotions` table where `type='popup_modal'`.
- **New Arrivals Auto-Slider (`#new-arrivals`)**: Slide items (label, eyebrow, title, subtext, image, CTA link) mapped to `sliders` table.
- **Popular Products Catalog**: Product images, brand names, titles, specs, and prices for Desktop PCs, Gaming, and Components tab cards on homepage (16 cards).
- **Dedicated Category Product Cards**: Product data and images for 6 Laptops (`laptops.html`), 6 Desktop PCs (`desktop-pcs.html`), 6 Gaming Systems (`gaming.html`), and 16 Component cards across 8 sub-sections (`components.html`). Total initial product slots = 54 (20 homepage + 34 category pages).
- **Product Card Template Migration**: Canonical master template established in `COMPONENT-product-card.html`; migration of all 50 product cards across 5 pages to this unified structure is pending execution in Phase 0 Step 4.
- **Custom PC Visual (`#custom-pc`)**: Visual graphic placeholder and subtitle/intro paragraph copy.
- **Why Choose Us (`#why-choose-us`)**: Subtitle text and 6 benefit description paragraphs.
- **Repair Services (`aboutus.html`)**: Subtitle text, 9 service description paragraphs, and starting price figures.

### B. Functional & Configuration Placeholders (Awaiting Technical Setup)
- **Contact Form Backend**: Form `action="#"` awaiting production API or mailer endpoint (expected POST endpoint placeholder: `contact-submit.php` [PHP TO CONFIRM]; dual-action WhatsApp fallback active).
- **Form Field Name Migration**: Master mapping specification established in `FORM-FIELD-MAP.md`; migration of live form controls (`name=""` attributes on contact form and search form wrappers) across all 6 pages is pending execution in Phase 0 Step 5.
- **Social & Legal Footers**: Footer social media channels and policy page links currently set to `#`.
- **Structured Data URLs**: `image`, `priceRange`, and `sameAs` array values in `aboutus.html` JSON-LD graphs.
- **Open Graph / Twitter Cards**: `og:image` and `twitter:image` tags in `aboutus.html` awaiting finalized social banner share image.

---

## 11. MySQL Compatibility & Admin Integration

To support future admin panel integration without requiring architecture rewrites, the dedicated category pages and homepage product grids adhere to a strict data-binding contract:

### A. Data-Bind Contract & Mapping
- Product cards on category pages are wrapped in standardized data markers:
  - `<!-- DATA-BIND: products.laptops -->`
  - `<!-- DATA-BIND: products.desktops -->`
  - `<!-- DATA-BIND: products.gaming -->`
  - `<!-- DATA-BIND: products.components.<slug> -->` (e.g. `processors`, `motherboards`, `graphics-cards`, `ram`, `storage`, `power-supplies`, `cabinets`, `cooling`)
- Each individual card placeholder is delimited by `<!-- PLACEHOLDER: product card — <category> -->`.
- Each placeholder card maps 1:1 to a future MySQL database row.
- Product card markup and class structures (`.product-card`, `.product-image-wrapper`, `.product-badge`, `.product-brand`, `.product-name`, `.product-specs`, `.product-price`, `.product-avail`, `.product-actions`) match homepage cards verbatim, ensuring identical rendering whether static or dynamically hydrated.

### B. Database Schema Reference
The database schema adheres to the locked 17-field MySQL product standard defined in `FIELD-NAMING-CONVENTION.md` Section 3. Formal MySQL table creation scripts and migration documentation will be produced during Phase 1.

### C. Querying & Admin Operations
- Category page views map directly to simple filtered queries:
  - Laptops: `SELECT * FROM products WHERE category = 'laptops' ORDER BY created_at DESC;`
  - Desktops: `SELECT * FROM products WHERE category = 'desktops' ORDER BY created_at DESC;`
  - Gaming: `SELECT * FROM products WHERE category = 'gaming' ORDER BY created_at DESC;`
  - Components (by sub-section): `SELECT * FROM products WHERE category = 'components' AND sub_category = 'processors';`
- Initial Product Volume: **54 product slots** across the project (20 homepage + 6 laptops + 6 desktop PCs + 6 gaming + 16 components). Showroom owner expands inventory directly via the admin panel.
- **Architectural Scope**: This section establishes the structural data contract. No runtime backend SDKs, credentials, or API client scripts were added in this static milestone.

---

## 12. Assets Inventory

| Directory / File | Contents & Specifications | Status |
| :--- | :--- | :--- |
| `assets/microsys-logo.svg` | Main vector logo with high-contrast text mark | Active |
| `assets/brands/` | 11 brand logos: AMD, ASUS, Canon, Dell, Epson, HP, Intel, Lenovo, MSI, NVIDIA, TP-Link (PNG) | Active |
| `assets/campaign/` | Upgrade promotion visual assets (`poster.webp`, `poster.png`) | Active |
| `assets/categoryimage/` | 12 department illustrations in WebP format + 1 high-res PNG graphic card asset | Active |
| `assets/hero/` | Showroom looping videos (`hero-desktop.mp4`, `hero-mobile.mp4`) + WebP/PNG poster frames | Active |
| `assets/productimage/` | 4 high-res laptop WebP cutouts (HP 15s, IdeaPad Slim 3, Inspiron 3520, TUF Gaming A15) | Active |
| `assets/README.md` | Standard asset documentation guide | Active |

---

## 13. Known Issues / Open Questions

1. **Parity Gap on About Us Navigation**: The floating rounded utility bar and pill category nav redesign applied to `index.html` has not yet been mirrored onto `aboutus.html`.
2. **Form Submission Pipeline**: The homepage contact form currently simulates submission via client-side JavaScript without backend persistence.
3. **Customer Metric Verification**: The social proof claim ("5000+ Customers in Nalanda") is a client-specified marketing figure that should be documented in formal client sign-offs.

---

## 14. Change Log

*This change log must be updated on every future prompt that modifies the project.*

| Date / Session | Change Summary | Sections / Files Affected | Prompt Context |
| :--- | :--- | :--- | :--- |
| **Session 1** | Initial landing page architecture and responsive layout setup | `index.html`, `styles/home.css` | Initial scaffolding |
| **Session 2** | Section 14 (Featured Brands) cleanly removed with marker left | `index.html`, `styles/home.css` | Brand strip consolidation |
| **Session 3** | Standalone `aboutus.html` created; Section 13 (Repair Services) and Section 16 (Buying Guides) migrated | `aboutus.html`, `index.html`, `styles/home.css` | Information architecture lean down |
| **Session 4** | Complete narrative, SEO meta tags, and JSON-LD schema added to About page | `aboutus.html` | About Us content fulfillment |
| **Session 5** | Container width (1040px) and eyebrow scale refinement on About page | `aboutus.html`, `styles/home.css` | About page typography fix |
| **Session 6** | Homepage header, utility strip, hero CTAs, video card, rating badge, trust row, and mega-menu fix | `index.html`, `styles/home.css` | Reference design alignment |
| **Session 7** | Created `PROJECT-REPORT.md` and `AUDIT.md`; instituted mandatory locked update rule | `PROJECT-REPORT.md`, `AUDIT.md` | Documentation and audit freeze |
| **Session 8** | Removed Section 9 (Gaming Zone), Section 10 (Computer Components), Section 12 (Business Computing) from homepage, and Buying Guides from About page; comment markers preserved | `index.html`, `aboutus.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Homepage and About page scope alignment |
| **Session 9** | Converted website to hybrid architecture with 4 dedicated category pages, scroll-based nav for remaining 8 departments, 8 sub-sections on Components, and Supabase data contract documentation | `index.html`, `aboutus.html`, `laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Hybrid IA & Category Expansion |
| **Session 10** | Created master product card template (`COMPONENT-product-card.html`); standardized 17 fields, data attributes, decoupled availability/badge, and documented PHP variable loop mapping | `COMPONENT-product-card.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Phase 0 Step 3 |
| **Session 11** | Created master form field mapping specification (`FORM-FIELD-MAP.md`); locked public storefront and planned admin form field names, target MySQL tables/columns, validation notes, and migration checklist | `FORM-FIELD-MAP.md`, `PROJECT-REPORT.md`, `AUDIT.md` | Phase 0 Step 4 |
| **Session 12** | Added PHP Handover Notes section + Dynamic-Ready Status section. Phase 0 complete | `PROJECT-REPORT.md`, `AUDIT.md` | Phase 0 Step 5 |
| **Session 13** | Supabase plan dropped. All Supabase references removed from markdown docs. PHP + MySQL is the confirmed backend direction | `PROJECT-REPORT.md`, `AUDIT.md` | Supabase Cleanup |
| 2026-10-15 | Phase 1 Complete | schema.sql generated — 8 tables: categories, products (14 fields), blogs, comments, promotions, sliders, inquiries, services. PHP + MySQL confirmed. | Phase 1 Closure |
| 2026-10-15 | Micro Step 2.1 — Announcement Bar | `index.html`, `styles/home.css` | Top announcement strip with close trigger |
| 2026-10-15 | Micro Step 2.2 — Promo Popup | `index.html`, `styles/home.css` | Session-based promo popup modal (`microsys_promo_shown`) |
| 2026-10-15 | Micro Step 2.3 — New Arrivals Slider | `index.html`, `styles/home.css` | 2-column auto-rotation slider with controls |
| 2026-10-15 | Micro Step 2.4 — Mobile Sticky Bar | `index.html`, `styles/home.css` | Mobile-only fixed contact bar (Call/WhatsApp/Directions) |
| 2026-10-15 | Micro Step 2.5 — Dual-Action + foreach | `index.html` | Dual-action contact form handler + PHP foreach loop comments |
| 2026-10-15 | Phase 2 Complete Review | `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md` | Full Phase 2 feature audit, documentation sync & PHP Dev Guide added |


---

## 15. PHP Handover Notes

This section serves as the primary technical entry point and onboarding manual for the client's PHP backend developer, outlining the boundary between frontend deliverables and backend responsibilities, linking to locked specifications, and defining the step-by-step integration workflow.

### 15.1 Deliverable Scope — Frontend Only

- Delivered Frontend Assets:
  - 6 semantic, responsive HTML5 pages (`index.html`, `aboutus.html`, `laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html`).
  - Modular CSS design system (`styles/design-system.css` token library and `styles/home.css` component styles).
  - Vanilla ES6+ client interactions (sticky header compaction, mobile navigation drawer, live search suggestions, accessible tab panels, hero video guard, and intro overlay controller).
  - Specification and reference documentation (`FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md`, `COMPONENT-product-card.html`, `AUDIT-FIELDS.md`, `AUDIT.md`, `PROJECT-REPORT.md`).
  - Static media asset repository (`assets/` housing brand logos, category graphics, hero videos, and laptop cutouts).
- Client PHP Developer Build Scope:
  - Backend application architecture, routing controllers, and endpoint handling.
  - MySQL database provisioning, table creation, indexes, and PDO/MySQLi connection management.
  - Administrator and user authentication, session security, and access control.
  - File upload processing, image validation, directory storage, and thumbnail generation.
  - Dynamic page hydration, SQL query construction, template loop binding, and search query execution.
  - Form submission processing, input sanitization, and customer inquiry notifications.

No PHP code, no MySQL setup, and no server configuration is included in this frontend deliverable.

### 15.2 Field Naming Convention Reference

The platform product data model is permanently standardized in `FIELD-NAMING-CONVENTION.md`. This specification locks every field name in snake_case, maps each to its exact MySQL column type and constraint, establishes HTML input types, standardizes display CSS selectors, and fixes associative array variable keys for dynamic rendering.

The locked 17 product fields are:
1. `product_id_sku`, 2. `category`, 3. `sub_category`, 4. `brand`, 5. `product_name`, 6. `model_number`, 7. `key_specs`, 8. `full_specs`, 9. `price`, 10. `mrp`, 11. `availability`, 12. `image_primary`, 13. `image_secondary`, 14. `image_tertiary`, 15. `warranty`, 16. `badge`, 17. `is_popular`.

Refer to `FIELD-NAMING-CONVENTION.md` for complete data types, column constraints, default values, and template variable bindings. This document is permanently locked and supersedes all prior naming.

### 15.3 SQL Schema Reference

The formal SQL database creation script and migration file will be produced in Phase 1. Until then, `FIELD-NAMING-CONVENTION.md` Section 3 contains the complete SQL column types, constraints, index requirements, and allowed values.

All column names, storage types, ENUM values (e.g., availability values 'in_stock', 'out_of_stock', 'on_order'), and default values are already decided and locked. Cross-reference `FIELD-NAMING-CONVENTION.md` when designing tables.

### 15.4 Dynamic Placeholder Convention

Frontend markup across all catalog pages utilizes standardized comment tags and data attributes to denote dynamic insertion boundaries and backend query targets.

Marker types in use:
- `DATA-BIND:` Marks dynamic loop targets (e.g., category catalog collections and hardware sub-sections).
- `PLACEHOLDER:` Identifies mock cards, images, or copy blocks that will be replaced by dynamic database loops.
- `FORM-ENDPOINT:` Highlights form actions awaiting backend submission routes.
- `PROMO-VALUE:` Marks banner text and campaign values governed by administrative tables.

The master card reference snippet is established in `COMPONENT-product-card.html`. Cross-reference `COMPONENT-product-card.html` for canonical markup and `AUDIT-FIELDS.md` for the comprehensive inventory of all placeholders across all six pages.

### 15.5 Integration Checklist for Client's PHP Developer

1. Read `FIELD-NAMING-CONVENTION.md` end to end.
2. Read `FORM-FIELD-MAP.md` for form field mappings.
3. Read `COMPONENT-product-card.html` for the canonical product card structure.
4. Create the MySQL database using the column names and types from `FIELD-NAMING-CONVENTION.md` Section 3.
5. Create the tables for `products`, `categories`, `subcategories`, `blogs`, `comments`, `promotions`, `sliders`, `inquiries`, and `services`.
6. Replace the placeholder markup in each HTML page with dynamic PHP loops.
7. Add `name=""` attributes to all form inputs as specified in `FORM-FIELD-MAP.md`.
8. Point form actions to the appropriate PHP endpoints.
9. Test each page against the client's database.
10. Do not rename any field, class, or attribute.

Any deviation from the locked naming conventions will break frontend-backend parity.

---

## 16. Locked Update Rule

> ### Locked Rule — Update on Every Change
> 
> Every future prompt that changes, updates, adds to, removes from, or otherwise develops the project MUST update `PROJECT-REPORT.md` as part of the same task. The update must:
> 
> 1. Add a new row to the Change Log with the change, affected section, and prompt reference.
> 2. Update the Pending Placeholders section if any placeholder was filled or added.
> 3. Update the Component Inventory if a new component was introduced.
> 4. Update the Assets Inventory if new assets were added.
> 5. Update Known Issues if a bug was found or fixed.
> 
> The same prompt must also update `AUDIT.md` if the change affects the audit status of any item.
> 
> This rule is locked and applies to every future agent working on this project.

---

## 17. How to Use This Document

- **For New Agents**: Read `PROJECT-REPORT.md` and `AUDIT.md` completely before opening code files. It provides 100% of the project context, eliminating the need to read the entire repository.
- **Design Tokens**: Treat `styles/design-system.css` as strictly read-only. Never invent new tokens or arbitrary styles.
- **Surgical Edits**: Touch only the specific files and section IDs targeted in your prompt.
- **Placeholder Integrity**: When filling placeholders, replace only the specific targeted placeholder markers while preserving comment guides and surrounding layout code.
