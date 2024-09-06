import { test, expect } from '@playwright/test'

test.describe('Login and Navbar', () => {
  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login')

    // 잘못된 이메일과 비밀번호 입력
    await page.fill('input[name="email"]', 'wrong@email.com')
    await page.fill('input[name="password"]', 'wrongpassword')

    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인")')

    // 에러 메시지 확인
    await expect(page.locator('.login-notice')).toHaveText(
      '이메일 또는 비밀번호가 올바르지 않습니다.'
    )

    // 입력 필드가 초기화되었는지 확인
    await expect(page.locator('input[name="email"]')).toHaveValue('')
    await expect(page.locator('input[name="password"]')).toHaveValue('')
  })

  test('login button should be disabled when fields are empty', async ({ page }) => {
    await page.goto('http://localhost:5173/login')

    // 초기 상태에서 로그인 버튼이 비활성화되어 있는지 확인
    await expect(page.locator('button:has-text("로그인")')).toBeDisabled()

    // 이메일만 입력했을 때 버튼이 여전히 비활성화되어 있는지 확인
    await page.fill('input[name="email"]', 'test@myidoru.com')
    await expect(page.locator('button:has-text("로그인")')).toBeDisabled()

    // 비밀번호만 입력했을 때 버튼이 여전히 비활성화되어 있는지 확인
    await page.fill('input[name="email"]', '')
    await page.fill('input[name="password"]', 'myidorutest')
    await expect(page.locator('button:has-text("로그인")')).toBeDisabled()

    // 둘 다 입력했을 때 버튼이 활성화되는지 확인
    await page.fill('input[name="email"]', 'test@myidoru.com')
    await expect(page.locator('button:has-text("로그인")')).toBeEnabled()
  })

  test('should login successfully and display Navbar', async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto('http://localhost:5173/login')

    // 이메일과 비밀번호 입력
    await page.fill('input[name="email"]', 'test@myidoru.com')
    await page.fill('input[name="password"]', 'myidorutest')

    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인")')

    // 로그인 성공 후 홈페이지로 리다이렉트되는지 확인
    await expect(page).toHaveURL('http://localhost:5173/')

    try {
      await page.waitForLoadState('networkidle')
      await expect(page.locator('nav')).toBeVisible({ timeout: 5000 })
    } catch (error) {
      await page.screenshot({ path: 'debug-screenshot.png' })
      throw error
    }
    // Navbar가 표시되는지 확인

    await expect(page.locator('nav')).toBeVisible({ timeout: 5000 })

    // Navbar의 각 메뉴 아이템이 표시되는지 확인
    const menuItems = ['House', 'Search', 'SquarePlus', 'MessageCircleMore', 'CircleUserRound']
    for (const item of menuItems) {
      await expect(page.locator(`nav svg[data-testid="${item}"]`)).toBeVisible()
    }

    // 현재 활성화된 메뉴 아이템 확인 (홈 아이콘)
    await expect(page.locator('nav a.nav-link-active svg[data-testid="House"]')).toBeVisible()

    // 다른 페이지로 이동하여 Navbar가 계속 표시되는지 확인
    await page.click('nav svg[data-testid="Search"]')
    await expect(page).toHaveURL('http://localhost:5173/search')
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('nav a.nav-link-active svg[data-testid="Search"]')).toBeVisible()
  })
})
