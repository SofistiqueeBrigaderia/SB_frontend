import './style.css';

export default function SectionTitle({ title, margin }) {
  return (
    <h2
      style={
        margin
          ? {
              marginLeft: '35px',
              marginRight: '35px',
            }
          : {
              margin: '0 0 21px 0',
            }
      }
      className="sectionTitle"
    >
      {title}
    </h2>
  );
}
