import React from 'react'

export default function Welcome() {
    return (
        <section className="home-welcome">
            <div className="container">
                <div className="home-welcome-content">
                    <img src="./android-icon-144x144.png" alt="shioru icon" width="100px" height="100px" />
                    <h2>ผู้ช่วยเซิร์ฟเวอร์ Discord ที่ดีที่สุด</h2>
                    <p>พร้อมที่จะเข้าร่วมเซิร์ฟเวอร์ของคุณแล้ว</p>
                    <div className="d-grid gap-2 d-md-block">
                        <a className="home-welcome-btn-radius btn btn-primary mx-1" href="https://discord.com/api/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=applications.commands%20bot">เชิญชวน</a>
                        <a className="home-welcome-btn-radius btn btn-outline-primary mx-1" href="https://www.buymeacoffee.com/maseshi">สนับสนุน</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
