import RoundedFrame from 'components/RoundedFrame';
import './style.css';
import 'aos';

export default function RoundedCard(props) {
  return (
    <div
      className="roundedCard"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1300"
    >
      <RoundedFrame src={props.img} alt={props.description} />
      <p>{props.title}</p>
    </div>
  );
}
