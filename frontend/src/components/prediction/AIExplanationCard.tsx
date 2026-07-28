import "./AIExplanationCard.css";

interface AIExplanationCardProps {
  explanations: string[];
}

const AIExplanationCard = ({
  explanations,
}: AIExplanationCardProps) => {
  return (
    <div className="ai-explanation-card">
      <h3>🧠 AI Explanation</h3>

      <ul>
        {explanations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIExplanationCard;