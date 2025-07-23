# College Duniya - Figma Import Guide

## Quick Start: Importing the Design to Figma

### Method 1: Using Screenshots and Specifications

1. **Take Screenshots**: Use the running application to capture high-quality screenshots of each page
2. **Create Figma File**: Start a new mobile design file (390px width frame)
3. **Import Screenshots**: Drag screenshots as reference images
4. **Apply Design System**: Use the color palette and component specifications to recreate components

### Method 2: Using Design Assets

1. **Import Color Palette**: 
   - Use the `color-palette.json` file to set up Figma variables
   - Create color styles for each color token
   - Set up gradients for recommendation cards

2. **Set Up Typography**:
   - Download Google Fonts Roboto (Light 300, Regular 400, Medium 500, Bold 700)
   - Create text styles for each font size and weight combination

3. **Create Components**:
   - Use `component-specifications.md` for exact dimensions and styling
   - Build component library starting with basic elements (buttons, inputs)
   - Create complex components (college cards, navigation)

### Method 3: Using Figma Plugins

#### Recommended Plugins:
1. **HTML to Design (Figma Plugin)**
   - Can convert HTML/CSS to Figma components
   - Useful for importing button and form styles

2. **Color Palette Generator**
   - Import the JSON color palette directly
   - Creates organized color styles

3. **Design System Organizer**
   - Helps organize components and styles
   - Creates consistent naming conventions

## Design System Setup in Figma

### 1. Color Variables Setup
```
Primary/Blue: #3B82F6
Primary/Blue-Dark: #1D4ED8
Secondary/Orange: #FB923C
Secondary/Orange-Dark: #EA580C
Neutral/White: #FFFFFF
Neutral/Gray-50: #F9FAFB
Neutral/Gray-100: #F3F4F6
Neutral/Gray-200: #E5E7EB
Neutral/Gray-300: #D1D5DB
Neutral/Gray-400: #9CA3AF
Neutral/Gray-500: #6B7280
Neutral/Gray-800: #1F2937
Neutral/Gray-900: #111827
Semantic/Success: #22C55E
Semantic/Warning: #F59E0B
Semantic/Error: #EF4444
```

### 2. Typography Styles
```
Heading/Large: Roboto Bold 24px, Line Height 32px
Heading/Medium: Roboto Bold 20px, Line Height 28px
Heading/Small: Roboto Medium 18px, Line Height 24px
Body/Large: Roboto Regular 16px, Line Height 24px
Body/Medium: Roboto Regular 14px, Line Height 20px
Body/Small: Roboto Regular 12px, Line Height 16px
Caption: Roboto Medium 12px, Line Height 16px
```

### 3. Component Library Structure

#### Basic Components
- **Button**: Primary, Secondary, Outline, Ghost variants
- **Input**: Default, Focus, Error states
- **Badge**: Different colors for course types
- **Icon**: 16px, 20px, 24px sizes

#### Complex Components
- **College Card**: Complete with image, content, and actions
- **Navigation**: Bottom navigation with 5 items
- **Header**: App header with logo and actions
- **Filter Modal**: Complete modal with all filter options

#### Layout Components
- **Page Container**: 390px width with proper spacing
- **Section**: Content sections with consistent padding
- **Grid**: 2-column grid for cards and content

### 4. Page Templates

#### Create these page templates:
1. **Home Page**: Complete home layout with all sections
2. **Search Page**: Search interface with filters
3. **College Details**: Detail page with tabs
4. **Compare Page**: Comparison table layout
5. **Exams Page**: Exam listing layout
6. **Profile Page**: User profile layout

## Mobile Design Specifications

### Screen Sizes to Support:
- **iPhone SE**: 375px × 667px
- **iPhone 12/13/14**: 390px × 844px
- **iPhone 12/13/14 Pro Max**: 428px × 926px
- **Android Standard**: 360px × 800px
- **Android Large**: 412px × 915px

