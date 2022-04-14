export default function Commands() {
  return (
    <section className="home-commands" id="commands">
      <div className="container">
        <div className="home-commands-header">
          <small>COMMANDS</small>
          <h2>คำสั่งเด่น</h2>
          <p>คำสั่งเหล่านี้คือคำสั่งที่ได้รับการใช้งานที่บ่อยที่สุด สำหรับคำสั่งอื่นๆ ใช้ <code>Shelp</code></p>
        </div>
        <br />
        <div className="home-commands-content">
          <div className="home-commands-table table-responsive">
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">คำสั่ง</th>
                  <th scope="col">คำอธิบาย</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">autoplay</th>
                  <td>เล่นเพลงต่อโดยอัตโนมัติหลังจากที่จบคิวล่าสุด</td>
                </tr>
                <tr>
                  <th scope="row">together</th>
                  <td>สร้างห้องสำหรับใช้งาน Discord Together ซึ่งมีให้เลือกหลายตัวเลือก</td>
                </tr>
                <tr>
                  <th scope="row">help</th>
                  <td>สำหรับดูรายการคำสั่งทั้งหมดและรายละเอียดของคำสั่งที่ต้องการใช้งาน</td>
                </tr>
                <tr>
                  <th scope="row">invite</th>
                  <td>สร้างลิงค์สำหรับการเข้าร่วมเซิร์ฟเวอร์ของคุณ</td>
                </tr>
                <tr>
                  <th scope="row">settings</th>
                  <td>จัดการการตั้งค่าของ Shioru เพื่อปรับแต่งเซิร์ฟเวอร์และข้อมูลส่วนบุคคลเพิ่มเติม</td>
                </tr>
                <tr>
                  <th scope="row">ban</th>
                  <td>แบนสมาชิกภายในเวิร์ฟเวอร์ที่ไม่ทำตามข้อตกลงของเซิร์ฟเวอร์หรือเหตุผลอื่นๆ</td>
                </tr>
                <tr>
                  <th scope="row">kick</th>
                  <td>เตะสมาชิกที่ต้องการออกจากเซิร์ฟเวอร์โดยทันที</td>
                </tr>
                <tr>
                  <th scope="row">purge</th>
                  <td>ลบข้อความภายในช่องแชทจำนวนมาก โดยต้องไม่เกินกว่า 100 ข้อความ</td>
                </tr>
                <tr>
                  <th scope="row">unban</th>
                  <td>ปลดแบนสมาชิกที่ถูกแบนภายในเซิร์ฟเวอร์</td>
                </tr>
                <tr>
                  <th scope="row">weather</th>
                  <td>ตรวจสอบสภาพอากาศในพื้นที่ที่ต้องการได้ทั่วโลก</td>
                </tr>
                <tr>
                  <th scope="row">leveling</th>
                  <td>ตรวจสอบระดับชั่นและค่าประสบการณ์ของตัวเองและสมาชิกอื่นๆ ภายในเซิร์ฟเวอร์</td>
                </tr>
                <tr>
                  <th scope="row">filter</th>
                  <td>ทำการแปลงรหัสเสียงเพลงตามที่ต้องการ ซึ่งมีให้เลือกมากกว่า 10 แบบ</td>
                </tr>
                <tr>
                  <th scope="row">join</th>
                  <td>เข้าร่วมช่องเสียงหากพร้อมใช้งาน</td>
                </tr>
                <tr>
                  <th scope="row">leave</th>
                  <td>ออกจากช่องเสียงปัจจุบันหากพร้อมใช้งาน</td>
                </tr>
                <tr>
                  <th scope="row">play</th>
                  <td>เล่นเพลงจากชื่อ, ลิงค์ที่ต้องการ ซึ่งขณะนี้รองรับทั้งในแพลตฟอร์ม YouTube, Spotify และ SoundCloud</td>
                </tr>
                <tr>
                  <th scope="row">search</th>
                  <td>ค้นหาและเล่นเพลงเพลงที่ต้องการได้ทั้ง YouTube, Spotify และ SoundCloud</td>
                </tr>
                <tr>
                  <th scope="row">queue</th>
                  <td>ดูเพลงและคิวที่กำลังเล่นในเซิร์ฟเวอร์ขณะนี้</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
