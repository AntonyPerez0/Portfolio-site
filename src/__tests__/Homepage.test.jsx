import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Homepage from '../components/Homepage'

describe('Homepage', () => {
  it('renders the main heading correctly', () => {
    render(<Homepage />)
    
    const heading = screen.getByText(/Welcome to My Portfolio/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the profile picture', () => {
    render(<Homepage />)
    
    const profileImage = screen.getByAltText(/Antony Perez/i)
    expect(profileImage).toBeInTheDocument()
  })

  it('renders the apprenticeship overview section', () => {
    render(<Homepage />)
    
    const overviewHeading = screen.getByText(/Overview of My Apprenticeship/i)
    expect(overviewHeading).toBeInTheDocument()
  })

  it('renders the learning reflection section', () => {
    render(<Homepage />)
    
    const reflectionHeading = screen.getByText(/Reflection on Learning/i)
    expect(reflectionHeading).toBeInTheDocument()
  })

  it('displays skills information', () => {
    render(<Homepage />)
    
    const skillsHeading = screen.getByRole('heading', { name: /Skills/i })
    expect(skillsHeading).toBeInTheDocument()
  })

  it('shows the hero subtitle with role information', () => {
    const { container } = render(<Homepage />);
    const subtitle = container.querySelector('.hero-subtitle');
    
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      /Android Developer | Full-Stack Developer | Technical Writer | Multiverse Apprentice | Problem Solver/i
    );
  });
})