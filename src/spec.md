# Specification

## Summary
**Goal:** Expand the seeded home catalog with additional apparel products that behave like existing items.

**Planned changes:**
- Add new seeded `Product` entries in `frontend/src/data/products.ts` for: Jacket, Half Pant, Full Pant, and Football T-Shirt (each with unique `id`, `price`, English `description`, and a non-empty `images` array).
- Ensure the home page product grid renders the added products without layout issues and supports opening their product details view.
- Ensure the added products can be added to the cart from both the product list and product details views, updating the header cart count.

**User-visible outcome:** Users see Jacket, Half Pant, Full Pant, and Football T-Shirt on the home product grid, can open each product’s details, and can add them to the cart like existing products.
