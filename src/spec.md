# Specification

## Summary
**Goal:** Persist orders in the Motoko backend and wire checkout + Order History to use backend order APIs so orders remain available after refresh/navigation.

**Planned changes:**
- Add typed order persistence APIs in `backend/main.mo` to create an order, list orders for Order History, and fetch a single order by `orderId`, with predictable validation errors and stable-state persistence.
- Update `CheckoutView.tsx` to place real orders via the backend (remove mock order id + simulated delay), sending items, customer/shipping details, and the selected payment method; navigate to Order Confirmation using the returned `orderId`, and show clear English errors on failure without clearing the form.
- Update Order History to fetch orders from the backend as the source of truth (using the existing React Query approach), while keeping the current empty state and display behavior.
- Update frontend typing (e.g., `frontend/src/lib/orders.ts`) so backend order methods are called without unsafe casts like `(actor as any)`, and keep all user-facing text in English.

**User-visible outcome:** Users can place an order at checkout, then see it in Order History even after refreshing the page, and open Order Details via the real backend `orderId`.
