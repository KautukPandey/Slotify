# Design System - Slotify

## Colors
- **Primary**: Brand color `#2563EB` (Tailwind `blue-600`)
- **Background**: `#F8FAFC` (Tailwind `slate-50`)
- **Cards & Surfaces**: `#FFFFFF` (White)
- **Primary Text**: `#0F172A` (Tailwind `slate-900`)
- **Secondary Text**: `#64748B` (Tailwind `slate-500`)
- **Borders**: `#E5E7EB` (Tailwind `slate-200`)
- **Success**: `#22C55E` (Tailwind `emerald-500` or `green-500`)
- **Error / Danger**: `#EF4444` (Tailwind `red-500`)

## Shadows
- **Soft Shadows**: 
  - Standard Card: `box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05);`
  - Hover Card Lift: `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);`

## Borders & Corners
- Use `rounded-xl` (12px) for buttons, inputs, standard cards.
- Use `rounded-2xl` (16px) for larger cards, modal contents, category blocks.

## Components Specification
- **Buttons**:
  - `btn-primary`: Solid blue `#2563EB`, white text, hover darken 5%, scale dynamic transform down on click.
  - `btn-secondary`: White bg, 1px border `#E5E7EB`, text `#0F172A`, hover `#F8FAFC`.
  - `btn-danger`: White bg, red border, red text, hover soft light red bg.
- **Inputs**:
  - `.input`: Rounded corner `rounded-xl`, border `#E5E7EB`, focus ring blue with outline.
- **Cards**:
  - `.card`: White background, border `#E5E7EB`, rounded corner, and optional slight hover scale up + lift.
- **Badges**:
  - Pill shape, thin text description, soft colors: Emerald (for completed), Red (cancelled), Blue/Amber (pending).
