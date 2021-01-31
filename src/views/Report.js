// import 'tailwindcss/tailwind.css';
import MoodCard from '../components/MoodCard';

export default function Report() {
  return (
    <div>
      <div className="daily-stats">
        <div className="daily-stats-card">...</div>
        <div className="daily-stats-card">
          <MoodCard />
        </div>
      </div>
    </div>
  );
}
