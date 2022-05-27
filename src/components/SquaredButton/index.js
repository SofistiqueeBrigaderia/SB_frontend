import './style.css';

export default function SquaredButton({ title, type, onClick, customClass }) {
  return (
    <button type={type} className={`buttonContainer ${customClass}`} onClick={onClick}>
      {title}
    </button>
  );
}
