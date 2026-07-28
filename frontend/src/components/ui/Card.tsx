import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`cs-card ${className}`}>
      {children}
    </div>
  );
};

export default Card;