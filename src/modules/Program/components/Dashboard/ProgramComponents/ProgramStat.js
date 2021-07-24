import React from 'react';
import { AiFillDollarCircle } from "react-icons/ai";

function ProgramStat({ hackerEarnings, hackerPoints }) {
  return (
    <section className="row">
      <div className="col-md-6 p-3 rounded">
        <div className="card bg-black">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-right"><h4>الرصيد</h4></div>
              <div className="col-md-6 text-left"><h4><AiFillDollarCircle size={'2rem'} /></h4></div>
            </div>
            <p className="hacker-stat-numbers mt-2 mb-1">{hackerEarnings ? (hackerEarnings) : '00.00'}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 p-3 rounded">
        <div className="card bg-black">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-right"><h4>المدفوع</h4></div>
              <div className="col-md-6 text-left"><h4><AiFillDollarCircle size={'2rem'} /></h4></div>
            </div>
            <p className="hacker-stat-numbers mt-2 mb-1">{hackerPoints ? (hackerPoints) : '0'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramStat
