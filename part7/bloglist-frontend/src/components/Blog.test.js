import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders author and title when not extended', () => {
  const blog = {
    title: 'testblog',
    author: 'testauthor',
    likes: 4,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('testblog');
  expect(component.container).toHaveTextContent('testauthor');
});

test('clicking "View" renders url and likes', () => {
  const blog = {
    title: 'testblog',
    author: 'testauthor',
    likes: 4,
  };

  const user = {
    name: 'testuser',
  };

  const component = render(<Blog blog={blog} user={user} />);

  const button = component.getByText('View');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('Check out the blog!');
  expect(component.container).toHaveTextContent('4 likes');
});

test('clicking "like" twice calls its handler function twice', () => {
  const blog = {
    title: 'testblog',
    author: 'testauthor',
    likes: 4,
  };

  const user = {
    name: 'testuser',
    token: 'asdiasd',
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={user} handleBlogLike={mockHandler} />
  );

  const viewButton = component.getByText('View');
  fireEvent.click(viewButton);

  const likeButton = component.getByText('Like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
