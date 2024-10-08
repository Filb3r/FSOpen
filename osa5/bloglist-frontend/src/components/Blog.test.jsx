import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testiTitle',
    author: 'testiAuthor',
    url: 'www.testiurli.com',
    likes: 50,
    id: 'testi3Id',
    user: {
      username: 'testiRoot'
    }
  }

  const userSetup = {
    username: 'testiRoot'
  }

  render(<Blog blog={blog} user={userSetup}/>)

  const element = screen.getByText('testiTitle')
  expect(element).toBeDefined()
})

test('showing url, likes and user when button is pressed', async() => {
  const blog = {
    title: 'testiTitle',
    author: 'testiAuthor',
    url: 'www.testiurli.com',
    likes: 50,
    id: 'testi3Id',
    user: {
      username: 'testiRoot'
    }
  }

  const userSetup = {
    username: 'testiRoot'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={userSetup} toggleVisibility={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  expect(screen.getByText('www.testiurli.com')).toBeDefined()
  expect(screen.getByText('testiAuthor')).toBeDefined() 
  expect(screen.getByText('50')).toBeDefined()
})