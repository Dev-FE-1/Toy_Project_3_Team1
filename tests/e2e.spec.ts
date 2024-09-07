import { test, expect } from '@playwright/test'

test('Basic E2E', async ({ page }) => {
  let screenshotCount = 0
  const takeScreenshot = async () => {
    screenshotCount++
    await page.screenshot({
      path: `screenshots/${screenshotCount.toString().padStart(2, '0')}.png`,
    })
  }

  // 로그인
  await page.goto('http://localhost:5173/login')
  await page.fill('input[name="email"]', 'test@myidoru.com')
  await page.fill('input[name="password"]', 'myidorutest')
  await takeScreenshot()
  await page.click('button:has-text("로그인")')

  // 메인 페이지
  await expect(page).toHaveURL('http://localhost:5173/')
  await expect(page.locator('img.logo-myidoru[alt="logo"]')).toBeVisible({ timeout: 5000 })
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
  await takeScreenshot()

  // 검색 페이지
  await page.click('nav a >> nth=1')
  await expect(page).toHaveURL('http://localhost:5173/search')
  await expect(page.locator('text="추천 검색어"')).toBeVisible()
  await page.click('p:has-text("뉴진스")')
  await takeScreenshot()
  await page.click('button:has-text("검색")')
  await expect(page.locator('.success-tag')).toBeVisible({ timeout: 5000 })
  await takeScreenshot()
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
  await page.waitForTimeout(3000)
  await takeScreenshot()

  // 플레이리스트 등록
  await page.click('nav a >> nth=2')
  await expect(page).toHaveURL('http://localhost:5173/createplaylist')

  await expect(page.locator('text="등록하기"')).toBeVisible()
  await takeScreenshot()

  // 채팅 페이지
  await page.click('nav a >> nth=3')
  await expect(page).toHaveURL('http://localhost:5173/chat')

  await expect(page.locator('text="서비스 준비 중 입니다."')).toBeVisible()
  await takeScreenshot()

  // 프로필
  await page.click('nav a >> nth=4')
  // await expect(page).toHaveURL(`http://localhost:5173/profile/${userId}`)
  await expect(page.locator('text="플레이리스트"')).toBeVisible()
  await takeScreenshot()

  // 로그아웃
  await page.click('.button-logout')
  await expect(page).toHaveURL('http://localhost:5173/login')
  await takeScreenshot()
})
