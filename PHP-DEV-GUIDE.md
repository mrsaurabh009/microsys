# PHP Developer Onboarding & Integration Guide

> **Project:** Microsys Computer & Accessories  
> **Target Environment:** PHP 7.4+ / MySQL 5.7+ (Shared Hosting Environment)  
> **Architecture:** Static Semantic HTML5 Frontend + Dynamic PHP/MySQL Hydration  
> **Status:** Phase 6 in Progress (Admin Panel UI Suite & Schema Parity Complete)

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
- **`blogs`**: Article management with rich text HTML and admin parity (`id`, `title`, `slug`, `category`, `thumbnail_url`, `author_name`, `meta_description`, `content_html`, `status`, `is_featured`, `published_date`, `created_at`).
- **`comments`**: Moderated reader discussions (`id`, `blog_id`, `commenter_name`, `commenter_email`, `body`, `is_approved`, `created_at`).
- **`promotions`**: Announcement bar and promo modal content (`id`, `type`, `text_content`, `image_url`, `is_active`, `created_at`).
- **`sliders`**: Hero and New Arrivals slide banners with rich copy (`id`, `label`, `eyebrow`, `title`, `subtitle`, `image_url`, `link_url`, `display_order`, `is_active`, `created_at`).
- **`inquiries`**: Storefront inquiries and admin tracking (`id`, `full_name`, `phone_number`, `email`, `enquiry_type`, `message`, `product_interest`, `status`, `submitted_at`).
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

## 9. Catalog Page Backend Logic & Navigation Routing (Phase 3)

The dedicated catalog page (`products.html` / `products.php`) delivers a complete storefront interface featuring sidebar filters, search and sorting top bar, responsive 4-3-2-1 product grid, and accessible pagination.

### 9.1 Storefront Navigation & Catalog Routing Architecture
- **Unified 7-Link Global Navigation**:
  Both the desktop `.category-nav` and the mobile `#drawer` navigation across all 6 public templates use the exact same 7 clean routes:
  1. `Home` -> `index.php` (or `index.html`)
  2. `Catalog` -> `products.php` (or `products.html`)
  3. `About Us` -> `aboutus.php` (or `aboutus.html`)
  4. `Services` -> `aboutus.php#repair-services`
  5. `Offers` -> `index.php#featured-campaign`
  6. `Blogs` -> `blog.php` (or `blog.html`)
  7. `Contact` -> `index.php#final-cta`
- **No Dedicated Category Pages Required**:
  The Navbar **no longer links to dedicated category pages** (`laptops.html`, `desktop-pcs.html`, `components.html`, `gaming.html` were completely purged). The backend developer does NOT need to create separate category views or template files.
- **Single Catalog Parameter Routing (`products.php?category=...`)**:
  All category and sub-category filtering is handled via HTTP GET query parameters on the single `products.php` page:
  - Laptops: `products.php?category=laptops`
  - Desktop PCs: `products.php?category=desktops` (or `desktop-pcs`)
  - Components: `products.php?category=components`
  - Component Sub-categories: `products.php?category=components&sub_category=processors` (or `motherboards`, `graphics-cards`, `ram`, `storage`, `power-supplies`, `cabinets`, `cooling`)
  - Gaming PCs: `products.php?category=gaming`
- **Footer & Showcase Category Links**:
  Any category links present in the site footer (`#footer`), homepage category showcase cards (`#shop-by-category`), or marketing banners must route directly to `products.php?category=<slug>`.

### 9.2 Filtering Logic
- Read `category[]` or `category` string/array from `$_GET['category']` (e.g., `laptops`, `desktops`, `gaming`, `components`). When present, sanitize each value and construct an `IN()` or `=` condition in the SQL `WHERE` clause matching the `category` column.
- Read `sub_category` from `$_GET['sub_category']` (e.g., `processors`, `motherboards`, etc.). When present, append `AND sub_category = ?` to the prepared SQL query.
- Read `brand[]` array from `$_GET['brand']` (e.g., HP, Lenovo, Dell, ASUS, Acer, MSI, Intel, AMD). When present, sanitize each value and construct an `IN()` condition in the SQL `WHERE` clause matching the brand column.
- Read `min_price` and `max_price` numeric strings from `$_GET['min_price']` and `$_GET['max_price']`. When present and valid, append `>=` (for minimum price) and `<=` (for maximum price) range conditions to the SQL `WHERE` clause.
- Combine active filter conditions using boolean `AND` operators within the prepared statement query.

### 9.3 Searching Logic
- Read the search keyword `q` from `$_GET['q']`.
- When provided, trim and sanitize the query string, then append a composite search clause to the SQL `WHERE` statement using `LIKE '%q%'` across both `product_name` and `model_number` columns: `(product_name LIKE '%q%' OR model_number LIKE '%q%')`.

