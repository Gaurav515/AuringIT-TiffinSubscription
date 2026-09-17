# Tiffin Ledger

A small backend + frontend app for a tiffin (home lunch delivery) owner:
subscribe a customer, pause/resume their deliveries, and get a correctly
pro-rated bill at month end. Look customers up by phone, and see who's
active vs. paused at a glance.

```
tiffin-app/
├── backend/
│   ├── server.js         # Express app: mounts the API, serves the frontend
│   ├── billing.js        # All date + pro-rating math (the core logic)
│   ├── data.js            # Tiny JSON-file "database"
│   ├── data/customers.json
│   ├── routes/customers.js
│   └── package.json
└── frontend/
    ├── index.html
    ├── style.css
    └── app.js             # Calls the API with fetch(), renders the UI
```

## Run it

```bash
cd backend
npm install
npm start
```

Then open **http://localhost:4000** — the backend also serves the frontend,
so this one command runs the whole thing.

The app comes seeded with 3 sample customers so you can see it working
right away; delete them from the UI once you add your real ones.

## The billing rule

```
bill = (plan price ÷ weekdays in the month) × weekdays actually delivered
```

"Delivered" = weekdays in the month, from whichever is later of (their
subscription start date, the 1st of the month), through month end, **minus**
any weekdays that fall inside a logged pause. This means:

- A customer who joins mid-month is prorated from their start date.
- A paused range never changes the plan price — it only removes days from
  what they're billed for.
- Resuming closes an open-ended pause as of yesterday, so today counts as
  a delivered day again.

All of this logic lives in `backend/billing.js`, independent of the routes
and the UI, so it's easy to unit test or move to a different storage layer
later.

## API

All endpoints are under `/api`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/customers?search=&status=all\|active\|paused&year=&month=` | List customers, each annotated with `status` and a full `bill` breakdown for the given month (defaults to current month) |
| POST | `/customers` | Create a customer — `{ name, phone, planPrice, startDate }` |
| GET | `/customers/:id?year=&month=` | One customer with status + bill |
| PUT | `/customers/:id` | Update name/phone/planPrice/startDate |
| DELETE | `/customers/:id` | Remove a customer |
| POST | `/customers/:id/pause` | `{ start, end? }` — log a pause |
| POST | `/customers/:id/resume` | Close any open pause as of yesterday |
| DELETE | `/customers/:id/pauses/:index` | Remove a logged pause entirely |
| GET | `/summary?year=&month=` | `{ total, active, paused }` for the hero bar |

## Storage

Customers are stored in `backend/data/customers.json` — good enough for one
owner running this on one machine. If you need multiple staff members or
access from more than one device at once, swap `backend/data.js` for a real
database (SQLite or Postgres); nothing else needs to change, since
`billing.js` and the routes only depend on the shape of a customer object,
not on how it's stored.
