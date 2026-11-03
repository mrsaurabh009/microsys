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

> **System Architecture**: This project consists of TWO distinct parts: 1. The Public Storefront (Customer-facing) and 2. The Admin Panel (Content Management). Both share the same design tokens but have different layouts.

---

## 2. Tech Stack

- **Markup**: Pure HTML5 utilizing semantic page outlines, accessible ARIA attributes, Open Graph meta tags, Twitter Card tags, and Schema.org JSON-LD structured data.
- **Styling**: Vanilla CSS3 split into modular stylesheets:
  - `styles/design-system.css`: Centralized design token repository (colors, spacing, typography, radii, shadows, motion, breakpoints) shared across both Public Storefront and Admin Panel.
  - `styles/home.css`: Component architecture, layout rules, keyframe animations, and responsive media queries for the Storefront.
  - `admin/styles.css`: Component architecture, responsive sidebar/topbar layout, data tables, and forms for the Admin Panel.
- **Logic**: Vanilla ES6+ JavaScript embedded directly within document script tags. Zero external runtime dependencies, bundlers, or CDNs.
- **Architecture**: Static Web Application — zero compilation step, zero npm run commands, zero transpilation. This project consists of TWO distinct parts: 1. The Public Storefront (Customer-facing) and 2. The Admin Panel (Content Management). Both share the same design tokens but have different layouts.
- **Media Formats**: WebP (compressed photography), SVG (crisp iconography & vector logos), PNG (brand marks), MP4 (H.264 video streams).

---

## 3. File Structure

This project consists of TWO distinct parts: 1. The Public Storefront (Customer-facing) and 2. The Admin Panel (Content Management). Both share the same design tokens but have different layouts.

### 3.1 Public Storefront (Customer-facing)
```text
microsys/
├── index.html                    # Main homepage (Header, Hero, Categories, Showcase, Contact, FAQ, Footer)
├── products.html                 # Products Catalog Page (Filter Sidebar, Search/Sort Top Bar, Master Grid, Pagination)
├── product-detail.html           # Dedicated Product Detail page (Gallery, Specs Table, Sticky Bar, Related Products)
├── blog.html                     # Blog listing page with Microsys header/footer and dynamic post grid
├── blog-detail.html              # Dedicated Blog article detail page with Microsys header/footer and Markdown reader
├── aboutus.html                  # Standalone About Us page (Company overview, Repair Services)
├── COMPONENT-product-card.html   # Master product card reference template (Phase 0 Step 3)
├── robots.txt                    # Search crawler directives (Blocks /admin/, points to sitemap)
├── sitemap.xml                   # XML Sitemap for search engines
├── assets/                       # Static media asset repository
│   ├── README.md                 # Asset directory guidelines
│   ├── microsys-logo.svg         # Primary brand identity vector logo
│   ├── brands/                   # Brand manufacturer logos for looping ticker (11 PNG files)
│   ├── campaign/                 # Promotional campaign banners (poster.webp, poster.png)
│   ├── categoryimage/            # Hardware category showcase illustrations (12 WebP, 1 PNG)
│   ├── hero/                     # Hero background video assets and fallback posters (MP4, WebP, PNG)
│   └── productimage/             # Laptop catalog photography (4 WebP files)
├── blogs/                        # Blog assets and data (Phase 5)
│   ├── posts.json                # JSON schema and seed posts catalog
│   ├── post-script.js            # Article rendering & related posts logic
│   ├── script.js                 # Blog listing & filter logic
│   └── style.css                 # Dedicated blog module styles
└── styles/                       # Stylesheet directory
    ├── design-system.css         # Central design token variables (Shared across Storefront & Admin)
    └── home.css                  # UI component library and responsive layout styles
```

### 3.2 Admin Panel (Content Management Sub-Application)
```text
microsys/admin/                   # Dedicated Admin Panel (Phase 6)
├── index.html                    # Admin Dashboard (KPI Metrics, Quick Actions, Inquiries)
├── login.html                    # Admin Login Form (Authentication Entry Point)
├── manage-banners.html           # Promotions Management (Announcement Bar & Popup Modal Forms)
├── manage-blogs.html             # Blog Management (Articles Table + Add/Edit Form)
├── manage-categories.html        # Category Management (Taxonomy Table + Add/Edit Form)
├── manage-comments.html          # Comment Moderation (Queue Table + Inline POST Approval Actions)
├── manage-inquiries.html         # Inquiries Management (Customer Leads Read-Only Table)
├── manage-products.html          # Product Management (Inventory Table + 17-field Form)
├── manage-services.html          # Technical Services Management (Service Table + Add/Edit Form)
├── manage-sliders.html           # Sliders Management (Carousel Table + Add/Edit Form)
├── script.js                     # Admin Client Interactions (Mobile Sidebar & Form Toggles)
└── styles.css                    # Dedicated Admin Layout, Toggle Switches, & Component Stylesheet
```

### 3.3 Backend Specifications & Development Contracts
```text
microsys/
├── database/                     # MySQL database schema definition (Phase 1 & Phase 6)
│   └── schema.sql                # Master DDL with 8 tables (categories, products, blogs, comments, promotions, sliders, inquiries, services)
├── PHP-DEV-GUIDE.md              # Consolidated onboarding manual for PHP backend developer (Phase 5 & 6)
├── FIELD-NAMING-CONVENTION.md    # Locked 17-field naming convention and PHP mapping standard
├── FORM-FIELD-MAP.md             # Master form field to SQL column mapping reference
├── AUDIT.md                      # Comprehensive codebase audit, placeholder log, and gap analysis
├── AUDIT-FIELDS.md               # 17-field product standard frontend audit report
└── PROJECT-REPORT.md             # Master project documentation and single source of truth
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
5. **Global Navigation (`.category-nav`)**: Streamlined rounded pill navigation bar with 7 primary links (`Home`, `Catalog`, `About Us`, `Services`, `Offers`, `Blogs`, `Contact`). The desktop mega-menu dropdown has been removed, unifying category discovery onto the consolidated Catalog page (`products.html`).
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

### Products Catalog Page (`products.html`)
1. **Products Catalog Page (`products.html`)**: Fully built consolidated catalog page complete with:
   - **Filter Sidebar**: Accessible GET filter form (`#catalog-filter-form`) featuring 12 Category checkboxes (`category[]`), 8 Brand checkboxes (`brand[]`), and numeric Price Range inputs (`min_price`, `max_price`) with sticky desktop styling and mobile collapsible accordion (`<details>/<summary>`). Includes PHP developer comments for GET parameter extraction.
   - **Search & Sort Top Bar**: Functional GET search form (`#catalog-topbar-form`) with keyword search input (`q`), sort dropdown (`sort`: default, price_asc, price_desc, newest), and dynamic product count placeholder (`Showing 1–12 of 54 products`) with PHP developer comments.
   - **Master Product Grid**: Responsive 4-3-2-1 column CSS grid (`.products-grid`) populated with 4 canonical master cards adhering to `COMPONENT-product-card.html` standards, wrapped in PHP loop comments (`$filtered_products`).
   - **Pagination**: Accessible pagination navigation (`.pagination`, `aria-label="Product pagination"`) with Previous, numbered pages (1 active, 2, 3), and Next links.
   - **Header & Footer Parity**: Global floating utility bar, sticky header, streamlined 7-link category pill navigation, off-canvas mobile drawer, and 5-column footer matching the homepage.

