# Frontend Field Audit Report — 17-Field Product Standard

## 1. Audit Scope

- **Date**: 2026-10-15
- **Files Audited**:
  - index.html (Homepage)
  - aboutus.html (About Us & Services)
  - laptops.html (Laptops Catalog)
  - desktop-pcs.html (Desktop PCs Catalog)
  - components.html (PC Components Catalog)
  - gaming.html (Gaming PCs Catalog)
- **Method**: Systematic read-only inspection of markup, data attributes, form elements, comments, and semantic structure across all six allowed pages. No code modifications or terminal commands were executed.
- **Reference Standard**: 17-field backend schema standard (product_id_sku, category, sub_category, brand, product_name, model_number, key_specs, full_specs, price, mrp, availability, image_primary, image_secondary, image_tertiary, warranty, badge, is_popular).

---

## 2. Product Card Inventory

A total of 50 product cards and 6 mega-menu preview placeholders were inventoried across the 6 HTML documents.

| Page | Section | Fields Shown | Missing Fields |
| :--- | :--- | :--- | :--- |
| index.html | Popular Products (Laptops Tab: 4 Cards) | Primary image thumbnail, badge pill ("In Stock"), brand title, product display title, key specs string, retail selling price (formatted with currency symbol), store availability note, "View Details" action link, "Enquire on WhatsApp" action link (with product name data attribute) | product_id_sku, category (implicit via tab panel), sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular (implicit via section placement) |
| index.html | Popular Products (Desktops Tab: 4 Cards) | Primary image placeholder ("[Product image]"), badge placeholder ("[Availability]"), brand placeholder ("[Brand]"), product name placeholder ("[Product Name]"), key specs placeholder ("[Key spec line]"), price placeholder ("[Price — search pending]"), availability placeholder ("[Availability]"), action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| index.html | Popular Products (Gaming Tab: 4 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| index.html | Popular Products (Components Tab: 4 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| index.html | Header Mega Menu (Components Trigger) | Thumbnail container placeholder, Title placeholder ("[Placeholder Card]") | All 17 product fields (pure layout placeholder for mega menu showcase) |
| aboutus.html | Header Mega Menu (Components Trigger) | Thumbnail container placeholder, Title placeholder ("[Placeholder Card]") | All 17 product fields (pure layout placeholder) |
| aboutus.html | Repair Services (9 Service Cards) | Service icon, service title, service description, starting price note, service enquiry action link | Note: Service cards represent repair offerings, not retail product cards. Zero retail product cards exist on this page. |
| laptops.html | Header Mega Menu (Components Trigger) | Thumbnail container placeholder, Title placeholder ("[Placeholder Card]") | All 17 product fields (pure layout placeholder) |
| laptops.html | Featured Laptops Catalog (6 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder (with product name data attribute), key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| desktop-pcs.html | Header Mega Menu (Components Trigger) | Thumbnail container placeholder, Title placeholder ("[Placeholder Card]") | All 17 product fields (pure layout placeholder) |
| desktop-pcs.html | Featured Desktop Systems Catalog (6 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder (with product name data attribute), key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Header Mega Menu (Components Trigger) | Thumbnail container placeholder, Title placeholder ("[Placeholder Card]") | All 17 product fields (pure layout placeholder) |
| components.html | Processors Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Motherboards Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Graphics Cards Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | RAM Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Storage Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Power Supplies Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Cabinets Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| components.html | Cooling Sub-section (2 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder, key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |
| gaming.html | Header Mega Menu (Components Trigger) | Thumbnail container placeholder, Title placeholder ("[Placeholder Card]") | All 17 product fields (pure layout placeholder) |
| gaming.html | Featured Gaming Systems Catalog (6 Cards) | Primary image placeholder, badge placeholder, brand placeholder, product name placeholder (with product name data attribute), key specs placeholder, price placeholder, availability placeholder, action buttons | product_id_sku, category, sub_category, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty, is_popular |

---

## 3. Form Field Inventory

Every form control element across all six pages was inspected for input type, placeholder text, id attribute, and presence of the HTML name attribute.

| Form Location | Field Purpose | Current name="" | Has name? | Input Type | Placeholder Text | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| index.html (Main Header) | Desktop Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Relies on client-side JS. Needs form wrapper and standard name attribute. |
| index.html (Mobile Drawer) | Mobile Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element inside mobile drawer. Relies on client-side JS. Needs form wrapper and standard name attribute. |
| index.html (Final Contact CTA) | Customer Full Name | Missing | No | text | Full Name | Input element has id attribute and required attribute. Has screen-reader label. Completely missing name attribute. |
| index.html (Final Contact CTA) | Customer Phone Number | Missing | No | tel | Phone Number | Input element has id attribute and required attribute. Completely missing name attribute. |
| index.html (Final Contact CTA) | Customer Email Address | Missing | No | email | Email (optional) | Input element has id attribute; optional field. Completely missing name attribute. |
| index.html (Final Contact CTA) | Enquiry Classification | Missing | No | text | Enquiry Type | Input element has id attribute and required attribute. Rendered as free text instead of select dropdown. Completely missing name attribute. |
| index.html (Final Contact CTA) | Target Product or Service | Missing | No | text | Product or Service | Input element has id attribute and required attribute. Completely missing name attribute. |
| index.html (Final Contact CTA) | Customer Message Body | Missing | No | textarea | Message | Textarea element has id attribute and required attribute. Completely missing name attribute. |
| index.html (Final Contact CTA) | Form Element Attributes | N/A | N/A | form container | N/A | Form element specifies action="#" and method="POST". Javascript intercepts submit to display simulated success. No PHP endpoint linked. |
| aboutus.html (Main Header) | Desktop Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| aboutus.html (Mobile Drawer) | Mobile Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| laptops.html (Main Header) | Desktop Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| laptops.html (Mobile Drawer) | Mobile Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| desktop-pcs.html (Main Header) | Desktop Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| desktop-pcs.html (Mobile Drawer) | Mobile Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| components.html (Main Header) | Desktop Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| components.html (Mobile Drawer) | Mobile Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| gaming.html (Main Header) | Desktop Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |
| gaming.html (Mobile Drawer) | Mobile Keyword Search | Missing | No | text | Search laptops, components, accessories… | Standalone input element without enclosing form tag. Completely missing name attribute. |

---

## 4. 17-Field Comparison Table

This comparison evaluates the client's 17 backend product schema fields against all existing card structures, markup elements, and data bindings.

### Summary Status Groups

- Exists and Matches: 2 fields (brand, product_name)
- Exists but Naming Differs or Inconsistent: 8 fields (category, sub_category, key_specs, price, availability, image_primary, badge, is_popular)
- Missing Entirely: 7 fields (product_id_sku, model_number, full_specs, mrp, image_secondary, image_tertiary, warranty)

| Field Name | Status | Where Found | Naming Matches SQL? | Notes & Observations |
| :--- | :--- | :--- | :--- | :--- |
| brand | Exists and matches | index.html (live in Laptops tab: HP, Lenovo, Dell, ASUS; placeholder in other tabs); laptops.html; desktop-pcs.html; components.html; gaming.html | Yes | Concept and content directly match. Rendered as a dedicated line element in all cards. |
| product_name | Exists and matches | Live on index.html; placeholder across laptops.html, desktop-pcs.html, components.html, gaming.html | Yes | Rendered as primary heading on all cards. Backed by data-product-name attribute used by enquiry scripts. |
| category | Exists but differs | Implicit via URL slugs (laptops.html, desktop-pcs.html, components.html, gaming.html) and tab panel IDs (panel-laptops, etc.) | No | No HTML attribute or DOM node explicitly stores the category identifier on individual cards. |
| sub_category | Exists but differs | Implicit via section container IDs in components.html (#processors, #motherboards, #graphics-cards, #ram, #storage, #power-supplies, #cabinets, #cooling) | No | Present only as parent section anchors on components.html. Completely absent on individual card elements. |
| key_specs | Exists but differs | Present on every product card as a single text line element | No | Uses CSS class product-specs instead of key_specs. Contains concatenated summary string (e.g., CPU / RAM / SSD / OS). |
| price | Exists but differs | Present on every product card | No | CSS class is product-price. Displays formatted currency string (e.g., ₹33,990) rather than unformatted numeric/decimal representation. |
| availability | Exists but differs | Present on all cards in two separate, conflicting locations | No | In index.html, stock status appears in product-badge ("In Stock") while store location appears in product-avail ("Available at Microsys, Biharsharif"). In placeholder cards, both display "[Availability]". Needs normalization. |
| image_primary | Exists but differs | Present as single img element within image container | No | Only one image element exists per card. Uses generic img tag without image_primary class or data attribute. |
| badge | Exists but differs | Present on all cards as product-badge | No | Element name matches concept, but content is conflated with availability (shows "In Stock" or "[Availability]") rather than marketing tags (e.g. "Bestseller", "New", "Save 15%"). |
| is_popular | Exists but differs | Implicit based on inclusion in Section 8 (Popular Products) of index.html | No | No boolean flag, class, or data attribute (e.g. data-is-popular="true") exists on the card markup. |
| product_id_sku | Missing entirely | Nowhere | No | No product identifier, SKU number, or database primary key exists in attributes or text. Crucial missing link for PHP loops. |
| model_number | Missing entirely | Nowhere | No | Occasionally merged into product_name text (e.g. "15s", "Slim 3", "3520", "A15") but has no isolated field or attribute. |
| full_specs | Missing entirely | Nowhere | No | No detailed specification table, tab, modal, or expanded list exists. "View Details" button currently targets an empty anchor (#). |
| mrp | Missing entirely | Nowhere | No | No maximum retail price, strikethrough price, or percentage discount exists on any card. Only selling price is shown. |
| image_secondary | Missing entirely | Nowhere | No | No secondary image element, thumbnail gallery, or data attribute exists on any product card. |
| image_tertiary | Missing entirely | Nowhere | No | No tertiary image element, thumbnail gallery, or data attribute exists on any product card. |
| warranty | Missing entirely | Global mention only in Trust Strip; absent on product cards | No | No per-product warranty badge or text (e.g., "1 Year Onsite Warranty") exists on individual cards. |

---

## 5. Naming Inconsistencies

### Card Containers
- Observed Variants:
  - product-card (used for retail cards in index.html, laptops.html, desktop-pcs.html, components.html, gaming.html)
  - card (used for featured promotional teaser in header mega menu across all pages)
  - category-card (used for shop-by-category cards on index.html)
  - service-card (used for repair service listings on aboutus.html)
  - trust-item (used for trust factors on index.html)
- Recommended Canonical Form: Keep CSS selector .product-card for styling; standardize dynamic backend loop variable to $product_card and require attribute data-product-id.

### Product Name & Title
- Observed Variants:
  - product-name (CSS class for card title)
  - data-product-name (DOM attribute on card title)
  - card-title (mega menu teaser title)
  - category-card-title (category teaser title)
  - service-card__title (service card title)
- Recommended Canonical Form: product_name (SQL column and PHP array key). Keep class product-name and attribute data-product-name in frontend markup.

### Specifications Teaser
- Observed Variants:
  - product-specs (card teaser line)
  - No specifications field in mega menu or service cards
- Recommended Canonical Form: key_specs (SQL column and PHP variable); full_specs (SQL column for product detail modal / expanded view).

### Stock & Promotional Badges
- Observed Variants:
  - product-badge (contains stock text "In Stock" in live cards, "[Availability]" in placeholder cards)
  - product-avail (contains store availability text "Available at Microsys, Biharsharif" in live cards, "[Availability]" in placeholder cards)
- Recommended Canonical Form:
  - availability for stock condition (e.g., 'in_stock', 'out_of_stock', 'on_order') mapped to CSS class product-availability.
  - badge for promotional markers (e.g., 'Bestseller', 'New Arrival', 'Special Deal') mapped to CSS class product-badge.

### Price Representation
- Observed Variants:
  - product-price (contains hardcoded formatted string like "₹33,990" or placeholder "[Price — search pending]")
  - service-card__price (contains placeholder text "[Starting Price — pending]")
  - Comment marker: PLACEHOLDER: Product Price
  - Comment marker: PRICE: pending confirmation
- Recommended Canonical Form: price (SQL column, DECIMAL(10,2)) for selling price; mrp (SQL column, DECIMAL(10,2)) for list price. Currency symbol and formatting handled at template layer.

### Product Media
- Observed Variants:
  - product-image-wrapper > product-image-inner > img
  - category-card-img > img
  - Visual placeholders using raw text "[Product image]" inside div
- Recommended Canonical Form: image_primary, image_secondary, image_tertiary (SQL columns storing relative file paths or asset URLs).

### Comment Tokens & Data Binds
- Observed Variants:
  - Hyphen separator in placeholder comment: PLACEHOLDER: product card - desktops (index.html)
  - Em dash separator in placeholder comment: PLACEHOLDER: product card — laptops (laptops.html, desktop-pcs.html, gaming.html)
  - Slash notation in sub-category placeholder comment: PLACEHOLDER: product card — components/processors (components.html)
  - Dot notation in data binding comment: DATA-BIND: products.components.processors (components.html)
- Recommended Canonical Form: Standardize all backend hooks to snake_case dotted tokens: DATA-BIND: products.<category_slug>.<sub_category_slug>.

---

## 6. Dynamic Placeholders Inventory

### Products (Catalog & Popular Cards)
- index.html (Popular Products - Laptops): DATA-BIND: products.laptops -> Recommended PHP: $popular_laptops
- index.html (Popular Products - Desktops): DATA-BIND: products.desktops -> Recommended PHP: $popular_desktops
- index.html (Popular Products - Gaming): DATA-BIND: products.gaming -> Recommended PHP: $popular_gaming
- index.html (Popular Products - Components): DATA-BIND: products.components -> Recommended PHP: $popular_components
- laptops.html (Catalog): DATA-BIND: products.laptops -> Recommended PHP: $catalog_laptops
- desktop-pcs.html (Catalog): DATA-BIND: products.desktops -> Recommended PHP: $catalog_desktops
- components.html (Processors): DATA-BIND: products.components.processors -> Recommended PHP: $components_processors
- components.html (Motherboards): DATA-BIND: products.components.motherboards -> Recommended PHP: $components_motherboards
- components.html (Graphics Cards): DATA-BIND: products.components.graphics-cards -> Recommended PHP: $components_graphics_cards
- components.html (RAM): DATA-BIND: products.components.ram -> Recommended PHP: $components_ram
- components.html (Storage): DATA-BIND: products.components.storage -> Recommended PHP: $components_storage
- components.html (Power Supplies): DATA-BIND: products.components.power-supplies -> Recommended PHP: $components_power_supplies
- components.html (Cabinets): DATA-BIND: products.components.cabinets -> Recommended PHP: $components_cabinets
- components.html (Cooling): DATA-BIND: products.components.cooling -> Recommended PHP: $components_cooling
- gaming.html (Catalog): DATA-BIND: products.gaming -> Recommended PHP: $catalog_gaming

### Categories & Navigation
- index.html: DATA-BIND: categories.laptops -> Recommended PHP: $categories['laptops']
- index.html: DATA-BIND: categories.desktops -> Recommended PHP: $categories['desktops']
- index.html: DATA-BIND: categories.gaming -> Recommended PHP: $categories['gaming']
- index.html: DATA-BIND: categories.processors -> Recommended PHP: $categories['processors']
- index.html: DATA-BIND: categories.graphics -> Recommended PHP: $categories['graphics']
- index.html: DATA-BIND: categories.motherboards -> Recommended PHP: $categories['motherboards']
- index.html: DATA-BIND: categories.ram-storage -> Recommended PHP: $categories['ram_storage']
- index.html: DATA-BIND: categories.monitors -> Recommended PHP: $categories['monitors']
- index.html: DATA-BIND: categories.keyboards-mice -> Recommended PHP: $categories['keyboards_mice']
- index.html: DATA-BIND: categories.printers -> Recommended PHP: $categories['printers']
- index.html: DATA-BIND: categories.networking -> Recommended PHP: $categories['networking']
- index.html: DATA-BIND: categories.accessories -> Recommended PHP: $categories['accessories']
- Mega Menu (All Pages): Brand quick-links and featured teaser -> Recommended PHP: $mega_menu_brands, $mega_menu_featured

### Banners & Campaigns
- index.html: DATA-BIND: campaign.featured -> Recommended PHP: $featured_campaign
- index.html: PROMO-VALUE: admin-controlled -> Recommended PHP: $campaign_badge_text

### Services
- aboutus.html: DATA-BIND: services.laptop-diagnosis -> Recommended PHP: $services['laptop_diagnosis']
- aboutus.html: DATA-BIND: services.desktop-repair -> Recommended PHP: $services['desktop_repair']
- aboutus.html: DATA-BIND: services.ram-ssd-upgrade -> Recommended PHP: $services['ram_ssd_upgrade']
- aboutus.html: DATA-BIND: services.os-installation -> Recommended PHP: $services['os_installation']
- aboutus.html: DATA-BIND: services.data-migration -> Recommended PHP: $services['data_migration']
- aboutus.html: DATA-BIND: services.custom-pc-assembly -> Recommended PHP: $services['custom_pc_assembly']
- aboutus.html: DATA-BIND: services.cooling-maintenance -> Recommended PHP: $services['cooling_maintenance']
- aboutus.html: DATA-BIND: services.printer-troubleshooting -> Recommended PHP: $services['printer_troubleshooting']
- aboutus.html: DATA-BIND: services.networking-setup -> Recommended PHP: $services['networking_setup']

### Inquiries & Forms
- index.html: DATA-BIND: contact -> Recommended PHP: $contact_info
- index.html: FORM-ENDPOINT: pending -> Recommended PHP: $contact_form_action
- index.html: PLACEHOLDER: Thank you message -> Recommended PHP: $contact_success_message

### Content & Story Sections
- index.html: PLACEHOLDER: custom PC visual & text -> Recommended PHP: $custom_pc_content
- index.html: PLACEHOLDER: why-choose-us detail -> Recommended PHP: $why_choose_us_items

### Blogs & Comments
- Observed across all 6 files: No blog posts, news articles, or customer comment threads currently exist in markup. [NONE — No blog or comment features present].

---

## 7. Page-by-Page Summary

### index.html
Contains the main storefront landing structure including a hero showcase with video, trust badges, brand carousel, 12 shop-by-category cards, a featured promotional banner, a 4-tab Popular Products section with 16 cards (4 populated with live laptop data, 12 populated with structural placeholders), a custom PC building highlight, a 6-item trust grid, a showroom location map with contact details, a complete enquiry contact form, and footer navigation. It is ready for PHP integration of the popular products tabbed loops, category navigation links, and enquiry form handling, but is completely missing input name attributes on the contact form, missing search form wrappers, missing SKU and pricing metadata on product cards, and conflates stock status with promotional badges.

### aboutus.html
Contains the corporate profile of Microsys, brand positioning copy, an extensive 9-item repair services grid with starting price markers, business location schema markup, and standard header and footer navigation. It is ready for PHP dynamic rendering of the repair services list and schema metadata, but contains zero retail product cards, has no contact enquiry form of its own (links back to the homepage contact anchor), and features unwrapped search inputs that lack name attributes.

### laptops.html
Contains a dedicated category header, intro copy, and a 6-card catalog grid for featured laptop systems, followed by an advisory contact CTA and standard navigation. It is ready for a dynamic PHP loop pulling laptop category inventory from MySQL, but all 6 cards currently contain identical placeholder copy, are missing product IDs, lack secondary/tertiary image containers, show no MRP or warranty tags, and have search inputs lacking form wrappers and name attributes.

### desktop-pcs.html
Contains a dedicated category header, intro copy, and a 6-card catalog grid for pre-built and custom desktop workstations, followed by an advisory CTA and standard navigation. It is ready for a dynamic PHP query populating desktop systems, but currently consists entirely of placeholder cards lacking SKUs, model numbers, MRP comparisons, and warranty data, with search inputs lacking name attributes.

### components.html
Contains the most extensive catalog structure across the project, featuring an intro hero and 8 dedicated sub-category sections (processors, motherboards, graphics cards, RAM, storage, power supplies, cabinets, cooling), each containing 2 product cards (16 cards total), followed by a hardware advisory CTA. It is ready for categorized or sub-query PHP rendering across hardware types, but all 16 cards are identical placeholders lacking SKUs, sub-category data attributes, technical spec sheets, and image galleries, while header search inputs lack name attributes.

### gaming.html
Contains a focused category presentation for esports PCs and custom rigs, featuring intro copy, a 6-card catalog grid, and an advisory CTA. It is ready for a dedicated PHP query filtering gaming-tier rigs, but currently holds only static placeholders with missing primary keys, missing model numbers, no full spec sheets, and unwrapped search inputs without name attributes.

---

## 8. Recommendations for Phase 0 Step 2

### 1. Lock Field Names & Database Schema Mapping
Lock the 17 standard fields to explicit backend column names and frontend attributes:
- product_id_sku: INT AUTO_INCREMENT PRIMARY KEY + VARCHAR(64) UNIQUE SKU -> Frontend attribute data-product-id and data-sku.
- category: VARCHAR(64) NOT NULL -> Frontend attribute data-category.
- sub_category: VARCHAR(64) NULL -> Frontend attribute data-sub-category.
- brand: VARCHAR(64) NOT NULL -> Rendered inside .product-brand.
- product_name: VARCHAR(255) NOT NULL -> Rendered inside .product-name and data-product-name.
- model_number: VARCHAR(100) NULL -> Rendered inside optional .product-model.
- key_specs: VARCHAR(255) NOT NULL -> Rendered inside .product-specs.
- full_specs: TEXT NULL -> Rendered in product detail modal or standalone page.
- price: DECIMAL(10,2) NOT NULL -> Rendered formatted in .product-price with data-raw-price.
- mrp: DECIMAL(10,2) NULL -> Rendered in new strikethrough element .product-mrp.
- availability: ENUM('in_stock','out_of_stock','pre_order') NOT NULL -> Rendered in .product-availability with data-stock-status.
- image_primary: VARCHAR(255) NOT NULL -> Main img src inside .product-image-inner.
- image_secondary: VARCHAR(255) NULL -> Thumbnail or data attribute data-image-secondary.
- image_tertiary: VARCHAR(255) NULL -> Thumbnail or data attribute data-image-tertiary.
- warranty: VARCHAR(100) NULL -> Rendered inside new element .product-warranty.
- badge: VARCHAR(50) NULL -> Rendered inside .product-badge only when promotional tag exists (e.g., "Bestseller").
- is_popular: TINYINT(1) DEFAULT 0 -> Filter flag for homepage tabs, mapped to data-is-popular.

### 2. Form Standardization
- Add standard name attributes to every input in index.html contact form:
  - contact-name -> name="full_name"
  - contact-phone -> name="phone_number"
  - contact-email -> name="email"
  - contact-type -> name="enquiry_type" (recommend converting text input to select dropdown with predefined options: Sales, Service, Custom Build, Bulk Order)
  - contact-product -> name="product_or_service"
  - contact-message -> name="message"
- Wrap desktop and mobile search inputs in formal form tags with method="GET", action="search.php" (or search results page), and name="q".
- Add hidden security token placeholder (CSRF) inside forms.

### 3. Product Card Restructuring
- Disentangle stock availability from promotional badges. Move stock status to a dedicated availability container (.product-availability) and reserve .product-badge strictly for marketing badges.
- Introduce an optional .product-mrp container adjacent to .product-price to support strikethrough pricing and savings calculations.
- Introduce an optional .product-warranty line or icon tag so warranty terms are clear per device.
- Add data-product-id to every card wrapper so dynamic click handlers and modal detail scripts have a direct primary key hook.

---

## 9. Audit Sign-off

- **Audit Nature**: Strictly read-only observational audit. No markup, styles, or scripts were modified during this analysis.
- **Verification**: All reported fields, placeholders, form controls, and naming conventions reflect the exact state of the six audited files.
- **Next Phase Execution**: Implementation of locked naming conventions, form name attributes, card structural adjustments, and PHP dynamic tags will occur in Phase 0 Step 2.
