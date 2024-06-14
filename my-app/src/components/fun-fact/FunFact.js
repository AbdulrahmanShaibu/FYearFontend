import React from 'react';
import CountUp from 'react-countup';

const FunFact = () => {
    return (
        <div className="fun-fact-area pt-60 pb-60 bg-1">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3">
                        <div className="single-counter text-center">
                            <h2><span className="counter"><CountUp end={50} /></span>+</h2>
                            <p>Cleaners Managed</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3">
                        <div className="single-counter text-center">
                            <h2><span className="counter"><CountUp end={10} /></span>+</h2>
                            <p>Departments Covered</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3">
                        <div className="single-counter text-center">
                            <h2><span className="counter"><CountUp end={200} /></span>+</h2>
                            <p>Tools Managed</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3">
                        <div className="single-counter text-center">
                            <h2><span className="counter"><CountUp end={95} /></span>%</h2>
                            <p>Complaint Resolution</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FunFact;
