import { Link } from 'react-router-dom';

const VALUES = [
  {
    id: 'small-batches',
    title: 'Small batches, on purpose',
    body: 'We make a few hundred of a thing, not a few hundred thousand. Small runs let us work with makers who fire, sew, and finish by hand — and let us stop making anything that stops earning its place.',
  },
  {
    id: 'materials',
    title: 'Materials that age well',
    body: 'Stoneware, solid brass, European flax, unscented soy wax. Nothing plated, nothing veneered. Every material in the catalog is chosen to look better in year five than it did in the box.',
  },
  {
    id: 'no-hurry',
    title: 'Shipped without hurry',
    body: 'Orders leave within a few days in plain, recyclable packaging, checked by the same hands that made them. We would rather be a day slower and right than same-day and careless.',
  },
];

export default function AboutPage() {
  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Our story</span>
        <h1 className="section__title">
          Otium is the Latin word for unhurried time.
        </h1>
      </div>

      <div className="account-stack">
        <div className="prose">
          <p>
            The Romans had a word for the hours that belonged to you — not to
            work, not to obligation, just to you. Reading, a long meal, a walk
            with no destination. They called it otium, and they considered it
            the point of everything else.
          </p>
          <p>
            We started this company in 2021, in a drafty studio in the Hudson
            Valley, after too many years of days that had no such hours in
            them. The first product was the stoneware pour-over set — thrown by
            a potter friend, glazed the color of oats, built for a slow first
            cup. We made forty. They sold to neighbors and then to strangers,
            and the strangers wrote to us about their mornings.
          </p>
          <p>
            That is still the whole idea. Otium makes objects for the three
            quietest parts of the day: the first coffee, the deep afternoon,
            and the last light before sleep. Nothing we sell beeps, glows, or
            asks for a password. Each piece is made in a small batch by people
            we know by name, in stoneware, brass, linen, and wax — materials
            that wear in, not out.
          </p>
          <h2>What we hold ourselves to</h2>
        </div>

        <div className="account-grid">
          {VALUES.map((value) => (
            <div className="card" key={value.id}>
              <div className="card__body">
                <h3 className="card__title">{value.title}</h3>
                <p className="text-soft">{value.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose">
          <p>
            We are a team of six, plus the potters, sewers, and chandlers who
            make the work. If something arrives and it is not right, we fix it
            — 30 days, no questions. And if you just want to talk about the
            products, or about doing less, we read every message.
          </p>
          <div className="form__actions">
            <Link to="/shop" className="btn btn--primary">
              Shop the collection
            </Link>
            <Link to="/contact" className="btn btn--secondary">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