### 9.4 Sorting Logic
- Read the sort key from `$_GET['sort']`.
- Map the selected option value to the appropriate SQL `ORDER BY` statement:
  - `price_asc` maps to `ORDER BY price ASC` (Price: Low to High).
  - `price_desc` maps to `ORDER BY price DESC` (Price: High to Low).
  - `newest` maps to `ORDER BY created_at DESC` (Newest Arrivals).
  - `default` or unrecognized values fallback to `ORDER BY is_popular DESC, created_at DESC`.

### 9.5 Pagination Logic
- Read the active page number from `$_GET['page']` (defaulting to page 1 if absent or invalid).
- Set the catalog page limit (e.g., 12 products per page).
- Calculate the SQL `OFFSET` as `(page - 1) * limit`.
- Append the `LIMIT` and `OFFSET` clauses to the final product retrieval query.

### 9.6 Result Count & Summary
- Prior to executing pagination, run a `SELECT COUNT(*)` query utilizing the identical dynamic `WHERE` filtering and search clauses to calculate the overall total matching records.
- Use the total count, current page, and page limit to calculate the starting and ending index numbers to dynamically output the summary string: `Showing X–Y of Z products`.
- If the result count is zero, render a clean empty-state message inviting the customer to clear active filters.

---

## 10. Product Detail Page Backend Logic (Phase 4)

The dedicated product detail page (`product-detail.html` / `product-detail.php`) delivers a comprehensive single-product presentation featuring breadcrumb navigation, a 4:3 image gallery with thumbnail previews, full technical specifications, direct WhatsApp and phone action triggers, and a related products recommendation grid. The backend developer should implement the single-product view using the following architectural requirements:

### 1. Single Product Routing & Query Logic
- Read the product identifier from incoming HTTP GET query parameters using either `id` (primary key integer) or `sku` (alphanumeric string).
- Sanitize the incoming parameter and execute a prepared statement lookup against the `products` table matching the identifier.
- If the parameter is missing, invalid, or yields zero matching rows, respond with an HTTP 404 header and render a friendly not-found template or redirect back to the catalog page.

### 2. 17-Standard Field Output Mapping
- All 17 locked product fields from the database record map directly to their corresponding HTML elements:
  - `product_name`: Populates the breadcrumb terminal item and the main `<h1>` title element (`#product-name`).
  - `brand`: Renders inside the `.product-brand` container above the title.
  - `model_number`: Renders inside `.product-model` (e.g., `Model: 15s-fq5007TU`).
  - `product_id_sku`: Renders inside `.product-sku` (e.g., `SKU: HP-15S-I3-001`).
  - `key_specs`: Echoed into `.product-detail-specs-summary` as a slash-delimited summary.
  - `price`: Formatted with Indian currency formatting and prefixed with the ₹ symbol inside `.product-detail-price`.
  - `mrp`: Formatted with ₹ inside `.product-detail-mrp`. Conditionally rendered only when `mrp` is defined and strictly greater than `price`.
  - Discount Tag: When `mrp` is displayed, calculate the discount percentage as `((mrp - price) / mrp) * 100` and output the rounded value into `.product-detail-discount` (e.g., `15% OFF`).
  - `availability`: Humanizes the inventory status (e.g., `In Stock • Available in Showroom`) inside `.product-availability` and binds the raw status to the `data-stock-status` attribute.
  - `warranty`: Echoed inside `.product-warranty` alongside the shield icon.
  - `badge`: Rendered conditionally inside `.product-badge` only when the promotional tag is non-empty.
  - `category` & `sub_category`: Used for contextual breadcrumb links and for querying related items.

### 3. Image Gallery Output Logic
- Primary Image: The main image container (`.gallery-main-image img` with `id="main-product-image"`) outputs `image_primary` into its `src` attribute.
- Thumbnail Strip: The thumbnail button container (`.gallery-thumbnails`) outputs up to 3 clickable buttons:
  - Thumbnail 1 outputs `image_primary` in its `data-image-src` attribute and nested `img src`.
  - Thumbnail 2 outputs `image_secondary` in its `data-image-src` attribute and nested `img src`.
  - Thumbnail 3 outputs `image_tertiary` in its `data-image-src` attribute and nested `img src`.
- If secondary or tertiary image paths are NULL or empty in the database record, conditionally omit the corresponding thumbnail buttons so only active photos are selectable.

### 4. Full Specs Table Parsing & Looping
- The `full_specs` column stores detailed hardware attributes (typically formatted as a structured JSON object or associative array of key-value pairs).
- The backend parses this data and iterates through each property using a loop.
- For each item in the specification collection, render a table row (`<tr>`) containing the property name inside `<th scope="row">` and the property description inside `<td>` within `<table class="product-specs-table">`.

### 5. Related Products Recommendation Query
- To display relevant alternative options, query the `products` table for items belonging to the same category while excluding the currently displayed product:
  - Filter using `WHERE category = $current_category AND id != $current_id`.
  - Order the selection by popularity or newest arrivals (`ORDER BY is_popular DESC, created_at DESC`).
  - Restrict the query to 4 items using `LIMIT 4`.
