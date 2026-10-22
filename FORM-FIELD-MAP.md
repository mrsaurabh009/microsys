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
  - Header Navigation Bar (Desktop): index.html, aboutus.html, laptops.html, desktop-pcs.html, components.html, gaming.html
  - Mobile Drawer Navigation (Mobile): index.html, aboutus.html, laptops.html, desktop-pcs.html, components.html, gaming.html
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

### 2.3 Blog Comment Form (Planned)

- Location: Future blog post detail pages (Planned blog module)
- Form Purpose: Reader feedback, hardware inquiries, and article discussion
- Current Markup State: Not yet built; planned architecture specification
- Target SQL Table: comments
- Form Method: POST
- Form Action: comment-submit.php [TO CONFIRM WITH CLIENT]
- Moderation Policy: All user comments default to pending approval status and require administrator review before appearing publicly [CLIENT TO CONFIRM]

| Field Label / Purpose | Planned Form Control | Locked name="" Value | HTML Input Type | Required? | Placeholder Text | Target SQL Column | Moderation & Processing Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Commenter Name | Text input | user_name | text | Required | Your Name | user_name | Publicly displayed author name on approved comments |
| Commenter Email | Email input | user_email | email | Required | Your Email Address | user_email | Used for Gravatar lookup and internal verification; never rendered publicly |
| Comment Body | Textarea | comment_text | textarea | Required | Write your comment here… | comment_text | [PHP TO VALIDATE: Minimum 5 characters, maximum 1000 characters, strip HTML tags] |
| Blog Article Reference | Hidden input | blog_id | hidden | Required | None | blog_id | Foreign key integer linking to the parent article in the blogs table |

---

## 3. Administrative Panel Forms (Planned)

Administrative panel interfaces are planned for future backend management. This section locks all field definitions and form contracts for the PHP developer before template construction begins.

### 3.1 Admin — Product Management Form

