# MICROSYS WEBSITE — AI AGENT SEO IMPLEMENTATION GUIDE
# Read this file FIRST before touching any code.
# Reference file: Microsys_Local_SEO_Keywords_Strategy.md (in root folder)

---

## YOUR ROLE
You are implementing local SEO for Microsys — a computer showroom in Biharsharif, Bihar.
Your ONLY job is to place the right keywords in the right HTML elements.
Do NOT change any design, layout, colors, or structure.
Do NOT add content that is not in the strategy file.
Follow this guide in EXACT ORDER — do not skip steps.

---

## FILE STRUCTURE ASSUMED (HYBRID ARCHITECTURE)

```text
microsys/
├── index.html                    # Main homepage (Header, Hero, Categories, Showcase, Contact CTA, Footer)
├── products.html                 # Unified Products Catalog Page (Filter Sidebar, Search/Sort, Master Grid, Pagination)
├── product-detail.html           # Dedicated Product Detail page (Dynamic gallery, specs table, sticky bar)
├── aboutus.html                  # Standalone About Us page (Company overview, Repair Services, Store location)
├── blog.html                     # Blog listing page with Microsys header/footer and dynamic post grid
├── blog-detail.html              # Dedicated Blog article detail page (Dynamic Markdown reader)
├── COMPONENT-product-card.html   # Master product card reference template
├── assets/                       # Static media asset repository (microsys-logo.svg, categoryimage/, productimage/, etc.)
├── blogs/                        # Blog assets and data (posts.json, script.js, style.css, post-script.js)
├── styles/                       # Stylesheet directory (design-system.css, home.css)
├── admin/                        # Dedicated Admin Panel Sub-Application (CRITICAL: MUST BE NOINDEX)
│   ├── index.html                # Admin Dashboard
│   ├── login.html                # Admin Login Form
│   ├── manage-banners.html       # Announcement Bar & Popup Modal Management
│   ├── manage-blogs.html         # Blog Management
│   ├── manage-categories.html    # Category Taxonomy Management
│   ├── manage-comments.html      # Comment Moderation
│   ├── manage-inquiries.html     # Customer Leads & Inquiries
│   ├── manage-products.html      # Product Catalog Management
│   ├── manage-services.html      # Technical Services Management
│   ├── manage-sliders.html       # Hero/Arrivals Sliders Management
│   ├── script.js                 # Admin JS Interactions
│   └── styles.css                # Dedicated Admin Stylesheet
├── database/
│   └── schema.sql                # MySQL Database Schema (8 tables)
├── robots.txt                    # Search crawler directives (Blocks /admin/)
├── sitemap.xml                   # XML Sitemap for search engines
└── Microsys_Local_SEO_Keywords_Strategy.md  ← reference strategy file
```

> **IMPORTANT ARCHITECTURAL RULE — HYBRID CATALOG MODEL**:  
> Microsys uses a unified catalog architecture. All 12 hardware categories (Laptops, Desktop PCs, Gaming PCs, Custom PC Builds, PC Components, Processors, Graphics Cards, Motherboards, RAM & Storage, Monitors, Printers, Networking, Accessories) are dynamically handled on **`products.html`** via URL query parameters (e.g., `products.html?category=laptops`) and on **`product-detail.html`** (e.g., `product-detail.html?id=1`).  
> **DO NOT CREATE separate static HTML files** like `laptops.html`, `gaming-pc.html`, `desktop.html`, `printers.html`, `components.html`, etc.  
> Do NOT create `contact.html` or `about.html` — our actual pages are `aboutus.html` and the homepage Contact CTA section.

---

## MASTER KEYWORD REFERENCE
Primary city: Biharsharif
District: Nalanda
Full address: Ramchandarpur Bus Stand, Biharsharif, Nalanda, Bihar — 803216
Brand name: Microsys
Coordinates: latitude 25.1882, longitude 85.5216

---

# PHASE 1 — index.html (DO THIS FIRST)
## Priority: CRITICAL — Complete this before any other file

---

### STEP 1.1 — Set HTML lang attribute
Find the opening html tag and set:
```html
<html lang="en-IN">
```

---

