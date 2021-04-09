import React from 'react';

const HackerThanks = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">لوحة الشكر</h2>
          <div className="section-container bg-second m-4 rounded vulcontainer">
            <table class="table text-white">
              <thead>
                <tr className="vultr">
                  <th scope="col" class="border-top-0" className="vulname text-lightgreen text-right">اسم الشركة</th>
                  <th scope="col" class="border-top-0 text-lightgreen">عدد التقارير</th>
                </tr>
              </thead>
              <tbody className="vulbody">
                <tr>
                  <th scope="row" className="vulname text-right"><img className="companyLogo" src="https://www.futurelab.net/sites/default/files/toyota-logo.jpg" /> Toyota</th>
                  <td>47</td>
                </tr>
                <tr>
                  <th scope="row" className="vulname text-right"><img className="companyLogo" src="https://gfx4arab.com/wp-content/uploads/2020/07/olx-group-1.svg" /> OLX</th>
                  <td>40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackerThanks;