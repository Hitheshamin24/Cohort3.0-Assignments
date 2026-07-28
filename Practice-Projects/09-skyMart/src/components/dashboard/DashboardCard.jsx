import DashboardHero from "./DashboardHero";
import DashboardStats from "./DashboardStats";

const DashboardCard = () => {
  return (
    <div className="py-5">
      <DashboardHero />
      <DashboardStats />
    </div>
  );
};

export default DashboardCard;