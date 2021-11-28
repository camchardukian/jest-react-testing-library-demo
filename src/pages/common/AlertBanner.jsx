import { UNEXPECTED_ERROR } from "../../utils/constants";

const AlertBanner = ({ message = UNEXPECTED_ERROR, variant = "danger" }) => {
  return (
    <div role="alert" className={`${variant}-alert`}>
      {message}
    </div>
  );
};

export default AlertBanner;
