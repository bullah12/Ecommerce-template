const FAQS = [
  {
    id: 'shipping-time',
    question: 'How long does shipping take?',
    answer:
      'Every order leaves our Hudson Valley studio within 3–5 business days — most pieces are finished, checked, and wrapped by hand before they go out. Domestic delivery takes another 2–4 days from there. You will get a tracking link the moment your parcel is on its way.',
  },
  {
    id: 'shipping-cost',
    question: 'What does shipping cost?',
    answer:
      'Shipping is a flat $12 in the United States and free on orders over $150. International rates are calculated at checkout and typically run $18–30 depending on destination and weight.',
  },
  {
    id: 'international',
    question: 'Do you ship internationally?',
    answer:
      'Yes — we currently ship to Canada, the United Kingdom, Ireland, France, Germany, the Netherlands, and Japan. Duties and import taxes are not included and are collected by your local carrier on delivery.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer:
      'You have 30 days from delivery to return anything, no questions asked. Pieces should come back unused and in their original packaging. Start a return from your account page or write to us, and we will email a prepaid label. Refunds land within 5 business days of the piece reaching us.',
  },
  {
    id: 'exchanges',
    question: 'Can I exchange an item instead?',
    answer:
      'Of course. The fastest route is to return the original for a refund and place a new order, but if you would rather swap directly — a robe size, a different glaze — reply to your order confirmation and we will arrange it.',
  },
  {
    id: 'stoneware-care',
    question: 'How do I care for the stoneware?',
    answer:
      'Our stoneware is dishwasher safe, though hand washing keeps the matte glaze at its best. Avoid sudden temperature shocks — do not take a carafe from the refrigerator straight to a hot burner. Minor variation in glaze and weight is the nature of hand-thrown work, not a flaw.',
  },
  {
    id: 'brass-patina',
    question: 'The brass is darkening — is that normal?',
    answer:
      'Yes, and it is the point. Uncoated brass develops a soft patina with handling, a record of use we think is worth keeping. If you prefer the bright finish, a soft cloth and a dab of brass polish will bring it back in under a minute.',
  },
  {
    id: 'linen-washing',
    question: 'How should I wash the linen pieces?',
    answer:
      'Machine wash cold on gentle with mild detergent, then line dry or tumble low. Skip the bleach and fabric softener — linen softens beautifully on its own with every wash. Expect a little relaxed wrinkling; it is meant to be lived in, not pressed.',
  },
  {
    id: 'gift-orders',
    question: 'Can you send an order as a gift?',
    answer:
      'Every order already ships in plain, recyclable packaging with no prices inside. Leave a note at checkout and we will include it, handwritten, at no charge. Boxed gift sets from the Gifts collection arrive ready to hand over.',
  },
  {
    id: 'order-changes',
    question: 'Can I change or cancel an order after placing it?',
    answer:
      'If your order has not shipped yet — usually within the first 24 hours — we can change the address, swap an item, or cancel entirely. Reply to your confirmation email or use the contact page and we will catch it before it leaves.',
  },
];

export default function FaqPage() {
  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Help</span>
        <h1 className="section__title">Frequently asked questions</h1>
        <p className="section__sub">
          Shipping, returns, and how to keep each piece at its best. If your
          question is not here, the contact page reaches a real person.
        </p>
      </div>
      <div className="faq-list">
        {FAQS.map((faq) => (
          <details className="faq-item" key={faq.id}>
            <summary className="faq-item__summary">{faq.question}</summary>
            <p className="faq-item__body">{faq.answer}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
