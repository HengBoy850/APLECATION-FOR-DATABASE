CREATE DATABASE sp_ma_sy;
USE sp_ma_sy;
CREATE TABLE categories (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(100) 
);
CREATE TABLE suppliers (
    supplierID INT PRIMARY KEY AUTO_INCREMENT,
    supplierName VARCHAR(100) NOT NULL,
    contactPerson VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255)
);
CREATE TABLE customers (
    customerID INT PRIMARY KEY AUTO_INCREMENT,
    customerName VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE employees (
    employeeID INT PRIMARY KEY AUTO_INCREMENT,
    employeeName VARCHAR(100) NOT NULL,
    position VARCHAR(50),
    salary DECIMAL(10,2),
    phone VARCHAR(20)
);

CREATE TABLE products (
    productID INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    expireDate DATE,
    categoryID INT NOT NULL,
    supplierID INT NOT NULL,
    image VARCHAR(255),


    FOREIGN KEY (categoryID) REFERENCES categories(categoryID),
    FOREIGN KEY (supplierID) REFERENCES suppliers(supplierID)
);

CREATE TABLE orders (
    orderID INT PRIMARY KEY AUTO_INCREMENT,
    customerID INT,
    employeeID INT,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    totalAmount DECIMAL(10,2),

    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (employeeID) REFERENCES employees(employeeID)
);

CREATE TABLE orderdetailes (
    detailID INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT,
    productID INT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (productID) REFERENCES products(productID)
);

CREATE TABLE payments (
    paymentID INT PRIMARY KEY AUTO_INCREMENT,
    orderID INT,
    paymentMethod VARCHAR(50),
    paymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2),

    FOREIGN KEY (orderID) REFERENCES orders(orderID)
);

