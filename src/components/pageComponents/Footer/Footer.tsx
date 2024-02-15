import "./Footer.scss"

export const Footer = () => {
  return (
  <div className="footer" id="footer">
    <div className="footer__top">
      <h3 className="footer__text">
        RiksiArt
      </h3>
      <a 
        href="https://www.instagram.com/roksi__art?igsh=MWQ4NTRnY21tNXN5Nw==" 
        className="footer__insta" 
        target="_blank"
      />
    </div>

      <div className="footer__made">
        Made by romanlapicak@gmail.com
      </div>
  </div>
  );
}