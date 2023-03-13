import { Link } from "react-router-dom";
import { ErrorMessage } from "../styles/StockDetail.style";

function Error() {
  return (
    <ErrorMessage>
      <Link to={"/"}>
        <p>{`<- 잘못된 접근입니다.`}</p>
      </Link>
    </ErrorMessage>
  );
}

export default Error;
