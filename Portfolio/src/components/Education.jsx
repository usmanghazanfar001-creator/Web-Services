import useFadeIn from '../hooks/useFadeIn';

const SUBJECTS = [
  'AI Fundamentals',
  'Mathematics for AI',
  'Computer Science Concepts',
  'Problem Solving Techniques',
  'Data Analysis',
  'Intelligent Systems',
];

export default function Education() {
  const ref = useFadeIn();

  return (
    <section id="education" className="section section-light">
      <div className="section-head">
        <div>
          <span className="eyebrow">Academic background</span>
          <h2 className="section-title">Education</h2>
        </div>
      </div>

      <div className="edu-card fade-in" ref={ref}>
        <div className="degree">Associate Degree in Artificial Intelligence</div>
        <div className="institution">Punjab Group of Colleges · Faisalabad</div>
        <div className="graduation">Expected Graduation: 2027</div>
        <div className="edu-subjects">
          {SUBJECTS.map((subject) => (
            <span className="edu-subject" key={subject}>
              {subject}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
