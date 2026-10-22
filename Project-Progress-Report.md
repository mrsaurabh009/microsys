# Phase 1 Project Progress & Architecture Report

| Project Metadata | Information |
| :--- | :--- |
| **Document Title** | Phase 1 Project Progress & Architecture Report |
| **Project** | Microsys Computer & Accessories Web Platform |
| **Client** | Microsys Computer & Accessories (Bihar Sharif, Nalanda, Bihar) |
| **Agency** | VYOMARC Technologies |
| **Status** | Phase 0 & Phase 1 Completed (Ready for Backend Integration) |
| **Date** | October 2026 |

---

## 1. Executive Summary

VYOMARC Technologies has successfully planned, architected, and delivered the foundational milestones for the **Microsys Computer & Accessories** digital web platform. 

The primary objective of this phase was to transition the initial static website into an enterprise-grade, **100% dynamic-ready architecture**. Every layout, component, and interaction has been rigorously standardized to integrate seamlessly with the client's upcoming PHP & MySQL backend. By establishing strict data-binding standards, comprehensive database schemas, and locked field mappings early, VYOMARC Technologies has significantly reduced backend engineering time, eliminated risk of schema mismatches, and guaranteed visual and brand consistency across all digital touchpoints.

---

## 2. Milestone 1: Frontend UI Foundation Completed

A bespoke, responsive, and high-performance frontend interface has been built from the ground up, utilizing modern semantic HTML5, modular CSS3 (governed by a strict design system), and vanilla ES6+ JavaScript.

### Core Deliverables:
- **Comprehensive Page Ecosystem**:
  - **Homepage (`index.html`)**: Complete flagship showroom experience featuring high-impact hero presentation with customer trust markers, marquee trust tickers, 12-category hardware grid, tabbed catalog showcase, custom PC workstation builder block, value propositions, and interactive Google Maps showroom locator.
  - **Dedicated Category Pages**: Standalone catalog templates engineered for deep inventory discovery across primary hardware lines:
    - `laptops.html`: Specialized showcase for commercial, student, and thin-and-light laptops.
    - `desktop-pcs.html`: Pre-built desktop systems, all-in-one PCs, and commercial workstations.
    - `gaming.html`: High-performance gaming rigs, esports builds, and dedicated hardware.
    - `components.html`: Modular component hub divided into 8 dedicated sub-sections (Processors, Motherboards, Graphics Cards, RAM, Storage, Power Supplies, Cabinets, and Cooling).
  - **About Us & Services (`aboutus.html`)**: Institutional brand presentation detailing company legacy, technical service capabilities (9 structured repair and maintenance services), and local trust anchors.
  - **Showroom Contact & Inquiry Hub**: Integrated contact section featuring store hours, direct telephone triggers, physical address markers, and multi-field inquiry handling.

### Visual & Interactive Engineering:
- **Responsive Layout Engine**: 100% mobile-first responsiveness optimized across 320px mobile viewports, 768px tablets, and 1440px+ ultra-wide desktop monitors.
- **Micro-Interactions & Navigation**:
  - Compact sticky navigation header that reacts to scroll offset.
  - Off-canvas mobile navigation drawer with accordion menu structures.
  - Live client-side keyword search suggestions with blur and escape traps.
  - Interactive multi-tab catalog switcher with smooth content stagger transitions.
  - High-definition WebP image asset pipeline preventing Cumulative Layout Shift (CLS).

---

## 3. Milestone 2: Dynamic Architecture & 14-Field Mapping Ready

To ensure that the client's PHP developer can hydrate the platform with dynamic database records without altering frontend styling or layout rules, every product card and showcase loop has been structured to follow a locked **14-Field Product Architecture**.

### The 14-Field Inventory Standard:

