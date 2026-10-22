# Field Naming Convention & Specification Standard

## 1. Purpose & Scope

This specification locks the naming standards, data types, HTML form attributes, CSS display classes, and PHP variable bindings for the 17-field product standard across the Microsys web platform. Designed as an onboarding reference for the client's PHP backend developer, this document establishes a direct, 1-to-1 parity between frontend markup and backend database columns. 

This standard locks all 17 product data fields, form control name attributes, card display classes, and PHP variable mappings. It does not dictate database table architecture, indexing algorithms, or server-side framework choice, leaving infrastructure implementation to the backend development team while guaranteeing that frontend templates integrate cleanly without naming friction.

---

## 2. The Locked 17 Fields

All product-related content across the platform must conform strictly to the following 17 fields in the exact order specified below. Field names are permanently locked in snake_case.

1. product_id_sku: Unique product identifier / Stock Keeping Unit. Required (NOT NULL). Unique constraint. No default.
2. category: Primary category slug. Required (NOT NULL). Indexed. No default.
3. sub_category: Secondary sub-category slug. Optional (NULL allowed). Indexed. Default: NULL.
4. brand: Hardware manufacturer or brand name. Required (NOT NULL). Indexed. No default.
5. product_name: Full commercial title of the product. Required (NOT NULL). No default.
6. model_number: Manufacturer-assigned model code. Optional (NULL allowed). Default: NULL.
7. key_specs: Concise specification summary string for catalog cards. Required (NOT NULL). No default.
8. full_specs: Complete technical specifications document or data block. Optional (NULL allowed). Default: NULL.
9. price: Active selling price in Indian Rupees. Required (NOT NULL). Indexed. No default.
10. mrp: Maximum Retail Price (list price) in Indian Rupees. Optional (NULL allowed). Default: NULL.
11. availability: Inventory status classification. Required (NOT NULL). Indexed. Default: 'in_stock'.
12. image_primary: File path or asset URL for the primary product image. Required (NOT NULL). No default.
13. image_secondary: File path or asset URL for secondary gallery image. Optional (NULL allowed). Default: NULL.
14. image_tertiary: File path or asset URL for tertiary gallery image. Optional (NULL allowed). Default: NULL.
15. warranty: Duration and terms of manufacturer warranty. Optional (NULL allowed). Default: NULL.
16. badge: Promotional or marketing tag text. Optional (NULL allowed). Default: NULL.
17. is_popular: Flag determining promotion in homepage Popular Products section. Required (NOT NULL). Indexed. Default: 0.

### Database Infrastructure Columns (Non-Content Metadata)
The 17 fields above represent product content. At the database layer, standard operational columns may be added by the backend engineer:
- id: INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## 3. Field Data Types

Every locked field is mapped below to its corresponding SQL column type and frontend HTML input control.

