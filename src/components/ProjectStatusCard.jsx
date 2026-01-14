// ProjectStatusCard 
export const ProjectStatusCard = ({ title, value, icon: Icon, gradient, iconColor }) => {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className={`w-12 h-12 ${iconColor}`} style={{ fontSize: 48 }} />
      </div>
    </div>
  );
};

