import { useState } from 'react';
import Button from '../components/Button';
import Field from '../components/Field';

const TOPICS = [
  'An order I placed',
  'Returns & exchanges',
  'Product care',
  'Wholesale & press',
  'Something else',
];

const EMPTY_FORM = {
  name: '',
  email: '',
  topic: TOPICS[0],
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Your name is required.';
  if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.message.trim()) errors.message = 'Tell us a little about it.';
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  // Mock submit: no backend in this phase, so we confirm locally.
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
    }
  };

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Contact</span>
        <h1 className="section__title">Write to a real person</h1>
        <p className="section__sub">
          Questions about an order, a material, or a gift — we read every
          message and answer within one business day.
        </p>
      </div>

      <div className="checkout-grid">
        {sent ? (
          <div className="card">
            <div className="card__body">
              <h2 className="card__title">Message sent</h2>
              <p className="text-soft" role="status">
                Thank you, {form.name.trim()}. We&rsquo;ve got it, and
                we&rsquo;ll reply to {form.email} within one business day —
                usually sooner.
              </p>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  setForm(EMPTY_FORM);
                  setSent(false);
                }}
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form__row">
              <Field
                id="contact-name"
                label="Name"
                autoComplete="name"
                value={form.name}
                onChange={setField('name')}
                error={errors.name}
              />
              <Field
                id="contact-email"
                label="Email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={setField('email')}
                error={errors.email}
              />
            </div>
            <Field
              id="contact-topic"
              label="Topic"
              select
              value={form.topic}
              onChange={setField('topic')}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Field>
            <Field
              id="contact-message"
              label="Message"
              textarea
              rows={6}
              value={form.message}
              onChange={setField('message')}
              error={errors.message}
            />
            <div className="form__actions">
              <Button type="submit">Send message</Button>
            </div>
          </form>
        )}

        <div className="contact-details">
          <div className="card">
            <div className="card__body">
              <h2 className="card__title">The studio</h2>
              <p className="text-soft">
                Otium Goods Co.
                <br />
                14 Mill Street
                <br />
                Beacon, NY 12508
              </p>
              <p className="text-soft">
                Open for pickup Thursday–Saturday, 10am–4pm.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card__body">
              <h2 className="card__title">Directly</h2>
              <p className="text-soft">
                <a className="footer__link" href="mailto:hello@otiumgoods.com">
                  hello@otiumgoods.com
                </a>
                <br />
                <a className="footer__link" href="tel:+18455550137">
                  (845) 555-0137
                </a>
              </p>
              <p className="text-soft">
                Phones are answered weekdays 9am–5pm Eastern. Email is always
                the fastest way to reach us about an order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
