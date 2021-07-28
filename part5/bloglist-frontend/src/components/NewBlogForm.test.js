import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

test('new blog form calls its callback function with correct data', async () => {
  const createBlog = jest.fn();

  const user = {
    name: 'testuser',
    token: 'asdiasd',
  };

  const component = render(
    <NewBlogForm handleBlogUpdate={createBlog} user={user} />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  fireEvent.change(title, {
    target: { value: 'testtitle' },
  });
  fireEvent.change(author, {
    target: { value: 'testauthor' },
  });
  fireEvent.change(url, {
    target: { value: 'testurl' },
  });

  fireEvent.submit(component.container.querySelector('form'));

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testtitle');
  expect(createBlog.mock.calls[0][0].author).toBe('testauthor');
  expect(createBlog.mock.calls[0][0].url).toBe('testurl');
});
