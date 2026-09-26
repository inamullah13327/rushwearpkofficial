# ThreadCraft Studio (64)

Build a modern, high-performance, dark-themed e-commerce web application named "ThreadCraft" (inspired by dynamic storefronts like ASSAIMART) featuring animated apparel, custom item ordering, and automated WhatsApp order dispatch.

### 1. Header Layout & Top Navigation Bar

Structure the top header into two primary functional areas:

- Left Utility Controls:

  - Global Search Bar: Live auto-complete search input to search products by title, category, or fabric color.

  - Cart Drawer Trigger: Shopping cart icon with an animated badge showing live item count. Clicking opens a slide-over cart listing all added items with quantity controls, design preview thumbnails, and price breakdowns.

  - Direct WhatsApp Support Launcher: Animated WhatsApp icon button that opens a pre-filled direct WhatsApp chat (`https://wa.me/YOUR_PHONE_NUMBER`) with a default greeting message.

- Navigation Tabs (Centered / Right Aligned):

  - Home

  - Shop

  - About

  - Contact

  - Track Order

### 2. Home Page (Hero & Showcases)

- Animated Slideshow: High-impact hero carousel featuring stylish dark-mode apparel mockups (shirts and trousers) with dynamic CSS motion, gradient overlays, floating product tag badges, and smooth auto-play controls.

- Flash Deals & Category Drops: Animated grid sections displaying featured apparel collections, trending items, and pre-designed graphic tees with quick-add animations.

- Interactive Engagement Modal: Delayed floating popup (15s trigger) inviting users to connect on social media (Instagram, TikTok, Facebook) with a sleek dark-gold design, close button, and direct follow button.

### 3. Live Interactive Apparel Customizer Studio (T-Shirts & Trousers)

Full-screen on-canvas apparel studio supporting direct mouse/touch interaction:

- Base Garment Switcher: Toggle between T-Shirt and Trouser templates with instant vector/SVG color customization (Onyx Black, Heather Grey, Navy Blue, Crimson Red, Olive Green, Pure White).

- Logo & Asset Tool: Preset logo carousel + custom image drag-and-drop uploader (`.png`, `.jpg`, `.svg`).

- Canvas Direct Controls:

  - Drag Placement: Move logo/text anywhere on the garment canvas with full mouse drag tracking.

  - Resize Box: Interactive corner handles to scale logo dimensions with real-time feedback.

  - Rotation Handle: Top rotational handle to adjust element angle via mouse interaction.

  - Controls Overlay: Floating toolbar showing scale %, rotation degrees, and delete/duplicate icons.

  - Front/Back View Flip: Instant switch between front and back print positions.

### 4. Shop Page (E-Commerce Product Grid)

- Product Cards: Professional, fully functional e-commerce cards for all shirts and trousers.

- Card Actions & Logic:

  - Hover zoom with secondary preview image toggle.

  - Animated Wishlist heart button.

  - "Customize This Item" button (routes item details into the Customizer Studio).

  - "Quick Add to Cart" button with instant state update and toast notification.

  - Dynamic size selector (S, M, L, XL, XXL) and quantity stepper.

### 5. Interactive Pages

- Contact Page: Fully animated, modern layout including a reactive contact form (Name, Email, Subject, Message), direct social channels, operational hours, interactive location card, and instant submit success feedback.

- About Page: Persuasive brand narrative with high-resolution imagery grids, craftsmanship highlights, customer trust badges, and showcase photos of custom production runs.

### 6. Order Tracking, Data Architecture & WhatsApp Integration

- State Architecture (Infinite Nested Array Store):

  - Maintain a persistent global state storing all completed order objects within a nested data structure: `orders = [{ orderId, timestamp, customer: { name, phone, address, city }, items: [{ id, name, type, size, color, logoPreviewUrl, placement, price }], summary: { subtotal, shipping, total }, status: "Processing" }]`.

- Checkout & Order Confirmation Flow:

  - Upon order submission, auto-generate a unique 10-digit Tracking ID (e.g., `TC-892410-PK`).

  - Append the full order payload into the nested orders state array.

  - Display an Order Confirmation Modal displaying the exact Tracking ID, summary receipt, visual customizer thumbnail, and delivery details.

- WhatsApp Order Dispatcher:

  - Automatically format a clean URL-encoded WhatsApp text payload containing the Tracking ID, item names, sizes, custom logo details, delivery address, and total price.

  - Provide a primary button: "Send Order Details to WhatsApp" (`https://wa.me/YOUR_PHONE_NUMBER?text=...`) to immediately push order confirmation to the store manager.

- Track Order Page:

  - Search input for users to enter their Tracking ID.

  - Matches ID against the nested orders array and renders a real-time visual progress timeline (Order Placed ➔ Processing ➔ Custom Printing ➔ Dispatched ➔ Delivered) along with full item breakdown.

### 7. Tech Stack & Styling

- UI Library: Tailwind CSS, Lucide React icons, Radix UI / Shadcn UI components.

- Motion: Framer Motion for page transitions, interactive canvas manipulation, and slide-over panels.
brand name: rushwear  and atached lpic is logo of this brand make sure logo is round not squre or rectange

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://threadify-custom.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0b7e14fb-7f20-4e3d-afc8-aa1bfd843967).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
