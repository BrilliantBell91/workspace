# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**나의 버킷 리스트** is a lightweight, frameworkless web application for managing life goals and bucket list items. It uses vanilla HTML/CSS/JavaScript with LocalStorage for data persistence.

## Running the Application

Since this is a pure static HTML/CSS/JS project with no build process:

```bash
# Option 1: Open directly in browser
# Double-click index.html or drag into browser

# Option 2: Use Python's built-in server (recommended for development)
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Use VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

**No build, lint, or test commands exist for this project.** It runs directly in the browser.

## Code Architecture

The project uses a **two-layer separation**:

### Layer 1: Data Management (`js/storage.js`)
- **BucketStorage** object handles all data persistence
- Manages LocalStorage read/write operations
- Provides a clean API for CRUD operations: `addItem()`, `updateItem()`, `deleteItem()`, `toggleComplete()`
- Handles computed stats: `getStats()` (total, completed, progress, completion rate)
- Provides filtering: `getFilteredList(filter)` with three filter states: 'all', 'active' (incomplete), 'completed'
- Each item has: `id` (timestamp-based), `title`, `completed`, `createdAt`, `completedAt`

### Layer 2: UI & Interaction (`js/app.js`)
- **BucketListApp** class manages all UI logic
- Caches DOM elements on initialization for performance
- Event binding happens in `bindEvents()` - all events route through the app instance
- `render()` is the main update function - called after every state change
- Inline onclick handlers in HTML call `app.handleToggle()`, `app.openEditModal()`, `app.handleDelete()` for dynamic elements
- `createBucketItemHTML()` generates HTML for each bucket item (includes HTML escaping to prevent XSS)
- Three filters controlled by `.filter-btn` buttons - class-based state management (active/inactive)

### Layer 3: UI Markup & Styling
- `index.html`: Semantic HTML structure, uses Tailwind CSS CDN for base styles
- `css/styles.css`: Custom animations, filter button states, responsive adjustments, dark mode support
- Key CSS classes: `.filter-btn`, `.bucket-item`, `.active` (filter state), `.line-through` (completed items)

## Data Flow

1. User interaction (click, form submit) → `app.handleX()`
2. Handler calls `BucketStorage.operation()` to mutate state
3. Storage auto-saves to LocalStorage
4. Handler calls `this.render()`
5. `render()` pulls latest data via `BucketStorage.getFilteredList()`
6. DOM updates with new HTML

## Key Implementation Details

### Security
- **HTML Escaping**: `escapeHtml()` method converts all user input to plain text before rendering (prevents XSS)
- Applied to item titles in `createBucketItemHTML()`
- Quotes are also escaped when passing data to onclick handlers

### State Management
- All state lives in LocalStorage (BucketStorage)
- UI state (current filter, editing ID) lives in BucketListApp instance
- Single source of truth: filtering always reads current data from storage
- No in-memory caching of the full list - always load fresh from storage

### Filtering & Stats
- `getStats()` recalculates every render - no cached stats
- `getFilteredList()` returns items based on completed status
- Stats section updates via `updateStats()` which reads from `getStats()`

### Modal Management
- Edit modal toggled via `classList.add/remove('hidden', 'flex')`
- Modal overlay click also closes (checks `e.target === this.editModal`)
- `editingId` stores which item is being edited

## Adding New Features

### Adding a new CRUD operation
1. Add method to `BucketStorage` object in `storage.js`
2. Call it from `BucketListApp` handler in `app.js`
3. Call `this.render()` after to update UI

### Adding a new filter type
1. Add case to `getFilteredList()` switch statement in `storage.js`
2. Add filter button in `index.html` with `data-filter="newFilter"`
3. Add click handler in `handleFilter()` - it already routes all filter buttons

### Adding new stats
1. Add property to object returned by `getStats()` in `storage.js`
2. Add display element in `index.html` with an `id`
3. Cache the element and update it in `updateStats()` in `app.js`

### Styling
- Use Tailwind classes in HTML for most styling
- Add animations or complex selectors to `css/styles.css`
- Mobile breakpoint: `max-width: 640px` (flex-direction changes, smaller padding)

## Browser Requirements

- Must support LocalStorage API
- Must support ES6 JavaScript (arrow functions, template literals, const/let)
- Works on all modern browsers: Chrome, Firefox, Safari, Edge (last 2 versions)

## File Responsibilities

| File | Purpose | Key Functions/Classes |
|------|---------|-----|
| `index.html` | Page structure & semantic HTML | Modal, form, filter buttons, list container |
| `css/styles.css` | Custom styles & animations | Filter button states, slide/fade animations, responsive tweaks |
| `js/storage.js` | Data layer | `BucketStorage` object with CRUD & stats |
| `js/app.js` | UI logic & event handling | `BucketListApp` class with render pipeline |

## Common Tasks

**Verify the app works**: Open `index.html` in a browser, add an item, complete it, edit it, delete it. Check that all operations work and data persists after refresh.

**Add a new item property**: Add field to item object in `addItem()` and `toggleComplete()`, display it in `createBucketItemHTML()`.

**Change colors/theme**: Modify Tailwind classes in `index.html` or add CSS variables to `styles.css`.

**Fix a bug**: Check `storage.js` first (data logic), then `app.js` (UI logic), then `index.html`/`styles.css` (presentation).
