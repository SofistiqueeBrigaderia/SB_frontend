import RoundedFrame from "components/RoundedFrame";
import "./style.css";
import "aos";

export default function RoundedCard(props) {
  return (
    <div className="roundedCard">
      <RoundedFrame src={props.img} alt={props.description} />
      <p>{props.title}</p>
    </div>
  );
}
