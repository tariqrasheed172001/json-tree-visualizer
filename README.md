# JSON Tree Visualizer

An interactive web application for visualizing JSON data as a hierarchical tree structure. Built with Next.js, TypeScript, React Flow, and Tailwind CSS.

🌐 **Live Demo**: [https://json-tree-visualizer-jet.vercel.app/](https://json-tree-visualizer-jet.vercel.app/)

## ✨ Features

### Core Features

- **JSON Input & Parsing**: Text area with real-time validation and error messages
- **Interactive Tree Visualization**: Hierarchical tree using React Flow with smooth animations
- **Node Type Differentiation**: Color-coded nodes
  - **Blue**: Objects
  - **Green**: Arrays
  - **Orange**: Primitive values (strings, numbers, booleans, null)
- **Advanced Search**: Search by JSON path (e.g., `user.name`, `items[0].value`) with highlighting and auto-pan
- **Zoom & Pan Controls**: Built-in navigation controls with minimap
- **Auto-fit View**: Automatically fits all nodes to viewport when data is loaded

### Additional Features

- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Clear/Reset**: Clear input and reset visualization
- **Copy Path**: Click nodes to copy their JSON path to clipboard
- **Load Sample JSON**: Quick start with sample data
- **Download JSON**: Export current JSON data as file
- **Export Image**: Export tree visualization as PNG image

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd json-tree-visualizer

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Usage

1. **Input JSON**: Paste or type JSON in the left panel text area
2. **Visualize**: Click the "Visualize" button to generate the interactive tree
3. **Search**: Use the search bar to find nodes by path (e.g., `user.name`, `items[0]`)
   - Matching nodes are highlighted
   - View automatically pans to the first match
   - Match count is displayed
4. **Navigate**:
   - Drag to pan the canvas
   - Use zoom controls (in/out/fit view)
   - Click nodes to select them
   - View minimap for navigation overview
5. **Actions**:
   - Click "Sample" to load sample JSON
   - Click nodes to copy their path
   - Download current JSON data
   - Export visualization as PNG image
   - Toggle dark/light mode
   - Clear all data

## 📁 Project Structure

```
json-tree-visualizer/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main application page
│   └── globals.css          # Global styles and Tailwind configuration
├── components/
│   ├── Button.tsx          # Reusable button component
│   ├── Controls.tsx        # Control buttons (clear, copy, download, export)
│   ├── CustomNode.tsx      # Custom node rendering component
│   ├── JSONInput.tsx       # JSON input component with validation
│   ├── SearchBar.tsx       # Search functionality component
│   ├── ThemeProvider.tsx   # Dark/Light mode context provider
│   └── TreeVisualizer.tsx  # React Flow tree visualization component
├── hooks/
│   ├── useImageExport.ts   # Image export functionality
│   ├── useJsonTree.ts      # JSON parsing and tree building logic
│   ├── useSearch.ts        # Search functionality logic
│   └── useTreeVisualizer.ts # Tree state management and search matching
├── layout/
│   ├── Footer.tsx          # Application footer
│   ├── Header.tsx          # Application header
│   └── MainContent.tsx    # Main content layout
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── jsonParser.ts       # JSON to tree conversion utilities
│   └── treeHelpers.ts      # Tree helper functions
└── public/                 # Static assets
```

## 🏗️ Architecture

### Separation of Concerns

The application follows clean architecture principles with clear separation:

- **Components**: UI-only components with minimal logic
- **Hooks**: Business logic and state management
- **Utils**: Pure utility functions (parsing, helpers)
- **Types**: TypeScript type definitions

### Key Hooks

#### `useJsonTree`

Manages JSON input, parsing, validation, and tree generation.

#### `useSearch`

Handles search functionality with path matching and result highlighting.

#### `useTreeVisualizer`

Manages ReactFlow node and edge state, handles updates, initialization, and selection changes. Preserves node positions when possible.

#### `useImageExport`

Handles image export functionality with viewport capture and fallback mechanisms.

### Key Components

#### `Button`

Reusable button component with multiple variants (primary, secondary, gradient, icon), sizes, loading states, and icon support.

#### `JSONInput`

Component for entering and validating JSON data with error display and action buttons.

#### `TreeVisualizer`

Main visualization component using React Flow. Handles node rendering, search highlighting, and auto-fit view functionality.

#### `CustomNode`

Custom node rendering with type-specific colors, icons, and value display.

## 🛠️ Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **React Flow**: Interactive node-based graph visualization
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **html-to-image**: Image export functionality

## 📦 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Consistent formatting
- Component-based architecture
- Custom hooks for reusable logic
- JSDoc comments for documentation

## 🌐 Deployment

### Vercel (Currently Deployed)

The application is deployed on Vercel:

**Live URL**: [https://json-tree-visualizer-jet.vercel.app/](https://json-tree-visualizer-jet.vercel.app/)

#### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will automatically detect Next.js
6. Click "Deploy"

The application is configured for seamless Vercel deployment with optimized builds.

### Other Deployment Options

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Connect GitHub repo, build command: `npm run build`
- **AWS Amplify**: Follow Next.js deployment guide
- **GitHub Pages**: Requires static export configuration
- **Any Node.js hosting service**: Configure to run `npm start`

## ✅ Features Implementation Status

### Core Features ✅

- [x] JSON Input & Parsing with validation
- [x] Tree Visualization using React Flow
- [x] Node type differentiation (Objects/Arrays/Primitives)
- [x] Search by JSON path
- [x] Highlight matching nodes
- [x] Auto-pan to matches
- [x] Show match/no match messages
- [x] Auto-fit view on initial load

### Bonus Features ✅

- [x] Dark/Light mode toggle
- [x] Clear/Reset button
- [x] Copy path feature
- [x] Load sample data
- [x] Download JSON
- [x] Export image as PNG
- [x] Zoom controls (built-in React Flow)
- [x] Pan functionality (built-in React Flow)
- [x] Minimap for navigation

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚡ Performance

- Optimized bundle size
- Efficient rendering with React memo
- Proper memoization with useCallback
- Smooth animations with CSS transitions
- Automatic view fitting for better UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

Built with modern web technologies focusing on user experience, performance, and maintainability.

---

Made with ❤️ using Next.js, React Flow, and Tailwind CSS

**Live Demo**: [https://json-tree-visualizer-jet.vercel.app/](https://json-tree-visualizer-jet.vercel.app/)
