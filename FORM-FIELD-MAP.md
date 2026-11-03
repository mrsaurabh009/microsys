# Master Form Field to SQL Column Mapping Specification

## 1. Purpose & Scope

### Summary
This specification establishes the authoritative, single-source-of-truth mapping between frontend form controls, their HTML name attributes, and backend MySQL database tables and columns across the Microsys web platform.

### Intended Audience
This document is designed for backend PHP developers, database administrators, and frontend integration engineers. It provides all field names, expected input types, validation requirements, and target table structures needed to implement form handlers and database tables without ambiguity.

### What It Locks
1. All HTML name="" attribute values for existing storefront forms and planned administrative panels.
2. Target MySQL table and column destinations for all submitted form data.
3. Form transmission methods (GET versus POST) and content encoding standards.
4. Input constraints, requirement states, and validation rules.
5. Migration roadmap for upgrading live markup during Phase 0 Step 5.

This document supersedes all prior preliminary form field notes and works in tandem with FIELD-NAMING-CONVENTION.md.

---

## 2. Public Storefront Forms

### 2.1 Contact and Inquiry Form

- Location: index.html (Final Contact Section, Showroom Directions & Inquiry Area)
- Form Identifier: mainContactForm
- Enclosing Element: form element currently present in markup
- Current Action: action="#" [Awaiting production PHP handler endpoint]
- Current Method: method="POST"
- Submission Trigger: Submit button click intercepted by JavaScript; to be migrated to direct or AJAX PHP submission
- Target SQL Table: inquiries
- Status: Live in markup but completely missing name="" attributes across all 6 controls

| Field Label / Purpose | Current HTML State | Locked name="" Value | HTML Input Type | Required? | Placeholder Text | Target SQL Column | Validation & Handler Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Customer Full Name | Missing name attribute | full_name | text | Required | Full Name | full_name | [PHP TO VALIDATE: Non-empty string, maximum 100 characters, sanitize special characters] |
| Customer Phone Number | Missing name attribute | phone_number | tel | Required | Phone Number | phone_number | [PHP TO VALIDATE: 10-digit Indian phone format starting with 6, 7, 8, or 9] |
| Customer Email Address | Missing name attribute | email | email | Optional | Email (optional) | email | [PHP TO VALIDATE: Standard RFC 5322 email syntax validation if provided, NULL if empty] |
| Enquiry Classification | Text input missing name attribute | enquiry_type | select | Required | Select Enquiry Type | enquiry_type | Convert from text input to select dropdown. Predefined options: Sales Enquiry, Repair & Service, Custom PC Build, Bulk / Commercial Order [CLIENT TO CONFIRM] |
| Target Product or Service | Missing name attribute | product_or_service | text | Required | Product or Service | product_or_service | Populated with hardware title or service requested. Can be prefilled via URL parameter from catalog cards |
| Customer Message Body | Textarea missing name attribute | message | textarea | Required | Message | message | [PHP TO VALIDATE: Non-empty string, maximum 2000 characters, strip unsafe markup] |

### 2.2 Global Search Forms

- Locations:
  - Header Navigation Bar (Desktop): index.html, aboutus.html, products.html, product-detail.html, blog.html, blog-detail.html
  - Mobile Drawer Navigation (Mobile): index.html, aboutus.html, products.html, product-detail.html, blog.html, blog-detail.html
- Total Search Instances: 12 instances across 6 pages (1 desktop header + 1 mobile drawer per page)
- Current Markup State: Loose input element (input type="text" class="search-input") without an enclosing form element and without a name="" attribute
- Migration Standard: Enclose within a semantic form element targeting search.php
- Form Action: search.php [TO CONFIRM WITH CLIENT: Final search results page route]
- Form Method: GET
- Submission Trigger: Enter keypress or click on search magnifying glass button; debounced client-side suggestions operate on keyup
- Target SQL Scope: Multi-column LIKE query on products table (matching product_name, brand, key_specs, model_number, category)

