import React from "react";
import { connect } from "react-redux";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdStars } from "react-icons/md";
import { BiCrown } from "react-icons/bi";

const HackerStat = ({ hackerEarnings, hackerPoints, hackerRank }) => {

  return (
    <section className="row">
      <div className="col-md-4 p-3 rounded">
        <div className="card bg-black">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-right"><h4>الأرباح</h4></div>
              <div className="col-md-6 text-left"><h4><AiFillDollarCircle size={'2rem'} /></h4></div>
            </div>
            <p className="hacker-stat-numbers mt-2 mb-1">{hackerEarnings ? (hackerEarnings) : '00.00'}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 p-3 rounded">
        <div className="card bg-black">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-right"><h4>النقاط</h4></div>
              <div className="col-md-6 text-left"><h4><MdStars size={'2rem'} /></h4></div>
            </div>
            <p className="hacker-stat-numbers mt-2 mb-1">{hackerPoints ? (hackerPoints) : '0'}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 p-3 rounded">
        <div className="card bg-black">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-right"><h4>ترتيبك</h4></div>
              <div className="col-md-6 text-left"><h4><BiCrown size={'2rem'} /></h4></div>
            </div>
            <p className="hacker-stat-numbers mt-2 mb-1">{hackerRank ? (hackerRank) : '0'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = ({ blogs }) => {
  return {
    hackerEarnings: blogs.userInfo.hacker.earnings,
    hackerPoints: blogs.userInfo.hacker.points,
    hackerRank: blogs.userInfo.hacker.rank,
  };
};

export default connect(mapStateToProps)(HackerStat);