- Iterate through the returned records and hydrate canonical master product cards inside the `.products-grid` within `.related-products-section`.

### 6. WhatsApp Message Composition & Dynamic Action URLs
- Both the desktop enquiry button (`.product-detail-btn-wa`) and mobile sticky action button (`.product-sticky-btn--whatsapp`) trigger a direct WhatsApp enquiry.
- Dynamically construct the prefilled message string incorporating the customer greeting, current product name, and SKU.
- URL-encode the constructed message text and append it as the `text` parameter to the official showroom WhatsApp endpoint (`https://wa.me/919431687928?text=...`).
- The Call buttons link to `tel:+919431687928` for instant telephone connection.

---

## 11. Integration Checklist — Step by Step

Follow this sequence to achieve complete backend integration without breaking frontend behavior:

1. Import `database/schema.sql` into your local or hosting MySQL database via phpMyAdmin or CLI.
2. Verify all 8 tables are created with default collation `utf8mb4_unicode_ci`.
3. Create a secure database configuration file (`config/db.php`) using PDO with prepared statements.
4. Convert the 6 public templates (`index.html`, `aboutus.html`, `products.html`, `product-detail.html`, `blog.html`, `blog-detail.html`) into their corresponding `.php` files (`index.php`, `aboutus.php`, `products.php`, `product-detail.php`, `blog.php`, `blog-detail.php`).
5. Extract reusable components into an `includes/` directory (`header.php`, `footer.php`, `announcement-bar.php`, `promo-popup.php`, `mobile-sticky-bar.php`). Note that `header.php` uses the simplified 7-link navbar (`Home`, `Catalog`, `About Us`, `Services`, `Offers`, `Blogs`, `Contact`) with zero mega-menu markup.
6. In `includes/announcement-bar.php`, execute the active announcement query and hydrate the text string.
7. In `includes/promo-popup.php`, execute the active popup query and hydrate modal image and text.
8. In `index.php`, wrap the New Arrivals slider track with a foreach loop over `sliders`.
9. In `#shop-by-category`, wrap category cards in a foreach loop iterating over `$categories`.
10. In `#popular-products`, replace the static cards in the Laptops panel with a foreach loop over active products where `category_id = 1` and `is_popular = 1`.
11. Replicate this product foreach pattern across the remaining 3 tab panels (Desktop PCs, Gaming, Components).
12. In `products.php`, read GET parameters (`category`, `sub_category`, `brand`, `min_price`, `max_price`, `q`, `sort`, `page`), construct the SQL query with dynamic WHERE, ORDER BY, and LIMIT clauses, and loop over `$filtered_products`. Note that all top navbar and mobile drawer links route directly to `products.php` with query parameters, completely eliminating the need for dedicated category files. Footer category links also map directly to `products.php?category=<slug>`.
13. In `product-detail.php`, retrieve the product by `id` or `sku`, populate the 17 standard fields, parse and loop `full_specs`, generate dynamic WhatsApp enquiry links, and query 4 related category items.
14. Create `contact-submit.php` to handle AJAX POST submissions from `#mainContactForm` and insert records into `inquiries`.
15. Ensure all image paths output valid asset URLs pointing to existing files in `assets/`.
16. Verify that page speed, responsive breakpoints, and console logs remain completely clean.

---

## 12. Common Pitfalls

- **Renaming Field Names:** Never change field names (e.g. changing `product_name` to `title` or `phone_number` to `contact_no`). This breaks data contracts and WhatsApp message formatting.
- **Changing HTML Classes:** Layouts, CSS grid rules, and responsive media queries rely directly on existing class names (`.product-card`, `.slide`, `.categories-grid`, `.sticky-bar-btn`, `.catalog-filter-form`, `.catalog-topbar`, `.product-detail-layout`, `.product-sticky-bar`). Modifying classes will break styling.
- **Omitting `name=""` Attributes:** Form submissions will fail silently if `name` attributes are removed from form controls.
- **Adding Unapproved Fields:** Stick strictly to the 17 locked product fields. New attributes must be added through formal schema migrations.
- **MySQL Version Incompatibilities:** Avoid using MySQL 8.0-only syntax or window functions. Maintain strict compatibility with MySQL 5.7+ shared hosting environments.
- **Overwriting Mobile Padding:** Do not alter the 70px bottom body padding in mobile media queries, as this prevents the fixed sticky bar from obscuring footer content.

---

## 13. Testing Checklist

Before deploying the dynamic PHP application to staging or production, confirm each of the following test cases:

- [ ] Homepage tab panels dynamically render products filtered by category from MySQL.
- [ ] Active announcement bar renders database text and closes cleanly on click.
- [ ] Promotional popup modal displays dynamic image/text on first session visit and respects `sessionStorage`.
- [ ] New Arrivals slider populates slides dynamically from the `sliders` table and auto-rotates smoothly.
- [ ] Category grid iterates over the `categories` table with valid links.
- [ ] Products catalog page (`products.php`) successfully filters by single and multiple categories and brands.
- [ ] Products catalog price range filter limits product results between min and max inputs.
- [ ] Products catalog top bar search query (`q`) and sort options (`price_asc`, `price_desc`, `newest`) function as expected.
- [ ] Catalog pagination accurately computes page offsets and displays correct result count.
- [ ] Product detail page (`product-detail.php`) retrieves single product by ID or SKU and populates gallery, info, specs, and related products.
- [ ] Contact form successfully inserts submission data into the `inquiries` table.
- [ ] Contact form triggers the WhatsApp web/app redirect with prefilled user inputs.
- [ ] Global search inputs across header and mobile drawers submit to `products.php?q=...` and return relevant product results.
- [ ] Mobile sticky bottom bar operates on screens under 768px with functional Call, WhatsApp, and Directions links.
- [ ] Browser developer console contains zero JavaScript errors or 404 network warnings.

---

## 14. Contact & Governance

This project adheres to the strict **Locked Update Rule** documented in `PROJECT-REPORT.md` Section 16:

- Every future update or backend modification that alters database schema, template structures, or form endpoints must update `PROJECT-REPORT.md` and `AUDIT.md` within the same revision.
- If a schema alteration is approved by the client, both `FIELD-NAMING-CONVENTION.md` and `FORM-FIELD-MAP.md` must be updated concurrently to maintain architectural synchronization across the entire repository.

---

## 15. Blog Module Admin Requirements (Phase 5)

This section specifies the operational and administrative requirements for the Blog module. The HTML templates (`blog.html`, `blog-detail.html`) and JavaScript fallback systems have been fully prepared to consume data directly from the MySQL database and administrative interface.

### 15.1 Rich Text Editor (WYSIWYG) Requirement
- The Admin Panel must utilize a Rich Text Editor (WYSIWYG) for article content generation, **NOT plain text or raw markdown input**.
- The editor must output sanitized, semantic HTML supporting:
  - Text formatting: Bold (`<b>` or `<strong>`), Italic (`<i>` or `<em>`), Underline (`<u>`)
  - Semantic lists: Ordered lists (`<ol>`), Unordered lists (`<ul>`), and list items (`<li>`)
  - Hyperlinks: Anchors (`<a href="..." target="_blank" rel="noopener">`)
  - Block structure: Paragraphs (`<p>`), Headings (`<h2>`, `<h3>`, `<h4>`), and Blockquotes (`<blockquote>`)
- In `blog-detail.php`, the database output will be echoed directly into `#post-container .post-content`, which has styled typography, table responsive wrappers, and responsive image rules ready to receive this HTML without any breaking changes.

### 15.2 Blog Thumbnail Upload
- The Admin Panel must include a dedicated image file upload control for the blog thumbnail image (`thumbnail_url`).
- Uploaded assets should be compressed to modern WebP format where feasible and stored in `blogs/thumbnails/` or an asset storage directory.
- The database stores the relative asset path (e.g. `blogs/thumbnails/article-slug.webp`) in the `blogs.thumbnail_url` column.

### 15.3 Status Toggle (Publish / Draft)
- The Admin Panel must feature an explicit status control toggle:
  - `published`: Article appears in public listings (`blog.php`), search queries, category filters, and related post sidebars.
  - `draft`: Article is restricted from public indexation and only accessible via authenticated admin previews.
- Public database queries must filter: `WHERE status = 'published' ORDER BY published_date DESC`.

### 15.4 Comment Moderation Queue
- All user comments submitted through the frontend form (`#comment-form` in `blog-detail.html`) default to an unapproved state (`is_approved = 0`).
- The Admin Panel must provide a dedicated Moderation Queue where site administrators can **Approve** or **Reject** pending comments.
- Only comments with `is_approved = 1` are echoed into the approved comment list:
  ```php
  <!-- PHP: foreach($approved_comments as $comment) { -->
  ```
- Public comment submission fields strictly map to `FORM-FIELD-MAP.md` Section 2.3:
  - `user_name`: Commenter public name
  - `user_email`: Commenter private email
  - `comment_text`: Comment body
  - `blog_id`: Target foreign key ID in the `blogs` table

### 15.5 Database Schema & Data Flow for Blog
- **JSON to MySQL Schema Flow**:
  - The static `blogs/posts.json` structure is a prototype mock and schema blueprint of the MySQL `blogs` table.
  - **Critical Fields**:
    - `id`: Unique primary key (`INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`).
    - `slug`: Clean URL slug (`VARCHAR(280) UNIQUE NOT NULL`) used for routing articles (`blog-detail.php?slug=...` or `/blog/...`).
    - `title`: Article headline (`VARCHAR(255) NOT NULL`).
    - `category`: Article category classification (`VARCHAR(100) DEFAULT NULL`).
    - `thumbnail_url`: Relative asset path to article banner image (`VARCHAR(255) NOT NULL`).
    - `author_name`: Author byline (`VARCHAR(100) DEFAULT 'Microsys Team'`).
    - `meta_description`: Search engine snippet and blog card excerpt (`TEXT DEFAULT NULL`).
    - `content_html`: Full article body output from Rich Text Editor (`LONGTEXT NOT NULL`).
    - `status`: Publishing state (`ENUM('draft', 'published') DEFAULT 'draft'`).
    - `is_featured`: Boolean flag (`TINYINT(1) DEFAULT 0`) denoting featured articles for priority presentation.
    - `published_date`: Publication timestamp (`TIMESTAMP DEFAULT CURRENT_TIMESTAMP`).