| Field Purpose | Current HTML State | Locked name="" Value | HTML Input Type | Required? | Placeholder Text | Target Query Parameter | Handler & Architectural Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Keyword Search Query | Loose input lacking name | q | search | Optional | Search laptops, components, accessories… | $_GET['q'] | Handled via URL parameter (?q=query). Input type set to search with fallback text. Whitespace trimmed before SQL query |

### 2.3 Blog Comment Form (Built in blog-detail.html)

- Location: Dedicated blog article pages (`blog-detail.html#comments`)
- Form Identifier: `comment-form`
- Enclosing Element: `<form id="comment-form" method="POST">`
- Target SQL Table: `comments`
- Form Method: POST
- Form Action: `comment-submit.php` [Backend endpoint to process comment submissions]
- Moderation Policy: All user comments default to pending approval status (`is_approved = 0`) and require administrator moderation before appearing publicly

| Field Label / Purpose | Form Control | Locked name="" Value | HTML Input Type | Required? | Placeholder Text | Target SQL Column | Moderation & Processing Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Commenter Name | Text input | `user_name` | text | Required | Your Name | `commenter_name` | Publicly displayed author name on approved comments |
| Commenter Email | Email input | `user_email` | email | Required | Your Email Address | `commenter_email` | Used for Gravatar lookup and internal verification; never rendered publicly |
| Comment Body | Textarea | `comment_text` | textarea | Required | Write your comment here… | `body` | [PHP TO VALIDATE: Minimum 5 characters, maximum 1000 characters, strip HTML tags] |
| Blog Article Reference | Hidden input | `blog_id` | hidden | Required | None | `blog_id` | Foreign key integer linking to the parent article in the `blogs` table |

---

## 3. Administrative Panel Forms (Built & Specification)

Administrative panel interfaces are located in `/admin/`. This section locks all field definitions and form contracts for the PHP developer.

### 3.1 Admin — Product Management Form (Built in admin/manage-products.html)

- Location: `admin/manage-products.html#product-form`
- Purpose: Add, update, and manage hardware inventory across the catalog
- Target SQL Table: `products`
- Form Method: POST
- Encoding Type: `multipart/form-data` (Required for file uploads)
- Scope: Incorporates all 17 locked product fields from `FIELD-NAMING-CONVENTION.md`

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Primary Record Key (Edit Mode) | `product_id` | hidden | Optional | `id` | INT UNSIGNED; present during Edit mode |
| CSRF Security Token | `csrf_token` | hidden | Required | N/A | Session validation cryptographic token |
| Product SKU Code | `product_id_sku` | text | Required | `sku` / `product_id_sku` | VARCHAR(64) UNIQUE NOT NULL. Alphanumeric SKU identifier |
| Primary Category | `category` | select | Required | `category` | 12 department options matching homepage categories. Selected slug determines where the product appears when filtering the unified Catalog page (`products.html?category=<slug>` / `products.php?category=<slug>`) |
| Secondary Sub-category | `sub_category` | select | Optional | `sub_category` | 8 component families (processors, motherboards, etc.) |
| Hardware Brand | `brand` | text | Required | `brand` | Brand name (e.g., HP, Lenovo, Dell, ASUS, Intel, AMD, NVIDIA) |
| Commercial Product Name | `product_name` | text | Required | `name` | Full commercial product title |
| Manufacturer Model Code | `model_number` | text | Optional | `model_number` | Model designation (e.g., 15s-fq5000, 3520, FA506) |
| Concise Specs Summary | `key_specs` | text | Required | `key_specs` | Summary line (e.g., Core i5 / 16GB RAM / 512GB SSD) |
| Detailed Specifications | `full_specs` | textarea | Optional | `full_specs` | Detailed technical specs block |
| Active Selling Price | `price` | number | Required | `price` | DECIMAL(10,2) NOT NULL. Step 0.01, Minimum 0 |
| Maximum Retail Price | `mrp` | number | Optional | `mrp` | DECIMAL(10,2) DEFAULT NULL. Step 0.01, Minimum 0 |
| Stock Availability State | `availability` | select | Required | `availability` | Permitted options: `in_stock`, `out_of_stock`, `pre_order` |
| Primary Card Image | `image_primary` | file | Required | `image_primary` | Accepts `image/*`, stored as relative asset path |
| Secondary Gallery Image | `image_secondary` | file | Optional | `image_secondary` | Accepts `image/*`, stored as relative asset path |
| Tertiary Gallery Image | `image_tertiary` | file | Optional | `image_tertiary` | Accepts `image/*`, stored as relative asset path |
| Warranty Terms | `warranty` | text | Optional | `warranty` | Coverage string (e.g., 1 Year Onsite, 3 Years Domestic) |
| Marketing Tag / Badge | `badge` | text | Optional | `badge` | Editorial tag (e.g., Bestseller, New Arrival, Hot Deal) |
| Homepage Featured Flag | `is_popular` | checkbox | Optional | `is_popular` | TINYINT(1) DEFAULT 0. Value="1". Toggles Popular Products display |

