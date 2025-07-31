import '@testing-library/jest-dom'

beforeEach(() => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'description');
  meta.setAttribute('content', '');
  document.head.appendChild(meta);
});