- Purpose: Add, update, and manage hardware inventory across the catalog
- Target SQL Table: products
- Form Method: POST
- Encoding Type: multipart/form-data (Required for file uploads)
- Scope: Incorporates all 17 locked product fields from FIELD-NAMING-CONVENTION.md

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Product SKU Code | product_id_sku | text | Required | product_id_sku | VARCHAR(64) UNIQUE NOT NULL. Alphanumeric SKU identifier |
| Primary Category | category | select | Required | category | Permitted options: laptops, desktop-pcs, components, gaming |
| Secondary Sub-category | sub_category | select | Optional | sub_category | Permitted options: processors, motherboards, graphics-cards, ram, storage, power-supplies, cabinets, cooling |
| Hardware Brand | brand | text | Required | brand | Brand name (e.g., HP, Lenovo, Dell, ASUS, Intel, AMD, NVIDIA) |
| Commercial Product Name | product_name | text | Required | product_name | Full commercial product title |
| Manufacturer Model Code | model_number | text | Optional | model_number | Model designation (e.g., 15s-fq5000, 3520, FA506) |
| Concise Specs Summary | key_specs | text | Required | key_specs | Summary line (e.g., Core i5 / 16GB RAM / 512GB SSD) |
| Detailed Specifications | full_specs | textarea | Optional | full_specs | Detailed technical breakdown [CLIENT TO CONFIRM: Plain Text vs JSON] |
| Active Selling Price | price | number | Required | price | DECIMAL(10,2) NOT NULL. Step 0.01, Minimum 0 |
| Maximum Retail Price | mrp | number | Optional | mrp | DECIMAL(10,2) DEFAULT NULL. Step 0.01, Minimum 0 |
| Stock Availability State | availability | select | Required | availability | Permitted options: in_stock, out_of_stock, on_order |
| Primary Card Image | image_primary | file | Required | image_primary | Accepts image/*, stored as relative path or URL |
| Secondary Gallery Image | image_secondary | file | Optional | image_secondary | Accepts image/*, stored as relative path or URL |
| Tertiary Gallery Image | image_tertiary | file | Optional | image_tertiary | Accepts image/*, stored as relative path or URL |
| Warranty Terms | warranty | text | Optional | warranty | Coverage string (e.g., 1 Year Onsite, 3 Years Domestic) |
| Marketing Tag / Badge | badge | text | Optional | badge | Editorial tag (e.g., Bestseller, New Arrival, Hot Deal) |
| Homepage Featured Flag | is_popular | checkbox | Required | is_popular | TINYINT(1) DEFAULT 0. Value="1". Toggles Popular Products display |
| Product URL Slug | slug | text | Required | slug | VARCHAR(280) UNIQUE NOT NULL. URL-safe SEO slug |
| Active Visibility State | is_active | checkbox | Required | is_active | TINYINT(1) DEFAULT 1. Value="1". Toggles live catalog display |

### 3.2 Admin — Blog Article Form

- Purpose: Create and edit showroom news, buyer guides, and tech articles
- Target SQL Table: blogs
- Form Method: POST
- Encoding Type: multipart/form-data

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Article Title | title | text | Required | title | VARCHAR(255) NOT NULL |
| URL Slug | slug | text | Required | slug | VARCHAR(255) UNIQUE NOT NULL. URL-safe slug [Auto-generated or manual] |
| Blog Category | category | select | Required | category | Permitted options: Buying Guides, Hardware News, Tech Support, Showroom Updates |
| Cover Feature Image | cover_image | file | Required | cover_image | Accepts image/*, stored as relative path or URL |
| Full Article Content | content | textarea | Required | content | LONGTEXT / TEXT NOT NULL. Markdown or Rich Text HTML |
| Publication Status | status | select | Required | status | Permitted options: draft, published |

### 3.3 Admin — Slider Form

- Purpose: Configure hero sliders and homepage carousel slides
- Target SQL Table: sliders
- Form Method: POST
- Encoding Type: multipart/form-data

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Slide Headline / Title | title | text | Required | title | VARCHAR(255) NOT NULL. Internal label or visible banner headline |
| Slide Banner Asset | image | file | Required | image | Accepts image/*, stored as relative path or URL |
| Destination Target URL | target_link | url | Optional | target_link | VARCHAR(255) DEFAULT NULL. Relative path or external web address |
| Active Display Toggle | is_active | checkbox | Required | is_active | TINYINT(1) DEFAULT 1. Value="1". Determines live rendering |

### 3.4 Admin — Banner and Promotional Campaign Form

- Purpose: Manage top promotional bars, discount popups, and seasonal banners
- Target SQL Table: promotions
- Form Method: POST
- Encoding Type: multipart/form-data

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Promotion Placement Type | promo_type | select | Required | promo_type | Permitted options: top_bar, popup_modal |
| Primary Banner Headline | headline | text | Required | headline | VARCHAR(255) NOT NULL. Main promotional announcement text |
| Supporting Subtext | subtext | text | Optional | subtext | VARCHAR(255) DEFAULT NULL. Terms, coupon info, or subtitle |
| Promotional Graphic | image | file | Optional | image | Accepts image/*, stored as relative path or URL |
| Action Button Label | cta_text | text | Optional | cta_text | VARCHAR(64) DEFAULT NULL. Button text (e.g., Explore Deals) |
| Action Destination Link | cta_link | url | Optional | cta_link | VARCHAR(255) DEFAULT NULL. URL destination for the action button |
| Active Display State | is_active | checkbox | Required | is_active | TINYINT(1) DEFAULT 1. Value="1". Toggles campaign visibility |

### 3.5 Admin — Category Taxonomy Form

- Purpose: Manage catalog hardware categories and department cards
- Target SQL Table: categories
- Form Method: POST
- Encoding Type: multipart/form-data

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Category Display Title | name | text | Required | name | VARCHAR(100) NOT NULL. Full department title |
| Canonical URL Slug | slug | text | Required | slug | VARCHAR(100) UNIQUE NOT NULL. Kebab-case URL identifier |
| Sorting / Display Order | display_order | number | Required | display_order | INT NOT NULL DEFAULT 1. Controls sorting sequence in navigation |
| Category Graphic / Icon | image | file | Optional | image | Accepts image/*, stored as relative path or URL |

### 3.6 Admin — Service Offering Form

- Purpose: Manage technical support and repair offerings displayed on aboutus.html
- Target SQL Table: services
- Form Method: POST
- Encoding Type: application/x-www-form-urlencoded

| Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Column | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Service Offering Title | service_name | text | Required | service_name | VARCHAR(150) NOT NULL. Title of the repair or maintenance service |
| Minimum Starting Fee | starting_price | number | Required | starting_price | DECIMAL(10,2) NOT NULL. Baseline fee displayed on service card |
| Turnaround Timeline | turnaround_days | number | Optional | turnaround_days | INT DEFAULT NULL. Estimated service turnaround duration in days |
| Service Scope Description | description | textarea | Required | description | TEXT NOT NULL. Scope of diagnosis, repair, or setup provided |

### 3.7 Admin — Comment Moderation Actions

- Purpose: Review and moderate incoming public blog comments
- Target SQL Table: comments
- Form Structure: Action-oriented tabular control; no freeform input controls
- Form Method: POST
- Action Parameters:
  - comment_id: Hidden input containing primary key integer of the targeted comment
  - action: Hidden input or button value with allowed operations: approve, reject, delete
- Database Behavior:
  - approve updates comments.status to 'approved'
  - reject updates comments.status to 'rejected'
  - delete executes DELETE FROM comments WHERE id = comment_id

### 3.8 Admin — Customer Inquiry Management Actions

- Purpose: Review, triage, and follow up on customer leads submitted via the storefront
- Target SQL Table: inquiries
- Form Structure: Action-oriented tabular list; no freeform input controls
- Form Method: POST
- Action Parameters:
  - inquiry_id: Hidden input containing primary key integer of the targeted inquiry
  - action: Hidden input or button value with allowed operations: mark_in_progress, mark_resolved, delete
- Database Behavior:
  - mark_in_progress updates inquiries.status to 'in_progress'
  - mark_resolved updates inquiries.status to 'resolved'
  - delete executes DELETE FROM inquiries WHERE id = inquiry_id

---

## 4. Master Form Field Mapping Table

This master table brings together every form field across public storefront pages and planned administrative interfaces into a single alphabetical and functional reference.

| Form Name / Location | Field Purpose | Locked name="" Value | HTML Input Type | Required? | Target SQL Table | Target SQL Column | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Contact Form (index.html) | Customer Full Name | full_name | text | Required | inquiries | full_name | Maps to customer lead contact name |
| Contact Form (index.html) | Customer Phone Number | phone_number | tel | Required | inquiries | phone_number | 10-digit phone number for customer follow-up |
| Contact Form (index.html) | Customer Email Address | email | email | Optional | inquiries | email | Optional email address |
| Contact Form (index.html) | Enquiry Classification | enquiry_type | select | Required | inquiries | enquiry_type | Dropdown options: Sales Enquiry, Repair & Service, Custom PC Build, Bulk / Commercial Order [CLIENT TO CONFIRM] |
| Contact Form (index.html) | Target Product or Service | product_or_service | text | Required | inquiries | product_or_service | Hardware item or service requested |
| Contact Form (index.html) | Customer Message Body | message | textarea | Required | inquiries | message | Detailed customer message or configuration request |
| Search (Desktop, 6 Pages) | Global Keyword Query | q | search | Optional | products | Query parameter | GET parameter (?q=) filtered against products table columns |
| Search (Mobile, 6 Pages) | Global Keyword Query | q | search | Optional | products | Query parameter | Identical GET parameter (?q=) for mobile drawer search |
| Blog Comment Form (Planned) | Commenter Name | user_name | text | Required | comments | user_name | Public author name on approved comments |
| Blog Comment Form (Planned) | Commenter Email | user_email | email | Required | comments | user_email | Author verification email address |
| Blog Comment Form (Planned) | Comment Body | comment_text | textarea | Required | comments | comment_text | User comment text body |
| Blog Comment Form (Planned) | Blog Article Reference | blog_id | hidden | Required | comments | blog_id | Foreign key referencing parent article ID |
| Admin Product Form | Product SKU Identifier | product_id_sku | text | Required | products | product_id_sku | Unique product SKU string |
| Admin Product Form | Catalog Category | category | select | Required | products | category | High-level department slug |
| Admin Product Form | Hardware Sub-category | sub_category | select | Optional | products | sub_category | Specific component hardware family slug |
| Admin Product Form | Hardware Brand | brand | text | Required | products | brand | Manufacturer brand title |
| Admin Product Form | Commercial Product Name | product_name | text | Required | products | product_name | Full commercial catalog name |
| Admin Product Form | Manufacturer Model Code | model_number | text | Optional | products | model_number | Hardware model code |
| Admin Product Form | Key Specs Summary | key_specs | text | Required | products | key_specs | Standardized spec teaser line |
| Admin Product Form | Full Technical Specs | full_specs | textarea | Optional | products | full_specs | Complete hardware specifications block |
| Admin Product Form | Active Selling Price | price | number | Required | products | price | Numeric decimal in INR |
| Admin Product Form | Maximum Retail Price | mrp | number | Optional | products | mrp | Strikethrough list price in INR |
| Admin Product Form | Stock Availability Status | availability | select | Required | products | availability | Physical stock condition |
| Admin Product Form | Primary Catalog Image | image_primary | file | Required | products | image_primary | File upload path for main catalog thumbnail |
| Admin Product Form | Secondary Image Asset | image_secondary | file | Optional | products | image_secondary | Optional gallery angle photo |
| Admin Product Form | Tertiary Image Asset | image_tertiary | file | Optional | products | image_tertiary | Optional gallery angle photo |
| Admin Product Form | Manufacturer Warranty | warranty | text | Optional | products | warranty | Official coverage terms |
| Admin Product Form | Marketing Tag / Badge | badge | text | Optional | products | badge | Promotional highlight tag |
| Admin Product Form | Homepage Featured Flag | is_popular | checkbox | Required | products | is_popular | Toggles Popular Products section display |
| Admin Product Form | Product URL Slug | slug | text | Required | products | slug | Unique product URL slug string |
| Admin Product Form | Active Visibility State | is_active | checkbox | Required | products | is_active | Toggles product catalog visibility |
| Admin Blog Form | Blog Article Headline | title | text | Required | blogs | title | Headline title of editorial post |
| Admin Blog Form | Article URL Slug | slug | text | Required | blogs | slug | Clean URL identifier string |
| Admin Blog Form | Topic Classification | category | select | Required | blogs | category | Blog taxonomy category |
| Admin Blog Form | Featured Cover Photo | cover_image | file | Required | blogs | cover_image | File upload path for header visual |
| Admin Blog Form | Article Body Content | content | textarea | Required | blogs | content | Full markdown or formatted article copy |
| Admin Blog Form | Publication State | status | select | Required | blogs | status | Draft or published publication status |
| Admin Slider Form | Slide Title / Headline | title | text | Required | sliders | title | Slide identifier or display heading |
| Admin Slider Form | Slide Banner Asset | image | file | Required | sliders | image | File upload path for slide image |
| Admin Slider Form | Action Target Link | target_link | url | Optional | sliders | target_link | Destination URL for user click |
| Admin Slider Form | Active Visibility State | is_active | checkbox | Required | sliders | is_active | Toggles slide activation in carousel |
| Admin Banner Form | Promotion Placement Type | promo_type | select | Required | promotions | promo_type | Placement: top_bar or popup_modal |
| Admin Banner Form | Banner Headline | headline | text | Required | promotions | headline | Main promotional announcement title |
| Admin Banner Form | Promotional Subtext | subtext | text | Optional | promotions | subtext | Explanatory terms or coupon subtext |
| Admin Banner Form | Promotional Artwork | image | file | Optional | promotions | image | File upload path for promo banner |
| Admin Banner Form | Action Button Text | cta_text | text | Optional | promotions | cta_text | Button label string |
| Admin Banner Form | Action Destination URL | cta_link | url | Optional | promotions | cta_link | Target URL for promotional button |
| Admin Banner Form | Campaign Active Toggle | is_active | checkbox | Required | promotions | is_active | Toggles active display of campaign |
| Admin Category Form | Department Display Name | name | text | Required | categories | name | Commercial category title |
| Admin Category Form | Canonical URL Slug | slug | text | Required | categories | slug | URL identifier slug |
| Admin Category Form | Sorting Sequence Order | display_order | number | Required | categories | display_order | Integer sort index for navigation order |
| Admin Category Form | Category Card Graphic | image | file | Optional | categories | image | File upload path for department artwork |
| Admin Service Form | Service Offering Title | service_name | text | Required | services | service_name | Official name of repair service |
| Admin Service Form | Minimum Starting Price | starting_price | number | Required | services | starting_price | Baseline fee in INR |
| Admin Service Form | Turnaround Estimate | turnaround_days | number | Optional | services | turnaround_days | Estimated days to complete repair |
| Admin Service Form | Service Description | description | textarea | Required | services | description | Detailed scope of repair service |
| Admin Comment Moderation | Target Comment Reference | comment_id | hidden | Required | comments | id | Primary key of comment record |
| Admin Comment Moderation | Moderation Command | action | hidden | Required | comments | status | Action: approve, reject, or delete |
| Admin Inquiry Management | Target Inquiry Reference | inquiry_id | hidden | Required | inquiries | id | Primary key of inquiry record |
| Admin Inquiry Management | Triage Command | action | hidden | Required | inquiries | status | Action: mark_in_progress, mark_resolved, delete |

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
| laptops.html (Header) | Desktop Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| laptops.html (Drawer) | Mobile Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| desktop-pcs.html (Header) | Desktop Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| desktop-pcs.html (Drawer) | Mobile Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| components.html (Header) | Desktop Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| components.html (Drawer) | Mobile Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| gaming.html (Header) | Desktop Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |
| gaming.html (Drawer) | Mobile Search | Loose input lacking form | Wrap in form element with method="GET" action="search.php" and add name="q" | High | Phase 0 Step 5 |

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

- Document Status: Permanently locked as the authoritative form field mapping standard.
- Governance: In accordance with the project governance rules established in PROJECT-REPORT.md, no field names, attributes, or table assignments in this document may be renamed, removed, or modified without formal architectural sign-off.
- Lock Date: 2026-10-15
- Phase: Phase 0 Step 4 Completed

---

## 8. References

- Product Field Specifications: [FIELD-NAMING-CONVENTION.md](file:///d:/Frontend%20Projects/microsys/FIELD-NAMING-CONVENTION.md)
- Frontend Audit Report: [AUDIT-FIELDS.md](file:///d:/Frontend%20Projects/microsys/AUDIT-FIELDS.md)
- Product Card Master Reference: [COMPONENT-product-card.html](file:///d:/Frontend%20Projects/microsys/COMPONENT-product-card.html)
- Overall Codebase Audit: [AUDIT.md](file:///d:/Frontend%20Projects/microsys/AUDIT.md)
- Project Governance & Tracking: [PROJECT-REPORT.md](file:///d:/Frontend%20Projects/microsys/PROJECT-REPORT.md)
