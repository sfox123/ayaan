import React from "react";
import Header from "../header";
import { useDispatch, useSelector } from "react-redux";
import { handleVisible } from "../../store/actions/action";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  const visible = useSelector((state) => state.visibility.visible);

  const toggleTaxiBooking = () => {
    dispatch(handleVisible(visible));
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className}>
      <Header handleVisible={toggleTaxiBooking} hClass={props.hClass} />
    </div>
  );
}
