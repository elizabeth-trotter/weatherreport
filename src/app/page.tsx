'use client'

import { useState } from "react";
import OverviewComponent from "./components/OverviewComponent";
import NavComponent from "./components/NavComponent";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;

export default function Home() {
  const [date, setDate] = useState<string>('March 25, 2024');
  const [time, setTime] = useState<string>('2:20 PM PST');

  return (
    <main className='backgroundDay h-lvh'>
      <div className="grid grid-cols-73/27">
        <div className='pt-16 ps-12'>
          <h1 className='font-montserrat text-4xl font-bold pb-4'>U.S. Weather Report</h1>
          <p className='font-oswald text-lg'>{date} | {time}</p>

          <OverviewComponent />
        </div>

        <div className="h-full">
          <NavComponent />
        </div>

      </div>
    </main>
  )
}
