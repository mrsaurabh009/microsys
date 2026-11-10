# 2-Month Post-Handover Support Policy — Microsys Website

> **Official Post-Handover Technical Support & Warranty Agreement**  
> **Client:** Microsys Computer & Accessories (Jai Omkar Traders)  
> **Development Agency:** [Team VYOMARC Technologies](https://vyomarctech.com)  
> **Effective Duration:** 60 Calendar Days Post-Handover  
> **Status:** Active & Locked  
> **Prepared by:** Team VYOMARC Technologies  

---

## 1. Policy Overview

This document outlines the terms, inclusions, exclusions, and operational response standards for the **2-Month Free Post-Handover Support Period** provided by **Team VYOMARC Technologies** to **Microsys Computer & Accessories**.

The storefront and administrative frontend suites have been delivered in a 100% complete, fully verified, and dynamic-ready state. This support warranty guarantees the visual, responsive, and interactive integrity of all delivered frontend assets post-handover.

---

## 2. Section 1: Scope of Support (Included at Zero Cost)

During the 60-day support window, Team VYOMARC Technologies provides technical assistance for items directly related to the delivered frontend codebase:

### 2.1 Frontend Bug Fixes & Rendering Repairs
- **CSS Layout Glitches**: Rectification of unexpected visual styling breakage, font misalignment, or container overflow issues across standard evergreen browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari).
- **Responsive Breakpoint Anomalies**: Resolution of mobile drawer clipping, sticky bottom bar overlap, table overflow, or flexbox/grid layout regressions across the 5 defined breakpoints (`mobile-xs`, `mobile`, `tablet`, `desktop`, `wide`).
- **Delivered JavaScript Interactions**: Fixing any runtime errors or defects in client-side interactive systems delivered by Team VYOMARC Technologies, including:
  - Navigation drawer open/close transitions and overlay dismissals.
  - Homepage category tabs, promotional popup carousel slider, and FAQ accordions.
  - Interactive financial and academic tools ([`tools/emi-calculator/`](tools/emi-calculator/), [`tools/b2b-profit-calculator/`](tools/b2b-profit-calculator/), and [`tools/cgpa-calculator/`](tools/cgpa-calculator/)).
  - Product detail gallery image switching and thumbnail active state indicators.
  - Administrative panel UI interactions (sidebar collapsing, add/edit form drawer toggling).

### 2.2 Integration Guidance for the Client's PHP Developer
**We will NOT write PHP logic, debug backend code, or write SQL queries for the developer. Our support is strictly limited to frontend structure and documentation clarifications.**

- **Architecture & Workflow Consultation**: Explaining the structure of delivered static HTML files, CSS design tokens, and modular components to the client's backend engineer.
- **Specification Clarification**: Assisting the backend developer in navigating the project integration manuals:
  - [`PHP-DEV-GUIDE.md`](PHP-DEV-GUIDE.md) (PDO connection standards, SQL queries, dynamic loop hydration, and form handling).
  - [`FIELD-NAMING-CONVENTION.md`](FIELD-NAMING-CONVENTION.md) (Standardized 16-field product attributes, data types, and display bindings).
  - [`FORM-FIELD-MAP.md`](FORM-FIELD-MAP.md) (Exact mappings between HTML form input `name=""` attributes and MySQL database columns).
  - [`database/schema.sql`](database/schema.sql) (Database structure, indexes, and relational integrity).
- **Dynamic Placeholder Markers**: Clarifying the placement and purpose of `<!-- PHP LOOP START -->`, `<!-- PHP: echo ... -->`, and form endpoints so backend loops can be inserted without altering layout integrity.

---

## 3. Section 2: Out of Scope (Chargeable / Excluded)

Any work falling outside the boundary of delivered frontend warranty is categorized as out of scope. These tasks are subject to separate formal work orders and chargeable hourly/project fees:

### 2.1 New Feature & Page Development
- Designing or coding new web pages, landing pages, category silos, or microsites not included in the original project scope.
- Developing new computational tools, interactive calculators, or custom widgets.
- Adding new UI sections, multi-step checkout systems, cart features, or user account portals.

