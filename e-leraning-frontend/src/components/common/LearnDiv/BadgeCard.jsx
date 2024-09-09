const BadgeCard = ({ card }) => {
  const { Icon } = card;
  return (
    <div className="card">
      <Icon className="card-image" width="48" height="48" />
      <h3 className="card-name"> {card?.title}</h3>
    </div>
  );
};

export default BadgeCard;
