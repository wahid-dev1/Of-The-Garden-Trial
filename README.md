# Of The Garden Trial

A small Next.js app that demonstrates a simple ordering flow:

- Product list
- Product details
- Add to cart (client-side, persisted)
- Checkout (creates an order)
- Order confirmation page

## Tech

- Next.js (App Router)
- Tailwind CSS
- Prisma + SQLite (local persistence)
- Zod (request validation)

## Setup

Requirements:
- Node.js 18+

```bash
npm install
copy .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Then open `http://localhost:3000`.

## App routes

- `/products` — list products
- `/products/:id` — product details
- `/cart` — cart page
- `/checkout` — checkout form
- `/orders/:id` — confirmation page

## API endpoints

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/:id`

### Create order payload

```json
{
  "customer": "Jane Doe",
  "email": "jane@example.com",
  "address1": "123 Main St",
  "address2": "",
  "city": "Austin",
  "country": "United States",
  "postalCode": "78701",
  "items": [{ "productId": "classic-white-tee", "quantity": 2 }]
}
```

Notes:
- Totals are calculated server-side from the products table.
- Invalid payloads return `400` with validation details.

## Folder structure (high level)

- `app/` — pages + API route handlers
- `components/` — UI components
- `lib/cart/` — cart store + persistence
- `lib/domain/` — shared types/schemas
- `lib/server/` — server-side services
- `prisma/` — schema, migrations, seed

## Manual test plan

- Open `/products`, click a product
- Click “Add to cart”
- Go to `/cart`, change quantity, remove an item
- Go to `/checkout`, fill the form, submit
- Confirm you land on `/orders/:id` and see items + total
- Refresh the cart page to confirm persistence works (before checkout)

