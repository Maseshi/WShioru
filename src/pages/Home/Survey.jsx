import Waves from '../../components/Waves/index'

export default function Survey() {
    return (
        <>
            <Waves position="top" r={173} g={216} b={230} />
            <section className="home-survey">
                <div className="row">
                    <div className="col-md-3">
                        <i className="bi bi-code-slash"></i>
                        <h3>-:-</h3>
                        <span>คำสั่ง</span>
                    </div>
                    <div className="col-md-3">
                        <i className="bi bi-server"></i>
                        <h3>-:-</h3>
                        <span>เซิร์ฟเวอร์</span>
                    </div>
                    <div className="col-md-3">
                        <i className="bi bi-people"></i>
                        <h3>-:-</h3>
                        <span>สมาชิก</span>
                    </div>
                    <div className="col-md-3">
                        <i className="bi bi-check2-circle"></i>
                        <h3>-:-</h3>
                        <span>ทำงานแล้ว</span>
                    </div>
                </div>
            </section>
            <Waves position="bottom" r={173} g={216} b={230} />
        </>
    )
}