| Field Name | SQL Column Type & Constraints | HTML Input Type & Mode | Requirement & Defaults | Usage Notes |
| :--- | :--- | :--- | :--- | :--- |
| product_id_sku | VARCHAR(64) NOT NULL UNIQUE | text (admin input) / data attribute (display) | Required, Unique, No Default | Alphanumeric SKU (e.g., LAP-HP-15S-001). Exposes primary reference for stock lookups. |
| category | VARCHAR(64) NOT NULL | select dropdown (admin) / data attribute | Required, Indexed, No Default | Permitted slugs: laptops, desktop-pcs, components, gaming. Used for high-level catalog routing. |
| sub_category | VARCHAR(64) DEFAULT NULL | select dropdown (admin) / data attribute | Optional, Indexed, Default: NULL | Permitted component slugs: processors, motherboards, graphics-cards, ram, storage, power-supplies, cabinets, cooling. |
| brand | VARCHAR(64) NOT NULL | select dropdown or text (admin) | Required, Indexed, No Default | Brand title (e.g., HP, Lenovo, Dell, ASUS, Intel, AMD, NVIDIA). Displayed prominently on cards. |
| product_name | VARCHAR(255) NOT NULL | text (admin) / heading element (display) | Required, No Default | Full display name. Also feeds WhatsApp enquiry message prefilling. |
| model_number | VARCHAR(100) DEFAULT NULL | text (admin) / secondary text (display) | Optional, Default: NULL | Hardware specific model identifier (e.g., 15s-fq5000, 3520, FA506). |
| key_specs | VARCHAR(255) NOT NULL | text (admin) / teaser line (display) | Required, No Default | Standardized slash-delimited spec line (e.g., 12th Gen Core i3 / 16GB RAM / 512GB SSD / Windows 11). |
| full_specs | TEXT DEFAULT NULL | textarea or rich text (admin) / detail modal | Optional, Default: NULL [CLIENT TO CONFIRM: TEXT markdown vs JSON] | Detailed hardware breakdown for expanded product views. |
| price | DECIMAL(10,2) NOT NULL | number (step="0.01", min="0") | Required, Indexed, No Default | Numeric currency figure without symbol. Currency glyph (₹) is added during frontend template rendering. |
| mrp | DECIMAL(10,2) DEFAULT NULL | number (step="0.01", min="0") | Optional, Default: NULL | Strikethrough list price. When present and greater than price, triggers discount percentage badge. |
| availability | ENUM('in_stock','out_of_stock','on_order') NOT NULL | select dropdown (admin) / status pill | Required, Indexed, Default: 'in_stock' [CLIENT TO CONFIRM: Additional enum states] | Physical stock status. Must not be confused with promotional badge. Controls purchase/enquiry CTA availability. |
| image_primary | VARCHAR(255) NOT NULL | file upload (image/*) or asset path text | Required, No Default | Relative path or URL to primary catalog card photo (e.g., assets/productimage/item.webp). |
| image_secondary | VARCHAR(255) DEFAULT NULL | file upload (image/*) or asset path text | Optional, Default: NULL | Secondary gallery angle. [NOT YET DISPLAYED — reserved for future detail modal]. |
| image_tertiary | VARCHAR(255) DEFAULT NULL | file upload (image/*) or asset path text | Optional, Default: NULL | Tertiary gallery angle. [NOT YET DISPLAYED — reserved for future detail modal]. |
| warranty | VARCHAR(100) DEFAULT NULL | text (admin) / warranty badge (display) | Optional, Default: NULL | Official manufacturer coverage (e.g., 1 Year Onsite, 3 Years Domestic). |
| badge | VARCHAR(50) DEFAULT NULL | text or select dropdown (admin) | Optional, Default: NULL | Marketing flag (e.g., Bestseller, New Arrival, Hot Deal). Rendered only when non-empty. |
| is_popular | TINYINT(1) NOT NULL DEFAULT 0 | checkbox (value="1") | Required, Indexed, Default: 0 | Boolean flag (0 = regular catalog item, 1 = featured in homepage popular products section). |

---

## 4. HTML name="" Attributes

To eliminate integration guesswork, every user-facing form input and future administrative input is locked to exact snake_case values matching backend column definitions.

### Public Storefront Forms

| Form Location | Field Purpose | Current State | Locked name="" Value | HTML Input Type | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| index.html (Final Contact CTA) | Customer Full Name | Missing | full_name | text | Required field. Maps to inquiries table full_name column. |
| index.html (Final Contact CTA) | Customer Phone Number | Missing | phone_number | tel | Required field. Maps to inquiries table phone_number column. |
| index.html (Final Contact CTA) | Customer Email Address | Missing | email | email | Optional field. Maps to inquiries table email column. |
| index.html (Final Contact CTA) | Enquiry Classification | Missing | enquiry_type | select [converted from text] | Required dropdown options: Sales Enquiry, Repair & Service, Custom PC Build, Bulk / Commercial Order. |
| index.html (Final Contact CTA) | Requested Product or Service | Missing | product_or_service | text | Required field. Maps to inquiries table product_or_service column. |
| index.html (Final Contact CTA) | Customer Message Body | Missing | message | textarea | Required field. Maps to inquiries table message column. |
| Header Navigation (All 6 Pages) | Desktop Search Query | Missing | q | search / text | Form method: GET. Action: search.php. Global search input. |
| Mobile Navigation Drawer (All 6 Pages) | Mobile Search Query | Missing | q | search / text | Form method: GET. Action: search.php. Drawer search input. |

### Future Administrative Product Management Forms

| Field Purpose | Locked name="" Value | HTML Input Type | Associated SQL Column |
| :--- | :--- | :--- | :--- |
| Product SKU / Primary Code | product_id_sku | text | product_id_sku |
| Catalog Category | category | select | category |
| Sub-category Group | sub_category | select | sub_category |
| Manufacturer / Brand | brand | text / select | brand |
| Display Product Name | product_name | text | product_name |
| Manufacturer Model Code | model_number | text | model_number |
| Key Specifications Summary | key_specs | text | key_specs |
| Comprehensive Technical Specs | full_specs | textarea | full_specs |
| Active Selling Price (INR) | price | number (step="0.01") | price |
| Maximum Retail Price (INR) | mrp | number (step="0.01") | mrp |
| Inventory Stock Status | availability | select | availability |
| Primary Image Asset | image_primary | file / text | image_primary |
| Secondary Image Asset | image_secondary | file / text | image_secondary |
| Tertiary Image Asset | image_tertiary | file / text | image_tertiary |
| Manufacturer Warranty Term | warranty | text | warranty |
| Marketing Tag / Badge | badge | text | badge |
| Featured on Homepage Tabs | is_popular | checkbox | is_popular |

---

## 5. Canonical CSS Classes

To resolve class name drift identified during the audit, this table locks the canonical CSS display class for each product component. Frontend styles adhere to hyphenated kebab-case, while dynamic data bindings adhere to snake_case.

| Concept | Canonical CSS Class | Alternative Deprecated Classes | Data Attributes | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Product Card Wrapper | .product-card | .card (in mega menu), .product_card | data-product-id, data-category, data-sub-category | Main card boundary container. |
| Product Media Outer | .product-image-wrapper | .card-image-box, .category-card-img | None | Aspect ratio and containment box. |
| Product Media Inner | .product-image-inner | None | None | Centers and houses the primary img element. |
| Product Brand Label | .product-brand | None | None | Small uppercase label for brand identity. |
| Product Heading Title | .product-name | .card-title, .product_name | data-product-name | Primary title heading. Text used by WhatsApp inquiry scripts. |
| Product Model Number | .product-model | None [NEW — to add in Phase 0 Step 3] | None | Secondary model identifier placed adjacent to brand or specs. |
| Specifications Line | .product-specs | .product-details, .key-specs | None | Concise summary spec teaser line. |
| Selling Price | .product-price | None | data-raw-price | Active selling price display with formatted rupee glyph. |
| List / MRP Price | .product-mrp | None [NEW — to add in Phase 0 Step 3] | data-raw-mrp | Strikethrough price display for discount visualization. |
| Stock Availability Status | .product-availability | .product-avail, conflated in .product-badge | data-stock-status | Explicit stock condition pill (e.g., In Stock, Out of Stock). Separated from badge. |
| Promotional Tag / Badge | .product-badge | Conflated with stock status | None | Reserved exclusively for promotional markers (e.g., Bestseller, New Arrival). Hidden if null. |
| Warranty Badge | .product-warranty | None [NEW — to add in Phase 0 Step 3] | None | Compact warranty trust indicator (e.g., 1 Year Warranty). |
| Card Actions Wrapper | .product-actions | None | None | Container for action buttons. |
| Details Action Button | .btn-secondary | None | None | Button targeting modal or product detail route. |
| WhatsApp Action Button | .btn-whatsapp | .whatsapp-btn | None | Direct lead generation link with auto-composed message text. |
| Category Teaser Card | .category-card | None | data-category | Shop-by-category cards on homepage. |
| Repair Service Card | .service-card | None | data-service-id | Repair service cards on aboutus.html. |
| Future Article / Blog Card | .blog-card | None [FUTURE — reference only] | data-article-id | Reserved for future editorial components. |

---

## 6. Field → PHP Variable → HTML Mapping

This end-to-end traceability table shows how each database column is retrieved via PHP associative arrays and rendered into target frontend markup.

| Field Name | SQL Column Specification | PHP Variable Pattern | HTML Display Location | Attribute & Functional Mapping |
| :--- | :--- | :--- | :--- | :--- |
| product_id_sku | VARCHAR(64) NOT NULL UNIQUE | $product['product_id_sku'] | Rendered into card wrapper attribute | data-product-id and data-sku attributes on .product-card |
| category | VARCHAR(64) NOT NULL | $product['category'] | Rendered into card wrapper attribute | data-category on .product-card; controls tab panel filtering |
| sub_category | VARCHAR(64) DEFAULT NULL | $product['sub_category'] | Rendered into card wrapper attribute | data-sub-category on .product-card on components.html |
| brand | VARCHAR(64) NOT NULL | $product['brand'] | Inside .product-brand text node | Displays brand name above product title |
| product_name | VARCHAR(255) NOT NULL | $product['product_name'] | Inside .product-name text node | Rendered in title; populated into data-product-name attribute |
| model_number | VARCHAR(100) DEFAULT NULL | $product['model_number'] | Inside .product-model text node | Rendered in secondary detail block [NEW] |
| key_specs | VARCHAR(255) NOT NULL | $product['key_specs'] | Inside .product-specs text node | Single summary specs line |
| full_specs | TEXT DEFAULT NULL | $product['full_specs'] | Detail modal / expanded drawer | Rendered in specification table [NOT YET DISPLAYED] |
| price | DECIMAL(10,2) NOT NULL | $product['price'] | Inside .product-price text node | Formatted with Indian number formatting and currency symbol |
| mrp | DECIMAL(10,2) DEFAULT NULL | $product['mrp'] | Inside .product-mrp text node | Strikethrough text node rendered when mrp > price [NEW] |
| availability | ENUM('in_stock','out_of_stock','on_order') | $product['availability'] | Inside .product-availability text node | Displays humanized text; sets data-stock-status attribute |
| image_primary | VARCHAR(255) NOT NULL | $product['image_primary'] | src attribute of img inside .product-image-inner | Main thumbnail image source with alt attribute bound to product_name |
| image_secondary | VARCHAR(255) DEFAULT NULL | $product['image_secondary'] | data-image-secondary attribute | Secondary thumbnail image [NOT YET DISPLAYED] |
| image_tertiary | VARCHAR(255) DEFAULT NULL | $product['image_tertiary'] | data-image-tertiary attribute | Tertiary thumbnail image [NOT YET DISPLAYED] |
| warranty | VARCHAR(100) DEFAULT NULL | $product['warranty'] | Inside .product-warranty text node | Warranty badge line [NEW] |
| badge | VARCHAR(50) DEFAULT NULL | $product['badge'] | Inside .product-badge text node | Rendered conditionally only when badge value is not empty |
| is_popular | TINYINT(1) NOT NULL DEFAULT 0 | $product['is_popular'] | Rendered into card wrapper attribute | data-is-popular attribute; controls homepage tab assignment |

---

## 7. Deprecations & Migrations

The following naming deviations and structural ambiguities identified during the audit are scheduled for migration during subsequent implementation phases.

| Current Variant | Canonical Replacement | Affected Files | Priority | Scheduled Phase |
| :--- | :--- | :--- | :--- | :--- |
| Unnamed search inputs | form container with GET method, action="search.php", and name="q" | index.html, aboutus.html, laptops.html, desktop-pcs.html, components.html, gaming.html | High | Phase 0 Step 3 |
| Unnamed contact form inputs | name="full_name", name="phone_number", name="email", name="enquiry_type", name="product_or_service", name="message" | index.html | High | Phase 0 Step 3 |
| Conflated .product-badge displaying stock availability | Decouple: .product-badge for marketing tags, .product-availability for inventory state | index.html, laptops.html, desktop-pcs.html, components.html, gaming.html | High | Phase 0 Step 3 |
| Missing product SKU attributes | Add data-product-id and data-sku attributes to all card wrappers | index.html, laptops.html, desktop-pcs.html, components.html, gaming.html | High | Phase 0 Step 3 |
| Hardcoded currency text in .product-price without raw data attribute | Add data-raw-price attribute storing unformatted decimal | index.html, laptops.html, desktop-pcs.html, components.html, gaming.html | Medium | Phase 0 Step 3 |
| Absence of MRP container | Introduce .product-mrp container with strikethrough styling | index.html, laptops.html, desktop-pcs.html, components.html, gaming.html | Medium | Phase 0 Step 3 |
| Absence of warranty container | Introduce .product-warranty container on product cards | index.html, laptops.html, desktop-pcs.html, components.html, gaming.html | Low | Phase 0 Step 3 |
| Generic .card class in header mega menu | Replace with .product-card-preview or update mega menu card container | index.html, aboutus.html, laptops.html, desktop-pcs.html, components.html, gaming.html | Medium | Phase 0 Step 3 |
| Inconsistent placeholder comment tokens (hyphen vs em dash vs slash) | Standardize all template insertion comments to standard dotted notation | index.html, laptops.html, desktop-pcs.html, components.html, gaming.html | Low | Phase 0 Step 3 |

---

## 8. Developer Quick-Reference

### How to Onboard in Under 5 Minutes

1. Database Schema Parity: Create your MySQL products table columns using the exact names and types specified in Section 2 and Section 3. Do not modify column names or alter casing.
2. Associative Array Mapping: In your database fetching layer (PDO or MySQLi), return associative arrays keyed by the exact SQL column names. The template loops expect array keys to match column names directly (e.g., $product['product_name']).
3. Form Submission Handling: Point your form handlers to receive standard POST variables matching Section 4 (e.g., $_POST['full_name'], $_POST['phone_number']).
4. Currency & Number Formatting: Store all price and mrp fields as numeric decimals in MySQL (e.g., 33990.00). In PHP templates, format values using Indian numbering conventions prior to rendering into .product-price.
5. Promotional Badges vs Availability: Treat badge as an optional editorial tag (e.g., "Bestseller"). Treat availability as a required system status (e.g., "in_stock"). Render the badge markup conditionally only when a value exists.
6. Homepage Popular Tab Filtering: To populate the homepage tabs, query where is_popular = 1, then segment by category (laptops, desktop-pcs, gaming, components) into the respective panel containers.

---

## 9. Lock & Sign-off

- Document Status: Permanently locked as the authoritative field specification.
- Governance: In accordance with the project governance rules established in PROJECT-REPORT.md, no field names, attributes, or mappings defined in this document may be renamed, removed, or added without formal architectural sign-off.
- Lock Date: 2026-10-15
- Phase: Phase 0 Step 2 Completed

---

## 10. References

- Audit Source: [AUDIT-FIELDS.md](file:///d:/Frontend%20Projects/microsys/AUDIT-FIELDS.md)
- Project Governance & Tracking: [PROJECT-REPORT.md](file:///d:/Frontend%20Projects/microsys/PROJECT-REPORT.md)
