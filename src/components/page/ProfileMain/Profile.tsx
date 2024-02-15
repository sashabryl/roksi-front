import { ProfileLogic } from "../../pageComponents/ProfileLogic/ProfileLogic";

export const ProfileMain = () => {
  return (
    <div className="profile">
      <ProfileLogic profile={true}/>
    </div>
  );
}