| # | Standard Field | Purpose & Description | Client Business Value |
| :-: | :--- | :--- | :--- |
| **1** | `sku` | Unique alphanumeric stock-keeping unit (e.g. `LAP-HP-15S-001`) | Prevents duplicate entries; streamlines showroom inventory tracking |
| **2** | `name` | Commercial product title and display name | Directly feeds product headers and automated WhatsApp inquiry strings |
| **3** | `category_id` | Foreign key relationship linking product to its parent department | Powers category filtering across dedicated pages and homepage tabs |
| **4** | `brand` | Manufacturer name (e.g. HP, Lenovo, Dell, ASUS, Intel, AMD) | Enables brand-based search queries and branded badge tagging |
| **5** | `model_number` | Manufacturer model code (e.g. `15s-fq5000`, `3520`) | Provides technical precision for customer service and part matching |
| **6** | `key_specs` | Slash-delimited summary (e.g. `Core i5 / 16GB / 512GB SSD`) | Allows customers to scan hardware capabilities at a glance |
| **7** | `full_specs` | Detailed technical breakdown | Formats hardware data for prospective customer consultations |
| **8** | `price` | Active showroom selling price | Clean numeric format formatted with ₹ currency symbol in frontend |
| **9** | `mrp` | Maximum Retail Price | Automatically calculates customer discount percentage when `mrp > price` |
| **10** | `availability` | Inventory status (`in_stock`, `out_of_stock`, `pre_order`) | Dynamically adjusts button text and inventory status labels |
| **11** | `badge` | Marketing pill text (e.g. `Bestseller`, `Hot Deal`, `New`) | Highlights promotions without overriding inventory availability |
| **12** | `image_primary` | High-resolution primary WebP product image | Standardized 4:3 container preventing layout distortion |
| **13** | `gallery_images` | Secondary and tertiary angle URLs (`image_secondary`, `image_tertiary`) | Pre-configured attributes ready for future gallery / modal hydration |
| **14** | `warranty` | Official manufacturer warranty terms (e.g. `1 Year Onsite Warranty`) | Reinforces customer purchasing confidence on high-value hardware |

### Structural Achievements:
- **Canonical Card Blueprint (`COMPONENT-product-card.html`)**: Created a master reference snippet that locks all CSS classes, ARIA states, and data attributes.
- **Decoupled Attributes**: Stock availability and marketing badges operate independently, ensuring a product can be tagged as "Bestseller" while accurately displaying "Pre-Order" status.
- **Foreach Loop Preparation**: Placed standardized `<!-- PHP: foreach(...) -->` comments directly around category cards and product tabs for instant developer recognition.

---

## 4. Milestone 3: Database Schema Structured

VYOMARC Technologies has designed a comprehensive, production-ready relational database blueprint in `database/schema.sql`.

### Technical Specifications:
- **RDBMS Target**: MySQL 5.7+ / MariaDB 10.3+ (Fully compatible with standard Apache / cPanel shared hosting).
- **Storage Engine**: InnoDB with foreign key integrity constraints (`ON DELETE RESTRICT` and `ON DELETE CASCADE`).
- **Character Set**: `utf8mb4` with `utf8mb4_unicode_ci` collation, ensuring complete support for Hindi regional characters and symbols.

### Table Architecture Overview:

| Table Name | Primary Purpose | Key Fields & Relationships |
| :--- | :--- | :--- |
| **`categories`** | Hardware classifications & navigation | `id`, `name`, `slug`, `image_url`, `display_order`, `is_active` |
| **`products`** | Central hardware catalog (14-field standard) | `id`, `category_id`, `brand`, `name`, `price`, `mrp`, `availability`, `badge`, `sku` |
| **`sliders`** | Homepage hero and promotional carousel slides | `id`, `title`, `image_url`, `link_url`, `display_order`, `is_active` |
| **`promotions`** | Top announcement bar and promotional modal copy | `id`, `type` (announcement / popup), `text_content`, `image_url`, `is_active` |
| **`blogs`** | Knowledge base and hardware buying guides | `id`, `title`, `slug`, `cover_image_url`, `body`, `author`, `is_published` |
| **`comments`** | Moderated reader interaction on articles | `id`, `blog_id`, `commenter_name`, `commenter_email`, `body`, `is_approved` |
| **`inquiries`** | Customer inquiries captured from storefront forms | `id`, `full_name`, `phone`, `email`, `message`, `product_interest`, `submitted_at` |
| **`services`** | Hardware repairs and technical services catalog | `id`, `title`, `description`, `price_range`, `is_active` |