### Product Detail Page (`product-detail.html`)
1. **Product Detail Page (`product-detail.html`) — Phase 4 Complete**: Dedicated single-product showcase page featuring:
   - **Header & Footer Parity**: Global floating utility bar, sticky header, streamlined 7-link category pill navigation, off-canvas mobile drawer, and 5-column footer matching the homepage.
   - **Breadcrumb Navigation**: Semantic breadcrumb structure (`Home / Products / [Product Name]`) with standardized PHP dynamic echo marker.
   - **Two-Column Layout**: 50/50 responsive CSS grid (`.product-detail-layout`, stacks at ≤991px).
   - **Image Gallery**: Left column container (`.product-detail-gallery`) featuring 4:3 ratio main image (`.gallery-main-image`, `#main-product-image`) and 3 thumbnail buttons (`.gallery-thumbnails`, `.gallery-thumbnail`) with `data-image-src`, brand blue active highlight border, and standardized PHP markers for `image_primary`, `image_secondary`, and `image_tertiary`.
   - **Product Info Column**: Right column container (`.product-detail-info`) featuring brand, promotional badge, `<h1>` title (`#product-name`), model number, SKU, key specs summary, pricing block (selling price, strikethrough MRP, discount tag), live stock status, warranty, primary desktop/mobile CTAs (WhatsApp and Call), and standardized `<!-- PHP: echo htmlspecialchars($product['field_name']); -->` comments above all elements.
   - **Technical Specifications Section**: Full-width lower section (`.product-specs-section`) hosting a 2-column zebra-striped specifications table (`.product-specs-table`) with 9 hardware properties and PHP loop marker (`<!-- PHP: Loop through $product['full_specs'] array to generate table rows -->`).
   - **Related Products Section**: Full-width lower section (`.related-products-section`) featuring a 4-card master grid (`.products-grid`) with canonical product cards (`COMPONENT-product-card.html`), category query comment (`WHERE category = $current_category AND id != $current_id LIMIT 4`), and standardized PHP loop markers (`foreach($related_products as $product)`).
   - **Product Sticky Mobile Bar**: Fixed bottom quick-action bar (`.product-sticky-bar`) on mobile displays (<768px) with prefilled "Enquire Now" WhatsApp trigger, direct "Call Now" button, and standardized PHP URL prefill marker.
   - **SEO & Social Metadata**: Canonical tag, Open Graph product tags, and Twitter Cards.

### Blog Listing Page (`blog.html`)
1. **Header & Footer Parity**: Shares identical Utility Bar, Header, Category Bar, Mobile Drawer, and Footer structures with the storefront.
2. **Blog Hero (`.blog-hero`)**: Centered showcase with eyebrow tag (`INSIGHTS & GUIDES`), display title (`Latest from Microsys`), and descriptive subtitle.
3. **Blog Toolbar (`.blog-toolbar`)**: Live client-side search input (`#blog-search`) and category filter tabs (`#blog-categories`: All, Local Businesses, Web Development) with brand blue active highlights.
4. **3-Column Responsive Grid (`#posts-grid-container`)**: Responsive CSS grid (3 columns desktop, 2 columns tablet, 1 column mobile) populated with Blog Cards featuring 16:9 thumbnails, category pills, clamped titles, clamped excerpts, author/date metadata, and read links.
5. **Pagination UI (`#pagination-controls`)**: Centered accessible pagination controls with Previous, numbered page links, and Next buttons.
6. **Dynamic Markers**: Standardized PHP foreach loop markers (`<!-- PHP: Loop through $blogs as $blog -->`) and variable echo comments for backend hydration.

### Blog Article Detail Page (`blog-detail.html`)
1. **Header & Footer Parity**: Global floating utility bar, sticky header, streamlined 7-link category pill navigation, off-canvas mobile drawer, and 5-column footer matching the homepage.
2. **Reading Progress Bar (`#reading-progress`)**: Fixed 3px brand blue progress indicator at the top of viewport tracking article scroll depth.
3. **70:30 Article Layout (`.blog-layout-container`)**: Two-column layout on desktop (70% Article column on left, 30% Sticky Sidebar on right); seamlessly stacks to single column on mobile (<992px).
4. **Article Content Container (`#post-container`)**: Displays article headline, metadata (author, published date, category), featured banner image, and full article body. Currently powered by Markdown fetching and `marked.js` parsing; ready to receive Rich Text HTML directly from the MySQL database via `<?php echo $blog['content']; ?>`.
5. **Comments Section (`#comments`)**: Accessible discussion block featuring total comments counter, admin approval notice, 2 dummy approved comments with initials avatars, and comment submission form (`#comment-form`) with locked fields (`user_name`, `user_email`, `comment_text`, hidden `blog_id`).
6. **Sticky Sidebar (`.blog-sidebar-column`)**: Desktop sticky sidebar (top: 100px) featuring a Showroom Upgrade Consultation promotional card with CTA button and a dynamic Related Articles widget (`#sidebar-related-posts`) filtering same-category articles.
7. **Dynamic Markers**: Includes standardized PHP markers for single blog fields, approved comments foreach loop, and related posts foreach loop.

