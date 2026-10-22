import Reveal from "../components/Reveal.jsx";
import Img from "../components/Img.jsx";
import { IMG } from "../data.js";

const points = [
  "Sabhi major brands ke original products",
  "Sahi daam, GST bill aur warranty",
  "Mobile, TV aur laptop ki repair service",
  "Exchange offer aur no-cost EMI",
  "Experienced aur friendly staff",
];

const values = [
  ["🎯", "Hamara Mission", "Har ghar tak sahi daam par quality electronics pahunchana, bina kisi jhanjhat ke."],
  ["🚀", "Hamara Vision", "Narwana aur Jind region ka sabse bharosemand electronics brand banna."],
  ["🤝", "Hamari Values", "Imaandari, bharosa, transparant pricing aur customer ki full santushti."],
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>
            About <span className="grad">ElectroHub</span>
          </h1>
          <p>Narwana ki apni bharosemand electronics shop</p>
        </div>
      </section>

      <section className="section">
        <div className="container two">
          <Reveal x={-60} y={0}>
            <Img className="about-img" src={IMG.store} alt="ElectroHub store" />
          </Reveal>
          <Reveal x={60} y={0}>
            <span className="eyebrow">Hamari Kahani</span>
            <h2 className="title left">
              Hum <span className="grad">kaun hain?</span>
            </h2>
            <p className="text">
              ElectroHub, Narwana (Jind) ki ek bharosemand electronics shop hai. Hamara maqsad hai ki aapko latest
              electronics original quality aur sahi daam par mile.
            </p>
            <p className="text">
              Mobile aur TV se lekar laptop, audio aur accessories tak, sab kuch ek hi chhat ke neeche milta hai.
              Khareedne ke baad bhi hum aapke saath hain — repair, exchange aur support ke liye.
            </p>
            <ul className="ticks">
              {points.map((p) => (
                <li key={p}>
                  <span>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Hamari Soch</span>
              <h2 className="title">
                Mission · Vision · <span className="grad">Values</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid3">
            {values.map(([ico, title, text], i) => (
              <Reveal key={title} delay={i * 0.12}>
                <div className="mvv">
                  <div className="mvv-ico">{ico}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
