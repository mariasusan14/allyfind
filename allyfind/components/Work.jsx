import React from 'react';
import Tick from "../components/assets/tick.png";
import Choose from "../components/assets/choose.png";
import Handshake from  "../components/assets/handshake.png";
import '../src/styles/Work.css'


const Work =() => {
    const workInfoData =[
        {
            image:Tick,
            title:"Set your Qualities",
            text:"Select a list of your qualities that descibes you the most.",
        },
        {
            image:Choose,
            title:"Find your Accountable",
            text:"Select from a list of perfect study partners.",
        },
        {
            image:Handshake,
            title:"Ready to Work!",
            text:"Colab and work and embark a journey of mutual support and growth .",
        },
    ];
  return (
    <div className="work-section-wrapper" >
        <div className="work-section-top" >
            <p className="primary-subheading" >Work</p>
            
            <h1 className="primary-sub-subheading">How It Works</h1>
            <p className="primary-text">
                allyfind works by signing up,creating a profile, browsing study partners,
                connecting,communicating,studying together
            </p>
        </div>
        <div className="work-section-bottom" >
            {
                workInfoData.map((data) => (
                    <div className="work-section-info" >
                        <div className="info-boxes-img-container" >
                            <img src={data.image} alt="" />
                        </div>
                        <h2>{data.title}</h2>
                        <p>{data.text}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Work;
