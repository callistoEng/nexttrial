import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { activateAccount } from "../state/actionCreators/auth";
import { SpinOne } from "./Spinner";
import { TrackpageView } from "../GAnalytics";
const Activate = () => {
  const { uid, token } = useParams();
  const isActivated = useSelector((state) => state.auth.isActivated);
  const activating = useSelector((state) => state.auth.activating);
  const dispatch = useDispatch();
  const accountActivation = () => {
    dispatch(activateAccount(uid, token));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    TrackpageView(`/activate/${uid}/${token}`);
  }, [uid, token,dispatch]);
  if (isActivated) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <section className="w-full h-96 flex content-center justify-center items-center">
      <div className="w-9/12 mx-auto my-7 shadow-md p-5">
        <h4 className="font-bold text-xl mb-5">Activate Your Account</h4>
        {activating ? (
          <SpinOne />
        ) : (
          <button
            className="px-5 py-2 bg-cloud-theme-blue text-white rounded-md"
            disabled={activating}
            onClick={accountActivation}
          >
            Click to Activate
          </button>
        )}
      </div>
    </section>
  );
};
export default Activate;
