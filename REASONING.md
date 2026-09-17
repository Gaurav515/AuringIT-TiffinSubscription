# Reasoning

I kept the scope centered on the owner's daily actions: add a subscription, find a customer by phone, pause/resume, and see a bill. A single owner account owns its customers, so authentication and data separation stay simple.

The customer schema stores the monthly plan price, start date and dated pause intervals. An open interval represents a pause awaiting resume. Billing walks the weekdays of the requested month. This makes the denominator (all month weekdays) and numerator (eligible unpaused weekdays through today) clear, including mid-month starts and pauses across month boundaries. A resume date is the first served day, so the pause ends the previous day.

The UI uses one dashboard and a customer detail panel instead of a large navigation structure. Search, sorting and pagination are server-side so they also work with a growing customer list.

I tested the billing function with a full-month pause, a mid-month start, a current-month cutoff and status changes. I also ran the backend tests and frontend production build. The app treats unpaused weekdays as delivered because actual delivery confirmation was outside the brief; that assumption is shown next to the bill.
