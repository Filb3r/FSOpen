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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testin Tekija',
        username: 'ttekija',
        password: 'salasana'
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
    await page.getByRole('button', {name: 'Show'}).first().click()
    
    const likesDiv = await page.locator('[data-testid="likesDiv"]').first()
    const likesTextBefore = await likesDiv.innerText()
    const likesBefore = await parseInt(likesTextBefore)

    await page.getByRole('button', {name: 'like'}).click()
    await page.waitForTimeout(500)

    const likesTextAfter = await likesDiv.innerText()
    const likesAfter = await parseInt(likesTextAfter)

    expect(likesAfter).toBe(likesBefore + 1)
  }) 

  test('User can delete their own blogpost', async({page}) => {
    await page.getByRole('button', {name: 'Show'}).first().click()
    await page.getByRole('button', {name: 'remove'}).click()

    const confirmationDiv = await page.locator('.verify')
    await expect(confirmationDiv).toContainText('Blog removed!')
  })

  test('only blog creator can see delete button', async({page}) => {
    await page.getByRole('button', { name: 'Add'}).click()

    await page.getByPlaceholder('Title').fill('How To Delete a Blog')
    await page.getByPlaceholder('Author').fill('B. Delete')
    await page.getByPlaceholder('URL').fill('www.deletethis.com')
    await page.getByRole('button', { name: 'create'}).click()

    await page.getByRole('button', { name: 'logout'}).click()

    await page.getByRole('textbox').first().fill('ttekija')
    await page.getByRole('textbox').last().fill('salasana')
    await page.getByRole('button', { name: 'Login'}).click()

    await page.getByRole('button', {name: 'Show'}).first().click()

    const removeButton = await page.getByRole('button', {name: 'remove'})

    await expect(removeButton).not.toBeVisible()
  })

  test('blogs are in order, most liked blog is first', async({page}) => {
    await page.getByRole('button', { name: 'Add'}).click()

    await page.getByPlaceholder('Title').fill('How To Like a Blog')
    await page.getByPlaceholder('Author').fill('B. Like')
    await page.getByPlaceholder('URL').fill('www.likethis.com')
    await page.getByRole('button', { name: 'create'}).click()

    await page.waitForTimeout(500)
    await page.getByRole('button', {name: 'Show'}).last().click()

    await page.getByRole('button', {name: 'like'}).click()
    await page.waitForTimeout(500)

    await page.getByRole('button', {name: 'Show'}).first().click()

    const firstLikesDiv = await page.locator('[data-testid="likesDiv"]').first()
    const firstLikesText = await firstLikesDiv.innerText()
    const firstLikes = await parseInt(firstLikesText)

    const secondLikesDiv = await page.locator('[data-testid="likesDiv"]').last()
    const secondLikesText = await secondLikesDiv.innerText()
    const secondLikes = await parseInt(secondLikesText)

    expect(firstLikes).toBeGreaterThan(secondLikes)
  })
})