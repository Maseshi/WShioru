import './style.css'

export default function Invited() {
    document.title = 'ขอขอบคุณ | Shioru'

    return (
        <section className="invited">
            <div className="invited-center">
                <div className="container">
                    <span className="invited-header">ขอขอบคุณ!!</span>
                    <br />
                    <br />
                    <h4 className="invited-content">
                        เราจะพยายามพัฒนา Shioru ให้เก่งขึ้นอยู่ตลอดเวลา
                        <br />
                        ขอบคุณที่ร่วมสนุกกับเรา
                    </h4>
                    <div className="invited-link">
                        <a className="invited-btn btn btn-primary mx-1" href="/">หน้าหลัก</a>
                        <a className="invited-btn btn btn-outline-primary mx-1" href="https://www.buymeacoffee.com/maseshi" target="_blank" rel="noreferrer">สนับสนุน</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