- **Rich Text Handling vs. Markdown**:
  - The `content_file` field in JSON currently points to a Markdown file (`.md`) rendered client-side by `marked.js` purely as a static prototype fallback.
  - In the PHP backend, the Admin Panel Rich Text Editor (TinyMCE/Quill) will save sanitized HTML directly into the `content_html` column of the `blogs` table, **NOT Markdown**.
  - The PHP developer will simply echo this HTML directly into `<article id="post-content" class="post-content">`:
    ```php
    <article id="post-content" class="post-content">
        <?php echo $blog['content_html']; ?>
    </article>
    ```
  - **No markdown parsing is needed in PHP**. The CSS container in `blogs/style.css` already styles all standard HTML elements (headings, bold, italics, blockquotes, lists, responsive tables, images, and code blocks).
- **Image Uploads & Storage**:
  - Blog thumbnails will be uploaded via the Admin Panel file upload interface and saved to a dedicated uploads directory (e.g., `/uploads/blogs/` or `blogs/thumbnails/`).
  - The database will store the relative file path string (e.g., `uploads/blogs/travel-agency-website-design-bihar-sharif.webp`) in the `thumbnail_url` column.
- **Comment Moderation Flow**:
  - **Submission**: A visitor submits the frontend comment form (`#comment-form` in `blog-detail.html` sending `user_name`, `user_email`, `comment_text`, and hidden `blog_id`).
  - **Default Status**: The backend endpoint inserts the comment record into the `comments` table with status "pending" (`is_approved = 0`).
  - **Admin Approval**: The submission appears in the Admin Panel Comment Moderation Queue, where an administrator reviews and approves it.
  - **Frontend Display**: Only comments approved by the administrator (`is_approved = 1`) are queried and displayed on the public frontend article page.

The frontend markup across `blog.html` and `blog-detail.html` is 100% complete and contains standardized PHP loop and variable markers ready for immediate backend integration.

---

## 16. Admin Panel Architecture (Backend Guide)

The Microsys platform includes a dedicated administrative suite located in the `/admin/` directory. This section outlines the backend architecture, authentication flows, routing conventions, CRUD operations, and media handling required for the PHP developer.

---

### 16.1 Authentication Flow & Session Protection
1. **Login Entry Point**:
   - `admin/login.html` serves as the entry point for administrative access.
   - The interface features form `#admin-login-form` (`method="POST"`), providing `admin_email` (type="email", autocomplete="username", required), `admin_password` (type="password", autocomplete="current-password", required), and a hidden `csrf_token` input.

2. **Authentication Handler (`admin/auth.php`)**:
   - The PHP developer must create `admin/auth.php` (or `admin/actions/login.php`) to process authentication:
     - Verify submitted `csrf_token` against `$_SESSION['csrf_token']`.
     - Query the administrative credentials record by `admin_email`.
     - Verify password hash using `password_verify($_POST['admin_password'], $admin['password_hash'])`.
     - Upon successful authentication:
       - Start/regenerate session: `session_start(); session_regenerate_id(true);`
       - Populate session state: `$_SESSION['admin_id'] = $admin['id']; $_SESSION['admin_email'] = $admin['email'];`
       - Redirect to Dashboard: `header("Location: index.html");` (or `index.php`).
       - Terminate execution: `exit;`
     - On failure: Redirect back with error notice (`header("Location: login.html?error=invalid_credentials"); exit;`).

3. **Mandatory Session Check on All Admin Pages**:
   - Every protected page in the `/admin/` directory must enforce an authentication check at the very top before rendering any HTML:
     ```php
     <?php
     session_start();
     if (!isset($_SESSION['admin_id'])) {
         header("Location: login.html");
         exit;
     }
     ?>
     ```
   - If an unauthenticated user or guest attempts to access `/admin/index.html` (or `.php`), `/admin/manage-products.html`, etc., the server terminates execution immediately and redirects them to the login screen.

---

