import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/Button';
import Field from '../components/Field';
import { useUser } from '../context/UserContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODES = [
  { id: 'signin', label: 'Sign in' },
  { id: 'signup', label: 'Create account' },
];

const EMPTY_FORM = { name: '', email: '', password: '', confirm: '' };

export default function LoginPage() {
  const { user, signIn } = useUser();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Already signed in — straight to the dashboard.
  if (user) {
    return <Navigate to="/account" replace />;
  }

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (mode === 'signup' && !form.name.trim()) {
      nextErrors.name = 'Full name is required.';
    }
    if (!EMAIL_RE.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    if (mode === 'signup' && form.confirm !== form.password) {
      nextErrors.confirm = 'Passwords do not match.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      signIn({ name: form.name, email: form.email });
    }
  };

  return (
    <main className="container section">
      <div className="auth">
        <div className="section__head">
          <span className="eyebrow">Account</span>
          <h1 className="section__title">
            {mode === 'signin' ? 'Welcome back' : 'Join Otium'}
          </h1>
          <p className="section__sub">
            Mock sign-in for this demo — any email and password will do.
            Nothing is stored or sent anywhere.
          </p>
        </div>

        <div className="shop-tabs">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`shop-tab${mode === m.id ? ' shop-tab--active' : ''}`}
              aria-pressed={mode === m.id}
              onClick={() => switchMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <article className="card">
          <div className="card__body">
            <form className="form" onSubmit={handleSubmit} noValidate>
              {mode === 'signup' && (
                <Field
                  id="name"
                  label="Full name"
                  autoComplete="name"
                  value={form.name}
                  onChange={setField('name')}
                  error={errors.name}
                />
              )}
              <Field
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={setField('email')}
                error={errors.email}
              />
              <Field
                id="password"
                label="Password"
                type="password"
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                value={form.password}
                onChange={setField('password')}
                error={errors.password}
              />
              {mode === 'signup' && (
                <Field
                  id="confirm"
                  label="Confirm password"
                  type="password"
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={setField('confirm')}
                  error={errors.confirm}
                />
              )}
              <div className="form__actions">
                <Button type="submit" block>
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                </Button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </main>
  );
}