---

## 5. Milestone 4: Developer Handover Protocol Prepared

To eliminate the traditional friction between frontend and backend developers, VYOMARC Technologies has authored complete technical documentation that acts as a plug-and-play roadmap for the client's development team.

### Documentation Suite Delivered:
1. **`FIELD-NAMING-CONVENTION.md`**:
   - Locks every product attribute name in `snake_case`.
   - Maps each attribute directly to its corresponding MySQL column data type and template variable name.
   - Prevents inconsistent naming (e.g. one developer writing `product_title` while the database expects `name`).
2. **`FORM-FIELD-MAP.md`**:
   - Catalogs every input control across public storefront forms and planned administrative panels.
   - Locks `name=""` attributes, input validation criteria, transmission methods (POST vs. GET), and target SQL columns.
   - Provides exact requirements for Indian 10-digit mobile number validation and sanitized customer messages.
3. **`PHP-DEV-GUIDE.md`**:
   - A single onboarding manual providing a step-by-step implementation sequence, common architectural pitfalls, dynamic query templates, and post-integration test cases.

### Measurable Client Value:
- **Zero Ambiguity**: The backend developer receives exact specifications, eliminating dozens of hours spent reverse-engineering frontend code.
- **Accelerated Time-to-Market**: Direct copy-paste query blueprints and form mappings allow backend integration to begin immediately without preliminary technical discovery meetings.
- **Architectural Preservation**: Clear separation of concerns ensures that backend code integration will not compromise mobile responsiveness or page load speeds.

---

## 6. Next Steps (Upon Advance Clearance)

With Phase 0 (Audit & Field Standardization) and Phase 1 (Database Schema & Handover Protocol) successfully finalized, the project is primed for the next stage of commercial and technical delivery.

Upon clearance of the project advance, VYOMARC Technologies will immediately initiate:

```
[ Phase 0 & 1 Completed ] ────────► [ Phase 2: Advanced Interaction ] ────────► [ Phase 3: Admin & Deployment ]
  • UI & Category Pages               • Session-Based Promo Popup                 • Dedicated Admin UI Suite
  • 14-Field Product Architecture      • Dual-Action WhatsApp Form Engine          • Dynamic PHP / MySQL Handover
  • MySQL Schema (schema.sql)         • Auto-Rotating Inventory Sliders           • Production Staging & Launch
  • Complete Developer Handover
```

### 1. Administrative Suite UI (Phase 3 Initiation):
- Design and markup of a lightweight, responsive Administrative Panel UI.
- Administrative management views for Product Catalog CRUD, Category Ordering, Customer Inquiry Management, and Promotional Banner Toggles.

### 2. Advanced Interactive Features Deployment:
- **Session-Based Promotional Popup**: Integration of client-side session management (`sessionStorage`) to showcase high-margin showroom offers without irritating recurring visitors.
- **Dual-Action Inquiry Form Engine**: Finalization of the hybrid submission engine that securely logs customer inquiries to the MySQL database while simultaneously launching a pre-filled WhatsApp conversation with showroom sales representatives.
- **Auto-Rotating Featured Sliders**: Touch-responsive, hardware-accelerated product showcases highlighting seasonal showroom arrivals.

### 3. Production Staging, Security Hardening & Handover:
- End-to-end integration review with the client's PHP developer.
- Cross-browser compatibility and Google Lighthouse performance optimization (targeting 90+ mobile scores).
- Final code packaging and staging deployment.

---

### Agency Authorization

*Report prepared and submitted by:*  
**Team VYOMARC Technologies**  
*Web Platforms & Software Architecture Division*  
*Contact: +91 8252702699 | vyomarctech.com*