> **SEO Metadata Note for Products**:  
> In the database layer, each product entity contains `slug` (VARCHAR(280) UNIQUE NOT NULL) and optionally `meta_description` (TEXT DEFAULT NULL). The backend handler generates or accepts the canonical `slug` from `product_name` for SEO routing (`product-detail.php?slug=<slug>`), and uses `meta_description` (falling back to `key_specs`) for dynamic SERP snippets and social preview cards.

### 3.2 Admin — Blog Article Form (Built in admin/manage-blogs.html)

- Location: `admin/manage-blogs.html#blog-form`
- Purpose: Create and edit showroom news, buyer guides, and tech articles
- Target SQL Table: `blogs`
- Form Method: POST
- Encoding Type: `multipart/form-data`

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Primary Record Key (Edit Mode) | `blog_id` | hidden | Optional | `id` | INT UNSIGNED; present during Edit mode |
| CSRF Security Token | `csrf_token` | hidden | Required | N/A | Session validation cryptographic token |
| Article Title | `title` | text | Required | `title` | VARCHAR(255) NOT NULL |
| URL Slug | `slug` | text | Required | `slug` | VARCHAR(280) UNIQUE NOT NULL. SEO URL slug |
| Blog Category | `category` | select | Required | `category` | Permitted options: Buying Guide, Hardware Tips, News, Maintenance |
| Author Name | `author_name` | text | Optional | `author_name` | VARCHAR(100) DEFAULT 'Microsys Team' |
| Cover Thumbnail Asset | `thumbnail_url` | file | Required | `thumbnail_url` | Accepts `image/*`, stored as relative path (e.g., `blogs/thumbnails/item.webp`) |
| Publication Status | `status` | select | Required | `status` | Permitted options: `Draft`, `Published` |
| Meta Description | `meta_description` | textarea | Optional | `meta_description` | TEXT DEFAULT NULL. Concise 150-160 char SEO summary |
| Article Body Content | `content_file` / `content_html` | textarea (`#rich-text-editor`) | Required | `content_html` | LONGTEXT NOT NULL. Output of Rich Text Editor (TinyMCE/Quill) saved as sanitized HTML |
| Priority Feature Toggle | `is_featured` | checkbox | Optional | `is_featured` | TINYINT(1) DEFAULT 0. Value="1". Flags priority article |
| Submit Action Trigger | `status_action` | submit button | Required | `status` | Value="Published" or Value="Draft" |

### 3.3 Admin — Slider Form (Specification)

