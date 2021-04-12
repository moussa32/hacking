import React from 'react';
import { dvbaseUrl } from "../../../../../api/Constants";
import { GiPrayer } from 'react-icons/gi';


const HackerThanks = ({ userThankers }) => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">{userThankers.length === 0 ? ('') : (<GiPrayer className="section-icon mb-1 ml-2" size={"2rem"} />)}لوحة الشكر</h2>
          {userThankers.length === 0 ? (<><GiPrayer className="mt-4" size={"4rem"} /><p className="mt-4 lead mb-0">لا يوجد اي شكر بعد</p></>) : (
            <div className="section-container bg-second m-4 rounded vulcontainer">
              <table class="table text-white table-responsive">
                <thead>
                  <tr className="vultr">
                    <th scope="col" class="border-top-0" className="vulname text-lightgreen text-right">اسم الشركة</th>
                    <th scope="col" class="border-top-0 text-lightgreen">عدد التقارير</th>
                  </tr>
                </thead>
                <tbody className="vulbody">
                  {userThankers.map(thanker => {
                    return (
                      <tr key={thanker.id}>
                        <th scope="row" className="vulname text-right"><img className="companyLogo" src={`${dvbaseUrl}/${thanker.logo}`} /> {thanker.name}</th>
                        <td>47</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>)}
        </div>
      </div>
    </>
  );
}

export default HackerThanks;