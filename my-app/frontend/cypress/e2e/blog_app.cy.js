describe('Blog app', function () {
		beforeEach(function () {
				cy.request('POST', 'http://localhost:3003/api/testing/reset')
				const user = {
						username: 'käyttis',
						name: 'Nakki Prinssi',
						password: 'Tuttiritari'
				}
				cy.request('POST', 'http://localhost:3003/api/users', user)
				cy.visit('http://localhost:5173')
		})

		it('Login form is shown', function () {
				cy.contains('Log in to application')
		})

		describe('Login', function () {
				it('succeeds with correct credentials', function () {
						cy.contains('login').click()
						cy.get('#username').type('käyttis')
						cy.get('#password').type('Tuttiritari')
						cy.get('#login-button').click()
						cy.contains('Nakki Prinssi logged in')
				})

				it('fails with wrong credentials', function () {
						cy.contains('login').click()
						cy.get('#username').type('käyttis')
						cy.get('#password').type('ritari')
						cy.get('#login-button').click()
						cy.contains('wrong username or password')
				})
		})

		describe('When logged in', function () {
				beforeEach(function () {
						cy.contains('login').click()
						cy.get('#username').type('käyttis')
						cy.get('#password').type('Tuttiritari')
						cy.get('#login-button').click()
				})

			it('A blog can be created', function () {
						cy.contains('create new blog').click()
						cy.get('[placeholder="title"').type('New blog')
						cy.get('[placeholder="author"]').type('Mr Blog')
						cy.get('[placeholder="url"').type('blog.com')
						cy.get('#create-button').click()
						cy
							.contains('New blog')
							.contains('Mr Blog')
			})

			describe('When a blog is created', function () {
				beforeEach(function () {
					cy.contains('create new blog').click()
					cy.get('[placeholder="title"').type('New blog')
					cy.get('[placeholder="author"]').type('Mr Blog')
					cy.get('[placeholder="url"').type('blog.com')
					cy.get('#create-button').click()
				})

				it('A blog can be liked', function () {
					cy.contains('view').click()
					cy.contains('like').click()
					cy.contains('1')
				})

				it('A blog can be removed', function () {
					cy.contains('view').click()
					cy.contains('remove').click()
					cy.contains('New blog').should('not.exist')
				})

				it('Remove button is only seen by creator', function () {
					cy.contains('logout').click()
					const secondUser = {
						username: 'tokakäyttis',
						name: 'Nakke Nakuttaja',
						password: 'uttiritari'
					}
					cy.request('POST', 'http://localhost:3003/api/users', secondUser)
					cy.contains('login').click()
					cy.get('#username').type('tokakäyttis')
					cy.get('#password').type('uttiritari')
					cy.get('#login-button').click()
					cy.contains('view').click()
					cy.contains('remove').should('not.exist')
				})
			})
			
			describe('When multible blogs are created', function () {
				beforeEach(function () {
					cy.contains('create new blog').click()
					cy.get('[placeholder="title"').type('The title with the second most likes')
					cy.get('[placeholder="author"]').type('Mr Blog')
					cy.get('[placeholder="url"').type('blog.com')
					cy.get('#create-button').click()
					cy.contains('create new blog').click()
					cy.get('[placeholder="title"').type('The title with the most likes')
					cy.get('[placeholder="author"]').type('Mr Blog')
					cy.get('[placeholder="url"').type('blog.com')
					cy.get('#create-button').click()
				})

				it.only('blogs are ordered by likes amount', function () {
					cy.contains('view').click()
					cy.contains('view').click()
					cy.contains('hide').click()
					cy.contains('The title with the most likes').parent().find('button').contains('like').click()
					cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
					cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
				})
			})
		})
	
})