### STEP 1.2 — Replace <head> meta tags
Find the <head> section. Replace OR add these tags EXACTLY:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Microsys — Laptop, Desktop & Gaming PC Shop in Biharsharif, Nalanda Bihar</title>
<meta name="description" content="Microsys is Biharsharif's leading computer showroom. Buy laptops, gaming PCs, desktops, printers & PC components at the best price. Visit us at Ramchandarpur Bus Stand, Nalanda, Bihar.">
<meta name="keywords" content="laptop biharsharif, computer store nalanda, gaming pc bihar, printer shop biharsharif, desktop pc nalanda, laptop dealer biharsharif, computer showroom nalanda">
<link rel="canonical" href="https://microsys.in/">
```

---

### STEP 1.3 — Add OG Tags (after meta keywords line)
```html
<meta property="og:title" content="Microsys — Computer Shop in Biharsharif, Bihar">
<meta property="og:description" content="Laptops, Gaming PCs, Desktops & more at Biharsharif's best computer store. Visit Microsys at Ramchandarpur Bus Stand, Nalanda.">
<meta property="og:image" content="https://microsys.in/images/og-banner.jpg">
<meta property="og:url" content="https://microsys.in">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_IN">
```

---

### STEP 1.4 — Add LocalBusiness Schema (last item before </head>)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ComputerStore",
  "name": "Microsys",
  "description": "Biharsharif's most complete computer showroom offering laptops, gaming PCs, desktops, printers and PC components",
  "url": "https://microsys.in",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ramchandarpur Bus Stand",
    "addressLocality": "Biharsharif",
    "addressRegion": "Bihar",
    "postalCode": "803216",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.1882",
    "longitude": "85.5216"
  },
  "openingHours": "Mo-Sa 09:00-20:00",
  "priceRange": "₹₹",
  "areaServed": ["Biharsharif","Nalanda","Nawada","Rajgir","Barbigha","Sheikhpura","Gaya","Pawapuri"]
}
</script>
```

---