---

## 6. Component Inventory

| Component Name | File Location | Key Selector / Wrapper | Interactivity / Capabilities |
| :--- | :--- | :--- | :--- |
| **Landing Overlay** | `index.html` | `.landing-overlay` | Zoom/fade animation on click, wheel/touch dismissal, escape key dismiss, session persistence |
| **Floating Utility Bar** | `index.html`, `aboutus.html`, `products.html` | `.utility-bar` | Floating rounded layout, tap-to-call link, inline SVG icons |
| **Main Sticky Header** | `index.html`, `aboutus.html`, `products.html` | `.main-header` | Shrinks on scroll (`.is-compact`), mobile drawer trigger, desktop search bar |
| **Category Pill Nav** | `index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `blog.html`, `blog-detail.html` | `.category-nav` | Floating inset pill navigation featuring 7 clean links (`Home`, `Catalog`, `About Us`, `Services`, `Offers`, `Blogs`, `Contact`); centered layout with active route states |
| **Desktop Mega Menu (Removed)** | N/A (Purged) | `.mega-menu-wrapper` | *REMOVED*: 3-column mega menu purged across all 6 public templates to simplify navigation architecture in favor of single Catalog route (`products.html`) |
| **Mobile Drawer** | `index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `blog.html`, `blog-detail.html` | `.drawer` | Off-canvas slide-in with 7 clean links matching desktop navbar, background dimming overlay, close button, and mobile search |
| **Live Search Input** | `index.html`, `aboutus.html`, `products.html` | `.search-wrapper` | Pill styling, input event listener, dynamic suggestion box, keyboard escape |
| **Hero Rating Pill** | `index.html` | `.hero-rating-badge` | Amber-tinted background, SVG star icon, verified customer social proof |
| **Hero Trust Row** | `index.html` | `.hero-trust-badges` | 3 circular badge indicators (EMI Available, Authorized Dealer, Since 2015) |
| **Dual Hero CTAs** | `index.html` | `.hero-ctas` | Primary blue pill with arrow; secondary WhatsApp green pill with WhatsApp SVG |
| **Hero Video Card** | `index.html` | `.hero-video-card` | White elevated card wrapper, high border-radius, soft shadow, auto-muted video loop |
| **Dual Marquee Strips** | `index.html` | `.trust-strip`, `.brands-strip` | Infinite keyframe CSS translation, dual sets for seamless continuous loop |
| **Catalog Tabs** | `index.html` | `.products-tabs` | ARIA tablist/tabpanel implementation with arrow key keyboard navigation |
| **Enquiry Form** | `index.html` | `#mainContactForm` | Dual-action submit handler (simulated DB async delay + prefilled WhatsApp redirect with URL encoding), hidden form_source, locked field names |
| **Master Product Card Template** | `COMPONENT-product-card.html` | `.product-card` | Canonical 17-field reference snippet with standardized data attributes, decoupled badge/availability, and PHP comments |
| **Master Form Field Map** | `FORM-FIELD-MAP.md` | `FORM-FIELD-MAP.md` | Single source of truth mapping all public and admin form fields to MySQL columns |
| **Mobile Sticky Bar** | `index.html`, `products.html` (global mobile views) | `#mobile-sticky-bar` | Fixed mobile-only bottom contact bar with Call, WhatsApp, and Directions quick triggers, safe-area padding |
| **Announcement Bar** | `index.html` | `#announcement-bar` | Top dismissal promotional strip mapped to `promotions` table with close button |
| **Promo Popup Modal** | `index.html` | `#promo-popup-overlay` | Centered modal card triggered on 1500ms delay via `sessionStorage` (`microsys_promo_shown`) |
| **New Arrivals Slider** | `index.html` | `#new-arrivals` | 2-column auto-slider (40% text, 60% image) with 2500ms interval, dot navigation, and arrow triggers |
| **Category Showcase Loops** | `index.html` | `#shop-by-category` | PHP foreach comment markers (`$categories as $category`) wrapping 12 category showcase cards |
| **Popular Products Loops** | `index.html` | `#popular-products` | PHP foreach comment markers (`$products as $product`) wrapping initial 4-card laptops tab panel |
| **Catalog Two-Column Layout** | `products.html` | `.catalog-layout` | Two-column responsive grid container (280px sidebar + 1fr main content area, stacks at ≤991px) |
| **Filter Sidebar UI** | `products.html` | `.catalog-sidebar`, `.catalog-filter-form` | Sticky desktop filter panel & mobile collapsible accordion (<details>/<summary>) with Category (12), Brand (8), and Price Range GET filters |
| **Catalog Top Bar** | `products.html` | `.catalog-topbar`, `#catalog-topbar-form` | Responsive GET search bar (`q`), sort dropdown (`sort`: default, price_asc, price_desc, newest), and dynamic product count display |
| **Product Grid** | `products.html` | `.products-grid` | Responsive 4-3-2-1 column CSS grid hosting canonical master product cards with dummy catalog items |
| **Pagination** | `products.html` | `.pagination`, `.page-link` | Accessible product pagination navigation (`aria-label="Product pagination"`) with Previous, numbered pages (1 active, 2, 3), and Next links |
| **Product Detail Layout** | `product-detail.html`, `styles/home.css` | `.product-detail-layout`, `.product-detail-gallery`, `.product-detail-info`, `.related-products-section` | Two-column 50/50 responsive grid (stacks to 1 column at ≤991px) for gallery, specs info, and full-width related products section |
| **Gallery UI** | `product-detail.html`, `styles/home.css` | `.gallery-main-image`, `.gallery-thumbnails`, `.gallery-thumbnail` | Main 4:3 product image preview container (`#main-product-image`) with object-fit: contain + 3 interactive thumbnail buttons with data-image-src and active blue border focus |
| **Product Info Column** | `product-detail.html`, `styles/home.css` | `.product-detail-info`, `.product-detail-title`, `.product-detail-pricing`, `.product-detail-actions` | Comprehensive product identity column with <h1>, model, SKU, pricing with discount, stock status, and primary WhatsApp/Call CTAs |
| **Full Specs Table** | `product-detail.html`, `styles/home.css` | `.product-specs-section`, `.product-specs-table` | Full-width responsive 2-column specifications table with zebra striping, bold headers, and 9 hardware rows |
| **Product Sticky Bar** | `product-detail.html`, `styles/home.css` | `.product-sticky-bar`, `.product-sticky-btn` | Fixed mobile bottom quick-action bar (<768px) with green WhatsApp "Enquire Now" and brand blue "Call Now" buttons |
| **Related Products Section** | `product-detail.html`, `styles/home.css` | `.related-products-section`, `.products-grid` | Full-width product recommendation section with 4 canonical master cards and PHP loop markers |
| **Blog Card** | `blog.html`, `blogs/style.css` | `.blog-card` | Responsive card with 16:9 thumbnail, zoom hover effect, category pill badge, 2-line title clamp, 3-line excerpt clamp, author/date meta, and read article link |
| **Blog Comment Form** | `blog-detail.html`, `blogs/style.css` | `#comment-form`, `.comment-form` | Accessible discussion form with Name (`user_name`), Email (`user_email`), Comment (`comment_text`), hidden `blog_id`, submit button, and admin moderation notice |
| **70:30 Article Layout** | `blog-detail.html`, `blogs/style.css` | `.blog-layout-container` | Two-column responsive desktop layout (70% left article column, 30% right sticky sidebar at `top: 100px`; stacks to 1 column at ≤991px) |
| **Admin Sidebar** | `admin/index.html`, `admin/manage-products.html`, `admin/manage-blogs.html`, `admin/styles.css` | `.admin-sidebar`, `.admin-nav`, `.admin-nav-item` | Persistent admin sidebar navigation with active route highlights, unbuilt module visual disablement (`opacity: 0.5`, `pointer-events: none`), brand badge, and "View Website" external link |
| **Admin Forms** | `admin/login.html`, `admin/manage-products.html`, `admin/manage-blogs.html`, `admin/styles.css` | `.admin-form-container`, `.admin-form-grid`, `#product-form`, `#blog-form`, `#admin-login-form` | Canonical admin forms with 17 product fields, blog fields with #rich-text-editor, CSRF token inputs, prefill PHP comments, validation attributes, and responsive 2-column grid layout |
| **Admin Dashboard** | `admin/index.html`, `admin/styles.css` | `.dashboard-grid`, `.metric-card`, `.dashboard-activity-layout`, `.admin-table` | Responsive 4-2-1 metric cards (Products, Blogs, Inquiries, Comments) with PHP echo markers, quick action buttons, and recent inquiries table with PHP loop markers |
| **Admin Product Manager** | `admin/manage-products.html`, `admin/styles.css` | `.manage-table-section`, `.admin-table`, `.admin-form-container`, `.admin-form-grid` | Product management interface with inventory data table, PHP loop markers, edit/delete triggers, and 17-field canonical Add/Edit form matching FIELD-NAMING-CONVENTION.md |
| **Admin Blog Manager** | `admin/manage-blogs.html`, `admin/styles.css` | `.manage-table-section`, `.admin-table`, `.admin-form-container`, `#rich-text-editor` | Blog management interface with article data table, status indicators (Published/Draft), and Add/Edit form matching posts.json schema with #rich-text-editor textarea and CSRF token |
| **FAQ Section** | `index.html` | `#faq`, `.faq-item` | 8-question accordion-style FAQ block optimized with semantic headings and FAQPage Schema.org JSON-LD |
| **SEO Meta Tags & Schema** | All 6 public HTML templates | `<head>` metadata | Standardized title tags, meta descriptions, canonical URLs, OG/Twitter tags, LocalBusiness (`ComputerStore`), FAQPage, Product, and BlogPosting schemas with dynamic PHP markers |

