# 🚀 Hướng Dẫn Các Câu Lệnh Chạy Automation Test (AICAM)

> **Thư mục làm việc:** Luôn mở terminal tại thư mục `playwright-AICAM`:
> ```bash
> cd d:\Learn-Auto-AI-Antigravity\full-kit-TEST\playwright-AICAM
> ```

---

## 1. Cài đặt ban đầu (Chỉ chạy 1 lần)
```bash
# Cài đặt thư viện node_modules
npm install

# Tải trình duyệt Playwright Chromium
npx playwright install chromium
```

---

## 2. Các câu lệnh chạy Test thông dụng

| Mục đích | Câu lệnh ngắn gọn |
|---|---|
| **Chạy toàn bộ test (chạy ngầm - Headless)** | `npm test` |
| **Chạy mở trình duyệt xem trực tiếp (Headed)** | `npm run test:headed` |
| **Chạy riêng module Đăng nhập (Login)** | `npm run test:auth` |
| **Mở giao diện Playwright UI Mode (Trực quan, dễ debug)** | `npm run test:ui` |
| **Chạy chế độ Debug từng bước (Playwright Inspector)** | `npm run test:debug` |
| **Chạy các test quan trọng (@Smoke)** | `npm run test:smoke` |
| **Chạy bộ test hồi quy (@Regression)** | `npm run test:regression` |

---

## 3. Xem báo cáo kết quả (Allure & Playwright Report)

### A. Allure Report (Khuyên dùng - Đẹp mắt, chi tiết step, video & screenshot)
```bash
# 1. Chạy test và tự động build Allure Report
npm run test:allure

# 2. Tạo báo cáo Allure HTML tĩnh từ kết quả allure-results
npm run allure:generate

# 3. Mở Allure Report trên trình duyệt (mở web server cục bộ)
npm run allure:open

# 4. Xem nhanh Allure Report trực tiếp từ kết quả thô
npm run allure:serve

# 5. Dọn dẹp dữ liệu và báo cáo cũ
npm run allure:clean
```

### B. Playwright HTML Report mặc định
```bash
# Mở báo cáo kết quả chi tiết Playwright HTML
npm run report
```

---

## 4. Các câu lệnh nâng cao (Tùy chọn)

```bash
# Chạy 1 test case cụ thể theo tên (ví dụ: TC_001)
npx playwright test -g "AICAM_LOGIN_TC_001" --headed

# Chạy lặp lại 2 lần để kiểm tra độ ổn định
npx playwright test --project=chromium --repeat-each=2

# Chạy test với 1 luồng duy nhất (tuần tự, không song song)
npx playwright test --workers=1
```

