import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import {
  CheckCircleIcon,
  CodeBracketIcon,
  RectangleStackIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface Stats {
  commands: number;
  guilds: number;
  users: number;
  worked: number;
}

export default function HomeStats() {
  const [stats, setStats] = useState<Stats | null>();

  useEffect(() => {
    const getStats = async () => {
      const database = getDatabase();
      const statsRef = ref(database, "statistics/size");
      const statsSnapshot = await get(statsRef);

      if (statsSnapshot.exists()) {
        const statsData = statsSnapshot.val();
        setStats(statsData);
      }
    };
    getStats();
  }, []);

  return (
    <section
      className="to-primary/5 bg-gradient-to-b from-transparent py-16"
      id="stats"
    >
      <div className="container mx-auto px-4">
        {/* <h2 className="text-center text-4xl font-bold">
          <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
            ได้รับความไว้วางใจ
          </span>
          จากชุมชน Discord
        </h2>
        <p className="mx-auto max-w-md py-2 pb-12 text-center">
          Shioru
          ช่วยเหลือชุมชนหลายพันแห่งด้วยบริการที่เชื่อถือได้และฟีเจอร์ที่น่าพึงพอใจ
        </p> */}
        <div className="stats bg-secondary/10 shadow-secondary stats-vertical lg:stats-horizontal w-full justify-stretch rounded-xl shadow-2xl/10">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <CodeBracketIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">คำสั่ง</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.commands as number)}
            </div>
            <div className="stat-desc">คำสั่งทั้งหมดที่รองรับ</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <RectangleStackIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">กิลด์</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.guilds as number)}
            </div>
            <div className="stat-desc">กิลด์ที่ Shioru ได้เข้าร่วม</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <UserGroupIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">สมาชิก</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.users as number)}
            </div>
            <div className="stat-desc">สมาชิกทั้งหมดที่นับได้</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <CheckCircleIcon className="inline-block size-8 stroke-current" />
            </div>
            <div className="stat-title">ทำงานแล้ว</div>
            <div className="stat-value">
              {new Intl.NumberFormat().format(stats?.worked as number)}
            </div>
            <div className="stat-desc">จำนวนการทำงานที่เสร็จสิ้น</div>
          </div>
        </div>
      </div>
    </section>
  );
}
