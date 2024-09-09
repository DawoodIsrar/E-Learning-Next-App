import "./style.scss";

const Redirect = () => {
  return (
    <div className="redirect">
      <section className="container">
        <div className="tittle">
          <h2>Redirecting...</h2>
        </div>
        <div className="subtitle">
          <h3>Please wait while we redirect your requested page</h3>
        </div>
        <div className="square-container">
          <div className="square square1">&nbsp;</div>
          <div className="square square2">&nbsp;</div>
          <div className="square square3">&nbsp;</div>
          <div className="square square4">&nbsp;</div>
          <div className="square square5">&nbsp;</div>
        </div>
      </section>
    </div>
  );
};

export default Redirect;
