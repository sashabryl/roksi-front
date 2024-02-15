import { RegistrationLogic } from "../../pageComponents/RegistrationLogic/RegistrationLogic";

export const SingUp = () => {
  return (
    <div className="singUp">
      <RegistrationLogic logIn={false}/>
    </div>
  );
}