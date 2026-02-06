# Specification

## Summary
**Goal:** Add a basic checkout flow that lets users submit customer/shipping details, place an order via the backend, and see an order confirmation.

**Planned changes:**
- Update the Cart page to show an enabled “Proceed to Checkout” button when the cart has items, and navigate to Checkout without a full page reload.
- Add a Checkout view with an English-labeled form (Full name, Email, Address line, City, Postal/ZIP code), required-field validation, and a cart-consistent order summary (line items + subtotal), plus a “Back to cart” action.
- Add backend order creation in `backend/main.mo` with an order model (id, timestamp, buyer principal, captured customer fields, ordered items) and persisted canister-state storage that returns a unique order id.
- Connect Checkout to the backend create-order API, show loading state, handle backend errors with clear English messages and retry without losing typed inputs, and prevent duplicate submissions.
- Add an Order Confirmation view that displays an English confirmation heading, the order id, and an items/subtotal summary; clear the frontend cart and update header count to 0; include a “Continue shopping” action back to the product list.
- Handle edge cases such as reaching Checkout with an empty cart by showing an English message and providing navigation back to products or cart.

**User-visible outcome:** Users can proceed from the cart to a checkout page, enter shipping details, place an order, then see a confirmation screen with an order id; the cart clears after success and errors/empty-cart cases are handled with clear messages.
