import dashboard from "@/assets/karya-dashboard.png.asset.json";
import attendance from "@/assets/karya-attendance.png.asset.json";
import reimbursements from "@/assets/karya-reimbursements.png.asset.json";
import people from "@/assets/karya-people.png.asset.json";
import leave from "@/assets/karya-leave.png.asset.json";

const screenshots = { dashboard, attendance, reimbursements, people, leave };
export type ScreenshotKind = keyof typeof screenshots;

export function ProductScreenshot({ kind, card = false, priority = false }: {
  kind: ScreenshotKind;
  card?: boolean;
  priority?: boolean;
}) {
  const alt = {
    dashboard: "Karya dashboard with updates, leave information and employee profile",
    attendance: "Karya attendance with check-in, monthly calendar and shift roster",
    reimbursements: "Karya reimbursement claims and their approval status",
    people: "Karya employee directory with departments, job titles and profile completion",
    leave: "Karya leave balances for casual, optional and sick leave",
  }[kind];
  return (
    <div className={card ? `product-card-visual product-card-${kind}` : `product-screen product-screen-${kind}`}>
      <img src={screenshots[kind].url} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}