### 16.2 File & Routing Structure
The administrative interface consists of the following modular files:
- `/admin/index.html` (Dashboard — KPI metrics, quick action shortcuts, recent inquiries list).
- `/admin/manage-products.html` (List view data table + 17-field Add/Edit inventory form).
- `/admin/manage-blogs.html` (Articles data table + Rich Text Add/Edit article form).
- `/admin/manage-comments.html` (Pending comment moderation queue and approval controls).
- `/admin/manage-inquiries.html` (Customer inquiries list with status updates: new, read, contacted, closed).
- `/admin/manage-banners.html` (Promotions management — Announcement bar & popup modal toggle forms).
- `/admin/manage-sliders.html` (Carousel sliders management — Data table + Add/Edit slide form).
- `/admin/manage-categories.html` (Category taxonomy management — Data table + Add/Edit form with cover image upload).
- `/admin/manage-services.html` (Technical services management — Data table + Add/Edit form with price range and active toggle).
- `/admin/script.js` (Client-side interactions: mobile sidebar navigation toggle, backdrop overlay, Add/Edit form smooth toggling).
- `/admin/styles.css` (Dedicated Admin layout, sidebar, topbar, modal, toggle switches, and table styling).

> **Important Architectural Note on Client JS vs Backend Logic**:  
> The admin panel JS handles UI toggles. For data operations (CRUD), form submissions will handle the backend logic. Remember to validate the `csrf_token` on the server for all incoming POST requests.

> **PHP Migration Recommendation**:
> The PHP developer should convert these static templates to `.php` files (e.g., `index.php`, `manage-products.php`, `manage-blogs.php`, `manage-comments.php`, `manage-inquiries.php`, `manage-banners.php`, `manage-sliders.php`, `manage-categories.php`, `manage-services.php`). This facilitates modular includes (`admin/includes/header.php`, `admin/includes/sidebar.php`, `admin/includes/footer.php`) and server-side rendering.

---

### 16.3 Form Submission Actions (CRUD Routing)
All Admin forms currently use `method="POST"`:
1. **Dedicated Action Scripts**:
   - The PHP developer needs to create modular action handlers in `/admin/actions/`:
     - `admin/actions/add-product.php` (or unified `save-product.php`)
     - `admin/actions/delete-product.php`
     - `admin/actions/add-blog.php` (or unified `save-blog.php`)
     - `admin/actions/delete-blog.php`
     - `admin/actions/moderate-comment.php`
     - `admin/actions/update-inquiry.php`
     - `admin/actions/save-promotion.php`
     - `admin/actions/save-slider.php`
     - `admin/actions/delete-slider.php`
     - `admin/actions/save-category.php`
     - `admin/actions/delete-category.php`
     - `admin/actions/save-service.php`
     - `admin/actions/delete-service.php`

2. **INSERT vs UPDATE Determination (Hidden ID Field)**:
   - Every Add/Edit form includes a hidden `id` field (`product_id` for products, `blog_id` for blogs):
     ```php
     $id = !empty($_POST['product_id']) ? intval($_POST['product_id']) : null;

     if (empty($id)) {
         // INSERT: ID is empty -> Create new record
         $stmt = $pdo->prepare("INSERT INTO products (sku, category_id, sub_category, brand, title, model_number, key_specs, full_specs, price, mrp, stock_status, warranty, badge, is_popular, image_primary, image_secondary, image_tertiary) VALUES (...)");
         $stmt->execute([...]);
     } else {
         // UPDATE: ID exists -> Update existing record
         $stmt = $pdo->prepare("UPDATE products SET sku = :sku, category_id = :category_id, sub_category = :sub_category, brand = :brand, title = :title, model_number = :model_number, key_specs = :key_specs, full_specs = :full_specs, price = :price, mrp = :mrp, stock_status = :stock_status, warranty = :warranty, badge = :badge, is_popular = :is_popular, image_primary = :image_primary, image_secondary = :image_secondary, image_tertiary = :image_tertiary WHERE id = :id");
         $stmt->execute([... ':id' => $id]);
     }
     ```

3. **Redirect After Action (Post/Redirect/Get)**:
   - After successfully executing the database operation, the handler must redirect the administrator back to the respective list view with a success indicator to avoid form resubmission on page refresh:
     ```php
     header("Location: ../manage-products.php?status=success&msg=saved");
     exit;
     ```
   - On the list view page, display an alert banner acknowledging the successful action.

4. **Inline POST Actions for Comment Moderation**:
   - `admin/manage-comments.html` uses 3 discrete inline `<form method="POST">` triggers per row (Approve, Reject, Delete) instead of vulnerable GET links.
   - The action endpoint `admin/actions/moderate-comment.php` must inspect `$_POST['action']` and `$_POST['comment_id']`, while validating `$_POST['csrf_token']`:
     ```php
     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
         if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
             die("CSRF validation failure");
         }

         $comment_id = intval($_POST['comment_id']);
         $action = $_POST['action'] ?? '';

         if ($action === 'approve') {
             $stmt = $pdo->prepare("UPDATE comments SET is_approved = 1 WHERE id = :id");
             $stmt->execute([':id' => $comment_id]);
         } elseif ($action === 'reject') {
             $stmt = $pdo->prepare("UPDATE comments SET is_approved = -1 WHERE id = :id");
             $stmt->execute([':id' => $comment_id]);
         } elseif ($action === 'delete') {
             $stmt = $pdo->prepare("DELETE FROM comments WHERE id = :id");
             $stmt->execute([':id' => $comment_id]);
         }

         header("Location: ../manage-comments.php?status=success&action=" . urlencode($action));
         exit;
     }
     ```
   - `admin/manage-inquiries.html` is a read-only audit log of customer submissions; inquiries are filtered and read without edit or delete mutations.