---

## 7. JavaScript Behavior

1. **Header Compaction**: Attaches to window scroll; toggles `.is-compact` when vertical scroll offset exceeds 40px.
2. **Mobile Drawer System**: Handles open/close state toggles, locks `body` scroll overflow, manages backdrop click dismiss, and returns focus to toggle button on close.
3. **Mega Menu Desktop Controller (Deprecated)**: Historical controller for Components dropdown; markup cleanly removed from active templates in favor of direct Catalog routing.
4. **Search Autocomplete**: Filters predefined hardware keyword array on input, populates floating suggestion items, and handles blur/escape events.
5. **Accessible Tabs**: Listens for click and arrow key navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`) across tab buttons, swapping `aria-selected` and toggling panel `hidden` states with animation staggering.
6. **WhatsApp Message Prefill**: Scrapes product card names from data attributes and formats localized customer pre-fill URLs.
7. **Hero Video Guard**: Ensures muted inline playback across mobile browsers and swaps to mobile poster when screen width is under 768px.
8. **Scroll Reveal Engine**: Employs `IntersectionObserver` with a 50ms stagger on elements within `.reveal-group` containers across sections 7, 8, and 11. Bypassed under `prefers-reduced-motion`.
9. **Landing Intro Controller**: Enforces one-time modal display using `sessionStorage`, provides smooth zoom-out/fade dismiss on button click, wheel roll, or touch drag.
10. **Consolidated Catalog Navigation & Anchor Routing**: Unified global navigation across desktop navbar and mobile drawer to 7 primary links: `Home` (`index.html`), `Catalog` (`products.html`), `About Us` (`aboutus.html`), `Services` (`aboutus.html#repair-services`), `Offers` (`index.html#featured-campaign`), `Blogs` (`blog.html`), and `Contact` (`index.html#final-cta`). Category discovery is handled via query parameters on the single Catalog page (e.g., `products.html?category=laptops`, `products.html?category=desktops`, `products.html?category=components`, `products.html?category=gaming`), completely eliminating dedicated category HTML files. Secondary categories in the footer and homepage showcase cards link directly to `products.html?category=<slug>`.
11. **Announcement Bar Dismissal**: Handles close click on `#close-announcement`, adding `.hidden` class to dismiss top promo bar.
12. **Promo Popup Session Manager**: Checks `sessionStorage` for `microsys_promo_shown`; triggers modal reveal after 1500ms delay on first session visit; handles close click on `#close-promo-popup`.
13. **New Arrivals Auto-Rotation Slider**: Calculates slide indices, builds dynamic indicator dots (`.slider-dot`), translates track every 2500ms via `setInterval`, and binds manual previous/next arrows and dot navigation.
14. **Dual-Action Form Controller**: Intercepts `#mainContactForm` submit event, validates inputs, simulates database submission delay, constructs branded URL-encoded WhatsApp enquiry string, launches WhatsApp in a new tab, displays success state, and resets the form.
15. **Product Detail Gallery Switcher**: Listens for click events on `.gallery-thumbnail` buttons in `product-detail.html`, reads the `data-image-src` attribute, swaps the `#main-product-image` `src` attribute, and shifts the `.active` highlight state to the clicked thumbnail with safe DOM element checks.
16. **Markdown Rendering (`marked.js`)**: Dynamically parses Markdown file content referenced by `content_file` into semantic HTML inside `#post-container` in `blog-detail.html`, rendering headings, paragraphs, lists, blockquotes, tables, code blocks, and links as a client-side prototype fallback until MySQL Rich Text HTML hydration.
17. **Blog Filtering (`blogs/script.js`)**: Fetches `blogs/posts.json`, filters by active status (`status === 'published'`), executes live client-side keyword search across titles and excerpts, filters by selected category tab, and re-renders responsive blog card grid dynamically.

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
- **Consolidated Catalog Product Cards**: Product data and images for catalog grid in `products.html` across all categories and sub-categories.
- **Product Card Template Migration**: Canonical master template established in `COMPONENT-product-card.html`; migration of product cards across `index.html` and `products.html` to this unified structure is pending execution in Phase 0 Step 4.
- **Custom PC Visual (`#custom-pc`)**: Visual graphic placeholder and subtitle/intro paragraph copy.
- **Why Choose Us (`#why-choose-us`)**: Subtitle text and 6 benefit description paragraphs.
- **Repair Services (`aboutus.html`)**: Subtitle text, 9 service description paragraphs, and starting price figures.

