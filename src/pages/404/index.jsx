import './style.css'

export default function PageNotFound() {
  document.title = 'ไม่พบหน้านี้ | Shioru'

  return (
    <section className="page-not-found">
      <div className="page-not-found-center">
        <div className="container">
          <div className="page-not-found-code">
            <span className="page-not-found-status">404</span>
            <br />
            <small className="page-not-found-detail">PAGE_NOT_FOUND</small>
          </div>
          <br />
          <div className="page-not-found-description">
            <h4>
              เอ๋...ฉันลองหาดูหน้าที่ใกล้เคียงดูแล้วนะ แต่ไม่มีเลยอะ
              <br />
              คุณอาจจะกำลังหลงทางอยู่ก็ได้นะ
            </h4>
            <div className="page-not-found-link d-grid gap-2 d-md-block">
              <a className="page-not-found-btn btn btn-primary mx-1" href="/">กลับไปยังหน้าหลัก</a>
              <a className="page-not-found-btn btn btn-outline-primary mx-1" href="https://stats.uptimerobot.com/gXGx1iqxop" target="_blank" rel="noreferrer">ตรวจสอบสถานะ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
