import "./style.scss";

const CardSkeleton = () => {
  return (
    <div className="container">
      <div className="skeleton-card">
        <div className="skeleton-card-img skeleton"></div>
        <h2 className="skeleton-card-title skeleton"></h2>
      </div>
    </div>
  );
};

export default CardSkeleton;
