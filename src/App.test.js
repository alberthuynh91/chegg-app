import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App';
import { mockFormData, mockRepositories, mockIssues } from './mockData'

test('renders a repository', () => {
  render(<App formData={mockFormData} repositories={mockRepositories} issues={mockIssues} />);
  const repository = screen.getByText(/alberts-mvp-wheelchimp/i);
  expect(repository).toBeInTheDocument()
})

test('renders an issue', () => {
  render(<App formData={mockFormData} repositories={mockRepositories} issues={mockIssues} />);
  const issue = screen.getByText('4th issue that super looooooooooooooooooong');
  expect(issue).toBeInTheDocument()
})

test('should load repositories on submit', () => {});
test('should load issues on click of repository', () => {});
test('should render an error message on invalid api key submission', () => {});
test('should clear form', () => {});
test('should reorder issue item', () => {});