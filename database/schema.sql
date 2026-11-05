-- Project: Microsys Computer & Accessories
-- Agency: VYOMARC Technologies
-- Backend: PHP + MySQL (Shared Hosting)
-- Generated: 2026-10-15
-- Usage: Import directly via phpMyAdmin

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `display_order` TINYINT UNSIGNED DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `brand` VARCHAR(100) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(280) NOT NULL UNIQUE,
  `model_number` VARCHAR(100) DEFAULT NULL,
  `key_specs` TEXT DEFAULT NULL,
  `full_specs` TEXT DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `mrp` DECIMAL(10,2) DEFAULT NULL,
  `image_primary` VARCHAR(255) DEFAULT NULL,
  `image_secondary` VARCHAR(255) DEFAULT NULL,
  `image_tertiary` VARCHAR(255) DEFAULT NULL,
  `availability` ENUM('in_stock','out_of_stock','pre_order') DEFAULT 'in_stock',
  `badge` VARCHAR(50) DEFAULT NULL,
  `sku` VARCHAR(100) DEFAULT NULL UNIQUE,
  `warranty` VARCHAR(100) DEFAULT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_products_brand` (`brand`),
  INDEX `idx_products_availability` (`availability`),
  INDEX `idx_products_is_featured` (`is_featured`),
  INDEX `idx_products_is_active` (`is_active`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table 4: blogs (Synchronized with posts.json, blog-detail.html, and admin/manage-blogs.html)
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(280) NOT NULL UNIQUE,
  `category` VARCHAR(100) DEFAULT NULL, -- Permitted categories: 'Buying Guides', 'Local business', 'Hardware Tips', 'Gaming', 'Services', 'Case study', 'General Blogs'
  `thumbnail_url` VARCHAR(255) NOT NULL,
  `author_name` VARCHAR(100) DEFAULT 'Microsys Team',
  `meta_description` TEXT DEFAULT NULL,
  `content_html` LONGTEXT NOT NULL,
  `status` ENUM('draft', 'published') DEFAULT 'draft',
  `is_featured` TINYINT(1) DEFAULT 0,
  `published_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_blogs_status` (`status`),
  INDEX `idx_blogs_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `blog_id` INT UNSIGNED NOT NULL,
  `commenter_name` VARCHAR(100) NOT NULL,
  `commenter_email` VARCHAR(150) DEFAULT NULL,
  `body` TEXT NOT NULL,
  `is_approved` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `promotions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` ENUM('announcement_bar','popup_modal') NOT NULL,
  `text_content` VARCHAR(500) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sliders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) DEFAULT NULL,
  `eyebrow` VARCHAR(150) DEFAULT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `subtitle` VARCHAR(500) DEFAULT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `link_url` VARCHAR(255) DEFAULT NULL,
  `display_order` TINYINT UNSIGNED DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `enquiry_type` VARCHAR(100) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `product_interest` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('new', 'read', 'contacted', 'closed') DEFAULT 'new',
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `services` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `price_range` VARCHAR(100) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Initial 9 Canonical Technical Support & Repair Services (Synchronized with aboutus.html and admin/manage-services.html)
INSERT INTO `services` (`id`, `title`, `description`, `price_range`, `is_active`) VALUES
(1, 'Laptop Diagnosis', 'Comprehensive motherboard, battery, and display diagnostics with chip-level precision.', 'Starting at ₹299', 1),
(2, 'Desktop Repair', 'Hardware troubleshooting, power supply replacement, and component fixes for all desktop PCs.', 'Starting at ₹399', 1),
(3, 'RAM / SSD Upgrade', 'High-speed NVMe SSD and DDR4/DDR5 RAM installation with instant speed boost.', 'Starting at ₹499', 1),
(4, 'Operating System Installation', 'Genuine Windows 11 & Linux setup with drivers, security patches, and optimization.', 'Starting at ₹499', 1),
(5, 'Data Migration', 'Secure file recovery, high-speed disk cloning, and seamless backup to new storage drives.', 'Starting at ₹699', 1),
(6, 'Custom PC Assembly', 'Professional gaming and workstation rig build service with clean cable management.', 'Starting at ₹999', 1),
(7, 'Cooling Maintenance', 'Heatsink dust cleaning, fan servicing, and premium thermal paste re-application.', 'Starting at ₹349', 1),
(8, 'Printer Troubleshooting', 'Cartridge refill, printhead cleaning, driver configuration, and paper jam repair.', 'Starting at ₹299', 1),
(9, 'Networking Setup', 'Wi-Fi router setup, structured LAN cabling, and secure small office network configuration.', 'Starting at ₹799', 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `price_range` = VALUES(`price_range`), `is_active` = VALUES(`is_active`);

SET FOREIGN_KEY_CHECKS = 1;


