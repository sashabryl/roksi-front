import { NavLink } from "react-router-dom";

import "./RegistrationLogic.scss";
import { SignUpLogic } from "../SignUpLogic/SignUpLogic";
import { useEffect, useState } from "react";
import { LogInLogic } from "../LogInLogic/LogInLogic";

type Props = {
  logIn: boolean;
}

export const RegistrationLogic:React.FC<Props> = ({logIn}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const shouldShow = screenWidth <= 780;

  return (
    <div className="registration">
      <div className="registration__top">
        <NavLink
          to="/"
          className="logo"
        />
      </div>

      <div className="registration__mainContainer">
        {logIn 
        ?(<LogInLogic />)
        :(<SignUpLogic />)
      }
        {!shouldShow &&(<img  alt="img" className="registration__img"/>)}
      </div>
    </div>
  );
}