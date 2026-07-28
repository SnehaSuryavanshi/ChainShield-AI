import "./RecommendationCard.css";

interface RecommendationCardProps {
  title: string;
  description: string;
}

const RecommendationCard = ({
  title,
  description,
}: RecommendationCardProps) => {
  return (
    <div className="recommendation-card">
      <div className="recommendation-icon">💡</div>

      <div className="recommendation-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;