### STEP 1.5 — Add FAQ Schema (after LocalBusiness schema, before </head>)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is Microsys located in Biharsharif?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microsys is located at Ramchandarpur Bus Stand, Biharsharif, Nalanda, Bihar 803216."
      }
    },
    {
      "@type": "Question",
      "name": "What products are available at Microsys Biharsharif?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microsys offers laptops, desktop computers, gaming PCs, custom-built PCs, PC components, monitors, printers, tablets, keyboards, mice, networking equipment, and accessories — all under one roof."
      }
    },
    {
      "@type": "Question",
      "name": "Does Microsys offer custom PC building services in Bihar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Microsys provides expert custom PC building for gaming, video editing, office, and programming setups at our Biharsharif store."
      }
    },
    {
      "@type": "Question",
      "name": "Which laptop brands are available at Microsys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microsys stocks HP, Dell, Lenovo, ASUS, Acer and more — for students, professionals, and gamers."
      }
    },
    {
      "@type": "Question",
      "name": "Is EMI available on laptops and computers at Microsys Biharsharif?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, EMI options are available on select products. Visit our Biharsharif store or contact us for current EMI schemes."
      }
    },
    {
      "@type": "Question",
      "name": "Does Microsys serve customers from Nawada, Rajgir, Barbigha, and Gaya?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Microsys serves customers from Nawada, Rajgir, Barbigha, Sheikhpura, Asthawan, Pawapuri, and Gaya from our central Biharsharif location."
      }
    },
    {
      "@type": "Question",
      "name": "What is the price range of laptops at Microsys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Laptops at Microsys range from ₹25,000 for budget entry-level models to ₹1,50,000+ for premium gaming machines."
      }
    },
    {
      "@type": "Question",
      "name": "Are products at Microsys genuine and under warranty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All products are 100% genuine with official manufacturer warranty. Proper invoice provided on every purchase."
      }
    }
  ]
}
</script>
```

---

### STEP 1.6 — Fix H1 tag in <body>
Find the FIRST H1 tag on the page.
Replace its text content with:
```
Buy Laptops, Gaming PCs & Computers in Biharsharif, Nalanda
```
Do NOT change the H1's class, id, or style. Only change the text inside it.

---

### STEP 1.7 — Fix H2 tags in <body>
Find all H2 tags. Apply these in order of appearance:

| H2 Position | Replace text with |
|-------------|-------------------|
| 1st H2 | Shop by Category — Laptops, PCs, Gaming & More in Biharsharif |
| 2nd H2 | Popular Products — Best Laptops & Computers in Nalanda Bihar |
| 3rd H2 | Custom PC Building in Biharsharif — Your Budget, Your Specs |
| 4th H2 | Why Choose Microsys — Biharsharif's Most Trusted Computer Store |
| 5th H2 onwards | Leave as is OR ask user what section it is |

Do NOT change H2 class or style. Only change text content.

---

### STEP 1.8 — Add alt text to ALL images in index.html
Go through every <img> tag. Add or replace alt attribute:

```
Rule: alt="[what the image shows] — Microsys [city keyword]"
```

Apply these exact alt texts by image context:

| Image Context | Alt Text To Use |
|---------------|-----------------|
| Hero/banner image | Microsys computer showroom Biharsharif — laptops gaming PC desktop Bihar |
| Laptops category | Buy laptops in Biharsharif — HP, Dell, Lenovo at Microsys Nalanda Bihar |
| Desktop PCs category | Desktop computers for home and office in Nalanda — Microsys Biharsharif |
| Gaming PCs category | Gaming PC available in Biharsharif — high-performance computers Nalanda Bihar |
| Processors category | Intel and AMD processors in Nawada and Nalanda — Microsys Biharsharif |
| Graphics Cards category | Graphics cards available in Rajgir and Biharsharif — GPU at Microsys Nalanda Bihar |
| Motherboards category | Motherboards for PC builds in Sheikhpura and Nalanda — Microsys Biharsharif Bihar |
| RAM & Storage category | RAM and SSD storage upgrade in Barbigha and Biharsharif — Microsys Nalanda |
| Monitors category | Computer monitors for office and home in Gaya and Nalanda — Microsys Biharsharif |
| Keyboards & Mice category | Keyboard and mouse in Biharsharif — wired and wireless peripherals Microsys Nalanda |
| Printers category | HP and Canon printers in Nawada and Rajgir — Microsys Biharsharif Bihar |
| Networking category | WiFi routers in Barbigha and Sheikhpura — networking equipment Microsys Nalanda |
| Accessories category | Computer accessories in Gaya and Biharsharif — Microsys Nalanda Bihar |
| Logo image | Microsys — Computer Store Biharsharif Nalanda Bihar |
| Any product image | [Brand] [Product Name] — available at Microsys Biharsharif Bihar |

---

### STEP 1.9 — Fix anchor text on category card links
Find all category card links (the arrow links on category cards).
Replace generic anchor text like "Shop Now" or "View All" with keyword-rich text:

| Category Card | Anchor Text To Use |
|---------------|-------------------|
| Laptops card link | Shop Laptops in Biharsharif |
| Desktop PCs card link | Shop Desktop PCs in Nalanda |
| Gaming PCs card link | Shop Gaming PCs in Bihar |
| Processors card link | Shop Processors in Biharsharif |
| Graphics Cards card link | Shop Graphics Cards in Nalanda |
| Motherboards card link | Shop Motherboards in Bihar |
| RAM & Storage card link | Shop RAM & Storage in Biharsharif |
| Monitors card link | Shop Monitors in Nalanda |
| Keyboards & Mice card link | Shop Keyboards & Mice in Bihar |
| Printers card link | Shop Printers in Biharsharif |
| Networking card link | Shop Networking in Nalanda |
| Accessories card link | Shop Accessories in Biharsharif |

---

### STEP 1.10 — Add FAQ section HTML before </body>
Find the closing </body> tag. BEFORE it, add this FAQ section HTML:

```html
<!-- FAQ SECTION — SEO OPTIMIZED -->
<section id="faq" aria-label="Frequently Asked Questions">
  <h2>Frequently Asked Questions — Microsys Biharsharif</h2>

  <div class="faq-item">
    <h3>Where is Microsys located in Biharsharif?</h3>
    <p>Microsys is located at Ramchandarpur Bus Stand, Biharsharif, Nalanda, Bihar — 803216. Easily accessible from Biharsharif city centre, and well-connected to Nalanda, Nawada, Rajgir, and surrounding areas. Find us on Google Maps by searching "Microsys Biharsharif".</p>
  </div>

  <div class="faq-item">
    <h3>What products are available at Microsys Biharsharif?</h3>
    <p>Microsys offers a complete range including laptops, desktop computers, gaming PCs, custom-built PCs, PC components (motherboards, RAM, SSD, processors, graphics cards), monitors, printers, tablets, keyboards, mice, networking equipment, and accessories — all under one roof.</p>
  </div>

  <div class="faq-item">
    <h3>Does Microsys offer custom PC building services in Bihar?</h3>
    <p>Yes. Microsys provides expert custom PC building services for gaming, video editing, office work, and programming setups. Visit our Biharsharif store, discuss your budget, and our team will configure and assemble your perfect PC. No hidden charges.</p>
  </div>

  <div class="faq-item">
    <h3>Which laptop brands are available at Microsys?</h3>
    <p>Microsys stocks laptops from HP, Dell, Lenovo, ASUS, Acer, and more — suitable for students, professionals, content creators, and gamers across all price ranges.</p>
  </div>

  <div class="faq-item">
    <h3>Is EMI available on laptops and computers at Microsys Biharsharif?</h3>
    <p>Yes, EMI options are available on select products. Visit our store at Ramchandarpur Bus Stand, Biharsharif or contact us to check current EMI schemes, bank offers, and no-cost EMI on laptops, desktops, and gaming PCs.</p>
  </div>

  <div class="faq-item">
    <h3>Does Microsys serve customers from Nawada, Rajgir, Barbigha, and Gaya?</h3>
    <p>Absolutely. Microsys serves buyers across Nalanda district including Nawada, Rajgir, Barbigha, Sheikhpura, Asthawan, Pawapuri, and Gaya. Our central Biharsharif location is easily reachable from all these towns.</p>
  </div>

  <div class="faq-item">
    <h3>What is the price range of laptops at Microsys?</h3>
    <p>Laptops at Microsys range from ₹25,000 for entry-level student laptops to ₹1,50,000+ for premium gaming machines. We stock HP, Dell, Lenovo, and ASUS across all segments. Visit our Biharsharif showroom for latest pricing.</p>
  </div>

  <div class="faq-item">
    <h3>Are products at Microsys genuine and under warranty?</h3>
    <p>Yes. All products at Microsys are 100% genuine with official manufacturer warranty. We provide honest advice, transparent pricing, and proper invoice with every purchase — ensuring complete after-sales support in Biharsharif and Nalanda.</p>
  </div>