- Purpose: Configure hero sliders and New Arrivals carousel slides
- Target SQL Table: `sliders`
- Form Method: POST
- Encoding Type: `multipart/form-data`

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Slide Record ID (Edit Mode) | `slider_id` | hidden | Optional | `id` | INT UNSIGNED; present during Edit mode |
| CSRF Security Token | `csrf_token` | hidden | Required | N/A | Session validation cryptographic token |
| Slide Banner Asset | `image_url` | file / text | Required | `image_url` | VARCHAR(255) NOT NULL. Banner graphic path |
| Destination Target URL | `link_url` | url / text | Optional | `link_url` | VARCHAR(255) DEFAULT NULL. Relative path or external web link |
| Promotional Tag / Label | `label` | text | Optional | `label` | VARCHAR(100) DEFAULT NULL (e.g., "Trending Now", "Sale") |
| Eyebrow Header | `eyebrow` | text | Optional | `eyebrow` | VARCHAR(150) DEFAULT NULL. Uppercase accent teaser header |
| Slide Headline / Title | `title` | text | Optional | `title` | VARCHAR(255) DEFAULT NULL. Primary commercial title |
| Secondary Subtitle Copy | `subtitle` | textarea / text | Optional | `subtitle` | VARCHAR(500) DEFAULT NULL. Supporting descriptive copy |
| Sorting / Display Order | `display_order` | number | Required | `display_order` | TINYINT UNSIGNED DEFAULT 0. Sequence integer |
| Active Display Toggle | `is_active` | checkbox | Required | `is_active` | TINYINT(1) DEFAULT 1. Value="1". Determines live rendering |

### 3.4 Admin — Banner and Promotional Campaign Forms (admin/manage-banners.html)

- Purpose: Control the top announcement bar and the promo popup modal
- Target SQL Table: `promotions`
- Form Method: POST (`admin/actions/save-promotion.php`)
- Encoding Type: `multipart/form-data`
- Structure: Two independent forms on page (Section A: Announcement Bar, Section B: Promo Popup)

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Promotion Record ID | `promotion_id` | hidden | Optional | `id` | INT UNSIGNED; primary key of promotion record |
| CSRF Security Token | `csrf_token` | hidden | Required | session | Cryptographic session token validated on POST |
| Promotion Placement Type | `promo_type` | hidden | Required | `type` | Permitted ENUM options: `announcement_bar`, `popup_modal` |
| Announcement Message / Headline | `text_content` | text | Required | `text_content` | VARCHAR(500) DEFAULT NULL. Announcement or popup copy |
| Promotional Artwork | `image_url` | file | Optional (Popup: Rec) | `image_url` | VARCHAR(255) DEFAULT NULL. Relative path to banner asset |
| Active Display Toggle | `is_active` | checkbox (toggle) | Required | `is_active` | TINYINT(1) DEFAULT 1. Value="1". Live storefront display |

### 3.5 Admin — Category Taxonomy Form (admin/manage-categories.html)

- Purpose: Manage catalog hardware categories and department cards
- Target SQL Table: `categories`
- Form Method: POST (`admin/actions/save-category.php`)
- Encoding Type: `multipart/form-data`

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Category Record ID (Edit Mode) | `category_id` | hidden | Optional | `id` | INT UNSIGNED; present during Edit mode |
| CSRF Security Token | `csrf_token` | hidden | Required | N/A | Session validation cryptographic token |
| Category Display Title | `name` | text | Required | `name` | VARCHAR(100) NOT NULL. Full department title |
| Canonical URL Slug | `slug` | text | Required | `slug` | VARCHAR(100) UNIQUE NOT NULL. Kebab-case URL identifier |
| Category Cover Image | `image_url` | file | Optional | `image_url` | File upload stored in `/uploads/categories/` |
| Sorting / Display Order | `display_order` | number | Required | `display_order` | INT NOT NULL DEFAULT 1. Controls navigation sequence |

### 3.6 Admin — Service Offering Form (admin/manage-services.html)

