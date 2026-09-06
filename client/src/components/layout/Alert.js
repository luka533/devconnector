import { useSelector } from "react-redux";

function Alert() {
  const alerts = useSelector((state) => state.alert);

  console.log(alerts);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        {alert.msg}
      </div>
    ))
  );
}

export default Alert;
