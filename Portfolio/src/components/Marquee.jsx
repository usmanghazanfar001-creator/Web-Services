const ITEMS = [
  'AI Engineer',
  'Growth Marketer',
  'Faisalabad, Pakistan',
  'Open to Work',
  'Automation Builder',
];

function Pass() {
  return (
    <div className="marquee-item">
      {ITEMS.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <Pass />
        <Pass />
      </div>
    </div>
  );
}
