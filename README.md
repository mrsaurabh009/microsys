# Microsys — Computer & Accessories

> **Official Web Platform & Administrative Suite**  
> **Client:** Microsys Computer & Accessories (Bihar Sharif, Nalanda, Bihar)  
> **Development Agency:** [Team VYOMARC Technologies](https://vyomarctech.com)  
> **Project Status:** **DELIVERED (Frontend 100% Complete & Dynamic-Ready for PHP Backend)**  
> **Prepared by:** Team VYOMARC Technologies  

---

## 1. Project Overview

**Microsys** is Bihar Sharif's premier offline retail computer showroom and authorized technology dealer, located at 1st floor of Domino's, near bus stand Ramchandrapur, Biharsharif, Nalanda, Bihar (803216). Established in 2005 (Jai Omkar Traders), Microsys provides branded laptops, desktop PCs, custom gaming rigs, computer hardware components, printers, monitors, peripherals, and technical chip-level repair services.

### Business Model & Storefront Architecture
- **Inquiry-Led Showroom Model**: Designed specifically to drive customer showroom visits, phone consultations, and direct WhatsApp inquiries without the complexity of an e-commerce cart/checkout.
- **Pure Semantic HTML5 & CSS3**: High-performance, zero-dependency storefront engineered for local search engine dominance, sub-second page loads, and AAA accessibility standards.
- **Interactive Tools Hub**: Dedicated customer self-service calculation engines (EMI Loan Calculator, B2B Profit Margin Calculator, and CGPA & Percentage Converter).
- **Administrative Suite**: 10 purpose-built management panels for inventory, blogs, promotional banners, popup carousels, category taxonomies, repair services, comments moderation, and customer lead tracking.

---

## 2. Handover Package

The client handover package consists of the complete production-grade source code, database schema, and authoritative developer documentation:

1. **Storefront Frontend Source**:
   - 8 responsive semantic HTML5 pages: [`index.html`](index.html), [`products.html`](products.html), [`product-detail.html`](product-detail.html), [`aboutus.html`](aboutus.html), [`blog.html`](blog.html), [`blog-detail.html`](blog-detail.html), [`privacy-policy.html`](privacy-policy.html), and [`terms-of-service.html`](terms-of-service.html).
   - Design system tokens ([`styles/design-system.css`](styles/design-system.css)) and component stylesheets ([`styles/home.css`](styles/home.css)).
   - Pure Vanilla JavaScript engines and locally bundled SVG iconography with zero third-party framework dependencies.
2. **Interactive Utility Tools Suite**:
   - Central discovery hub ([`tools/index.html`](tools/index.html)).
   - Standalone EMI Loan Calculator ([`tools/emi-calculator/index.html`](tools/emi-calculator/index.html)).
   - Standalone B2B Margin Calculator ([`tools/b2b-profit-calculator/index.html`](tools/b2b-profit-calculator/index.html)).
   - Standalone CGPA & Percentage Converter ([`tools/cgpa-calculator/index.html`](tools/cgpa-calculator/index.html)).
3. **Administrative UI Suite**:
   - 10 back-office control panels located in [`admin/`](admin/) (`index.html`, `login.html`, `manage-products.html`, `manage-blogs.html`, `manage-banners.html`, `manage-sliders.html`, `manage-categories.html`, `manage-services.html`, `manage-comments.html`, `manage-inquiries.html`).
4. **Database DDL**:
   - Production MySQL schema file ([`database/schema.sql`](database/schema.sql)) with all 9 relational tables, indexes, constraints, and initial seed records.
5. **Backend Developer Integration Documentation**:
   - [`PHP-DEV-GUIDE.md`](PHP-DEV-GUIDE.md) — Comprehensive technical onboarding manual with step-by-step query hydration, form handling, and PDO setup.
   - [`FIELD-NAMING-CONVENTION.md`](FIELD-NAMING-CONVENTION.md) — Authoritative 16-field product standard locking database column types, HTML input names, and display classes.
   - [`FORM-FIELD-MAP.md`](FORM-FIELD-MAP.md) — Complete mapping dictionary between HTML form controls (`name=""`), HTTP methods (GET/POST), and target MySQL database tables/columns.
6. **Support & Maintenance Warranty**:
   - [`SUPPORT-POLICY.md`](SUPPORT-POLICY.md) — Authoritative 2-Month post-handover technical support policy specifying free frontend bug fixes, integration guidance, out-of-scope boundaries, response SLAs, and strict 60-day validity.

---

## 3. Database & Backend Integration

The backend database architecture is formally defined in [`database/schema.sql`](database/schema.sql). It is compatible with MySQL 5.7+ and MariaDB 10.2+ using the InnoDB storage engine and `utf8mb4` character set across 9 dedicated tables:

1. **`categories`**: Primary product taxonomy (`id`, `name`, `slug`, `icon`, `image_url`, `display_order`, `is_active`).
2. **`subcategories`**: Granular product classifications linked via foreign key to `categories`.
3. **`products`**: Master product inventory implementing the 16 canonical fields locked in [`FIELD-NAMING-CONVENTION.md`](FIELD-NAMING-CONVENTION.md).
4. **`blogs`**: Article publication engine supporting rich-text HTML markup and editorial metadata.
5. **`comments`**: Moderated reader discussions linked by foreign key to `blogs`.
6. **`promotions`**: Promotional system supporting top announcement banners and modal popup carousels.
7. **`sliders`**: Homepage hero and New Arrivals promotional carousel banners.
8. **`inquiries`**: Storefront lead capture table receiving submissions from `#mainContactForm`.
9. **`services`**: Hardware repair and consultation service offerings pre-seeded with 9 core services.

### How Forms Connect to Backend SQL
- **Field Name Parity**: All storefront and admin form fields strictly use locked `name=""` attributes matching [`FORM-FIELD-MAP.md`](FORM-FIELD-MAP.md).
- **Search & Filters**: Catalog search (`products.html`) uses standard HTTP GET (`action="products.php"`), with query inputs `name="q"`, `name="category[]"`, `name="brand[]"`, `name="min_price"`, and `name="max_price"`.
- **Contact & Inquiries**: Form `#mainContactForm` in `index.html` submits via POST (`action="submit-enquiry.php"`) with validation fields (`full_name`, `phone_number`, `email`, `enquiry_type`, `product_or_service`, `message`).
- **PHP Dynamic Markers**: All looping sections and data points feature explicit comment boundaries (e.g., `<!-- PHP LOOP START: foreach($products as $product) { -->`) so the backend developer can drop in PHP echo tags without modifying layout rules.

---

## 4. Directory Structure

A clean, simplified overview of key project directories and assets:

```text
microsys/
├── index.html                    # Storefront Homepage
├── products.html                 # All Products Catalog with GET Filters & Search
├── product-detail.html           # Product Detail Page (Dynamic Gallery & Specs Table)
├── aboutus.html                  # About Us, Showroom Story & 9 Repair Services
├── blog.html                     # Blog Article Hub with Category Filters
├── blog-detail.html              # Blog Article Reader & Comments Interface
├── privacy-policy.html           # Store Privacy Policy
├── terms-of-service.html         # Store Terms of Service & Warranty Policy
├── COMPONENT-product-card.html   # Master Canonical Product Card Template
├── robots.txt                    # Search Crawler Directives (Disallows /admin/)
├── sitemap.xml                   # XML Sitemap for Search Engines
├── README.md                     # Master Deployment & Handover Guide
├── PHP-DEV-GUIDE.md              # Technical PHP Developer Integration Manual
├── FIELD-NAMING-CONVENTION.md    # 16-Field Product Standard & DB Mapping
├── FORM-FIELD-MAP.md             # HTML Form Fields to MySQL Columns Dictionary
├── SUPPORT-POLICY.md             # 2-Month Post-Handover Support Policy
│
├── tools/                        # Interactive Utility Engines Hub
│   ├── index.html                # Centralized Tools Hub
│   ├── emi-calculator/           # Standalone EMI Loan Calculator
│   │   └── index.html
│   ├── b2b-profit-calculator/    # Standalone B2B Margin Calculator
│   │   └── index.html
│   └── cgpa-calculator/          # Standalone CGPA & Percentage Converter
│       └── index.html
│
├── admin/                        # Administrative Control Panel (Secured UI)
│   ├── index.html                # Admin Dashboard (KPI Metrics & Navigation)
│   ├── login.html                # Admin Login Form with CSRF Token Marker
│   ├── manage-products.html      # Product Inventory Management Table & 16-Field Form
│   ├── manage-blogs.html         # Blog Articles Table & Rich-Text Editor Form
│   ├── manage-banners.html       # Announcement Bar & Promo Popup Slider Management
│   ├── manage-sliders.html       # Homepage Hero/New Arrivals Slider Management
│   ├── manage-categories.html    # Product Category Taxonomy Management
│   ├── manage-services.html      # Repair Services Catalog & Price Range Management
│   ├── manage-comments.html      # Reader Comment Moderation Interface
│   ├── manage-inquiries.html     # Customer Inquiry & Lead Management
│   ├── script.js                 # Admin UI Interactivity (Slide toggles, tabs)
│   └── styles.css                # Admin Panel Layout & Components Stylesheet
│
├── database/                     # Database Definition
│   └── schema.sql                # Complete 9-Table MySQL Schema & Seed Data
│
├── styles/                       # CSS Component & Layout Stylesheets
│   ├── design-system.css         # Authoritative Design Token Library
│   ├── home.css                  # Storefront Styles (Navbar, Hero, Product Cards, Footer)
│   └── tools.css                 # Universal Styles for Interactive Tools & Calculators
│
├── scripts/                      # Client-side JavaScript Engines
│   ├── emi-calc.js               # EMI Calculation Logic & Conic-Gradient Chart
│   ├── b2b-calc.js               # B2B Profit Margin Calculation Logic
│   └── cgpa-calc.js              # CGPA to Percentage Conversion Logic
│
├── assets/                       # Static Media & Brand Assets
│   ├── brands/                   # Brand Manufacturer Logos
│   ├── campaign/                 # Promotional Posters & Campaign Graphics
│   ├── categoryimage/            # 12 Shop by Category Graphics
│   ├── hero/                     # Hero Media Assets
│   ├── productimage/             # Hardware Product Photographs
│   ├── primary-microsys-png.png  # Primary Brand Identity Navbar Logo
│   └── og-image-microsys.jpg     # Open Graph & Social Sharing Image
│
└── blogs/                        # Editorial Content
    ├── posts.json                # Article Metadata Index
    ├── thumbnails/               # Blog Featured WebP Images
    ├── style.css                 # Blog Listing & Detail Stylesheet
    ├── script.js                 # Blog Filtering Engine
    └── posts/                    # Markdown Source Articles
```

---

## 5. Deployment Steps

### 5.1 Uploading Files via cPanel or FTP
1. Log in to your hosting control panel (cPanel, Plesk, or SFTP/SSH server).
2. Open **File Manager** and navigate to your public web directory (`public_html/` or subdomain folder).
3. Upload all project files and directories directly into `public_html/`.
4. Ensure directory permissions are set to `755` and file permissions to `644`.

### 5.2 Database Provisioning via phpMyAdmin
1. In cPanel, navigate to **MySQL Databases** and create a new database (e.g., `microsys_db`).
2. Create a new MySQL user with a secure password (e.g., `microsys_user`).
3. Add the user to the database and assign **ALL PRIVILEGES**.
4. Open **phpMyAdmin**, select the newly created database, and click the **Import** tab.
5. Click **Choose File**, select [`database/schema.sql`](database/schema.sql), and click **Import**.
6. The schema will provision all 9 relational tables and seed the initial repair services.

### 5.3 Configuring PHP Database Connection (`db.php`)
Create a central database connection script (e.g., `db.php` or `includes/db.php`) in your root directory:

```php
<?php
// db.php — Master Database Connection
define('DB_HOST', 'localhost');
define('DB_NAME', 'microsys_db');
define('DB_USER', 'microsys_user');
define('DB_PASS', 'YourSecurePasswordHere');
define('DB_CHARSET', 'utf8mb4');

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (\PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    die("A temporary database error occurred. Please try again later.");
}
?>
```

### 5.4 Backend PHP Integration Sequence
Once database connectivity is established, refer to [`PHP-DEV-GUIDE.md`](PHP-DEV-GUIDE.md) to integrate the frontend templates in the recommended order:
1. **Dynamic Loops**: Replace marked template loops (`$categories`, `$popular_laptops`, `$filtered_products`) with PDO query results.
2. **Catalog Filters**: Connect `products.php` GET filters using the locked query parameter names (`q`, `category[]`, `brand[]`, `min_price`, `max_price`).
3. **Product Detail**: Route `product-detail.php?slug=...` and display the 16 canonical fields.
4. **Form Handlers**: Configure POST endpoints for `#mainContactForm` (`submit-enquiry.php`), admin logins, and inventory management.
5. **Editorial Management**: Hydrate blogs, announcements, and promotional popup slides.

---

## 6. Credits & Attribution

- **Client**: Microsys Computer & Accessories (Bihar Sharif, Nalanda, Bihar)
- **Engineered & Designed by**: [**Team VYOMARC Technologies**](https://vyomarctech.com)
- **Technical Support**: [WhatsApp Support](https://wa.me/918252702699) (+91 8252702699)
- **Year**: 2026
- **License**: Proprietary / Client Commercial License

---

Prepared by: Team VYOMARC Technologies  
© 2026 VYOMARC Technologies. All rights reserved.
