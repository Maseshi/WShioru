import Waves from '../../components/Waves/index'

export default function Invite() {
    return (
        <>
            <Waves position="top" r={173} g={216} b={230} />
            <section className="home-invite">
                <div className="container">
                    <img src="" alt="" />
                    <h2>พร้อมแล้วหรือยัง?</h2>
                    <span>เชิญชวน Shioru เข้าร่วมเซิร์ฟเวอร์ของคุณ<br />พร้อมกับเพลิดเพลินไปกับคุณสมบัติเหล่านี้เลย</span>
                    <br />
                    <br />
                    <a className="home-invite-btn-radius btn btn-primary" href="https://discord.com/api/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=applications.commands%20bot">เชิญชวน</a>
                </div>
            </section>
        </>
    )
}
