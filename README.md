# My Portfolio - Multiverse Apprenticeship Projects

A professional portfolio website showcasing the projects and skills developed during my Multiverse apprenticeship program. Built with React.js and featuring a modern, responsive design.

## 🚀 Features

- **Professional Design**: Clean, modern interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Component-Based Architecture**: Built with React.js for maintainability
- **Project Showcase**: Displays four major apprenticeship projects
- **Contact Information**: Professional contact details and social links
- **Testing Setup**: Comprehensive test coverage with Vitest and React Testing Library

## 📋 Project Structure

```
src/
├── components/
│   ├── Homepage.jsx          # Main landing page
│   ├── Projects.jsx          # Projects showcase
│   ├── ProjectCard.jsx       # Individual project display
│   ├── Contact.jsx           # Contact information
│   └── *.css                 # Component-specific styles
├── __tests__/
│   ├── Homepage.test.jsx     # Homepage component tests
│   └── Projects.test.jsx     # Projects component tests
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── setupTests.js             # Test configuration
```

## 🛠️ Technologies Used

- **Frontend**: React.js 19.1.0
- **Build Tool**: Vite 7.0.0
- **Testing**: Vitest, React Testing Library
- **Styling**: CSS3 with modern design patterns
- **Deployment**: Ready for Netlify, Vercel, or GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20.18.0 or higher)
- npm (version 10.9.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd portfolio-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:run` - Run tests once

## 📝 Customization

### Updating Project Information

Edit the `projects` array in `src/components/Projects.jsx` to update your project details:

```javascript
const projects = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Project description...",
    technologies: ["React", "Node.js", "Express"],
    liveUrl: "https://your-live-url.com",
    codeUrl: "https://github.com/your-username/project",
    imageUrl: "path/to/your/image.jpg"
  }
  // Add more projects...
]
```

### Updating Contact Information

Edit `src/components/Contact.jsx` to update your contact details:

```javascript
// Update LinkedIn profile
href="https://linkedin.com/in/your-actual-profile"

// Update GitHub profile
href="https://github.com/your-actual-username"

// Update email address
href="mailto:your.actual.email@example.com"
```

### Styling Customization

The project uses a professional color palette that can be customized in the CSS files:

- Primary colors: `#667eea`, `#764ba2` (gradient)
- Secondary colors: `#2c3e50`, `#34495e`
- Accent colors: `#3498db`, `#27ae60`, `#e74c3c`

## 🧪 Testing

The project includes comprehensive tests for all components:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

## 🚀 Deployment

### Option 1: Deploy to Netlify

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

3. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Option 2: Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** to connect your GitHub repository

### Option 3: Deploy to GitHub Pages

1. **Add GitHub Pages dependency**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://your-username.github.io/your-repo-name"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Professional color schemes
- **Smooth Animations**: Hover effects and transitions
- **Card-Based Layout**: Clean project presentation
- **Typography**: Professional font hierarchy
- **Accessibility**: Semantic HTML and ARIA labels

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, please reach out through the contact information provided in the portfolio.

---

**Built with ❤️ during the Multiverse Apprenticeship Program**