</section>
```

---

### STEP 1.11 — Update footer address text
Find the footer section. Ensure the address reads EXACTLY:

```
Microsys
Ramchandarpur Bus Stand, Biharsharif,
Nalanda, Bihar — 803216
```

Wrap it in proper HTML if not already:
```html
<address>
  <strong>Microsys</strong><br>
  Ramchandarpur Bus Stand, Biharsharif,<br>
  Nalanda, Bihar — 803216
</address>
```

---

### ✅ PHASE 1 COMPLETE CHECK
Before moving to Phase 2, verify index.html has:
- [ ] lang="en-IN" on html tag
- [ ] Title tag with "Biharsharif" and "Nalanda Bihar"
- [ ] Meta description under 160 characters
- [ ] Canonical tag pointing to homepage
- [ ] OG tags (6 tags)
- [ ] LocalBusiness schema script
- [ ] FAQ schema script
- [ ] H1 contains "Biharsharif" or "Nalanda"
- [ ] All img tags have alt text with city keywords
- [ ] FAQ section HTML added before </body>
- [ ] Footer address correct

---

# PHASE 2 — CATALOG & DETAIL PAGES (products.html & product-detail.html)
## Apply SEO to the Unified Catalog and Dynamic Product Detail Pages

---

### STEP 2.1 — products.html (Catalog Master Page)
Find `products.html`. Apply these exact meta tags and on-page headings:

#### Head Meta Tags:
```html
<title>Shop Laptops, PCs & Components in Biharsharif | Microsys Catalog</title>
<meta name="description" content="Browse all laptops, desktop PCs, custom gaming rigs, computer components & accessories at Microsys in Biharsharif. Best tech prices in Nalanda, Bihar.">
<meta name="keywords" content="laptop biharsharif, pc catalog nalanda, gaming pc bihar, computer components biharsharif, printers nalanda, computer showroom biharsharif">
<link rel="canonical" href="https://microsys.in/products.html">
```

#### Open Graph Tags:
```html
<meta property="og:title" content="Shop Laptops, PCs & Components in Biharsharif | Microsys Catalog">
<meta property="og:description" content="Browse laptops, desktop PCs, custom gaming rigs, computer components & accessories at Microsys in Biharsharif. Best tech prices in Nalanda, Bihar.">
<meta property="og:image" content="https://microsys.in/assets/campaign/poster.webp">
<meta property="og:url" content="https://microsys.in/products.html">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_IN">
```

#### Heading Structure:
- **H1 tag** (Main Catalog Heading) →
  ```
  All Products — Laptops, Components & Accessories in Biharsharif
  ```
- **H2 tag** (Filter Sidebar Heading) →
  ```
  Filter by Category
  ```
- **Secondary H2 tag** (Sort / Results Summary) →
  ```
  Popular Hardware & Featured Computers in Nalanda Bihar
  ```

#### Anchor Text Mapping for Filter Links:
Ensure the category filter options and navigation links carry keyword-rich descriptive labels:

| Category Filter Option | Target Filter Parameter | Keyword-Rich Anchor / Label |
| :--- | :--- | :--- |
| Laptops | `?category=laptops` | Shop Laptops in Biharsharif |
| Desktop PCs | `?category=desktop-pcs` | Shop Desktop PCs in Nalanda |
| Gaming PCs | `?category=gaming-pcs` | Shop Gaming PCs in Bihar |
| Custom PC Build | `?category=custom-pc` | Custom PC Building in Biharsharif |
| PC Components | `?category=pc-components` | Shop PC Components in Biharsharif |
| Processors | `?category=processors` | Shop Processors in Nalanda |
| Graphics Cards | `?category=graphics-cards` | Shop Graphics Cards in Bihar |
| Motherboards | `?category=motherboards` | Shop Motherboards in Nalanda |
| RAM & Storage | `?category=ram-storage` | Shop RAM & Storage in Biharsharif |
| Monitors | `?category=monitors` | Shop Monitors in Nalanda |
| Printers | `?category=printers` | Shop Printers in Biharsharif |
| Networking | `?category=networking` | Shop Networking in Nalanda |
| Accessories | `?category=accessories` | Shop Accessories in Biharsharif |

---

### STEP 2.2 — product-detail.html (Dynamic Detail Page)
> **DYNAMIC PAGE NOTICE**: `product-detail.html` is a dynamic template populated via `?id=[id]`. The PHP backend developer will echo the `$product['name']`, `$product['short_description']`, `$product['offer_price']`, and `$product['image']` dynamically. The AI agent must provide PHP markers and template standards.

#### Head Meta Tags with PHP Echo Markers:
```html
<title><?php echo htmlspecialchars($product['name'] ?? 'Product Details'); ?> in Biharsharif | Microsys</title>
<meta name="description" content="Buy <?php echo htmlspecialchars($product['name'] ?? 'computer hardware'); ?> at Microsys in Biharsharif. Best price, genuine warranty & expert support in Nalanda, Bihar.">
<link rel="canonical" href="https://microsys.in/product-detail.html?id=<?php echo urlencode($product['id'] ?? ''); ?>">
```

#### Open Graph Tags with PHP Echo Markers:
```html
<meta property="og:title" content="<?php echo htmlspecialchars($product['name'] ?? 'Product Details'); ?> | Microsys Biharsharif">
<meta property="og:description" content="<?php echo htmlspecialchars($product['short_description'] ?? 'Buy computer hardware at Microsys Biharsharif'); ?>">
<meta property="og:image" content="https://microsys.in/assets/productimage/<?php echo htmlspecialchars($product['image'] ?? 'default.webp'); ?>">
<meta property="og:url" content="https://microsys.in/product-detail.html?id=<?php echo urlencode($product['id'] ?? ''); ?>">
<meta property="og:type" content="product">
<meta property="og:locale" content="en_IN">
```

#### Dynamic H1 Heading:
```html
<h1><?php echo htmlspecialchars($product['name'] ?? 'Product Details'); ?></h1>
```

#### STEP 2.3 — Dynamic Product Schema JSON-LD (Place before `</head>`):
```html
<!-- PHP MARKER: Dynamic Product Schema JSON-LD for PHP backend developer -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "<?php echo htmlspecialchars($product['name'] ?? 'Product Name'); ?>",
  "image": "https://microsys.in/assets/productimage/<?php echo htmlspecialchars($product['image'] ?? 'default.webp'); ?>",
  "description": "<?php echo htmlspecialchars($product['short_description'] ?? 'Buy computer hardware at Microsys Biharsharif'); ?>",
  "brand": {
    "@type": "Brand",
    "name": "<?php echo htmlspecialchars($product['brand'] ?? 'Microsys'); ?>"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://microsys.in/product-detail.html?id=<?php echo urlencode($product['id'] ?? ''); ?>",
    "priceCurrency": "INR",
    "price": "<?php echo htmlspecialchars($product['offer_price'] ?? $product['price'] ?? '0'); ?>",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "ComputerStore",
      "name": "Microsys",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ramchandarpur Bus Stand",
        "addressLocality": "Biharsharif",
        "addressRegion": "Bihar",
        "postalCode": "803216",
        "addressCountry": "IN"
      }
    }
  }
}
</script>
```

#### Image Alt Tag Pattern:
```html
alt="<?php echo htmlspecialchars($product['name'] ?? 'Product'); ?> available at Microsys Biharsharif Nalanda Bihar"
```

---

### ✅ PHASE 2 COMPLETE CHECK
- [ ] `products.html` title tag targets catalog + Biharsharif + Microsys
- [ ] `products.html` meta description is under 160 characters
- [ ] `products.html` canonical tag points to `https://microsys.in/products.html`
- [ ] `products.html` H1 is "All Products — Laptops, Components & Accessories in Biharsharif"
- [ ] `products.html` H2 filter title is "Filter by Category"
- [ ] `product-detail.html` dynamic PHP echo markers specified for `<title>`, `<meta description>`, and canonical
- [ ] Dynamic Product Schema JSON-LD script block added with PHP markers
- [ ] All obsolete individual category files (`laptops.html`, `gaming-pc.html`, etc.) completely eliminated from instructions

