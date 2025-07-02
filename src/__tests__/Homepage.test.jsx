import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Homepage from '../components/Homepage'

describe('Homepage', () => {
  it('renders the main heading correctly', () => {
    render(<Homepage />)
    
    const heading = screen.getByText(/Welcome to My Portfolio/i)
    expect(heading).toBeInTheDocument()
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

  it('displays key skills information', () => {
    render(<Homepage />)
    
    const skillsHeading = screen.getByText(/Key Skills Developed/i)
    expect(skillsHeading).toBeInTheDocument()
  })

  it('shows the hero subtitle with role information', () => {
    render(<Homepage />)
    
    const subtitle = screen.getByText(/Full-Stack Developer \| Multiverse Apprentice \| Problem Solver/i)
    expect(subtitle).toBeInTheDocument()
  })
}) 