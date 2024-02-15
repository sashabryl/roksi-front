import { ProfileLogic } from "../../pageComponents/ProfileLogic/ProfileLogic";

export const History = () => {
  return (
    <div className="history">
      <ProfileLogic profile={false} />
    </div>
  );
}