- Purpose: Manage technical support and repair offerings displayed on aboutus.html
- Target SQL Table: `services`
- Form Method: POST (`admin/actions/save-service.php`)
- Encoding Type: `application/x-www-form-urlencoded`

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Service Record ID (Edit Mode) | `service_id` | hidden | Optional | `id` | INT UNSIGNED; present during Edit mode |
| CSRF Security Token | `csrf_token` | hidden | Required | N/A | Session validation cryptographic token |
| Service Offering Title | `title` | text | Required | `title` | VARCHAR(200) NOT NULL. Title of the repair or maintenance service |
| Price Guidance / Range | `price_range` | text | Optional | `price_range` | VARCHAR(100) DEFAULT NULL (e.g., "₹500 - ₹1000" or "Free Diagnosis") |
| Service Scope Description | `description` | textarea | Optional | `description` | TEXT DEFAULT NULL. Scope of diagnosis, repair, or setup provided |
| Active Display Toggle | `is_active` | checkbox (toggle) | Required | `is_active` | TINYINT(1) DEFAULT 1. Value="1". Live display on About Us page |

### 3.7 Admin — Comment Moderation Actions (admin/manage-comments.html)

- Purpose: Moderate incoming visitor discussions on blog articles
- Target SQL Table: `comments`
- Form Method: POST (`admin/actions/moderate-comment.php`)
- Form Structure: 3 discrete inline action forms per comment row

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Target Comment Identifier | comment_id | hidden | Required | id | INT UNSIGNED. Primary key of comment record |
| Moderation Action Command | action | button (type="submit") | Required | is_approved | Values: `approve` (sets `is_approved = 1`), `reject` (sets `is_approved = -1`), `delete` (executes `DELETE`) |
| CSRF Protection Token | csrf_token | hidden | Required | session | Cryptographic token validated against `$_SESSION['csrf_token']` |

- Post-Action Handling:
  - Validates `csrf_token` and authenticates admin session.
  - Executes appropriate UPDATE / DELETE query via prepared statements.
  - Redirects back to `manage-comments.php?status=success&action=[approve|reject|delete]`.

### 3.8 Admin — Customer Inquiry Management Actions

- Purpose: Review, triage, and follow up on customer leads submitted via the storefront
- Target SQL Table: `inquiries`
- Form Structure: Action-oriented tabular list; no freeform input controls
- Form Method: POST
- Action Parameters:
  - `inquiry_id`: Hidden input containing primary key integer of the targeted inquiry
  - `action`: Hidden input or button value with allowed operations: `mark_in_progress`, `mark_resolved`, `delete`
  - `csrf_token`: Hidden cryptographic token for POST validation
- Database Behavior:
  - `mark_in_progress` updates `inquiries.status` to `'contacted'`
  - `mark_resolved` updates `inquiries.status` to `'closed'`
  - `delete` executes `DELETE FROM inquiries WHERE id = inquiry_id`

---

## 4. Master Form Field Mapping Table

This master table brings together every form field across public storefront pages and administrative interfaces into a single alphabetical and functional reference.

