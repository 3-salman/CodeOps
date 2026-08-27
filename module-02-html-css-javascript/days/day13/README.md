# Bole Speciality Roastery — Profile Card

A responsive business profile card built for a fictional cafe based in Bole, Addis Ababa.

## CSS Techniques Used

- **CSS Custom Properties (`:root`):** Complete design token system for colors (HSL), spacing scale, typography, and border radii.
- **Box Model Control:** Global `box-sizing: border-box` declaration and custom padding/border management.
- **Typography:** Imported Google Font (`Inter`) with a styled hierarchy (headings, subheadings, and body with high readability).
- **HSL Lightness Adjustment:** Hover state on the `.btn` component updates lightness channel using `--color-primary-hover`.
- **Pseudo-Elements (`::before`):** 
  1. A decorative colored bar running along the top card border.
  2. A bullet dot preceding the TeleBirr status tag.
- **Accessibility:** Interactive state handling preserving `:focus-visible` ring.