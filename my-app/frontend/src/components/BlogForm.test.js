import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> has correct data', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const button = screen.getByText('create')

    

    await user.type(title, 'Testing tests')
    await user.type(author, 'Mr Tester')
    await user.type(url, 'test.com')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing tests')
    expect(createBlog.mock.calls[0][0].author).toBe('Mr Tester')
    expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})