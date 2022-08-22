import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <footer>
          <div className="footer">
             <div>
              <a className='rs-link' href='https://rs.school/js/'>
                <img src={'https://rs.school/images/rs_school_js.svg'} width='70px'></img>
              </a>
             </div>
             <div className="center-block">
              <a className="footer-link" href='https://github.com/OksanaFedotova'>Оксана</a>
              <a className="footer-link" href='https://github.com/sashajozwiak'>Александр</a>
              <a className="footer-link" href='https://github.com/daryadak'>Дарья</a>
             </div>
             <div>
              <p>2022</p>
             </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer;