| Form Name / Location | Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Table | Target SQL Column | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Contact Form (index.html) | Customer Full Name | full_name | text | Required | inquiries | full_name | Maps to customer lead contact name |
| Contact Form (index.html) | Customer Phone Number | phone_number | tel | Required | inquiries | phone_number | 10-digit phone number for customer follow-up |
| Contact Form (index.html) | Customer Email Address | email | email | Optional | inquiries | email | Optional email address |
| Contact Form (index.html) | Enquiry Classification | enquiry_type | select | Required | inquiries | enquiry_type | Dropdown options: Sales Enquiry, Repair & Service, Custom PC Build, Bulk / Commercial Order |
| Contact Form (index.html) | Target Product or Service | product_or_service | text | Required | inquiries | product_interest | Hardware item or service requested |
| Contact Form (index.html) | Customer Message Body | message | textarea | Required | inquiries | message | Detailed customer message or configuration request |
| Search (Desktop, 6 Pages) | Global Keyword Query | q | search | Optional | products | Query parameter | GET parameter (?q=) filtered against products table columns |
| Search (Mobile, 6 Pages) | Global Keyword Query | q | search | Optional | products | Query parameter | Identical GET parameter (?q=) for mobile drawer search |
| Blog Comment Form (blog-detail.html) | Commenter Name | user_name | text | Required | comments | commenter_name | Public author name on approved comments |
| Blog Comment Form (blog-detail.html) | Commenter Email | user_email | email | Required | comments | commenter_email | Author verification email address |
| Blog Comment Form (blog-detail.html) | Comment Body | comment_text | textarea | Required | comments | body | User comment text body |
| Blog Comment Form (blog-detail.html) | Blog Article Reference | blog_id | hidden | Required | comments | blog_id | Foreign key referencing parent article ID |
| Admin Product Form | Product SKU Identifier | product_id_sku | text | Required | products | sku | Unique product SKU string |
| Admin Product Form | Catalog Category | category | select | Required | products | category | 12 high-level department slugs |
| Admin Product Form | Hardware Sub-category | sub_category | select | Optional | products | sub_category | 8 component hardware family slugs |
| Admin Product Form | Hardware Brand | brand | text | Required | products | brand | Manufacturer brand title |
| Admin Product Form | Commercial Product Name | product_name | text | Required | products | name | Full commercial catalog name |
| Admin Product Form | Manufacturer Model Code | model_number | text | Optional | products | model_number | Hardware model code |
| Admin Product Form | Key Specs Summary | key_specs | text | Required | products | key_specs | Standardized spec teaser line |
| Admin Product Form | Full Technical Specs | full_specs | textarea | Optional | products | full_specs | Complete hardware specifications block |
| Admin Product Form | Active Selling Price | price | number | Required | products | price | Numeric decimal in INR |
| Admin Product Form | Maximum Retail Price | mrp | number | Optional | products | mrp | Strikethrough list price in INR |
| Admin Product Form | Stock Availability Status | availability | select | Required | products | availability | Physical stock condition (`in_stock`, `out_of_stock`, `pre_order`) |
| Admin Product Form | Primary Catalog Image | image_primary | file | Required | products | image_primary | File upload path for main catalog thumbnail |
| Admin Product Form | Secondary Image Asset | image_secondary | file | Optional | products | image_secondary | Optional gallery angle photo |
| Admin Product Form | Tertiary Image Asset | image_tertiary | file | Optional | products | image_tertiary | Optional gallery angle photo |
| Admin Product Form | Manufacturer Warranty | warranty | text | Optional | products | warranty | Official coverage terms |
| Admin Product Form | Marketing Tag / Badge | badge | text | Optional | products | badge | Promotional highlight tag |
| Admin Product Form | Homepage Featured Flag | is_popular | checkbox | Optional | products | is_popular | Toggles Popular Products section display |
| Admin Blog Form | Blog Article Headline | title | text | Required | blogs | title | Headline title of editorial post |
| Admin Blog Form | Article URL Slug | slug | text | Required | blogs | slug | Clean SEO URL identifier string |
| Admin Blog Form | Topic Classification | category | select | Required | blogs | category | Blog taxonomy category |
| Admin Blog Form | Author Byline | author_name | text | Optional | blogs | author_name | Author display name (default: Microsys Team) |
| Admin Blog Form | Featured Cover Photo | thumbnail_url | file | Required | blogs | thumbnail_url | File upload path for 16:9 banner visual |
| Admin Blog Form | Search Meta Description | meta_description | textarea | Optional | blogs | meta_description | 150-160 char summary for SERP and cards |
| Admin Blog Form | Article Body Content | content_file / content_html | textarea | Required | blogs | content_html | Sanitized HTML from Rich Text Editor (TinyMCE/Quill) |
| Admin Blog Form | Publication State | status | select | Required | blogs | status | Draft or published publication status |
| Admin Blog Form | Priority Feature Flag | is_featured | checkbox | Optional | blogs | is_featured | Toggles hero/promo widget feature |
| Admin Slider Form | Slide Promotional Label | label | text | Optional | sliders | label | Badge or pill label (e.g., "Trending Now") |
| Admin Slider Form | Slide Eyebrow Teaser | eyebrow | text | Optional | sliders | eyebrow | Accent teaser header above main title |
| Admin Slider Form | Slide Headline / Title | title | text | Optional | sliders | title | Slide commercial title or headline |
| Admin Slider Form | Slide Subtitle / Copy | subtitle | textarea | Optional | sliders | subtitle | Expanded descriptive promo copy |
| Admin Slider Form | Slide Banner Asset | image_url | file / text | Required | sliders | image_url | File upload path for slide image |
| Admin Slider Form | Action Target Link | link_url | url | Optional | sliders | link_url | Destination URL for user click |
| Admin Slider Form | Slide Sorting Sequence | display_order | number | Required | sliders | display_order | Numerical rotation sequence order |
| Admin Slider Form | Active Visibility State | is_active | checkbox | Required | sliders | is_active | Toggles slide activation in carousel |
| Admin Banner Form | Promotion Placement Type | promo_type | select | Required | promotions | type | Placement: announcement_bar or popup_modal |
| Admin Banner Form | Banner Headline / Text | text_content | text | Required | promotions | text_content | Main promotional announcement title |
| Admin Banner Form | Promotional Artwork | image_url | file | Optional | promotions | image_url | File upload path for promo banner |
| Admin Banner Form | Campaign Active Toggle | is_active | checkbox | Required | promotions | is_active | Toggles active display of campaign |
| Admin Category Form | Category Record Reference | category_id | hidden | Optional | categories | id | Primary key present during Edit mode |
| Admin Category Form | CSRF Security Token | csrf_token | hidden | Required | session | csrf_token | Cryptographic session token |
| Admin Category Form | Department Display Name | name | text | Required | categories | name | Commercial category title |
| Admin Category Form | Canonical URL Slug | slug | text | Required | categories | slug | URL identifier slug |
| Admin Category Form | Sorting Sequence Order | display_order | number | Required | categories | display_order | Integer sort index for navigation order |
| Admin Category Form | Category Card Graphic | image_url | file | Optional | categories | image_url | File upload path for department artwork |
| Admin Service Form | Service Record Reference | service_id | hidden | Optional | services | id | Primary key present during Edit mode |
| Admin Service Form | CSRF Security Token | csrf_token | hidden | Required | session | csrf_token | Cryptographic session token |
| Admin Service Form | Service Offering Title | title | text | Required | services | title | Official name of repair service |
| Admin Service Form | Service Price Range | price_range | text | Optional | services | price_range | Baseline fee or range in INR |
| Admin Service Form | Service Description | description | textarea | Optional | services | description | Detailed scope of repair service |
| Admin Service Form | Active Display Toggle | is_active | checkbox | Required | services | is_active | Toggles active display on About Us page |
| Admin Comment Moderation | Target Comment Reference | comment_id | hidden | Required | comments | id | Primary key of comment record |
| Admin Comment Moderation | Moderation Command | action | hidden / button | Required | comments | is_approved | Action: approve (sets 1), reject (sets -1), delete |
| Admin Comment Moderation | Security CSRF Token | csrf_token | hidden | Required | session | csrf_token | Cryptographic CSRF validation token |
| Admin Inquiry Management | Target Inquiry Reference | inquiry_id | hidden | Required | inquiries | id | Primary key of inquiry record |
| Admin Inquiry Management | Triage Command | action | hidden / button | Required | inquiries | status | Action: mark_in_progress, mark_resolved, delete |

