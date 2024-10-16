const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')

    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('salainen')
      await page.getByRole('button', { name: 'Login'}).click()

      await expect(page.getByText('Matti Luukkainen logged in!')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await page.getByRole('textbox').first().fill('vaara')
      await page.getByRole('textbox').last().fill('salaton')
      await page.getByRole('button', { name: 'Login'}).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password!')
    })
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('salainen')
    await page.getByRole('button', { name: 'Login'}).click()

    await expect(page.getByRole('button', { name: 'Add'})).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'Add'}).click()

    await page.getByPlaceholder('Title').fill('TestiKirjaus')
    await page.getByPlaceholder('Author').fill('T. Kirjanen')
    await page.getByPlaceholder('URL').fill('www.testiurli.com')
    await page.getByRole('button', { name: 'create'}).click()

    const confirmationDiv = await page.locator('.verify')
    await expect(confirmationDiv).toContainText('New blog created: TestiKirjaus')
  })

  test('a blog can be liked', async({page}) => {
    await page.getByRole('button', {name: 'Show'}).click()

    await page.getByRole('button', {name: 'like'}).click()

  }) 
})