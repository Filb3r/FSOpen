import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogAddForm from './BlogAddForm'
import { useTransition } from 'react'

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

test('pressing like button twice calls event handler twice', async() => {
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

  render(<Blog blog={blog} user={userSetup} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')

  for (let i = 0; i < 2; i++) {
    await user.click(button)
  }

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Creating new blog with correct details', async() => {
  const mockHandler = vi.fn()

  const { container } = render(<BlogAddForm handleCreate={mockHandler}/>)

  console.log(container.innerHTML)

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('URL')

  await user.type(titleInput, 'TestiTitle')
  await user.type(authorInput, 'TestiAuthor')
  await user.type(urlInput, 'www.testiurl.com')

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  expect(mockHandler).toHaveBeenCalledWith({
    title: 'TestiTitle',
    author: 'TestiAuthor',
    url: 'www.testiurl.com'
  })
})