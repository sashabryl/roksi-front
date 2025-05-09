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
            ?('Get a premium painting as a decoration for your interior or a gift for someone')
            :('Отримайте картину преміум-класу як прикрасу інтер\'єру або подарунок комусь')
          }
        </h2>

        <p className="author__girl"/>
        <h3 className="author__text3">
          {languageReducer.language 
            ?('Roksolana Hrydzhuk')
            :('Роксолана Гриджук')
          }
        </h3>

        <h2 className="author__text4">
          <p className="author__text4--p">
            {languageReducer.language 
              ? ('My name is Roksolana, and I am a Ukrainian artist working at the intersection of traditional decorative arts and contemporary art.')
              : ('Вітаю! Мене звати Роксолана, українська художниця, яка працює на стику традиційного декоративно-прикладного та сучасного мистецтва.')
            }
            <br />
            {languageReducer.language 
              ? ('My passion for glass painting and painting has turned into a lifelong pursuit, and each object I create is not just an item but a story that finds its owner.')
              : ('Моє захоплення розписом скла, та живописом перетворилося на справу життя, а кожен створений мною об’єкт — це не просто річ, а історія, яка знаходить свого власника.')
            }
            <br />
            {languageReducer.language 
              ? ('In 2017, I founded the Roksiart brand, starting with glass painting and the creation of unique, handcrafted pieces. Since then:')
              : ('У 2017 році заснувала бренд Roksiart, розпочавши з розпису скла та створення унікальних авторських виробів. З того часу:')
            }
          </p>

          <ul className="author__text4 author__text4--ul">
            <li className="author__text4--li">
              {languageReducer.language 
                ? ('I have collaborated with art galleries and craft shops in Ternopil and Lviv (2018).')
                : ('Співпрацювала із мистецькими галереями та арткрамницями у Тернополі та Львові (2018).')
              }
            </li>
            <li className="author__text4--li">
              {languageReducer.language 
                ? ('I began conducting art workshops for anyone interested (2019).')
                : ('Розпочала проводити навчальні мистецькі майстер-класи для всіх охочих (2019).')
              }
            </li>
            <li className="author__text4--li">
              {languageReducer.language 
                ? ('I participated in the painting of an iconostasis for a church in Ternopil (2022).')
                : ('Брала участь у розписі іконостасу для церкви в Тернополі (2022).')
              }
            </li>
            <li className="author__text4--li">
              {languageReducer.language 
                ? ('I worked on the restoration of museum exhibits in Italy, including the restoration of papal headwear and the arrangement of museum displays (Studio Immobiliare Gielle di Piscopo Giuliana, Savona, 2022).')
                : ('Займалась реставрацією музейних експонатів в Італії, зокрема відновленням головних уборів Папи Римського та оформленням музейних вітрин (Studio Immobiliare Gielle di Piscopo Giuliana, Савона, 2022).')
              }
            </li>
            <li className="author__text4--li">
              {languageReducer.language 
                ? ('I took part in the international art project Creat North "WARM" (Newcastle, UK, 2024).')
                : ('Взяла участь у міжнародному мистецькому проєкті Creat North «WARM» (Ньюкасл, Велика Британія, 2024).')
              }
            </li>
            <li className="author__text4--li">
              {languageReducer.language 
                ? ('I completed the online course "Crafts as a Form of Resilience" (Culture Hub Croatia & Materahub, Italy, 2024).')
                : ('Пройшла онлайн-курс "Crafts as a Form of Resilience" (Culture Hub Croatia & Materahub, Італія, 2024).')
              }
            </li>
          </ul>

          <p className="author__text4--p">
            {languageReducer.language 
              ? ('Over the years, I have created more than 300 original vases, which have found homes in over 15 countries worldwide. In my art, I combine aesthetics, symbolism, and depth. My work is not just about objects—it is about the stories embedded in every detail.')
              : ('За роки творчої діяльності я створила понад 300 авторських ваз, які знайшли свій дім у більш ніж 15 країнах світу. У своїй творчості я поєдную естетику, символіку та глибину. Моє мистецтво – це не просто предмети, а історії, вкладені в кожну деталь.')
            }
          </p>
        </h2>

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
            ?('If you are interested in any of my paintings or want a custom one, send me an instagram or email and we can work it out')
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