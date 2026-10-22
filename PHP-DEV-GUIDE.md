# PHP Developer Onboarding & Integration Guide

> **Project:** Microsys Computer & Accessories  
> **Target Environment:** PHP 7.4+ / MySQL 5.7+ (Shared Hosting Environment)  
> **Architecture:** Static Semantic HTML5 Frontend + Dynamic PHP/MySQL Hydration  
> **Status:** Phase 2 Complete (Frontend Enhanced & Documented)

---

## 1. Welcome & Scope

Welcome to the Microsys web platform backend integration project. This guide serves as the consolidated technical onboarding manual for the client-side PHP developer. It outlines the architectural boundaries, field contracts, table relationships, and integration workflows required to hydrate the storefront without modifying layout rules or breaking design system parity.

The frontend team provides fully responsive HTML5 markup, CSS component stylesheets, inline interactive micro-behaviors, and standardized PHP comment loop placeholders. The backend engineer is responsible for establishing MySQL database connectivity, creating prepared statement queries, executing sanitization and validation on form submissions, rendering dynamic loops, and configuring server-side environment variables. No backend server scripts, database credentials, or server configuration files are pre-packaged within this frontend workspace.

---

## 2. Quick Start — Read These In Order

To ensure full architectural alignment, please read the documentation files in the following sequential order before modifying templates or writing SQL procedures:

- **Step 1:** Read this guide (`PHP-DEV-GUIDE.md`) for an end-to-end operational roadmap.
- **Step 2:** Read `FIELD-NAMING-CONVENTION.md` for the locked 17-field product standard, data types, and PHP variable bindings.
- **Step 3:** Read `FORM-FIELD-MAP.md` for form control name attributes, target columns, validation criteria, and submission endpoints.
- **Step 4:** Read `COMPONENT-product-card.html` for the canonical product card reference markup.
- **Step 5:** Read `database/schema.sql` for the formal MySQL table definitions, constraints, and column structures.
- **Step 6:** Read `AUDIT-FIELDS.md` for the frontend field inventory and placeholder catalog.
- **Step 7:** Read `PROJECT-REPORT.md` for complete business background, design system tokens, and locked update rules.

---

## 3. The 17 Locked Product Fields

Every product entity displayed across the website conforms to a standardized 17-field contract. These field names are permanently locked in snake_case and must match between MySQL columns, PHP associative array keys, and HTML data attributes.

| Index | Field Identifier | Data Type & Constraint | Usage & Frontend Mapping |
| :--- | :--- | :--- | :--- |
| 1 | `product_id_sku` | VARCHAR(64) UNIQUE NOT NULL | Alphanumeric stock-keeping unit (e.g. LAP-HP-15S-001) |
| 2 | `category` | VARCHAR(64) NOT NULL | Primary category slug: laptops, desktop-pcs, components, gaming |
| 3 | `sub_category` | VARCHAR(64) DEFAULT NULL | Component sub-category slug: processors, motherboards, etc. |
| 4 | `brand` | VARCHAR(64) NOT NULL | Manufacturer name: HP, Lenovo, Dell, ASUS, Intel, AMD, etc. |
| 5 | `product_name` | VARCHAR(255) NOT NULL | Commercial display title; feeds card heading & WhatsApp text |
| 6 | `model_number` | VARCHAR(100) DEFAULT NULL | Manufacturer model designation (e.g. 15s-fq5000, 3520) |
| 7 | `key_specs` | VARCHAR(255) NOT NULL | Slash-delimited summary line (e.g. Core i5 / 16GB / 512GB) |
| 8 | `full_specs` | TEXT DEFAULT NULL | Comprehensive hardware specifications |
| 9 | `price` | DECIMAL(10,2) NOT NULL | Active selling price; ₹ currency glyph prefixed in template |
| 10 | `mrp` | DECIMAL(10,2) DEFAULT NULL | Maximum Retail Price; triggers discount calculation if > price |
| 11 | `availability` | ENUM('in_stock','out_of_stock','pre_order') | Inventory state; controls availability label and CTA |
| 12 | `image_primary` | VARCHAR(255) NOT NULL | Relative asset path to primary catalog image WebP |
| 13 | `image_secondary` | VARCHAR(255) DEFAULT NULL | Secondary gallery angle asset path |
| 14 | `image_tertiary` | VARCHAR(255) DEFAULT NULL | Tertiary gallery angle asset path |
| 15 | `warranty` | VARCHAR(100) DEFAULT NULL | Manufacturer warranty terms (e.g. 1 Year Onsite Warranty) |
| 16 | `badge` | VARCHAR(50) DEFAULT NULL | Promotional pill text (e.g. In Stock, New, Hot Deal) |
| 17 | `is_popular` | TINYINT(1) DEFAULT 0 | Flag governing display on homepage Popular Products tabs |