### 2.2 Major Design & Layout Restructuring
- Radical alterations to the core color palette, branding identity, or established design system tokens (`styles/design-system.css`).
- Major structural redesigns of existing pages (e.g., altering the 3-column Used vs Refurbished infographic, rebuilding the master header/footer layout, or reorganizing the catalog filter architecture).
- Typography overhauls or third-party web font migrations requiring systemic style recalculation.

### 2.3 Routine Content Management & Data Entry
- Uploading, updating, or deleting product inventory, pricing, MRPs, or technical specifications.
- Writing, publishing, or editing blog articles, promotional announcements, or New Arrivals banner slides.
- Adding or modifying showroom repair service descriptions or category taxonomies.
- *Notice*: All 10 administrative panels in [`admin/`](admin/) have been custom-engineered so Microsys showroom staff can perform daily content updates autonomously without developer intervention.

### 2.4 Client Backend Code, Hosting Setup & Database Administration
- **Hosting setup, Database import, and PHP backend coding are strictly Out of Scope.**
- Writing, debugging, optimizing, or reviewing the client developer's custom PHP logic, session management, or backend security policies.
- Resolving MySQL database runtime connection errors, database imports, slow database queries, or server-side syntax exceptions.
- Setting up web hosting environments, Apache/Nginx virtual host misconfigurations, cPanel configuration, SSL certificate installation, DNS record propagation, or mail server (SMTP) deliverability.
- Fixing frontend breakage caused by manual tampering, arbitrary class renaming, or deletion of delivered CSS/JS structures by third-party developers.

---

## 4. Section 3: Communication Channels & Response Time

Support requests must follow the structured submission protocol to guarantee efficient triage and prompt turnaround.

| Metric | Commitment / Specification |
| :--- | :--- |
| **Official Support Channel** | Authorized WhatsApp ([+91 8252702699](https://wa.me/918252702699)) or designated developer group. |
| **Operating Hours** | 10:00 AM – 7:00 PM IST, Monday through Saturday (Excluding Sundays and National Holidays) |
| **Standard Acknowledgment** | Within **4 to 8 business hours** from initial receipt |
| **Standard Resolution Time** | Within **24 to 48 business hours** for standard frontend defects and documentation clarifications |
| **Critical Blocker Resolution** | Priority triage within **12 to 24 business hours** for severe layout failure impacting live showroom operations |

### Protocol for Submitting Issues:
To expedite troubleshooting, every support ticket must include:
1. The exact URL or template filename exhibiting the issue (e.g., `product-detail.html`).
2. Operating system and browser version (e.g., Windows 11 — Chrome 124, iPhone 15 — iOS Safari).
3. Clear screenshot or screen recording illustrating the visual or behavioral defect.
4. Steps to reproduce the issue.

---

## 5. Section 4: Validity & Expiration

1. **Duration**: This free support warranty is valid for strictly **60 Calendar Days** starting from the official date of final project handover.
2. **Hard Expiration**: Upon the completion of the 60th calendar day, all complimentary support under this agreement concludes automatically.
3. **Post-Warranty Options**:
   - **Annual Maintenance Contract (AMC)**: Microsys may enter into a dedicated ongoing maintenance contract covering quarterly security audits, library updates, and scheduled content refreshes.
   - **On-Demand Ad-Hoc Support**: Technical consultations and design updates requested after the 60-day window will be billed on an agreed hourly rate or milestone-based work order.

---

## 6. Document Summary

| Parameter | Summary Term |
| :--- | :--- |
| **Project** | Microsys Computer & Accessories Web Platform |
| **Support Term** | 60 Calendar Days (2 Months) |
| **Primary Beneficiary** | Microsys Management & Designated PHP Backend Developer |
| **Deliverable Authority** | Team VYOMARC Technologies |
| **Core Inclusions** | Frontend bug repairs, rendering fixes, and documentation onboarding guidance |
| **Core Exclusions** | Hosting setup, database import, backend PHP coding, new pages/features, content entry, and server administration |
| **Response Window** | 24–48 Business Hours |

---

Prepared by: Team VYOMARC Technologies  
© 2026 VYOMARC Technologies. All rights reserved.