---

# PHASE 3 — robots.txt (5 MINUTES — DO THIS)
## Create or replace robots.txt in root folder

Instruct search engine crawlers to crawl all public storefront pages while strictly blocking administrative and private endpoints:

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://microsys.in/sitemap.xml
```

Save as: `robots.txt` in root folder (same level as `index.html`).

---

# PHASE 4 — sitemap.xml
## Create sitemap.xml in root folder

Only include live, canonical public pages. Do NOT include non-existent static category files or private admin paths:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage -->
  <url>
    <loc>https://microsys.in/</loc>
    <lastmod>2026-10-31</lastmod>
    <priority>1.0</priority>
  </url>

  <!-- Products Catalog -->
  <url>
    <loc>https://microsys.in/products.html</loc>
    <lastmod>2026-10-31</lastmod>
    <priority>0.9</priority>
  </url>

  <!-- Standalone About Us & Services Page -->
  <url>
    <loc>https://microsys.in/aboutus.html</loc>
    <lastmod>2026-10-31</lastmod>
    <priority>0.8</priority>
  </url>

  <!-- Blog Listing Page -->
  <url>
    <loc>https://microsys.in/blog.html</loc>
    <lastmod>2026-10-31</lastmod>
    <priority>0.8</priority>
  </url>

</urlset>
```

