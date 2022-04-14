import Waves from '../../components/Waves/index'

import './style.css'

export default function Footer() {
  return (
    <footer>
      <Waves class="footer-waves" r={250} g={250} b={255} />
      <div className="footer-content">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <a className="footer-brand" href="./">
                <img className="d-inline-block align-text-center" src="./favicon-96x96.png" alt="shioru icon" width="50" height="50" />
                Shioru
              </a>
              <br />
              <br />
              <p>
                ผู้ช่วยเซิร์ฟเวอร์ Discord ที่ดีที่สุดจะช่วยให้เซิร์ฟเวอร์ของคุณดูมีชีวิตชีวาและน่าอยู่มากยิ่งขึ้น
              </p>
              <span> หากมีข้อสงสัยใดๆ สามารถติดต่อได้ที่:</span>
              <br />
              <a href="mailto:dermhioasw123@gmail.com">dermhioasw123@gmail.com</a>
            </div>
            <div className="col-md-4 mb-3">
              <h3>ลิงค์อื่นๆ</h3>
              <br />
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">นโยบายความเป็นส่วนตัว</a>
                </li>
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">เงื่อนไขการให้บริการ</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>แหล่งข้อมูล</h3>
              <br />
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/projects?project=shioru" target="_blank" rel="noreferrer">โอเพ่นซอร์ส</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-law">
        <div className="container">
          <span><a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">นโยบายความเป็นส่วนตัว</a> • <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">เงื่อนไขการให้บริการ</a></span>
          <br />
          <span>&copy; 2565 Chaiwat Suwannarat. สงวนลิขสิทธิ์</span>
        </div>
      </div>
    </footer>
  )
}