### B. Functional & Configuration Placeholders (Awaiting Technical Setup)
- **Contact Form Backend**: Form `action="#"` awaiting production API or mailer endpoint (expected POST endpoint placeholder: `contact-submit.php` [PHP TO CONFIRM]; dual-action WhatsApp fallback active).
- **Form Field Name Migration**: Master mapping specification established in `FORM-FIELD-MAP.md`; migration of live form controls (`name=""` attributes on contact form and search form wrappers) across all 6 pages is pending execution in Phase 0 Step 5.
- **Blog Content & Comments (MySQL Pending)**: Blog module currently utilizes static `blogs/posts.json` mock metadata and Markdown (`.md`) content files fetched via JavaScript; in production, this static mock will be replaced by MySQL queries against the `blogs` and `comments` tables.
- **Social & Legal Footers**: Footer social media channels and policy page links currently set to `#`.
- **Structured Data URLs**: `image`, `priceRange`, and `sameAs` array values in `aboutus.html` JSON-LD graphs.
- **Open Graph / Twitter Cards**: `og:image` and `twitter:image` tags in `aboutus.html` awaiting finalized social banner share image.

---

## 11. MySQL Compatibility & Admin Integration

To support future admin panel integration without requiring architecture rewrites, the consolidated catalog page (`products.html` / `products.php`) and homepage product grids adhere to a strict data-binding contract:

