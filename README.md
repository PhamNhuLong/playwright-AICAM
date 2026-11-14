# 🚀 Playwright TypeScript Automation Framework — AICAM

Framework kiểm thử tự động toàn diện (End-to-End Automation Testing) dành cho hệ thống **AICAM**, được xây dựng dựa trên **Playwright** và **TypeScript** theo mô hình **Page Object Model (POM)** chuẩn doanh nghiệp.

---

## 📑 Mục lục
1. [Tính năng cốt lõi](#tính-năng-cốt-lõi)
2. [Cấu trúc dự án](#cấu-trúc-dự-án)
3. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
4. [Cài đặt](#cài-đặt)
5. [Cấu hình môi trường](#cấu-hình-môi-trường)
6. [Hướng dẫn chạy kiểm thử](#hướng-dẫn-chạy-kiểm-thử)
7. [Xem báo cáo kết quả (Reporting)](#xem-báo-cáo-kết-quả-reporting)
8. [Tích hợp CI/CD](#tích-hợp-cicd)
9. [Quy chuẩn code & Best Practices](#quy-chuẩn-code--best-practices)

---

## 🎯 Tính năng cốt lõi
- **Page Object Model (POM):** Phân tách tuyệt đối giữa giao diện (Locators/Actions) và kịch bản test (Test Logic/Assertions).
- **Custom Fixtures:** Tự động inject các Page Object (`loginPage`, `dashboardPage`) vào từng test block mà không cần khởi tạo thủ công `new`.
- **Semantic Locators:** Ưu tiên `getByRole()`, `getByLabel()`, `getByPlaceholder()` đảm bảo tính bền vững và khả năng tiếp cận (Accessibility).
- **Smart Waits:** 100% sử dụng web-first assertions của Playwright, tuyệt đối không dùng `waitForTimeout()` (hard sleep).
- **Dynamic Test Data:** Sinh dữ liệu tự động, độc nhất và traceable qua `TestDataGenerator`.
- **Cấu hình môi trường đa tầng:** Quản lý tập trung qua file `.env` và `src/utils/env.config.ts`.
- **Báo cáo chuẩn:** Tự động tạo song song **Playwright HTML Report** và **Allure Report Enterprise**.
- **Cấu trúc Step Đa tầng (Nested Test Steps):** Phân định rạch ròi giữa Step nghiệp vụ cha và Step kỹ thuật con (kèm thông tin chi tiết Locator & tham số truyền vào).
- **Auto Attachments:** Tự động đính kèm ảnh chụp màn hình bước cuối cùng cho test case Passed, chụp ảnh khi Failed và ghi toàn bộ video quá trình thực thi.

---

## 📂 Cấu trúc dự án

```text
playwright-AICAM/
├── playwright.config.ts        # File cấu hình Playwright (browsers, reporter, timeouts, viewport)
├── package.json                # Dependencies, devDependencies và npm test scripts
├── tsconfig.json               # Cấu hình TypeScript compiler & alias path mapping
├── .env.example                # File mẫu biến môi trường
├── .env                        # Biến môi trường local (credentials, base URL)
├── .gitignore                  # Bỏ qua node_modules, test-results, reports, .env
├── README.md                   # Tài liệu hướng dẫn sử dụng framework
├── src/
│   ├── pages/                  # Page Object Classes
│   │   ├── base.page.ts        # Base Page chứa common methods (navigate, click, fill, wait)
│   │   ├── login.page.ts       # Page Object cho màn hình Đăng nhập AICAM
│   │   └── dashboard.page.ts   # Page Object cho màn hình Dashboard chính
│   ├── fixtures/               # Custom Playwright Fixtures
│   │   ├── base.fixture.ts     # Extend test với các Page Object
│   │   └── auth.fixture.ts     # Pre-authentication fixture
│   ├── utils/                  # Helpers & Utility Classes
│   │   ├── env.config.ts       # Đọc và validate biến môi trường có kiểu dữ liệu
│   │   ├── logger.ts           # Structured logging (INFO, STEP, WARN, ERROR)
│   │   ├── test-data.ts        # Data generator (username, email, password theo policy)
│   │   └── helpers.ts          # Common helper methods (screenshot, network idle)
│   └── tests/                  # Test Specs
│       ├── auth/
│       │   └── login.spec.ts   # Bộ test case xác thực AICAM (TC001 - TC025)
│       └── dashboard/
│           └── dashboard.spec.ts # Test cases màn hình Dashboard
├── test-data/                  # Dữ liệu kiểm thử bên ngoài (JSON)
│   └── users.json              # Dữ liệu tài khoản mẫu (valid, invalid, locked, messages)
└── .github/
    └── workflows/
        └── playwright.yml      # GitHub Actions CI/CD Pipeline
```

---

## 💻 Yêu cầu hệ thống
- **Node.js:** Phiên bản ≥ 18.x (khuyến nghị Node 20 LTS hoặc 22 LTS).
- **npm:** Đi kèm với Node.js (≥ 9.x).
- **Hệ điều hành:** Windows, macOS hoặc Linux.

---

## 🛠️ Cài đặt

1. Di chuyển vào thư mục dự án:
   ```bash
   cd playwright-AICAM
   ```

2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```

3. Tải các trình duyệt của Playwright (Chromium, Firefox, WebKit):
   ```bash
   npx playwright install
   ```

---

## ⚙️ Cấu hình môi trường

Tạo file `.env` từ `.env.example` (nếu chưa có):
```bash
cp .env.example .env
```

Các biến môi trường chính:
```env
BASE_URL=https://aicam.example.com
DEFAULT_TIMEOUT=15000
HEADLESS=true

# Thông tin tài khoản kiểm thử
VALID_USERNAME=aicam_user01
VALID_PASSWORD=P@ssw0rd2026
LOCKED_USERNAME=aicam_user_locked
NON_EXISTENT_USERNAME=ghost_user_999
```

---

## 🏃 Hướng dẫn chạy kiểm thử

### 1. Chạy tất cả test cases (Headless mode)
```bash
npm test
```

### 2. Chạy test cases ở chế độ có giao diện (Headed mode)
```bash
npm run test:headed
```

### 3. Chạy Playwright UI Mode (Trực quan, time-travel debugging)
```bash
npm run test:ui
```

### 4. Chạy chế độ Debug từng bước (Inspector)
```bash
npm run test:debug
```

### 5. Chạy riêng module Authentication / Login
```bash
npm run test:auth
```

### 6. Chạy theo Tags (@Smoke hoặc @Regression)
```bash
npm run test:smoke
npm run test:regression
```

---

## 📊 Xem báo cáo kết quả (Reporting)

Dự án hỗ trợ song song 2 hệ thống báo cáo: **Playwright HTML Report** và **Allure Report**.

### 1. Allure Report Enterprise (Khuyến nghị)
Allure Report cung cấp giao diện trực quan, timeline, nhóm hành vi, cây phân cấp step nghiệp vụ & step con kỹ thuật kèm tham số/locator, video và screenshot:

```bash
# Chạy test và tự động build Allure Report
npm run test:allure

# Tạo báo cáo từ kết quả allure-results
npm run allure:generate

# Mở báo cáo trên trình duyệt cục bộ (Local web server)
npm run allure:open

# Hoặc vừa build vừa serve trực tiếp từ allure-results
npm run allure:serve

# Dọn dẹp thư mục báo cáo cũ trước khi chạy mới
npm run allure:clean
```

### 2. Playwright HTML Report
```bash
npm run report
```
Báo cáo sẽ hiển thị trực quan:
- Trạng thái Pass/Fail của từng test case.
- Thời gian thực thi.
- Chi tiết từng bước kiểm thử (`Test Steps`).
- Video ghi lại thao tác và ảnh chụp lỗi (`Screenshots on Failure`).
- Trace viewer cho phép tua lại timeline chính xác của từng hành động.

---

## 🔄 Tích hợp CI/CD

Framework đã được cấu hình sẵn pipeline **GitHub Actions** tại [.github/workflows/playwright.yml](.github/workflows/playwright.yml):
- Tự động kích hoạt khi có `push` hoặc `pull_request` vào nhánh `main`/`master`.
- Cài đặt dependencies và Playwright browser tự động.
- Chạy test headless song song trên môi trường Ubuntu.
- Tự động upload HTML Report lên Artifacts (lưu trữ 14 ngày).

---

## 📐 Quy chuẩn code & Best Practices

1. **Page Object Model:** Locators chỉ khai báo tại Page class. Assertions chỉ viết trong file `.spec.ts`.
2. **Không dùng Hard Sleep:** Cấm dùng `page.waitForTimeout()`. Luôn dùng web-first assertion: `await expect(locator).toBeVisible()`.
3. **Desktop Viewport:** Mặc định `1920x1080` cho tất cả browser instances.
4. **Data Isolation:** Dữ liệu tạo mới cho test phải dùng `TestDataGenerator` để đảm bảo không bị conflict khi chạy song song.
5. **Clear Naming:** Mã Test Case phải khớp với tài liệu đặc tả (ví dụ: `AICAM_LOGIN_TC_001`).

