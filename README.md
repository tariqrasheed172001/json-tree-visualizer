# JSON Tree Visualizer

An interactive web application for visualizing JSON data as a hierarchical tree structure. Built with Next.js, TypeScript, React Flow, and Tailwind CSS.

## Features

### Core Features

- **JSON Input & Parsing**: Text area with real-time validation and error messages
- **Interactive Tree Visualization**: Hierarchical tree using React Flow with smooth animations
- **Node Type Differentiation**: Color-coded nodes
  - **Blue**: Objects
  - **Green**: Arrays
  - **Orange**: Primitive values (strings, numbers, booleans, null)
- **Advanced Search**: Search by JSON path (e.g., `user.name`, `items[0].value`) with highlighting and auto-pan
- **Zoom & Pan Controls**: Built-in navigation controls with minimap

### Additional Features

- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Clear/Reset**: Clear input and reset visualization
- **Copy Path**: Click nodes to copy their JSON path to clipboard
- **Load Sample JSON**: Quick start with sample data
- **Download JSON**: Export current JSON data as file
- **Export Image**: Export tree visualization as PNG image

## Getting Started

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

## Usage

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

## Project Structure

```
json-tree-visualizer/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main application page
│   └── globals.css          # Global styles and Tailwind configuration
├── components/
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

## Architecture

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

Manages ReactFlow node and edge state, handles updates, initialization, and selection changes.

#### `useImageExport`

Handles image export functionality with viewport capture and fallback mechanisms.

## Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **React Flow**: Interactive node-based graph visualization
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **html-to-image**: Image export functionality

## Development

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
- Consistent formatting with Prettier
- Component-based architecture
- Custom hooks for reusable logic

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

The application is configured for seamless Vercel deployment with optimized builds.

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- GitHub Pages (with static export)
- Any Node.js hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size
- Efficient rendering with React memo
- Lazy loading where applicable
- Smooth animations with CSS transitions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning and development.

## Acknowledgments

Built with modern web technologies focusing on user experience, performance, and maintainability.

---

Made with ❤️ using Next.js, React Flow, and Tailwind CSS
