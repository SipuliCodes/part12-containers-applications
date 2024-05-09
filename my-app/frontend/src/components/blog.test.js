import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author', () => {
	const blog = {
		user: 'SIpuli',
		author: 'Pasi',
		title: 'Herne',
		likes: 1,
		url: 'herne.com'
	}

	render(<Blog blog={blog} />)

	const titleauthor = screen.getByText('Herne Pasi')
	expect(titleauthor).toBeDefined()

	const url = screen.queryByText('hernce.com')
	expect(url).toBeNull()

	const likes = screen.queryByText('likes 1')
	expect(likes).toBeNull()
})

test('url, likes and user is shown when view is pressed', async () => {
	const blog = {
		user: {
			name: 'Sipuli'
		},
		author: 'Pasi',
		title: 'Herne',
		likes: 1,
		url: 'herne.com'
	}

	render(
		<Blog blog={blog} />
	)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const titleauthor = screen.getByText('Herne Pasi')
	expect(titleauthor).toBeDefined()

	const url = screen.queryByText('hernce.com')
	expect(url).toBeDefined()

	const likes = screen.queryByText('likes 1')
	expect(likes).toBeDefined()
	
	const name = screen.queryByText('Sipuli')
	expect(name).toBeDefined()

})

test('like is pressed twice', async () => {
	const blog = {
		user: {
			name: 'Sipuli'
		},
		author: 'Pasi',
		title: 'Herne',
		likes: 1,
		url: 'herne.com'
	}

	const mockHandler = jest.fn()

	render(
		<Blog blog={blog} like={mockHandler} />
	)

	const user = userEvent.setup()
	const viewButton = screen.getByText('view')
	await user.click(viewButton)
	
	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)
	
	expect(mockHandler.mock.calls).toHaveLength(2)
})