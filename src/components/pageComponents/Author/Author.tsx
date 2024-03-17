import { useAppSelector } from "../../../app/hooks";
import "./Author.scss";

export const Author = () => {
  const languageReducer = useAppSelector(state => state.language);
  return (
    <div className="author">
      <div className="author__top">
        <p className="author__quotes"/>
        <h1 className="author__text1">
          {languageReducer.language 
            ?('RoksiArt paints are awesome!')
            :('Малюнки RoksiArt - супер!')
          }
        </h1>

        <h2 className="author__text2">
          {languageReducer.language 
            ?('Get a premium painting as a decoration for your interior or gift someone')
            :('Отримайте картину преміум-класу як прикрасу інтер\'єру або подарунок комусь')
          }
        </h2>

        <p className="author__girl"/>
        <h3 className="author__text3">
          {languageReducer.language 
            ?('Roksolana Hrydzuk')
            :('Роксолана Гриджук')
          }
        </h3>
      </div>

      <div className="author__container">
        <h1 className="author__container--header">
          {languageReducer.language 
            ?('Let’s get in touch')
            :('Давайте зв\'яжемось')
          }
        </h1>

        <h2 className="author__text2">
          {languageReducer.language 
            ?('If you are interested in any of paintings or want a custom one, send me an instagram or email and we work it out')
            :('Якщо вас зацікавила будь-яка з картин або ви хочете зробити її на замовлення, надішліть мені Instagram або електронну пошту, і ми це розробимо')
          }
        </h2>

        <a href="https://www.instagram.com/roksi__art?igsh=MWQ4NTRnY21tNXN5Nw==" className="author__button author__button--yellow">
          {languageReducer.language 
            ?('Contact me in Instagram')
            :('Зв\'яжіться зі мною в Instagram')
          }
        </a>

        <a href="mailto:roksolanahrudshyk@gmail.com" className=" author__button author__button--white">
          {languageReducer.language 
            ?('Contact me in emil')
            :('Зв\'яжіться зі мною в emil')
          }
        </a>
      </div>
    </div>
  );
}