> **DEVELOPER NOTE ON DYNAMIC PAGES & ADMIN**:  
> - `product-detail.html` and `blog-detail.html` are item-level dynamic templates. In Phase 7 (PHP integration), the backend developer will implement a dynamic sitemap generator that loops through active database products and blog posts.  
> - The `/admin/` directory is deliberately excluded from `sitemap.xml` and disallowed in `robots.txt`.
```

---

# PHASE 5 — aboutus.html & Final CTA Section
## Contact Information, Showroom Address & Google Maps Integration

> **ARCHITECTURE NOTICE**: Microsys does not have a separate `contact.html`. Customer discovery, store address, operating hours, and contact channels are consolidated within the **Final CTA Section of `index.html`** and the dedicated **`aboutus.html`** page.

### STEP 5.1 — index.html Final CTA & Showroom Contact Block
Locate the Final CTA / Contact section in `index.html`. Ensure the structured address, direct action links, and Google Maps embed are present:

```html
<section id="contact-cta" class="contact-cta-section" aria-label="Visit Our Showroom">
  <h2>Visit Microsys Computer Showroom in Biharsharif</h2>
  <p>Conveniently located near Ramchandarpur Bus Stand, serving Nalanda, Nawada, Rajgir, Barbigha, Sheikhpura, Gaya and Pawapuri.</p>

  <address class="store-address">
    <strong>Microsys</strong><br>
    Opposite / Near Ramchandarpur Bus Stand,<br>
    Biharsharif, Nalanda, Bihar — 803216<br>
    <span>Phone: <a href="tel:+919431687928">+91 9431687928</a></span><br>
    <span>WhatsApp: <a href="https://wa.me/919431687928?text=Hello%20Microsys,%20I%20have%20an%20inquiry" target="_blank" rel="noopener">Chat on WhatsApp</a></span>
  </address>

  <!-- Google Maps Embed -->
  <iframe
    src="https://www.google.com/maps?q=Ramchandarpur+Bus+Stand+Biharsharif+Bihar&output=embed"
    width="100%"
    height="360"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Microsys Computer Showroom Location — Ramchandarpur Bus Stand, Biharsharif, Nalanda Bihar">
  </iframe>