5. **Promotions Type Differentiation & Slider Ordering (Phase 6.7)**:
   - **Promotions Type Differentiation**:
     - `admin/manage-banners.html` controls two separate promotional mechanisms distinguished by `promotions.type` ENUM: `'announcement_bar'` and `'popup_modal'`.
     - The backend action handler `admin/actions/save-promotion.php` checks `$_POST['promo_type']`. If a promotion record of that type already exists, execute `UPDATE promotions SET text_content = :text_content, is_active = :is_active ... WHERE type = :type`; otherwise execute an `INSERT`.
     - The public storefront queries:
       - Top announcement bar: `SELECT * FROM promotions WHERE type = 'announcement_bar' AND is_active = 1 LIMIT 1;`
       - Promo popup modal: `SELECT * FROM promotions WHERE type = 'popup_modal' AND is_active = 1 LIMIT 1;`
   - **Slider Ordering Logic (`display_order`)**:
     - `admin/manage-sliders.html` manages slides for the homepage New Arrivals carousel with fields: `label`, `eyebrow`, `title`, `subtitle`, `image_url`, `link_url`, `display_order`, and `is_active`.
     - On the frontend (`index.html`), the PHP developer must query active slides sorted by `display_order` ascending:
       ```sql
       SELECT * FROM sliders WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC;
       ```
     - For slide editing, check if `$_POST['slider_id']` is populated. If empty, execute `INSERT INTO sliders (...)`; if populated, execute `UPDATE sliders SET ... WHERE id = :slider_id`.


6. **Category Taxonomy & Repair Services Integration (Phase 6.8)**:
   - **Category Taxonomy Management & Cover Images**:
     - `admin/manage-categories.html` controls the 12 product categories with fields: `name`, `slug`, `image_url` (file), and `display_order`.
     - Cover image uploads must be stored in the `/uploads/categories/` directory (see Section 16.4), and the relative asset path persisted to `categories.image_url`.
     - The public storefront queries active categories ordered by `display_order`:
       ```sql
       SELECT * FROM categories ORDER BY display_order ASC;
       ```
     - Handlers determine INSERT vs UPDATE using `$_POST['category_id']`. Deletions via `admin/actions/delete-category.php` require CSRF token validation and checking foreign key constraints on `products.category_id`.
   - **Technical Repair Services Displayed on About Us**:
     - `admin/manage-services.html` manages the repair and technical service cards displayed directly on the About Us page (`aboutus.html#repair-services`).
     - Fields include `title`, `description`, `price_range` (e.g., "₹500 - ₹1000" or "Free Diagnosis"), and `is_active` (toggle switch, 1/0).
     - The public storefront queries active services:
       ```sql
       SELECT * FROM services WHERE is_active = 1 ORDER BY id ASC;
       ```
     - Handlers determine INSERT vs UPDATE using `$_POST['service_id']`. Form submissions are protected by session `csrf_token`.

---

### 16.4 Image Upload Handling
Forms that accept image files (`#product-form` with `image_primary`, `image_secondary`, `image_tertiary`, `#blog-form` with `thumbnail_url`, `#slider-form` with `image_url`, and `#category-form` with `image_url`) are configured with `enctype="multipart/form-data"`:
1. **Handling `$_FILES`**:
   - The PHP developer must inspect `$_FILES['image_primary']`, `$_FILES['thumbnail_url']`, `$_FILES['image_url']`, etc.:
     - Check `$_FILES['image_url']['error'] === UPLOAD_ERR_OK`.
     - Validate MIME types against allowed image types (`image/jpeg`, `image/png`, `image/webp`).
     - Limit upload file sizes (e.g., max 2MB).
2. **Storage in Dedicated `/uploads/` Subdirectories**:
   - Store uploads in structured folders:
     - Products: `/uploads/products/`
     - Blogs: `/uploads/blogs/`
     - Categories: `/uploads/categories/` (e.g., category cover artwork)
     - Sliders / Banners: `/uploads/sliders/` and `/uploads/promotions/`
   - Generate unique, sanitized filenames to avoid naming collisions:
     ```php
     $uploadDir = __DIR__ . '/../../uploads/categories/';
     if (!is_dir($uploadDir)) {
         mkdir($uploadDir, 0755, true);
     }
     $extension = pathinfo($_FILES['image_url']['name'], PATHINFO_EXTENSION);
     $fileName = uniqid('cat_') . '.' . strtolower($extension);
     $destination = $uploadDir . $fileName;

     move_uploaded_file($_FILES['image_url']['tmp_name'], $destination);
     ```
3. **Database Path Persistence**:
   - Store the relative path in MySQL (e.g., `uploads/products/prod_6721fb3.webp`), NOT absolute server paths.
   - For `UPDATE` operations where no new file is uploaded (`$_FILES['image_primary']['error'] === UPLOAD_ERR_NO_FILE`), preserve the existing image path stored in the database.