---

## 5. Migration Checklist

The following existing live form controls must be updated during Phase 0 Step 5 to align with this locked specification.

| Page Location | Component Element | Current State | Target Markup Standard | Priority | Scheduled Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| index.html (#contact) | Full Name input | Lacks name attribute | Add name="full_name" | High | Phase 0 Step 5 |
| index.html (#contact) | Phone Number input | Lacks name attribute | Add name="phone_number" | High | Phase 0 Step 5 |
| index.html (#contact) | Email input | Lacks name attribute | Add name="email" | High | Phase 0 Step 5 |
| index.html (#contact) | Enquiry Type input | Text input lacking name | Convert to select element with name="enquiry_type" and 4 standard options | High | Phase 0 Step 5 |
| index.html (#contact) | Product/Service input | Lacks name attribute | Add name="product_or_service" | High | Phase 0 Step 5 |
| index.html (#contact) | Message textarea | Lacks name attribute | Add name="message" | High | Phase 0 Step 5 |
| index.html (Header) | Desktop Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| index.html (Drawer) | Mobile Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| aboutus.html (Header) | Desktop Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| aboutus.html (Drawer) | Mobile Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| products.html (Header & Top Bar) | Desktop / Catalog Search | Form control | Form element with method="GET" action="products.html" and name="q" | High | Completed |
| products.html (Drawer) | Mobile Search | Form control | Form element with method="GET" action="products.html" and name="q" | High | Completed |
| product-detail.html (Header & Drawer) | Desktop & Mobile Search | Form control | Form element with method="GET" action="products.html" and name="q" | High | Completed |
| blog.html (Header & Drawer) | Desktop & Mobile Search | Form control | Form element with method="GET" action="products.html" and name="q" | High | Completed |
| blog-detail.html (Header & Drawer) | Desktop & Mobile Search | Form control | Form element with method="GET" action="products.html" and name="q" | High | Completed |

---

## 6. Developer Quick-Reference

### How to Onboard in Under 5 Minutes

1. Parity Guarantee: Every HTML form field name in this document exactly matches its destination MySQL table column name.
2. Inquiries Form Processing: Configure your inquiry submission handler to inspect $_POST['full_name'], $_POST['phone_number'], $_POST['email'], $_POST['enquiry_type'], $_POST['product_or_service'], and $_POST['message'].
3. Search Form Processing: Configure your search results page handler to read $_GET['q']. Sanitize this value and execute a parameter-bound multi-column search query across the products table.
4. File Upload Form Encodings: When constructing future administrative forms (Product, Blog, Slider, Banner, Category), always ensure the form element specifies method="POST" and enctype="multipart/form-data".
5. Status Flags and Booleans: Checkbox inputs (such as is_popular in products and is_active in sliders or promotions) transmit value="1" when checked and are absent from $_POST when unchecked. Initialize defaults to 0 prior to database insertion.
6. Separation of Concerns: Storefront markup migration is scheduled for Phase 0 Step 5. No live HTML forms have been edited prior to client approval of this specification.

### Common Pitfalls to Avoid

- Do not use $_REQUEST; use explicit $_POST for form submissions and $_GET for search queries.
- Do not abbreviate field names (e.g., do not use sku for product_id_sku, desc for description, or img for image_primary).
- Do not create separate search input names for mobile and desktop views; both must use name="q".
- Do not treat availability and badge as the same field; availability is a required inventory condition, while badge is an optional marketing highlight.

---

## 7. Lock & Sign-off

- Document Status: Permanently locked as the authoritative form field mapping standard. Fully verified across all public storefront forms and all Admin Panel UI forms with 100% database schema parity and CSRF protection tokens.
- Governance: In accordance with the project governance rules established in PROJECT-REPORT.md, no field names, attributes, or table assignments in this document may be renamed, removed, or modified without formal architectural sign-off.
- Lock Date: 2026-10-31
- Phase: Phase 6 Complete (Full Admin & Storefront Form Field Mapping Verified)

---

## 8. References

- Product Field Specifications: [FIELD-NAMING-CONVENTION.md](file:///d:/Frontend%20Projects/microsys/FIELD-NAMING-CONVENTION.md)
- Frontend Audit Report: [AUDIT-FIELDS.md](file:///d:/Frontend%20Projects/microsys/AUDIT-FIELDS.md)
- Product Card Master Reference: [COMPONENT-product-card.html](file:///d:/Frontend%20Projects/microsys/COMPONENT-product-card.html)
- Overall Codebase Audit: [AUDIT.md](file:///d:/Frontend%20Projects/microsys/AUDIT.md)
- Project Governance & Tracking: [PROJECT-REPORT.md](file:///d:/Frontend%20Projects/microsys/PROJECT-REPORT.md)
