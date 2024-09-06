import { test, expect } from '@playwright/test'

test.describe('로그인 및 네비게이션 테스트', () => {
  test('로그인이 성공하면 네비 클릭으로 각 URL 테스트', async ({ page }) => {
    // 로그인
    await page.goto('http://localhost:5173/login')
    await page.fill('input[name="email"]', 'test@myidoru.com')
    await page.fill('input[name="password"]', 'myidorutest')
    await page.click('button:has-text("로그인")')

    // 로그인 성공 후 홈페이지로 리다이렉트되는지 확인
    await expect(page).toHaveURL('http://localhost:5173/')

    // Header에 로고 이미지가 표시면 로그인 성공
    await expect(page.locator('img.logo-myidoru[alt="logo"]')).toBeVisible({ timeout: 5000 })

    // 네비바 아이콘 클릭 및 경로 확인
    const navItems = [
      { iconIndex: 0, path: '/' },
      { iconIndex: 1, path: '/search' },
      { iconIndex: 2, path: '/createplaylist' },
      { iconIndex: 3, path: '/chat' },
      { iconIndex: 4, path: '/profile/playwright' },
    ]

    // nav 요소 내의 모든 a 태그를 선택하고, 그 중 특정 인덱스의 요소를 클릭
    for (const item of navItems) {
      await page.click(`nav a >> nth=${item.iconIndex}`)

      if (typeof item.path === 'string') {
        await expect(page).toHaveURL(`http://localhost:5173${item.path}`)
      } else {
        await expect(page).toHaveURL(item.path)
      }
    }
  })
})
