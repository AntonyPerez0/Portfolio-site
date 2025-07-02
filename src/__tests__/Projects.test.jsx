import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from '../components/Projects'

describe('Projects', () => {
  it('renders the projects header', () => {
    render(<Projects />)
    
    const header = screen.getByText(/My Projects/i)
    expect(header).toBeInTheDocument()
  })

  it('renders the correct number of project cards', () => {
    render(<Projects />)
    
    // Should render 4 project cards based on the sample data
    const projectTitles = [
      'Inventory Full-Stack Application',
      'Final Bootcamp Hackathon Project',
      'Back-End Module Project',
      'Front-End Module Project'
    ]
    
    projectTitles.forEach(title => {
      const projectTitle = screen.getByText(title)
      expect(projectTitle).toBeInTheDocument()
    })
  })

  it('displays project descriptions', () => {
    render(<Projects />)
    
    // Check for presence of technology sections
    const techSections = screen.getAllByText(/Technologies Used:/i)
    expect(techSections).toHaveLength(4)
  })

  it('shows project links', () => {
    render(<Projects />)
    
    const liveLinks = screen.getAllByText(/View Live/i)
    const codeLinks = screen.getAllByText(/View Code/i)
    
    expect(liveLinks).toHaveLength(4)
    expect(codeLinks).toHaveLength(4)
  })

  it('renders the projects footer', () => {
    render(<Projects />)
    
    const footerText = screen.getByText(/These projects represent my journey/i)
    expect(footerText).toBeInTheDocument()
  })
}) 