import React from 'react';

const StandrdVulnerabilities = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-black rounded py-4">
        <div className="container px-4">
          <h2 className="section-title text-right">نقاط الضعف</h2>
          <div className="section-container bg-second m-4 rounded vulcontainer">
            <table class="table text-white">
              <thead>
                <tr className="vultr">
                  <th scope="col" class="border-top-0" className="vulname text-lightgreen text-right">نقطة الضعف</th>
                  <th scope="col" class="border-top-0 text-lightgreen">التقارير</th>
                </tr>
              </thead>
              <tbody className="vulbody">
                <tr>
                  <th scope="row" className="vulname text-right">HTTP Response Splitting</th>
                  <td>47</td>
                </tr>
                <tr>
                  <th scope="row" className="vulname text-right">Memory Corruption - Generic</th>
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

export default StandrdVulnerabilities;