---

## 17. SEO & Dynamic Meta Tags (Backend Guide)

This section outlines the backend integration requirements for search engine optimization, dynamic Open Graph metadata, structured JSON-LD schemas, crawler directives, and sitemap generation across the Microsys platform.

### 17.1 Dynamic Pages & Metadata Hydration
- **Product Detail (`product-detail.php`)**:
  - The `<head>` section contains explicit PHP comment markers for `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph / Twitter tags.
  - The PHP developer must query the product record by `slug` (or `id`/`sku`) from the `products` table:
    ```php
    $slug = $_GET['slug'] ?? null;
    $stmt = $pdo->prepare("SELECT * FROM products WHERE slug = :slug LIMIT 1");
    $stmt->execute(['slug' => $slug]);
    $product = $stmt->fetch();
    if (!$product) {
        http_response_code(404);
        include '404.php';
        exit;
    }
    ```
  - Hydrate dynamic values:
    - `<title>`: `<?php echo htmlspecialchars($product['product_name']); ?> in Biharsharif | Microsys</title>`
    - `<meta name="description">`: `<?php echo htmlspecialchars($product['meta_description'] ?? $product['key_specs']); ?> — View complete specifications, live showroom pricing...`
    - `<link rel="canonical">`: `https://microsys.in/product-detail.php?slug=<?php echo urlencode($product['slug']); ?>`
    - Open Graph / Twitter images: Use `https://microsys.in/assets/productimage/<?php echo htmlspecialchars($product['image_primary']); ?>`.
- **Blog Article Detail (`blog-detail.php`)**:
  - The `<head>` section contains PHP markers for `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph tags.
  - The PHP developer must query the article record by `slug` from the `blogs` table:
    ```php
    $slug = $_GET['slug'] ?? null;
    $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = :slug AND status = 'published' LIMIT 1");
    $stmt->execute(['slug' => $slug]);
    $post = $stmt->fetch();
    if (!$post) {
        http_response_code(404);
        include '404.php';
        exit;
    }
    ```
  - Hydrate dynamic values:
    - `<title>`: `<?php echo htmlspecialchars($post['title']); ?> | Microsys Blog`
    - `<meta name="description">`: `<?php echo htmlspecialchars($post['meta_description']); ?>`
    - `<link rel="canonical">`: `https://microsys.in/blog-detail.php?slug=<?php echo urlencode($post['slug']); ?>`
    - `og:image` / `twitter:image`: `https://microsys.in/<?php echo htmlspecialchars($post['thumbnail_url']); ?>`.

### 17.2 Structured Data Schemas (JSON-LD)
- **Static Schemas on Homepage (`index.php`)**:
  - `LocalBusiness` (`ComputerStore`) and `FAQPage` schemas are pre-rendered with locked showroom information (address, geo-coordinates, telephone, business hours, and Nalanda service areas) and require zero dynamic backend code.
- **Dynamic Product Schema (`product-detail.php`)**:
  - The `<script type="application/ld+json">` on `product-detail.php` must be dynamically hydrated using the `$product` record fields: `name`, `image`, `description`, `sku`, `brand.name`, `offers.price` (formatted numeric), `offers.priceCurrency` (`INR`), and `offers.availability` (`InStock` / `OutOfStock`).
- **Dynamic BlogPosting Schema (`blog-detail.php`)**:
  - The `<script type="application/ld+json">` on `blog-detail.php` must be dynamically hydrated using the `$post` record fields: `headline`, `description`, `image`, `author.name`, `datePublished`, and `mainEntityOfPage`.

### 17.3 XML Sitemap Strategy (Static vs. Dynamic)
- **Static Sitemap (`sitemap.xml`)**:
  - The root `sitemap.xml` file covers the core static and landing routes (`/`, `/products.html`, `/aboutus.html`, `/blog.html`).
- **Dynamic Sitemap Generation (`sitemap.php`)**:
  - In production, the PHP developer should implement a dynamic sitemap generator (e.g. `sitemap.php` mapped via `.htaccess` to `/sitemap.xml`):
    - Query all active products: `SELECT slug, updated_at FROM products WHERE availability != 'discontinued';`
    - Query all published blog posts: `SELECT slug, published_date FROM blogs WHERE status = 'published';`
    - Output compliant XML with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` for every individual product and blog route.

### 17.4 Search Engine Directives & Admin Protection
- **Admin Panel Noindex**:
  - All 10 administrative templates in `/admin/` explicitly contain `<meta name="robots" content="noindex, nofollow">` in their `<head>`.
  - When converting admin templates to PHP, ensure this directive is permanently preserved in the shared `admin/includes/header.php`.
- **Robots Directives (`robots.txt`)**:
  - The root `robots.txt` enforces `Disallow: /admin/` to protect admin authentication and CRUD endpoints from crawler indexation, while referencing `Sitemap: https://microsys.in/sitemap.xml`.




