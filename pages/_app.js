import "../styles/global.css";
import { wrapper } from "../state/store";

function EstateAppp({ Component, pageProps }) {
  return ( 
      <Component {...pageProps} />
  );
}
// export default EstateAppp; 
export default wrapper.withRedux(EstateAppp); 
