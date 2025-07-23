# College Duniya - Component Specifications for Figma

## Overview
This document provides detailed specifications for all UI components in the College Duniya mobile app, designed for easy import and recreation in Figma.

## Layout Structure

### Mobile Container
- **Width**: 390px (iPhone 12 Pro width)
- **Max Width**: 428px (supports larger phones)
- **Background**: #FFFFFF (White)
- **Responsive**: Mobile-first design

## Core Components

### 1. App Header
**Dimensions**: 390px × 56px
**Background**: Primary Blue (#3B82F6)
**Components**:
- Logo icon (School): 24px × 24px, White
- Title text: Roboto Medium 18px, White
- Notification bell: 20px × 20px, White
- Profile icon: 20px × 20px, White
**Padding**: 16px horizontal, 12px vertical

### 2. Bottom Navigation
**Dimensions**: 390px × 68px
**Background**: White (#FFFFFF)
**Border**: Top border 1px #E5E5E5
**Items**: 5 navigation items
- Icon size: 20px × 20px
- Label: Roboto Regular 12px
- Active color: Primary Blue (#3B82F6)
- Inactive color: Gray (#9CA3AF)
**Spacing**: Equal distribution with 16px padding

### 3. College Card
**Dimensions**: 358px × 280px (with 16px margin)
**Background**: White (#FFFFFF)
**Border Radius**: 12px
**Shadow**: 0 1px 3px rgba(0,0,0,0.1)

**Structure**:
- **Image**: 358px × 128px, Border radius 12px top
- **Rank Badge**: 60px × 24px, White/90% opacity, Top-right corner
- **Content Padding**: 16px all sides
- **Title**: Roboto Medium 16px, #111827
- **Location**: Roboto Regular 14px, #6B7280 with MapPin icon
- **Star Rating**: 5 stars × 12px, #FCD34D
- **Info Grid**: 2 columns for fees and type
- **Action Text**: "View Details" - Primary Blue

### 4. Search Input
**Dimensions**: 358px × 48px
**Background**: White (#FFFFFF)
**Border**: 1px #E5E5E5
**Border Radius**: 8px
**Icon**: Search icon 20px × 20px, #9CA3AF, 12px from left
**Text**: Roboto Regular 16px, #111827
**Placeholder**: #9CA3AF

### 5. Filter Modal
**Dimensions**: 390px × 80% viewport height
**Background**: White (#FFFFFF)
**Border Radius**: 24px top corners
**Backdrop**: rgba(0,0,0,0.5)

**Header**:
- Height: 64px
- Title: Roboto Medium 18px
- Close button: 24px × 24px

**Content Sections**:
- **Course Type**: Checkbox grid, 2 columns
- **State Selector**: Dropdown, 48px height
- **Fees Slider**: Range 0-30L, with labels
- **Entrance Exams**: Vertical checkbox list

### 6. Quick Action Cards
**Dimensions**: 171px × 80px (2 per row with 16px gap)
**Background**: White (#FFFFFF)
**Border Radius**: 12px
**Content**:
- Icon background: Colored circle 40px diameter
- Icon: 20px × 20px
- Title: Roboto Medium 16px
- Subtitle: Roboto Regular 12px, #6B7280

### 7. Recommendation Cards
**Dimensions**: 358px × 80px
**Background**: Gradient backgrounds
- Blue: linear-gradient(to right, #EFF6FF, #E0E7FF)
- Orange: linear-gradient(to right, #FFF7ED, #FED7AA)
**Border Radius**: 12px
**Padding**: 16px

### 8. Comparison Table
**Background**: White (#FFFFFF)
**Border**: 1px #E5E5E5
**Header Row**: Background #F9FAFB
**Cell Padding**: 12px
**Text**: Roboto Regular 14px
**Borders**: 1px #E5E5E5 between rows

### 9. Badges
**Course Type Badges**:
- Height: 32px
- Padding: 8px 12px
- Border Radius: 16px
- Font: Roboto Medium 14px

**Colors by Type**:
- Engineering: Blue (#3B82F6)
- Medical: Green (#22C55E)
- MBA: Purple (#8B5CF6)
- Arts: Pink (#EC4899)

### 10. Rating Stars
**Size**: 16px × 16px for cards, 20px × 20px for details
**Color**: #FCD34D (filled), #E5E7EB (empty)
**Spacing**: 2px between stars

## Color Palette

### Primary Colors
- **Primary Blue**: #3B82F6
- **Secondary Orange**: #FB923C
- **Accent Green**: #22C55E

### Neutral Colors
- **White**: #FFFFFF
- **Background Gray**: #F5F5F5
- **Border Gray**: #E5E5E5
- **Text Dark**: #111827
- **Text Medium**: #6B7280
- **Text Light**: #9CA3AF

### Semantic Colors
- **Success**: #22C55E
- **Warning**: #F59E0B
- **Error**: #EF4444
- **Info**: #3B82F6

## Typography

### Font Family
- **Primary**: Roboto (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Bold**: 700

### Font Sizes
- **Small**: 12px (captions, labels)
- **Body**: 14px (body text)
- **Base**: 16px (inputs, primary text)
- **Large**: 18px (titles)
- **XL**: 20px (page titles)
- **2XL**: 24px (main headings)

## Spacing System
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px (standard padding)
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

## Border Radius
- **Small**: 4px (small elements)
- **Medium**: 8px (inputs, buttons)
- **Large**: 12px (cards)
- **XL**: 16px (modals)
- **Full**: 9999px (pills, badges)

## Shadows
- **Small**: 0 1px 2px rgba(0,0,0,0.05)
- **Medium**: 0 1px 3px rgba(0,0,0,0.1)
- **Large**: 0 4px 6px rgba(0,0,0,0.1)

## Icons
- **Library**: Lucide React (line icons)
- **Size**: 16px, 20px, 24px variants
- **Stroke Width**: 1.5px
- **Color**: Inherits from parent or specified

## Responsive Breakpoints
- **Mobile**: 390px (base)
- **Large Mobile**: 428px (max-width)
- **Tablet**: Not currently supported (mobile-first)

## Page Layouts

### Home Page Structure
1. App Header (56px)
2. Search Section with Primary background (120px)
3. Content area with Background Gray
4. Bottom Navigation (68px)
5. Bottom padding: 80px (for navigation)

### College Details Structure
1. Custom header with back button (56px)
2. Hero image (192px)
3. College info section (160px)
4. Tabs navigation (48px)
5. Tab content (variable)
6. Bottom Navigation (68px)

## Animation Guidelines
- **Transitions**: 200ms ease-in-out
- **Hover States**: Subtle opacity changes (0.8)
- **Loading States**: Spin animation for loading indicators
- **Modal Animations**: Slide up from bottom

## Accessibility
- **Minimum Touch Target**: 44px × 44px
- **Color Contrast**: WCAG AA compliant
- **Focus States**: 2px solid Primary Blue outline
- **Text Scaling**: Supports up to 200% zoom

## Design Tokens for Figma Variables
```
Colors/Primary/Blue: #3B82F6
Colors/Secondary/Orange: #FB923C
Colors/Neutral/White: #FFFFFF
Colors/Neutral/Gray-50: #F9FAFB
Colors/Neutral/Gray-100: #F3F4F6
Colors/Neutral/Gray-500: #6B7280
Spacing/SM: 8px
Spacing/MD: 16px
Spacing/LG: 24px
Typography/Size/SM: 12px
Typography/Size/Base: 16px
Typography/Size/LG: 18px
```