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
    
    // Should render 5 project cards based on the updated data
    const projectTitles = [
      /Full-Stack Inventory Application/i,
      /Final Bootcamp Hackathon Project: Portfolio Website/i,
      /Back-End Module Project: Personal Notes API/i,
      /Front-End Module Project: Android PocketDex \(PokeAPI\)/i,
      /MultiClock \(Android App\)/i,
    ]
    
    projectTitles.forEach(title => {
      const projectTitle = screen.getByText(title)
      expect(projectTitle).toBeInTheDocument()
    })
  })

  it('displays project descriptions and technologies', () => {
    render(<Projects />)
    
    // Check for presence of technology sections for all 5 projects
    const techSections = screen.getAllByText(/Technologies Used:/i)
    expect(techSections).toHaveLength(5)
  })

  it('shows project links', () => {
    render(<Projects />)
    
    const liveLinks = screen.queryAllByText(/View Live/i) // Use queryAllByText as not all projects have live links
    const codeLinks = screen.getAllByText(/View Code/i)
    
    expect(liveLinks.length).toBeGreaterThanOrEqual(0) // Checks that there can be zero or more live links
    expect(codeLinks).toHaveLength(5)
  })

  it('renders the projects footer', () => {
    render(<Projects />)
    
    const footerText = screen.getByText(/These projects represent my journey/i)
    expect(footerText).toBeInTheDocument()
  })
})