</section>
```

### STEP 5.2 — aboutus.html Meta Tags & Headings
Find `aboutus.html`. Apply these exact meta tags and heading structures:

#### Head Meta Tags:
```html
<title>About Microsys — Computer Store & Repair Services in Biharsharif, Nalanda</title>
<meta name="description" content="Learn about Microsys, Biharsharif's most trusted computer showroom & service center at Ramchandarpur Bus Stand, Nalanda Bihar. Laptops, custom PCs & repair.">
<meta name="keywords" content="about microsys biharsharif, computer showroom nalanda, laptop repair biharsharif, pc service center nalanda, computer store bihar">
<link rel="canonical" href="https://microsys.in/aboutus.html">
```

#### Open Graph Tags:
```html
<meta property="og:title" content="About Microsys — Computer Store & Repair Services in Biharsharif, Nalanda">
<meta property="og:description" content="Biharsharif's premier computer showroom and hardware repair center at Ramchandarpur Bus Stand, Nalanda, Bihar.">
<meta property="og:image" content="https://microsys.in/assets/campaign/poster.webp">
<meta property="og:url" content="https://microsys.in/aboutus.html">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_IN">
```

#### Headings Structure in `aboutus.html`:
- **H1 tag** →
  ```
  About Microsys — Biharsharif's Most Complete Computer Store & Service Center
  ```
- **H2 tag (Repair Services)** →
  ```
  Professional Laptop & PC Repair Services in Nalanda, Bihar
  ```
- **H2 tag (Location & Hours)** →
  ```
  Visit Our Showroom at Ramchandarpur Bus Stand, Biharsharif
  ```

---

# PHASE 6 — blog.html & blog-detail.html
## Knowledge Hub, Tech Guides & Dynamic Article SEO

---

### STEP 6.1 — blog.html (Blog Listing Page)
Find `blog.html`. Apply these exact meta tags and headings:

#### Head Meta Tags:
```html
<title>Tech News, Buying Guides & Computer Tips in Biharsharif | Microsys Blog</title>
<meta name="description" content="Read expert laptop buying guides, PC building tips, and tech news from Microsys Biharsharif. Helping students and professionals across Nalanda, Bihar.">
<meta name="keywords" content="laptop buying guide biharsharif, pc building tips nalanda, computer blog bihar, tech showroom biharsharif, best laptop nalanda">
<link rel="canonical" href="https://microsys.in/blog.html">
```

#### Open Graph Tags:
```html
<meta property="og:title" content="Tech News, Buying Guides & Computer Tips in Biharsharif | Microsys Blog">
<meta property="og:description" content="Expert computer buying advice, PC building guides, and tech tips from Microsys Biharsharif, Nalanda, Bihar.">
<meta property="og:image" content="https://microsys.in/assets/campaign/poster.webp">
<meta property="og:url" content="https://microsys.in/blog.html">
<meta property="og:type" content="blog">
<meta property="og:locale" content="en_IN">
```

#### Headings Structure:
- **H1 tag** →
  ```
  Microsys Tech Blog — Guides, Reviews & Computer Insights in Biharsharif
  ```
- **H2 tag** →
  ```
  Latest Articles & Buying Advice for Nalanda Tech Enthusiasts
  ```

---

### STEP 6.2 — blog-detail.html (Dynamic Article Reader)
> **DYNAMIC ARTICLE NOTICE**: `blog-detail.html` dynamically loads articles based on `?slug=[slug]`. The PHP developer will echo the blog article properties into the head meta tags and schema markup.

#### Head Meta Tags with PHP Echo Markers:
```html
<title><?php echo htmlspecialchars($post['title'] ?? 'Blog Article'); ?> | Microsys Biharsharif</title>
<meta name="description" content="<?php echo htmlspecialchars($post['excerpt'] ?? 'Expert tech advice and hardware guides from Microsys Biharsharif, Nalanda Bihar.'); ?>">
<link rel="canonical" href="https://microsys.in/blog-detail.html?slug=<?php echo urlencode($post['slug'] ?? ''); ?>">
```

#### Open Graph Tags with PHP Echo Markers:
```html
<meta property="og:title" content="<?php echo htmlspecialchars($post['title'] ?? ''); ?> | Microsys Biharsharif">
<meta property="og:description" content="<?php echo htmlspecialchars($post['excerpt'] ?? ''); ?>">
<meta property="og:image" content="https://microsys.in/blogs/<?php echo htmlspecialchars($post['cover_image'] ?? 'default-cover.webp'); ?>">
<meta property="og:url" content="https://microsys.in/blog-detail.html?slug=<?php echo urlencode($post['slug'] ?? ''); ?>">
<meta property="og:type" content="article">
<meta property="og:locale" content="en_IN">
```

#### Dynamic Article H1 Heading:
```html
<h1><?php echo htmlspecialchars($post['title'] ?? 'Article Title'); ?></h1>
```

#### Dynamic BlogPosting Schema JSON-LD (Place before `</head>`):
```html
<!-- PHP MARKER: Dynamic BlogPosting Schema JSON-LD for PHP backend developer -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<?php echo htmlspecialchars($post['title'] ?? ''); ?>",
  "description": "<?php echo htmlspecialchars($post['excerpt'] ?? ''); ?>",
  "image": "https://microsys.in/blogs/<?php echo htmlspecialchars($post['cover_image'] ?? 'default-cover.webp'); ?>",
  "datePublished": "<?php echo htmlspecialchars($post['created_at'] ?? '2026-10-31'); ?>",
  "dateModified": "<?php echo htmlspecialchars($post['updated_at'] ?? '2026-10-31'); ?>",
  "author": {
    "@type": "Organization",
    "name": "Microsys",
    "url": "https://microsys.in"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Microsys",
    "logo": {
      "@type": "ImageObject",
      "url": "https://microsys.in/assets/microsys-logo.svg"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://microsys.in/blog-detail.html?slug=<?php echo urlencode($post['slug'] ?? ''); ?>"
  }
}
</script>
```

---

# PHASE 7 — ADMIN PANEL SECURITY & SEO (Noindex & Disallow)
## Prevent Crawler Indexing & Protect Administrative Boundaries

Search engines must NEVER index backend management consoles, customer inquiries, authentication portals, or moderation queues.

### STEP 7.1 — Apply Noindex Meta Tag to All Admin Pages
Every HTML file inside the `/admin/` directory MUST contain the following robots meta tag within its `<head>` section:

```html
<meta name="robots" content="noindex, nofollow">
```

### Complete Inventory of Admin Files Requiring `<meta name="robots" content="noindex, nofollow">`:
1. `admin/index.html` (Dashboard)
2. `admin/login.html` (Authentication Login Portal)
3. `admin/manage-banners.html` (Promotions Management)
4. `admin/manage-blogs.html` (Blog Post Management)
5. `admin/manage-categories.html` (Category Taxonomy Management)
6. `admin/manage-comments.html` (Comment Moderation Queue)
7. `admin/manage-inquiries.html` (Customer Inquiries / Leads Database)
8. `admin/manage-products.html` (Product Catalog Management)
9. `admin/manage-services.html` (Technical Services Management)
10. `admin/manage-sliders.html` (Sliders Management)

### STEP 7.2 — Crawler Verification
Verify that:
- [ ] `robots.txt` explicitly disallows `/admin/` (`Disallow: /admin/`)
- [ ] `sitemap.xml` contains zero `/admin/` URLs
- [ ] All 10 Admin HTML files include `<meta name="robots" content="noindex, nofollow">`

---

# RULES THE AGENT MUST NEVER BREAK

1. NEVER change CSS classes, IDs, or inline styles
2. NEVER remove existing HTML structure or layout
3. NEVER add keywords more than ONCE in the same tag
4. NEVER stuff multiple cities in one title tag — max 2 city names per title
5. NEVER write fake content — only use what is in the strategy file
6. NEVER change href links of navigation — only anchor TEXT
7. NEVER duplicate meta descriptions across pages — each must be unique
8. NEVER skip the canonical tag — every page needs one
9. ALWAYS keep meta description under 160 characters — count before saving
10. ALWAYS keep title tag under 60 characters — count before saving

---

# EXECUTION ORDER SUMMARY

### Standard Implementation Workflow:
```text
Phase 1: index.html (Homepage Core Local SEO & Structured Schemas)
Phase 2: products.html & product-detail.html (Catalog & Detail pages)
Phase 3: aboutus.html & blog.html (About Us, Blog Listing & Detail pages)
Phase 4: robots.txt & sitemap.xml (Crawler Directives & XML Index)
Phase 5: Admin Panel (Noindex, Nofollow & Crawler Security)
```

### Detailed Document Phase Reference:
- **Phase 1**: `index.html` (Homepage LocalBusiness & FAQ Schema, Meta, H1/H2, Alt Tags)
- **Phase 2**: `products.html` & `product-detail.html` (Catalog & Dynamic Detail Pages)
- **Phase 3**: `robots.txt` (Technical Crawler Directives & Admin Disallow)
- **Phase 4**: `sitemap.xml` (XML URL Index for Live Pages)
- **Phase 5**: `aboutus.html` & Final CTA Section (Store Address, Map Embed, Brand Story)
- **Phase 6**: `blog.html` & `blog-detail.html` (Knowledge Hub & Dynamic Article Meta)
- **Phase 7**: `/admin/` Panel Security & SEO (Noindex, Nofollow Directives across all Admin Pages)

---

# AFTER ALL PHASES COMPLETE — TELL THE USER:
"All SEO elements have been implemented. Next steps:
1. Deploy the website to live hosting
2. Submit sitemap.xml to Google Search Console
3. Create Google Business Profile at business.google.com
4. Test all pages on Google PageSpeed Insights"

---

*Reference: Microsys_Local_SEO_Keywords_Strategy.md*
*Guide version: 1.0 — October 2026*
*Prepared by: VYOMARC Technologies*