CREATE TABLE users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'cashier') NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    image VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    note TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE sales (
    saleID INT PRIMARY KEY AUTO_INCREMENT,
    customerName VARCHAR(100) DEFAULT 'Walk-in',
    totalItems INT NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    status ENUM('completed', 'cancelled') DEFAULT 'completed',
    saleDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sale_items (
    saleItemID INT PRIMARY KEY AUTO_INCREMENT,
    saleID INT NOT NULL,
    productID INT NOT NULL,
    productName VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (saleID) REFERENCES sales(saleID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES products(productID)
);


INSERT INTO categories (categoryName)
VALUES
('Drinks'),
('Snacks'),
('Fruits'),
('Vegetables'),
('Dairy Products'),
('Bakery'),
('Frozen Foods'),
('Meat'),
('Seafood'),
('Rice & Grains'),
('Cooking Oil'),
('Spices & Seasonings'),
('Canned Foods'),
('Instant Noodles'),
('Breakfast Foods'),
('Baby Products'),
('Personal Care'),
('Health & Beauty'),
('Household Supplies'),
('Cleaning Products'),
('Pet Supplies'),
('Stationery'),
('Toys'),
('Sports Equipment'),
('Electronics'),
('Mobile Accessories'),
('Computer Accessories'),
('Furniture'),
('Kitchenware'),
('Home Decoration'),
('Lighting'),
('Gardening'),
('Construction Materials'),
('Hardware & Tools'),
('Automotive'),
('Jewelry'),
('Fashion'),
('Shoes'),
('Bags & Accessories');



ALTER TABLE sales 
  MODIFY status ENUM('pending','completed','cancelled') DEFAULT 'pending',
  ADD COLUMN paymentMethod VARCHAR(50) DEFAULT NULL;

ALTER TABLE sales ADD COLUMN khqrMd5 VARCHAR(64) DEFAULT NULL;
ALTER TABLE sales ADD COLUMN khqrString TEXT DEFAULT NULL;

ALTER TABLE sales ADD COLUMN khqrImagePath VARCHAR(255) DEFAULT NULL;

CREATE TABLE settings (
    settingKey VARCHAR(50) PRIMARY KEY,
    settingValue VARCHAR(255)
);

INSERT INTO settings (settingKey, settingValue) VALUES ('storeQrImagePath', NULL);



CREATE TABLE web_customers (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(100),
    password VARCHAR(255),
    address TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE web_orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT,
    phone VARCHAR(20),
    address TEXT,
    paymentMethod VARCHAR(50),
    totalAmount DECIMAL(10,2),
    status ENUM(
      'pending',
      'paid',
      'processing',
      'delivered',
      'cancelled'
    ) DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(customerID)
    REFERENCES web_customers(customerID)
);
CREATE TABLE web_order_items (
    itemID INT AUTO_INCREMENT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY(orderID)
    REFERENCES web_orders(orderID),

    FOREIGN KEY(productID)
    REFERENCES products(productID)
);
CREATE TABLE promotions (
    promotionID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    image VARCHAR(255),
    discountPercent INT,
    categoryID INT,
    startDate DATETIME,
    endDate DATETIME,
    status ENUM('active','inactive')
);
CREATE TABLE banners (
    bannerID INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    title VARCHAR(100),
    status ENUM('active','inactive')
);
ALTER TABLE web_orders
ADD COLUMN visibleInOrdersPage TINYINT(1) DEFAULT 1;

UPDATE web_orders
SET visibleInOrdersPage = 0
WHERE createdAt < NOW() - INTERVAL 1 DAY;

ALTER TABLE web_orders
ADD orderNumber VARCHAR(30);
ALTER TABLE web_orders
ADD customerName VARCHAR(100);
ALTER TABLE web_orders
ADD discountAmount DECIMAL(10,2) DEFAULT 0;
ALTER TABLE web_orders
ADD finalAmount DECIMAL(10,2) DEFAULT 0;


-- =====================================================
-- 1. POS DISCOUNT TRACKING
-- =====================================================

ALTER TABLE sales
ADD COLUMN subtotalAmount DECIMAL(10,2) DEFAULT 0 AFTER totalAmount,
ADD COLUMN discountAmount DECIMAL(10,2) DEFAULT 0 AFTER subtotalAmount,
ADD COLUMN discountPercent DECIMAL(5,2) DEFAULT 0 AFTER discountAmount;

ALTER TABLE sale_items
ADD COLUMN discountPercent DECIMAL(5,2) DEFAULT 0 AFTER price,
ADD COLUMN discountAmount DECIMAL(10,2) DEFAULT 0 AFTER discountPercent;

-- =====================================================
-- 2. WEB ORDER DISCOUNT TRACKING
-- =====================================================

ALTER TABLE web_orders
ADD COLUMN subtotalAmount DECIMAL(10,2) DEFAULT 0 AFTER totalAmount,
ADD COLUMN discountPercent DECIMAL(5,2) DEFAULT 0 AFTER discountAmount;

ALTER TABLE web_order_items
ADD COLUMN productName VARCHAR(100) AFTER productID,
ADD COLUMN discountPercent DECIMAL(5,2) DEFAULT 0 AFTER price,
ADD COLUMN discountAmount DECIMAL(10,2) DEFAULT 0 AFTER discountPercent,
ADD COLUMN subtotal DECIMAL(10,2) DEFAULT 0 AFTER discountAmount;

-- =====================================================
-- 3. PROMOTION CAN TARGET PRODUCT
-- =====================================================

ALTER TABLE promotions
ADD COLUMN productID INT DEFAULT NULL AFTER categoryID;

ALTER TABLE promotions
ADD CONSTRAINT fk_promo_product
FOREIGN KEY (productID)
REFERENCES products(productID);

ALTER TABLE web_orders
ADD paymentStatus VARCHAR(50) DEFAULT 'pending',
ADD transactionId VARCHAR(255) NULL;

CREATE TABLE payment_proofs (
  proofID INT AUTO_INCREMENT PRIMARY KEY,
  orderID INT NOT NULL,
  image VARCHAR(255),
  uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (orderID) REFERENCES web_orders(orderID)
);

-- ============================================================
-- RUN THIS against your sp_ma_sy database.
-- Your web_customers table already has a `password VARCHAR(255)` column,
-- which is exactly right for storing bcrypt hashes (60 chars) - no
-- column changes needed there.
--
-- These are the only additions actually required for the new features:
-- ============================================================

-- 1. Speed up "my orders" lookups (Orders.jsx / getMyOrders)
ALTER TABLE web_orders
  ADD INDEX idx_web_orders_customerID (customerID);

-- 2. Speed up phone lookups at login/register
ALTER TABLE web_customers
  ADD UNIQUE INDEX idx_web_customers_phone (phone);
-- (skip this one if `phone` is already UNIQUE in your schema - it is,
--  per your original CREATE TABLE, so this line is likely a no-op /
--  will error "duplicate key name" if so - that's fine, just skip it)

-- 3. (Optional but recommended) Track who verified a payment proof,
--    useful for the admin review screen audit trail.
ALTER TABLE payment_proofs
  ADD COLUMN verifiedAt DATETIME DEFAULT NULL,
  ADD COLUMN verifiedBy INT DEFAULT NULL;
-- 4. Speed up the "Needs review" block's lookup of the latest proof
--    per order (getOrdersNeedingReview / getWebOrderDetails).
ALTER TABLE payment_proofs
  ADD INDEX idx_payment_proofs_orderID (orderID);

-- 5. Speed up the needs-review and incoming-orders queries, which now
--    filter on status.
ALTER TABLE web_orders
  ADD INDEX idx_web_orders_status (status);

-- ============================================================
-- MIGRATION: Payment amount tracking + order flow improvements
-- Run this against your sp_ma_sy database
-- ============================================================

-- 1. Track how much the customer actually paid (for underpayment checks)
ALTER TABLE payment_proofs
  ADD COLUMN amountPaid DECIMAL(10,2) DEFAULT NULL AFTER image,
  ADD COLUMN note TEXT DEFAULT NULL AFTER amountPaid;

-- 2. Add a paymentNote column to web_orders for admin notes
ALTER TABLE web_orders
  ADD COLUMN adminNote TEXT DEFAULT NULL;

-- 3. Index for faster status + createdAt queries on the POS view
ALTER TABLE web_orders
  ADD INDEX idx_status_created (status, createdAt);

-- ============================================================
-- HOW THE FLOW NOW WORKS:
--
--  Customer places order  → status = 'pending'   (visible in POS immediately)
--  Customer uploads proof → status = 'paid'       (moves to "Needs Review")
--  Admin confirms payment → status = 'processing' (moves to main table)
--  Admin marks delivered  → status = 'delivered'
--
--  The "Needs Review" block now shows:
--    - proof image
--    - amount the customer claims to have paid (amountPaid)
--    - order total (so admin can compare)
--    - a warning if amountPaid < totalAmount
-- ============================================================  