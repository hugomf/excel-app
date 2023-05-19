
# Excel Kata

## Requirements:

I want to use **SolidJS** to build a robust table with the following remarkable features:

* The visual appearance of the table will closely resemble that of an Excel sheet, encompassing all styles, colors, and fonts for a seamless user experience.
Users will have the ability to navigate through the cells effortlessly using the arrow keys.

* Cell editing mode can be initiated by a simple double-click of the mouse button, enabling text modification. The editing process will conclude upon pressing Enter or clicking elsewhere on the screen.

* By clicking and dragging the mouse along the column's edge, users will be able to dynamically adjust its size during the dragging motion. Pressing the Escape key during the drag event will instantly revert the column to its original size, while releasing the mouse button will lock in the new size.

* Use solidjs Framework to build the table (JSX).

* Use tailwindcss to customize the visual appearance of the table.

* Whenever posible don't use external libraries.

By implementing these features, the table in  **SolidJS**  will provide a user-friendly experience with Excel-like functionality.

## Iterations

Completed features that were implemented

1.- Getting Started: :white_check_mark:

Create a simple **SolidJS** + tailwindcss + typescript project, to setup the project manually, follow the instruction: [Tailwindcss - SolidJS](https://tailwindcss.com/docs/guides/solidjs)

Or you use a template:

```bash
npx degit solidjs/templates/ts excel-app
```

2.- Created a static JSX table in **SolidJS** and add basic styles that match excel visual appearance. :white_check_mark:

    Delivered:
    - Table_v1.jsx (with styles)

3.- Added coumns resizing feature to the static table. :white_check_mark:

    Delivered:
    - Table_v2.tsx
    - Table css with css updates


4.- Added rows resizing feature to the static table. :white_check_mark:


    Delivered:
    - Tablev3.tsx
    - Table css with css updates


5.- Added Cancel (ESC) Feature to cancel column width/height modification. :white_check_mark:


    Delivered:
    - Tablev4.tsx
    - Table css with css updates
