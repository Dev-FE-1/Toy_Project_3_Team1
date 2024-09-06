import { test, expect, devices } from '@playwright/test'

// 모바일 디바이스 설정
const mobileDevice = devices['iPhone 12']

test.use({ ...mobileDevice })

test.describe('모바일 로그인 및 네비게이션 테스트', () => {
  test('로그인이 성공하면 네비 클릭으로 각 URL 테스트', async ({ page }) => {
    // 뷰포트 설정
    await page.setViewportSize({ width: 375, height: 812 })

    // 로그인 페이지로 이동
    await page.goto('http://localhost:5173/login', { timeout: 60000 })

    // 이메일과 비밀번호 입력
    await page.fill('input[name="email"]', 'test@myidoru.com')
    await page.fill('input[name="password"]', 'myidorutest')

    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인")')

    // 로그인 성공 후 홈페이지로 리다이렉트되는지 확인
    await expect(page).toHaveURL('http://localhost:5173/', { timeout: 60000 })

    // 로고 이미지가 표시될 때까지 기다림
    await expect(page.locator('img.logo-myidoru[alt="logo"]')).toBeVisible({ timeout: 60000 })

    const navItems = [
      { iconIndex: 0, path: '/' },
      { iconIndex: 1, path: '/search' },
      { iconIndex: 2, path: '/createplaylist' },
      { iconIndex: 3, path: '/chat' },
      { iconIndex: 4, path: /^\/profile\/.*/ },
    ]

    for (const item of navItems) {
      // 네비게이션 아이콘이 클릭 가능할 때까지 기다림
      await page.waitForSelector(`nav a >> nth=${item.iconIndex}`, {
        state: 'visible',
        timeout: 60000,
      })

      // 아이콘 클릭
      await page.click(`nav a >> nth=${item.iconIndex}`)

      // URL 변경 대기
      if (typeof item.path === 'string') {
        await expect(page).toHaveURL(`http://localhost:5173${item.path}`, { timeout: 60000 })
      } else {
        await expect(page).toHaveURL(item.path, { timeout: 60000 })
      }

      // 페이지 콘텐츠 로드 확인
      await page.waitForSelector('body', { state: 'visible', timeout: 60000 })
    }
  })
})
