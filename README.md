# 🚀 Playwright TypeScript Automation Framework — AICAM

[![Playwright Tests](https://img.shields.io/badge/Playwright-v1.49-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Allure Report](https://img.shields.io/badge/Allure_Report-Enterprise-697AC6?logo=qameta&logoColor=white)](https://allurereport.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub Actions CI](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)

Framework kiểm thử tự động toàn diện (End-to-End Automation Testing) dành cho hệ thống **AICAM**, được xây dựng dựa trên **Playwright** và **TypeScript** theo mô hình **Page Object Model (POM)** chuẩn doanh nghiệp. 

---

## 📑 Mục lục
1. [Tính năng cốt lõi](#-tính-năng-cốt-lõi)
2. [Kiến trúc thư mục dự án](#-kiến-trúc-thư-mục-dự-án)
3. [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
4. [Cài đặt ban đầu](#-cài-đặt-ban-đầu)
5. [Cấu hình môi trường & Bảo mật](#-cấu-hình-môi-trường--bảo-mật)
6. [Bảng lệnh thực thi kiểm thử](#-bảng-lệnh-thực-thi-kiểm-thử)
7. [Hệ thống báo cáo kết quả (Reporting)](#-hệ-thống-báo-cáo-kết-quả-reporting)
8. [Tích hợp CI/CD & GitHub Pages](#-tích-hợp-cicd--github-pages)
9. [Quy chuẩn mã nguồn (Best Practices)](#-quy-chuẩn-mã-nguồn-best-practices)

---

## 🎯 Tính năng cốt lõi

- **Page Object Model (POM):** Tách biệt rạch ròi giữa giao diện (Locators / Page Actions) và kịch bản test (Test Specs / Assertions).
- **Custom Fixtures:** Tự động inject các Page Object (`loginPage`, `dashboardPage`) vào từng test block, quản lý vòng đời kiểm thử tự động.
- **Nested Allure Steps (Step Đa Tầng):**
  - **Parent Step:** Bước nghiệp vụ cấp cao rõ ràng bằng tiếng Anh (e.g. `Step 1: Enter valid credentials and submit`).
  - **Child Steps:** Bước chi tiết kỹ thuật kèm giá trị Locator cụ thể và tham số truyền vào (e.g. `Fill "••••••••" into "Password Input" [Locator: locator('input#PassWord')]`).
- **Tự động chụp & đính kèm hình ảnh / video:**
  - Tự động đính kèm ảnh chụp màn hình vào bước cuối cùng đối với test case **Passed**.
  - Tự động chụp ảnh khi test case **Failed**.
  - Tự động ghi và đính kèm video toàn bộ quá trình thực thi (`video/webm`).
- **Bảo mật dữ liệu (Security-by-Design):** Tự động che dấu mật khẩu nhạy cảm (`••••••••`) trong Test Steps, phân tách hoàn toàn giữa mã nguồn và thông tin môi trường thật (`.env`).
- **Cross-Platform Allure Runner:** Script Node.js điều phối kiểm thử đa nền tảng (Windows CMD, PowerShell, macOS, Linux, GitHub Actions), đảm bảo luôn sinh báo cáo dù test Pass hay Fail.

---

## 📂 Kiến trúc thư mục dự án

```text
playwright-AICAM/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline (Test + Deploy Allure Pages)
├── scripts/
│   └── test-allure.js              # Cross-platform runner điều phối chạy test & sinh Allure report
├── src/
│   ├── fixtures/                   # Custom Test Fixtures
│   │   ├── base.fixture.ts         # POM fixtures & autoPassedScreenshot fixture
│   │   └── auth.fixture.ts         # Pre-authentication fixture
│   ├── pages/                      # Page Object Classes
│   │   ├── base.page.ts            # Base Page (smart actions, nested steps, screenshot attachment)
│   │   ├── login.page.ts           # Page Object màn hình Đăng nhập AICAM
│   │   └── dashboard.page.ts       # Page Object màn hình Dashboard chính
│   ├── tests/                      # Test Specs
│   │   ├── auth/
│   │   │   └── login.spec.ts       # Bộ test case xác thực AICAM (TC001 - TC025)
│   │   └── dashboard/
│   │       └── dashboard.spec.ts   # Test cases màn hình Dashboard
│   └── utils/                      # Utilities & Helpers
│       ├── env.config.ts           # Centralized Environment Configuration
│       ├── helpers.ts              # Common test helpers
│       ├── logger.ts               # Structured logging (INFO, STEP, WARN, ERROR)
│       └── test-data.ts            # Dynamic test data generator
├── test-data/
│   └── users.json                  # Dữ liệu test negative, policy boundary & expected messages
├── .env.example                    # Template biến môi trường mẫu cho repo
├── .gitignore                      # File cấu hình bỏ qua file rác, artifact, .env
├── package.json                    # Dependencies & npm scripts
├── playwright.config.ts            # File cấu hình Playwright (browsers, reporters, timeouts)
├── README.md                       # Tài liệu hướng dẫn sử dụng framework
├── RUN_COMMANDS.md                 # Hướng dẫn nhanh các câu lệnh thông dụng
└── tsconfig.json                   # Cấu hình TypeScript compiler
```

---

## 💻 Yêu cầu hệ thống

- **Node.js:** Phiên bản ≥ 20.x (khuyến nghị 20 LTS hoặc 22 LTS).
- **npm:** Đi kèm với Node.js (≥ 9.x).
- **Java Runtime Environment (JRE):** Java 11 trở lên (cần cho Allure CLI khi biên dịch báo cáo cục bộ).
- **Hệ điều hành:** Windows 10/11, macOS hoặc Linux Ubuntu.

---

## 🛠️ Cài đặt ban đầu

1. Clone repository và mở terminal tại thư mục dự án:
   ```bash
   cd playwright-AICAM
   ```

2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```

3. Tải các trình duyệt Playwright (Chromium, Firefox, WebKit):
   ```bash
   npx playwright install
   ```

---

## ⚙️ Cấu hình môi trường & Bảo mật

### 1. Tại máy cá nhân (Local Environment)
Tạo file `.env` từ file mẫu [.env.example](.env.example):
```bash
cp .env.example .env
```

Điền thông tin môi trường kiểm thử của bạn vào `.env`:
```env
# AICAM Environment Configuration
BASE_URL=http://your-server-ip:port
DEFAULT_TIMEOUT=15000
HEADLESS=true

# Test Credentials
VALID_USERNAME=your_username
VALID_PASSWORD=your_password
```
> [!NOTE]
> File `.env` chứa thông tin thật đã nằm trong `.gitignore` và sẽ **không bao giờ bị đẩy lên GitHub**.

### 2. Trên GitHub Actions (CI/CD)
Vào repository trên GitHub: **Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ Bấm **New repository secret** và thêm:
- `BASE_URL`: Địa chỉ URL / IP của hệ thống AICAM.
- `VALID_USERNAME`: Tên tài khoản đăng nhập kiểm thử.
- `VALID_PASSWORD`: Mật khẩu tài khoản đăng nhập.

---

## 🏃 Bảng lệnh thực thi kiểm thử

| Lệnh | Mô tả chi tiết |
|---|---|
| `npm test` | Chạy toàn bộ test suites ở chế độ ngầm (Headless) |
| `npm run test:allure` | Chạy test và **tự động biên dịch Allure Report** |
| `npm run test:headed` | Chạy mở trình duyệt quan sát trực tiếp (Headed mode) |
| `npm run test:ui` | Mở Playwright UI Mode (Trực quan, tua lại timeline, time-travel debugging) |
| `npm run test:debug` | Mở Playwright Inspector để debug từng dòng lệnh |
| `npm run test:auth` | Chạy riêng bộ kiểm thử module Đăng nhập (`src/tests/auth`) |
| `npm run test:dashboard` | Chạy riêng bộ kiểm thử module Dashboard (`src/tests/dashboard`) |
| `npm run test:smoke` | Chạy các test case quan trọng đánh tag `@Smoke` |
| `npm run test:regression` | Chạy các test case hồi quy đánh tag `@Regression` |
| `npm run test:chromium` | Chỉ chạy trên trình duyệt Chromium (Google Chrome) |
| `npm run test:firefox` | Chỉ chạy trên trình duyệt Mozilla Firefox |
| `npm run test:webkit` | Chỉ chạy trên trình duyệt WebKit (Apple Safari) |
| `npm run typecheck` | Kiểm tra cú pháp và kiểu dữ liệu TypeScript (`tsc --noEmit`) |
| `npm run clean` | Dọn dẹp toàn bộ thư mục kết quả test và báo cáo cũ |

---

## 📊 Hệ thống báo cáo kết quả (Reporting)

Dự án hỗ trợ song song 2 hệ thống báo cáo:

### 1. Allure Report Enterprise (Khuyến nghị)
Allure Report cung cấp giao diện trực quan, biểu đồ thống kê, chi tiết từng bước con lồng nhau, video và screenshot:

```bash
# 1. Chạy test và tự động build Allure Report
npm run test:allure

# 2. Mở Allure Report trên trình duyệt (Local web server)
npm run allure:open

# 3. Hoặc vừa build vừa serve trực tiếp từ allure-results
npm run allure:serve

# 4. Tạo báo cáo tĩnh từ thư mục allure-results
npm run allure:generate

# 5. Dọn dẹp dữ liệu báo cáo cũ
npm run allure:clean
```

### 2. Playwright HTML Report mặc định
```bash
npm run report
```

---

## 🔄 Tích hợp CI/CD & GitHub Pages

Quy trình tự động hóa đã được thiết lập sẵn tại [.github/workflows/playwright.yml](.github/workflows/playwright.yml):
- **Tự động kích hoạt:** Khi có sự kiện `push` hoặc `pull_request` vào nhánh `main` hoặc `master`.
- **Môi trường:** Ubuntu Latest, cài đặt Node.js 20 & Java 21 Temurin.
- **Thực thi:** Chạy kiểm thử song song, tự động sinh Allure Report.
- **Artifacts:** Tự động upload `allure-report`, `allure-raw-results` và `playwright-html-report` (lưu trữ 14 ngày).
- **GitHub Pages:** Tự động triển khai báo cáo Allure lên GitHub Pages để xem trực tiếp trên nền web.

---

## 📐 Quy chuẩn mã nguồn (Best Practices)

1. **Page Object Model:** Tất cả locators và actions thuộc về Page classes. Kịch bản và assertions thuộc về file `.spec.ts`.
2. **Không dùng Hard Sleep:** Tuyệt đối không dùng `page.waitForTimeout()`. Luôn dùng web-first assertions: `await expect(locator).toBeVisible()`.
3. **Smart Locators:** Ưu tiên semantic locators theo khuyến nghị Playwright (`getByRole`, `getByLabel`, `getByText`).
4. **Data Masking:** Mọi thao tác điền mật khẩu phải sử dụng mask `••••••••` trên Allure step name để đảm bảo an toàn thông tin.
5. **Dynamic Data:** Sử dụng `TestDataGenerator` để tạo dữ liệu ngẫu nhiên, không gây xung đột khi chạy song song.
