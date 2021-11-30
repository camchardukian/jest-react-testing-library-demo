import { ERROR_MESSAGE } from "../../utils/constants";

const AlertBanner = ({
  message = ERROR_MESSAGE.UNEXPECTED_ERROR,
  variant = "danger",
}) => {
  return (
    <div role="alert" className={`${variant}-alert`}>
      {message}
    </div>
  );
};

export default AlertBanner;
