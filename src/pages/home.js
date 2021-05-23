/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { host } from "../service/local";
import LOADING from "../asset/loadingsssss.gif";
import NODATA from "../asset/not-found-icon-15.jpg";

import B1 from "../asset/GG (1).png";
import B2 from "../asset/GG (2).png";
import B3 from "../asset/GG (3).png";
import B4 from "../asset/GG (4).png";

import Main from "../component/main";

/* /showJobsByIdProfile */

export default function home(props) {
  const [isLoad, setIsLoad] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    getJobsAll();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  function getJobsAll() {
    axios
      .get(`${host}/showJobs`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function selectType(t){
    
    if(t === 'ทั้งหมด'){
      getJobsAll();
    }else{
      axios.post(`${host}/showJobsByType` ,{
        type : t
      }).then((res)=>{
        setData(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
      console.log(t);
  }

  console.log(data);

  return (
    <Main>
      {isLoad ? (
        <>
          <div className="container-fluid">
            <div className="row mt-3 justify-content-center align-items-center">
              <img
                src={LOADING}
                alt=""
                style={{ height: "auto", width: "100%" }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid">
           
            <div className="row mt-3 justify-content-center align-items-start">

              {/*  */}

              
              <div className="row justify-content-center align-items-start mb-3">
                <div className="col-12 col-md-7 justify-content-center align-items-start">

                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={B1} class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src={B2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={B3} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={B4} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"  data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                </div>
              </div>

              
{/*  */}
            
              <div className="col-4 col-md-2  justify-content-center align-items-start ">
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ทั้งหมด");
                }}>
                  งานทั้งหมด
                </div>
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ช่างไฟฟ้า");
                }}>
                  ช่างไฟฟ้า{" "}
                </div>
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ช่างประปา");
                }}>
                  ช่างประปา
                </div>
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ช่างปูน");
                }}>
                  ช่างปูน
                </div>
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ช่างโลหะ");
                }}>
                  ช่างโลหะ
                </div>
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ช่างไม้");
                }}>
                  ช่างไม้
                </div>
                <div className="btn btn-outline-danger w-100 mt-1" onClick={(e)=>{
                  selectType("ช่างรับเหมา");
                }}>
                  ช่างรับเหมา
                </div>
              </div>
              <div className="col-8 col-sm-5 ">
                {data.length >= 1 ? (
                  <>
                    {/* data */}
                    <div className="row">
                      {data.map((item, index) => {
                        return (
                          <>
                            <div className="col-12 col-sm-6 col-sm-6 mt-3">
                              <div
                                class="card text-center hover-overlay"
                                style={{ width: "100%" }}
                              >
                                <div
                                  class="card-body" /* style={{backgroundImage : `url(${NODATA})` , backgroundPosition : 'center' , backgroundSize:'cover'}} */
                                >
                                  <img
                                    src={`${host}/img/${item.img1}`}
                                    alt=""
                                    style={{ width: "80px", height: "80px" }}
                                    key={index}
                                  />
                                  <h5 class="card-title">
                                      {item.jobs_name}
                                  </h5>
                                  <p class="card-text">{item.description}</p>
                                {/*   <div class="input-group w-100 mb-2">
                                    <span class="input-group-text">ราคา</span>
                                    <input
                                      type="text"
                                      class="form-control disbled"
                                      aria-label="ราคา"
                                      value={item.price}
                                      disabled
                                    />
                                    <span class="input-group-text">บาท</span>
                                  </div> */}
                                  <Link to={`/detail/${item.jobs_id}`} class="btn btn-danger">
                                  ข้อมูลเพิ่มเติม
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {/* nodata */}
                    <h1 className="text-danger d-flex justify-content-center align-items-center">
                      ไม่พบข้อมูล
                    </h1>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Main>
  );
}