### A. Data-Bind Contract & Mapping
- Product cards in the catalog and showcase grids are wrapped in standardized data markers:
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
- Catalog page query routing (`products.php?category=...`) maps directly to simple filtered queries:
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
| 2026-10-23 | Micro Step 3.1 — Products Catalog Skeleton | `products.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Created products.html skeleton, two-column layout (.catalog-layout), SEO tags, and home.css styles |
| 2026-10-23 | Purge Redundant Category Pages | `laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html` deleted; `index.html`, `aboutus.html`, `products.html`, `COMPONENT-product-card.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Purged 4 redundant standalone category pages and redirected all internal links to `products.html?category=<slug>` |
| 2026-10-23 | Micro Step 3.2 — Filter Sidebar UI | `products.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built accessible GET filter sidebar (Category [12], Brand [8], Price Range) with desktop sticky scroll & mobile native `<details>` accordion |
| 2026-10-23 | Added Catalog Top Bar (Search, Sort, Count) | `products.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Added GET search bar (`q`), sort dropdown (`sort`: default, price_asc, price_desc, newest), and dynamic product count placeholder |
| 2026-10-23 | Added Product Grid, Master Cards, and Pagination | `products.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Added responsive 4-3-2-1 .products-grid container with 4 canonical master product cards (from COMPONENT-product-card.html) and .pagination navigation |
| 2026-10-23 | Added PHP Loop Markers to Homepage and Catalog | `index.html`, `products.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Added standardized PHP loop comment markers to Shop by Category, all 4 Popular Products tabs, and Catalog .products-grid |
| 2026-10-24 | Connected Homepage links, search forms, and View All button to catalog | `index.html`, `aboutus.html`, `products.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Standardized category links (12 cards, nav, drawers) to `products.html?category=<slug>`, wrapped all header & mobile search inputs in GET `<form action="products.html">` (`q`), and added "View All Products" CTA to Popular Products |
| 2026-10-24 | Phase 3 Complete — Catalog Page built with Filters, Search, Sort, and Pagination | `products.html`, `PHP-DEV-GUIDE.md`, `PROJECT-REPORT.md`, `AUDIT.md` | Official Phase 3 sign-off. Products catalog completed with GET filter sidebar, search/sort top bar, 4-3-2-1 master card grid, pagination, PHP handover comments, and backend guide specifications. |
| 2026-10-24 | Micro Step 4.1 — Product Detail Skeleton & Two-Column Layout | `product-detail.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Created product-detail.html with header/footer/drawer parity, SEO tags, two-column responsive layout (.product-detail-layout), and placeholders for Gallery, Info, and Related Products |
| 2026-10-24 | Built Product Image Gallery UI (Step 4.2) | `product-detail.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built main product image container (.gallery-main-image) and 3-item thumbnail strip (.gallery-thumbnails) with active border states, data-image-src attributes, and responsive layout. |
| 2026-10-24 | Built Product Info & Specs Table (Step 4.3) | `product-detail.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built product detail right column (.product-detail-info) with <h1>, model, SKU, pricing, stock, warranty, action buttons, PHP comments, and full technical specifications table (.product-specs-table) with zebra striping. |
| 2026-10-24 | Added Product Sticky Bar & Related Products (Step 4.4) | `product-detail.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built mobile product sticky action bar (.product-sticky-bar) with WhatsApp and Call triggers, and built Related Products section (.related-products-section) with 4 canonical master cards, PHP query comments, and loop markers. |
| 2026-10-24 | Phase 4 Complete — Product Detail Page built with Gallery, Specs, and Related Products | `product-detail.html`, `PHP-DEV-GUIDE.md`, `PROJECT-REPORT.md`, `AUDIT.md` | Official Phase 4 closure. Product detail presentation completed with 4:3 image gallery, 17-field product info column, 9-row zebra specs table, 4-card canonical Related Products grid, mobile product sticky bar, standardized PHP variable echo/loop markers, and backend logic guide. |
| 2026-10-24 | Added Gallery Image Switching JS (Step 4.6) | `product-detail.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Added vanilla JavaScript thumbnail click event listeners in product-detail.html to dynamically swap #main-product-image src from thumbnail data-image-src and toggle .active class on selected thumbnail with existence guard. |
| 2026-10-24 | Global JavaScript Audit & Fixes | `index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Comprehensive cross-page JavaScript audit & fixes: added announcement bar session persistence, promo popup overlay/backdrop click dismiss, search suggestion links to products.html?q=..., desktop mega-menu controller to aboutus.html, filter sidebar Clear All reset, sort dropdown auto-submit on change, and universal drawer .open / .is-open class toggle synchronization. |
| 2026-10-26 | Integrated Blog Module Header/Footer and Navigation | `blog.html`, `blog-detail.html`, `index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Moved blogs/index.html to blog.html and blogs/post.html to blog-detail.html at root, integrated exact Microsys Header, Footer, Drawer, and Mobile Sticky Bar into both blog pages, fixed relative CSS/JS paths to blogs/ assets, and added "Blogs" link to Desktop Navigation, Mobile Drawer, and Footer Quick Links across all main pages. |
| 2026-10-28 | Redesigned Blog Landing Page UI | `blog.html`, `blogs/style.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Redesigned blog.html to match Microsys design system: added Blog Hero section (eyebrow, title, subtitle), toolbar with search input (`#blog-search`) and category filter tabs (`#blog-categories`), responsive 3-column desktop grid (2-col tablet, 1-col mobile), cards styled matching Microsys product cards (16:9 thumbnail, blue category pill tag, 2-line clamp title, 3-line clamp excerpt, date, read article link, lift and shadow hover), and centered pagination with brand blue active state. Preserved posts-grid-container ID and existing JavaScript fetching logic. |
| 2026-10-28 | Built Blog Detail 70:30 Layout & Sidebar | `blog-detail.html`, `blogs/style.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built 70:30 two-column responsive layout in blog-detail.html (.blog-layout-container) with 70% left article column (.blog-article-column) and 30% right sticky sidebar (.blog-sidebar-column). Added PHP single blog content marker, preserved #post-container ID for Markdown rendering JS, added sidebar promo card with CTA and 3-card related articles widget. Styled layout, sticky positioning (top: 100px), responsive 1-column mobile stack, and Microsys token styling in blogs/style.css. |
| 2026-10-28 | Refactored Blog JSON Schema & Markdown Logic for Admin Panel | `blogs/posts.json`, `blogs/script.js`, `blogs/post-script.js`, `PROJECT-REPORT.md`, `AUDIT.md` | Refactored blogs/posts.json to match Admin Panel schema (id, slug, title, meta_description, category, thumbnail_url, author_name, published_date, content_file, status, is_featured). Updated blogs/script.js to filter out unpublished posts, map new JSON fields (meta_description, thumbnail_url, published_date), and link cards to blog-detail.html?slug=<slug>. Updated blogs/post-script.js to parse ?slug= from URL, dynamically fetch Markdown file via content_file path, render via marked.parse(), update dynamic SEO tags (title, meta description, OG, Twitter, JSON-LD), and dynamically populate right sidebar Related Articles widget with same-category posts. |
| 2026-10-28 | Built Blog Comment UI (Step 5.6) | `blog-detail.html`, `blogs/style.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built accessible comment system UI in blog-detail.html inside .blog-article-column: added comments count heading, admin approval notice box, 2 dummy approved comments with circular avatar initials, author meta, text, and reply triggers, standardized PHP foreach loop marker, and comment form with locked name attributes matching FORM-FIELD-MAP.md (user_name, user_email, comment_text, hidden blog_id). Styled in blogs/style.css with responsive grid, avatar tokens, focus states, and notice box styling. |
| 2026-10-28 | Phase 5 Admin Readiness (Markers & Editor Prep) | `blog.html`, `blog-detail.html`, `blogs/script.js`, `PHP-DEV-GUIDE.md`, `PROJECT-REPORT.md`, `AUDIT.md` | Added comprehensive PHP variable echo and loop markers across blog.html and blog-detail.html. In blogs/script.js, marked card creation with foreach loop, thumbnail_url, category, title, meta_description, published_date, and slug link. In blog-detail.html, added markers for article title, author/date meta, Rich Text HTML container, hidden blog_id, promo card image/text/link, and sidebar related posts foreach loop. Updated PHP-DEV-GUIDE.md with Section 15 defining WYSIWYG editor requirements (Bold, Italic, Underline, Lists, Links), thumbnail upload, status toggle, and comment moderation queue. |
| 2026-10-28 | Phase 5 Complete — Blog Module Built (Listing, Article, 70:30 Layout, Comments UI) | `PHP-DEV-GUIDE.md`, `PROJECT-REPORT.md`, `AUDIT.md` | Official Phase 5 sign-off and closure. Blog module fully built with listing page (`blog.html`), article detail page (`blog-detail.html`), 70:30 article/sidebar layout, marked.js markdown rendering, client-side search/category filtering, accessible comments section with admin moderation notice, standardized PHP loop and variable echo markers, and complete backend/admin documentation. |
| 2026-10-30 | Built Admin Dashboard UI (Step 6.3) | `admin/index.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built admin dashboard UI: 4 metric cards (Total Products, Published Blogs, New Inquiries, Pending Comments) with inline SVG icons and PHP count echo markers, Quick Actions section (+ Add New Product, + Write Blog), Recent Inquiries table with dummy data and PHP loop markers, and responsive CSS grid layout (4 cols desktop, 2 cols tablet, 1 col mobile) styled via design tokens. |
| 2026-10-30 | Built Admin Manage Products UI (Step 6.4) | `admin/manage-products.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Created admin/manage-products.html with product inventory data table (dummy rows, edit/delete actions, PHP foreach loop markers) and 17-field canonical Add/Edit form with exact name="" attributes matching FIELD-NAMING-CONVENTION.md, prefill PHP comments, hidden product_id, and responsive CSS styling. |
| 2026-10-30 | Built Admin Manage Blogs UI (Step 6.5) | `admin/manage-blogs.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Created admin/manage-blogs.html with articles data table (dummy rows, edit/delete actions, PHP foreach loop markers) and Add/Edit form matching posts.json schema (title, slug, category, author_name, thumbnail_url, status, meta_description, #rich-text-editor textarea with TinyMCE comment, is_featured, hidden blog_id, hidden csrf_token, and Publish/Draft action triggers). |
| 2026-10-30 | Phase 6 Admin Base UI (6.1 - 6.5) | `admin/index.html`, `admin/login.html`, `admin/manage-products.html`, `admin/manage-blogs.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Built core Admin Panel foundation: shared sidebar and topbar layout, secure admin login UI, dashboard with 4 KPI metric cards and inquiries activity table, 17-field canonical product management table & form, and blog management table & rich text HTML form with TinyMCE hooks and CSRF tokens. |
| 2026-10-30 | Audited Admin Links and Fixed Duplicate Buttons (Step 6.6) | `admin/index.html`, `admin/manage-products.html`, `admin/manage-blogs.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Audited all Admin Sidebar links across admin/index.html, admin/manage-products.html, and admin/manage-blogs.html; mapped existing pages (Dashboard -> index.html, Products -> manage-products.html, Blogs -> manage-blogs.html, View Website -> ../index.html) and visually disabled unbuilt module links (Comments, Inquiries, Promotions, Sliders, Categories, Services) with opacity 0.5, pointer-events: none, and hover title tooltips; confirmed single right-aligned + Add button per manage page with flexbox styling; zero PHP/JS logic added. |
| 2026-10-30 | Schema Updated for Blogs & Sliders (Step 6.7) | `database/schema.sql`, `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md` | Synchronized MySQL database DDL with frontend blog, admin, and slider architecture: updated `blogs` table with `slug`, `thumbnail_url`, `author_name`, `meta_description`, `content_html` (LONGTEXT), `status` enum, `is_featured`, and `published_date`; updated `sliders` table with `label`, `eyebrow`, and `subtitle`; updated `inquiries` table with `phone_number`, `enquiry_type`, and `status` enum. |
| 2026-10-30 | Built Manage Comments & Inquiries UI (Step 6.6) | `admin/manage-comments.html`, `admin/manage-inquiries.html`, `admin/index.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md`, `FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md` | Created admin/manage-comments.html with moderation queue table, PHP loop markers, status badges (.badge-pending, .badge-approved, .badge-rejected), and 3 inline POST action forms per row (Approve, Reject, Delete) with hidden comment_id and csrf_token inputs. Created admin/manage-inquiries.html with read-only inquiries table matching DB schema (submitted_at, full_name, phone_number, enquiry_type, product_or_service, message, status) and PHP loop markers. Enabled Comments and Inquiries links in admin/index.html sidebar. Added badge, small action button, and mobile table overflow styles in admin/styles.css. Synchronized all documentation files. |
| 2026-10-31 | Built Manage Promotions & Sliders UI (Step 6.7) | `admin/manage-banners.html`, `admin/manage-sliders.html`, `admin/index.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md`, `FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md` | Built admin/manage-banners.html with dedicated forms for Top Announcement Bar and Promo Popup Modal featuring text inputs, image uploads, hidden promo_type and csrf_token inputs, and Apple-style toggle switches for is_active. Built admin/manage-sliders.html with New Arrivals carousel data table (Image, Label, Eyebrow, Subtitle, Active Status, Edit/Delete actions) and Add/Edit slide form with 8 schema fields (label, eyebrow, title, subtitle, image_url, link_url, display_order, is_active). Enabled Promotions and Sliders sidebar links in admin/index.html. Added Apple-style CSS toggle switch styles to admin/styles.css. Synchronized all 5 project specifications. |
| 2026-10-31 | Built Manage Categories & Services UI (Step 6.8) | `admin/manage-categories.html`, `admin/manage-services.html`, `admin/index.html`, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md`, `FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md` | Built admin/manage-categories.html with categories data table (Image, Name, Slug, Display Order, Edit/Delete actions), PHP loop markers, and Add/Edit form with multipart image upload (name, slug, image_url, display_order, hidden category_id and csrf_token). Built admin/manage-services.html with technical services data table (Service Name, Price Range, Status, Edit/Delete actions), PHP loop markers, and Add/Edit form (title, description, price_range, is_active toggle, hidden service_id and csrf_token). Fully enabled Categories and Services navigation links in admin/index.html. Synchronized all 5 project specifications. |
| 2026-10-31 | Phase 6 Complete — Admin Panel UI Suite fully built with JS interactions | `admin/script.js`, all 9 admin HTML pages, `admin/styles.css`, `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md`, `FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md` | Built admin client JavaScript (admin/script.js) with mobile sidebar toggle, overlay backdrop dismiss, and smooth Add/Edit form show/hide toggles. Added mobile hamburger button (#mobile-menu-btn) to all 9 admin topbars, audited and confirmed 100% csrf_token coverage, input name="" attributes, and PHP loop/edit markers. Officially closed and signed off Phase 6. |
| 2026-11-03 | SEO Foundation Files & Homepage SEO Optimization | `robots.txt`, `sitemap.xml`, `index.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Created `robots.txt` (blocking `/admin/`) and `sitemap.xml` (catalog, about, and blog routes). Updated `index.html` with `lang="en-IN"`, primary local SEO title, meta description & keywords, canonical link, 6 Open Graph tags, LocalBusiness (`ComputerStore`) & `FAQPage` JSON-LD schemas, H1/H2 heading hierarchy, 12 category and product card alt texts, 8-question FAQ HTML section, and `<address>` contact tag. |
| 2026-11-03 | Implemented SEO & Dynamic PHP Markers for Catalog and Product Detail Pages | `products.html`, `product-detail.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Configured `products.html` with `lang="en-IN"`, catalog SEO `<title>`, `<meta name="description">`, canonical, OG/Twitter tags, updated H1 (`All Products — Laptops, Components & Accessories in Biharsharif`), H2 (`Filter by Category`), and master product card alt attributes. Configured `product-detail.html` with `lang="en-IN"`, dynamic PHP echo markers for `<title>`, `<meta name="description">`, canonical (`product-detail.php?slug=...`), Open Graph/Twitter tags, dynamic Product Schema JSON-LD (name, image, description, sku, brand, offers), dynamic H1 marker, and image alt PHP markers. |
| 2026-11-03 | Linked Product Cards to Detail Page & Prepared Dynamic Routing | `products.html`, `product-detail.html`, `index.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Updated all 4 master product cards in `products.html` and 4 popular laptop cards in `index.html` (#panel-laptops) from `href="#"` to `href="product-detail.html?slug=..."` using canonical slugs (`hp-15s-core-i3`, `ideapad-slim-3-ryzen-5`, `inspiron-3520-core-i5`, `tuf-gaming-a15-rtx-4050`). Added dynamic PHP link format comment markers above product grids in both pages. In `product-detail.html`, added top-of-body PHP slug query marker (`$slug = $_GET['slug'] ?? null`), verified breadcrumb navigation to `products.html`, and updated all 4 Related Products cards with slug-based links and PHP handover loop comments. |
| 2026-11-03 | Simplified Navbar, Fixed Mega Menu, and Filled Subtitles | `index.html`, `products.html`, `aboutus.html`, `product-detail.html`, `blog.html`, `blog-detail.html`, `styles/home.css`, `PROJECT-REPORT.md`, `AUDIT.md` | Fixed catalog H1 size on `products.html` by introducing `.page-heading` with `var(--type-page-heading)`. Replaced `[Page subtitle — pending]` on `products.html` with catalog summary copy, updated `aboutus.html` hero subtitle with founding story copy, filled repair services subtitle, and populated custom PC and why-choose-us copy on `index.html`. Streamlined global desktop navbar from 13 redundant tabs down to 7 clean links (`Home`, `Catalog`, `About Us`, `Services`, `Offers`, `Blogs`, `Contact`), removed `.mega-menu` HTML block across all 6 public pages, centered pill navigation in `styles/home.css`, while fully preserving mobile drawer links and footer category links. |
| 2026-11-03 | Simplified Mobile Drawer Navigation Links | `index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `blog.html`, `blog-detail.html`, `PROJECT-REPORT.md`, `AUDIT.md` | Streamlined mobile drawer (`#drawer`) navigation across all 6 public pages to match the simplified 7-link desktop navbar: Home (`index.html`), Catalog (`products.html`), About Us (`aboutus.html`), Services (`aboutus.html#repair-services`), Offers (`index.html#featured-campaign`), Blogs (`blog.html`), and Contact (`index.html#final-cta`). Removed all 12+ legacy category links and the `<details>` Components accordion. Preserved mobile drawer header, address/hours info strip, `#mobile-search` form, and WhatsApp/Contact action buttons. |
| 2026-11-03 | Simplified Desktop & Mobile Navbar to 7 links; Removed Mega Menu; Updated docs for Catalog-based routing | `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md`, `FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md` | Streamlined desktop navbar and mobile drawer across all 6 public templates to 7 primary links (`Home`, `Catalog`, `About Us`, `Services`, `Offers`, `Blogs`, `Contact`). Removed mega menu markup. Updated all documentation to clarify single Catalog routing architecture (`products.php?category=...`) without separate category pages. |
| 2026-11-03 | Implemented Phase 6.10.4 SEO (About, Blog) and Admin Noindex | `aboutus.html`, `blog.html`, `blog-detail.html`, `admin/` (all 10 files), `PROJECT-REPORT.md`, `AUDIT.md` | Configured `aboutus.html` and `blog.html` with `lang="en-IN"`, localized SEO `<title>`, `<meta name="description">`, canonical URLs, and Open Graph/Twitter tags; aligned `aboutus.html` `<h1>` to SEO strategy. Added dynamic PHP markers for title, description, canonical, OG tags, and `BlogPosting` JSON-LD schema to `blog-detail.html`. Added `<meta name="robots" content="noindex, nofollow">` to all Admin Panel HTML files to secure administrative routes against search engine indexing. |
| 2026-11-03 | Phase 6.10 Complete — Full SEO implementation (Meta, Schema, FAQ, Sitemap) across public pages and Admin Noindex | `index.html`, `products.html`, `product-detail.html`, `aboutus.html`, `blog.html`, `blog-detail.html`, `robots.txt`, `sitemap.xml`, `admin/` (10 files), `PROJECT-REPORT.md`, `AUDIT.md`, `PHP-DEV-GUIDE.md`, `FIELD-NAMING-CONVENTION.md`, `FORM-FIELD-MAP.md` | Phase 6.10 official sign-off. Full SEO audit and documentation synchronization: verified title, meta description, canonical URLs, Open Graph / Twitter tags, en-IN localization, LocalBusiness, FAQPage, Product, and BlogPosting schemas with dynamic PHP markers, 8-question FAQ section, robots.txt crawl directives, XML sitemap, and noindex/nofollow protection across all 10 Admin Panel pages. |

---

## 15. PHP Handover Notes

This section serves as the primary technical entry point and onboarding manual for the client's PHP backend developer, outlining the boundary between frontend deliverables and backend responsibilities, linking to locked specifications, and defining the step-by-step integration workflow.

### 15.1 Deliverable Scope — Frontend Only

- Delivered Frontend Assets:
  - 6 semantic, responsive HTML5 pages (`index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `blog.html`, `blog-detail.html`).
  - Streamlined 7-link global navigation architecture (`Home`, `Catalog`, `About Us`, `Services`, `Offers`, `Blogs`, `Contact`) unified across desktop navbar and mobile drawer.
  - Consolidated single Catalog page (`products.html` / `products.php`) with GET query-parameter routing (`products.php?category=...`), completely eliminating dedicated category pages.
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
