import dashboard from "@/assets/karya-dashboard.webp";
import attendance from "@/assets/karya-attendance.webp";
import reimbursements from "@/assets/karya-reimbursements.png.asset.json";
import people from "@/assets/karya-people.webp";
import leave from "@/assets/karya-leave.webp";
import profile from "@/assets/karya-profile.webp";

const screenshots = {
  dashboard,
  attendance,
  reimbursements: reimbursements.url,
  people,
  leave,
  profile,
};
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
    leave: "Karya leave tracker with leave requests, types and approval status",
    profile: "Karya employee profile with job, personal, identity, bank and statutory details",
  }[kind];
  return (
    <div className={card ? `product-card-visual product-card-${kind}` : `product-screen product-screen-${kind}`}>
      <img src={screenshots[kind]} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}