### Key Mobile Patterns:
1. **Thumb-Friendly Navigation**: Bottom navigation within thumb reach
2. **Card-Based Layout**: Scannable content in cards
3. **Large Touch Targets**: Minimum 44px touch targets
4. **Swipe Gestures**: Horizontal swipe for tabs and carousels
5. **Progressive Disclosure**: Show essential info first

## Export Assets for Development

### Icon Assets:
- Export all icons as SVG at 24px, 20px, 16px sizes
- Use consistent stroke width (1.5px)
- Maintain Lucide React icon style

### Image Assets:
- College images: 800px × 200px (4:1 ratio)
- Profile avatars: 64px × 64px, 128px × 128px
- Logo variations: 32px, 48px, 64px heights

### Color Assets:
- Export color palette as CSS custom properties
- Create dark mode variants for all colors
- Export gradients as CSS linear-gradient values

## Interactive Prototyping

### Key Interactions to Prototype:
1. **Navigation Flow**: Between all main pages
2. **Filter Modal**: Open/close animation, filter selection
3. **College Card**: Tap to detail page
4. **Search**: Real-time search with results
5. **Comparison**: Add/remove colleges, view comparison
6. **Tabs**: Switch between detail page tabs

### Animation Guidelines:
- **Duration**: 200-300ms for most transitions
- **Easing**: Ease-out for entrances, ease-in for exits
- **Loading States**: Skeleton screens or spinners
- **Micro-interactions**: Button press states, form validation

## Accessibility in Figma

### Design for Accessibility:
1. **Color Contrast**: Ensure 4.5:1 ratio for text
2. **Focus States**: Design visible focus indicators
3. **Touch Targets**: Minimum 44px × 44px
4. **Screen Reader**: Use proper layer naming
5. **Motion**: Respect prefers-reduced-motion

### Testing in Figma:
- Use Figma's accessibility plugin
- Test with color blindness simulator
- Verify contrast ratios for all text
- Check focus order in prototypes

## Handoff to Development

### What to Include:
1. **Design System**: Complete component library
2. **Specifications**: Exact spacing, sizing, colors
3. **Assets**: All icons, images, and graphics
4. **Prototypes**: Interactive flows for complex features
5. **Documentation**: Usage guidelines and patterns

### Export Format:
- **CSS**: Export styles as CSS custom properties
- **JSON**: Design tokens in JSON format
- **SVG**: All icons and illustrations
- **PNG**: Raster images at 2x resolution

## Version Control and Collaboration

### File Organization:
```
📁 College Duniya Design System
├── 🎨 Colors & Typography
├── 🧩 Components
│   ├── Basic (Buttons, Inputs, etc.)
│   ├── Complex (Cards, Navigation, etc.)
│   └── Layout (Containers, Grids, etc.)
├── 📱 Pages
│   ├── Home
│   ├── Search
│   ├── College Details
│   ├── Compare
│   ├── Exams
│   └── Profile
├── 📐 Templates
└── 🚀 Prototypes
```

### Best Practices:
1. **Consistent Naming**: Use clear, descriptive names
2. **Component Variants**: Create all states for components
3. **Auto Layout**: Use Figma's auto layout for responsive design
4. **Constraints**: Set proper constraints for responsive behavior
5. **Documentation**: Add descriptions to all components

## Quality Checklist

Before considering the design complete:

### Design System ✓
- [ ] All colors defined as styles
- [ ] Typography styles created
- [ ] Component library complete
- [ ] Icons organized and consistent

### Pages ✓
- [ ] All 6 main pages designed
- [ ] Mobile responsive (390px base)
- [ ] Consistent spacing and alignment
- [ ] Proper information hierarchy

### Components ✓
- [ ] All states designed (default, hover, active, disabled)
- [ ] Consistent with specifications
- [ ] Accessible color contrast
- [ ] Proper touch target sizes

### Prototyping ✓
- [ ] Main user flows prototyped
- [ ] Transitions feel natural
- [ ] Loading states included
- [ ] Error states designed

This guide provides everything needed to recreate the College Duniya design system in Figma with full fidelity to the original application.