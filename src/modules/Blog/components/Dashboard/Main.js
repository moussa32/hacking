import React from 'react';
import { VscLocation } from "react-icons/vsc";
import { HackerImage } from "../../../../assets/index";

const Main = () => {
    return (
        <mian className="component-wrapper">
            <div class="container-fluid home">
                <div class="jumbotron jumbotron-fluid text-center py-4 bg-second dbmain">
                    <div class="container-fluid">
                        <div class="jumbotron jumbotron-fluid bg-black">
                            <div class="container">
                                <div className="row">
                                    <div className="col-md-6 mx-auto">
                                        <img src={HackerImage} class="rounded-circle hacker-image rounded mx-auto d-block mb-3" alt="..." />
                                        <h2 className="hackerName text-white my-4">هاكر</h2>
                                        <p className="hackerLocation text-white"><VscLocation /> مصر</p>
                                        <p className="hackerBio text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </mian>
    )
}

export default Main;