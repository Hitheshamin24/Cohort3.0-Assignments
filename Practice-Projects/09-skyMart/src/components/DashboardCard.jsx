import DashboardHero from "../components/DashboardHero";
import DashboardStats from "../components/DashboardStats";

const DashboardCard = () => {
  return (
    <div className="py-5">
      <DashboardHero />
      <DashboardStats />
    </div>
  );
};

export default DashboardCard;