*Note: For complete constraint rules and admin form mappings, cross-reference `FIELD-NAMING-CONVENTION.md`.*

---

## 4. Database Schema Overview

The database definition is located in `database/schema.sql`. It is written with MySQL 5.7+ compatibility (using InnoDB engine and utf8mb4 encoding) and contains 8 tables:

- **`categories`**: Product classifications (`id`, `name`, `slug`, `image_url`, `display_order`, `is_active`, `created_at`).
- **`products`**: Catalog hardware records adhering to the locked field standard (`id`, `category_id`, `brand`, `name`, `slug`, `model_number`, `key_specs`, `full_specs`, `price`, `mrp`, `image_primary`, `image_secondary`, `image_tertiary`, `availability`, `badge`, `sku`, `warranty`, `is_popular`, `is_featured`, `created_at`).
- **`blogs`**: Article management for future content marketing (`id`, `title`, `slug`, `cover_image_url`, `category`, `body`, `author`, `is_published`, `created_at`).
- **`comments`**: Moderated reader discussions (`id`, `blog_id`, `commenter_name`, `commenter_email`, `body`, `is_approved`, `created_at`).
- **`promotions`**: Announcement bar and promo modal content (`id`, `type`, `text_content`, `image_url`, `is_active`, `created_at`).
- **`sliders`**: Hero and New Arrivals slide banners (`id`, `title`, `image_url`, `link_url`, `display_order`, `is_active`, `created_at`).
- **`inquiries`**: Submissions received from the storefront contact form (`id`, `full_name`, `phone`, `email`, `message`, `product_interest`, `submitted_at`).
- **`services`**: Repair and hardware consultation service catalog (`id`, `title`, `description`, `price_range`, `is_active`, `created_at`).

All database column names strictly align with frontend form `name=""` attributes and data attributes.

---

## 5. Form Fields Quick Reference

### Contact and Inquiry Form (`#mainContactForm`)
- **Location:** `index.html` (Contact section).
- **Form Method:** POST.
- **Form Action:** `contact-submit.php` [PHP TO CONFIRM: Backend endpoint route].
- **Target Table:** `inquiries`.
- **Form Controls & Names:**
  - Full Name: `name="full_name"` (Type: text, Required).
  - Phone Number: `name="phone_number"` (Type: tel, Required, Indian 10-digit).
  - Email Address: `name="email"` (Type: email, Optional).
  - Enquiry Classification: `name="enquiry_type"` (Type: text, Required).
  - Target Hardware/Service: `name="product_or_service"` (Type: text, Required).
  - Customer Message: `name="message"` (Type: textarea, Required).
  - Submission Source: `name="form_source"` (Type: hidden, Value: `homepage_contact`).
  - Submit Button: `id="contact-submit-btn"`.

### Global Search Forms
- **Locations:** Desktop header navigation and mobile drawer navigation across all pages.
- **Form Method:** GET.
- **Target Route:** `search.php` [PHP TO CONFIRM].
- **Query Parameter:** `name="q"`.
- **Query Strategy:** SQL LIKE search matching `name`, `brand`, `key_specs`, and `model_number` in `products`.

---

## 6. Product Card Structure

The master product card reference is stored in `COMPONENT-product-card.html`. All dynamic loops across category pages and homepage tabs must adhere to this exact structural hierarchy:

- Container: `.product-card` with optional animation class `.reveal`.
- Visual Block: `.product-image-wrapper` > `.product-image-inner` > `img` with `width="400"`, `height="300"`, and `loading="lazy"`.
- Badge Pill: `.product-badge` (rendered only if `badge` or availability is defined).
- Brand Label: `.product-brand` displaying the manufacturer name.
- Title Heading: `.product-name` carrying the `data-product-name` attribute.
- Spec Summary: `.product-specs` displaying slash-delimited specifications.
- Price Row: `.product-price` rendering formatted price with the rupee symbol.
- Availability Note: `.product-avail` showing showroom availability.
- Action Buttons: `.product-actions` wrapping View Details button (`.btn.btn-secondary`) and WhatsApp Enquiry trigger (`.btn.btn-whatsapp.whatsapp-btn`).

*Important: Never modify these CSS classes or omit `data-*` attributes during backend templating. Styling and client-side interactions depend directly on these selectors.*

---

## 7. Dynamic Placeholder Conventions

The frontend templates utilize standardized comment markers to guide backend variable extraction:

- `DATA-BIND: <entity>` — Marks a section bound to a specific table or category (e.g. `DATA-BIND: products.laptops`, `DATA-BIND: categories.processors`).
- `PLACEHOLDER: <description>` — Identifies static mockup text or asset paths awaiting dynamic replacement.
- `FORM-ENDPOINT: <status>` — Denotes form actions awaiting concrete PHP routing endpoints.
- `PROMO-VALUE: <source>` — Highlights marketing text controlled via admin settings.
- `PHP: <expression>` — Explicit directives and loop boundaries for the backend engineer (e.g. `PHP: foreach($categories as $category) {`, `PHP: echo $promotion['text_content'];`).

---

## 8. Phase 2 Features — Backend Requirements

Phase 2 introduced 5 high-impact interactive enhancements to the homepage. The backend developer should integrate them as follows:

### 1. Top Announcement Bar (`#announcement-bar`)
- **Database Table:** `promotions`.
- **Query Filter:** `SELECT * FROM promotions WHERE type = 'announcement_bar' AND is_active = 1 LIMIT 1;`.
- **Template Variables:** Echo `text_content` inside the bar's `span` element.
- **Behavior:** Frontend close button hides the bar via `.hidden` class.

### 2. Session-Based Promo Popup Modal (`#promo-popup-overlay`)
- **Database Table:** `promotions`.
- **Query Filter:** `SELECT * FROM promotions WHERE type = 'popup_modal' AND is_active = 1 LIMIT 1;`.
- **Template Variables:** Echo `image_url` into the `src` attribute (and `data-php-src`) of `#promo-popup-image`, and echo `text_content` into `#promo-popup-text`.
- **Behavior:** Modal display is strictly session-managed via frontend JavaScript using `sessionStorage.getItem('microsys_promo_shown')`. No server-side session cookies or tracking logic are required.

### 3. New Arrivals Auto-Slider (`#new-arrivals`)
- **Database Table:** `sliders`.
- **Query Filter:** `SELECT * FROM sliders WHERE is_active = 1 ORDER BY display_order ASC;`.
- **Template Variables:** For each slide, populate `title`, `image_url`, and CTA destination `link_url`.
- **Behavior:** 2-column layout (left 40% text, right 60% image) with auto-play interval set to 2500ms and manual dot/arrow navigation.

### 4. Mobile Sticky Bottom Bar (`#mobile-sticky-bar`)
- **Backend Requirement:** None. This component is completely static.
- **Behavior:** Renders only on mobile devices (<768px), providing direct triggers for Phone (`tel:+919431687928`), WhatsApp (`wa.me/919431687928`), and Google Maps showroom directions.

### 5. Dual-Action Contact Form (`#mainContactForm`)
- **Backend Requirement:** Create an endpoint (e.g. `contact-submit.php`) to accept POST submissions.
- **Processing Flow:** Validate input fields, insert a row into the `inquiries` table, and return a JSON status response (`{ success: true }`).
- **Client Behavior:** The frontend script prevents default page reload, shows a loading state, opens WhatsApp with a formatted message in a new tab, and resets the form.

---

## 9. Integration Checklist — Step by Step

Follow this sequence to achieve complete backend integration without breaking frontend behavior:

1. Import `database/schema.sql` into your local or hosting MySQL database via phpMyAdmin or CLI.
2. Verify all 8 tables are created with default collation `utf8mb4_unicode_ci`.
3. Create a secure database configuration file (`config/db.php`) using PDO with prepared statements.
4. Convert `index.html` into `index.php` (and similarly for category templates).
5. Extract reusable components into an `includes/` directory (`header.php`, `footer.php`, `announcement-bar.php`, `promo-popup.php`, `mobile-sticky-bar.php`).
6. In `includes/announcement-bar.php`, execute the active announcement query and hydrate the text string.
7. In `includes/promo-popup.php`, execute the active popup query and hydrate modal image and text.
8. In `index.php`, wrap the New Arrivals slider track with a foreach loop over `sliders`.
9. In `#shop-by-category`, wrap category cards in a foreach loop iterating over `$categories`.
10. In `#popular-products`, replace the static cards in the Laptops panel with a foreach loop over active products where `category_id = 1` and `is_popular = 1`.
11. Replicate this product foreach pattern across the remaining 3 tab panels (Desktop PCs, Gaming, Components).
12. Create `contact-submit.php` to handle AJAX POST submissions from `#mainContactForm` and insert records into `inquiries`.
13. Create `search.php` to handle query parameter `q` and display filtered product grids.
14. Ensure all image paths output valid asset URLs pointing to existing files in `assets/`.
15. Verify that page speed, responsive breakpoints, and console logs remain completely clean.

---

## 10. Common Pitfalls

- **Renaming Field Names:** Never change field names (e.g. changing `product_name` to `title` or `phone_number` to `contact_no`). This breaks data contracts and WhatsApp message formatting.
- **Changing HTML Classes:** Layouts, CSS grid rules, and responsive media queries rely directly on existing class names (`.product-card`, `.slide`, `.categories-grid`, `.sticky-bar-btn`). Modifying classes will break styling.
- **Omitting `name=""` Attributes:** Form submissions will fail silently if `name` attributes are removed from form controls.
- **Adding Unapproved Fields:** Stick strictly to the 17 locked product fields. New attributes must be added through formal schema migrations.
- **MySQL Version Incompatibilities:** Avoid using MySQL 8.0-only syntax or window functions. Maintain strict compatibility with MySQL 5.7+ shared hosting environments.
- **Overwriting Mobile Padding:** Do not alter the 70px bottom body padding in mobile media queries, as this prevents the fixed sticky bar from obscuring footer content.

---

## 11. Testing Checklist

Before deploying the dynamic PHP application to staging or production, confirm each of the following test cases:

- [ ] Homepage tab panels dynamically render products filtered by category from MySQL.
- [ ] Active announcement bar renders database text and closes cleanly on click.
- [ ] Promotional popup modal displays dynamic image/text on first session visit and respects `sessionStorage`.
- [ ] New Arrivals slider populates slides dynamically from the `sliders` table and auto-rotates smoothly.
- [ ] Category grid iterates over the `categories` table with valid links.
- [ ] Category pages (`laptops.php`, `desktop-pcs.php`, etc.) load category-filtered products.
- [ ] Contact form successfully inserts submission data into the `inquiries` table.
- [ ] Contact form triggers the WhatsApp web/app redirect with prefilled user inputs.
- [ ] Global search input directs to `search.php` and returns relevant product results.
- [ ] Mobile sticky bottom bar operates on screens under 768px with functional Call, WhatsApp, and Directions links.
- [ ] Browser developer console contains zero JavaScript errors or 404 network warnings.

---

## 12. Contact & Governance

This project adheres to the strict **Locked Update Rule** documented in `PROJECT-REPORT.md` Section 16:

- Every future update or backend modification that alters database schema, template structures, or form endpoints must update `PROJECT-REPORT.md` and `AUDIT.md` within the same revision.
- If a schema alteration is approved by the client, both `FIELD-NAMING-CONVENTION.md` and `FORM-FIELD-MAP.md` must be updated concurrently to maintain architectural synchronization across the entire repository.
