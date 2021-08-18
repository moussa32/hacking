import React from "react";
import { Link } from "react-router-dom";

const ActivityAd = () => {
  return (
    <div className="card bg-black activity-ad">
      <img src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg" className="p-4 card-img-top" alt="..." />
      <div className="card-body mx-auto text-center">
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Link to="/#" className="btn btn-lightgreen">
          أعرف المزيد
        </Link>
      </div>
    </div>
  );
};

export default ActivityAd;
