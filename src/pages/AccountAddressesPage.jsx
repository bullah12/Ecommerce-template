import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import Button from '../components/Button';
import Field from '../components/Field';
import { useUser } from '../context/UserContext';

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Ireland',
  'France',
  'Germany',
  'Netherlands',
  'Japan',
];

const EMPTY_FORM = {
  label: '',
  name: '',
  address1: '',
  city: '',
  postal: '',
  country: 'United States',
};

export default function AccountAddressesPage() {
  const { user, addresses, addAddress, removeAddress } = useUser();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Full name is required.';
    if (!form.address1.trim())
      nextErrors.address1 = 'Street address is required.';
    if (!form.city.trim()) nextErrors.city = 'City is required.';
    if (!form.postal.trim()) nextErrors.postal = 'Postal code is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      addAddress({ ...form, label: form.label.trim() || 'Address' });
      setForm(EMPTY_FORM);
    }
  };

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Account</span>
        <h1 className="section__title">Saved addresses</h1>
        <p className="section__sub">
          Kept for this session only — saved addresses prefill the checkout
          form.
        </p>
      </div>

      <AccountNav />

      <div className="account-grid">
        {addresses.map((address) => (
          <article className="card" key={address.id}>
            <div className="card__body">
              <div className="order-head">
                <h2 className="card__title">{address.label}</h2>
                {address.isDefault && <span className="tag">Default</span>}
              </div>
              <p className="text-soft">
                {address.name}
                <br />
                {address.address1}
                <br />
                {address.city} {address.postal}, {address.country}
              </p>
              {!address.isDefault && (
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => removeAddress(address.id)}
                >
                  Remove
                </button>
              )}
            </div>
          </article>
        ))}

        <article className="card">
          <div className="card__body">
            <span className="eyebrow">Add an address</span>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <Field
                id="addr-label"
                label="Label (optional)"
                placeholder="Home, studio, the cabin…"
                value={form.label}
                onChange={setField('label')}
              />
              <Field
                id="addr-name"
                label="Full name"
                autoComplete="name"
                value={form.name}
                onChange={setField('name')}
                error={errors.name}
              />
              <Field
                id="addr-address1"
                label="Street address"
                autoComplete="street-address"
                value={form.address1}
                onChange={setField('address1')}
                error={errors.address1}
              />
              <div className="form__row">
                <Field
                  id="addr-city"
                  label="City"
                  value={form.city}
                  onChange={setField('city')}
                  error={errors.city}
                />
                <Field
                  id="addr-postal"
                  label="Postal code"
                  value={form.postal}
                  onChange={setField('postal')}
                  error={errors.postal}
                />
              </div>
              <Field
                select
                id="addr-country"
                label="Country"
                value={form.country}
                onChange={setField('country')}
              >
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Field>
              <div className="form__actions">
                <Button type="submit" variant="secondary">
                  Save address
                </Button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </main>
  );
}
