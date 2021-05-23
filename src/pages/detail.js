/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LOADING from "../asset/loadingsssss.gif";
import { host } from "../service/local";

export default function detail(props) {
  const [isLoad, setIsLoad] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [vadi, setVadi] = useState(false);
  const [vaImg, setVaImg] = useState(false);

  const [commentt, setCommentt] = useState([]);

  useEffect(() => {
    getJobsByIDjobs();
    getComment();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  function getComment() {
    axios
      .post(`${host}/getCommentByIDjobs`, {
        idJobs: props.match.params.id,
      })
      .then((res) => {
        setCommentt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function reset() {
    setEmail("");
    setComment("");
    setVadi(false);
    setVaImg(false);
    setImg1();
    setImgF1();
    setcheckUploadimgF1(false);
  }

  function postComment() {
    setVadi(false);

    if (email.trim().length < 1) {
      setVadi(true);
    } else {
      axios
        .post(`${host}/addComment`, {
          img: img1,
          text: comment,
          username_email: email,
          jobs_id: props.match.params.id,
          profile_id: "null",
        })
        .then((res) => {
          console.log(res.data);
          getComment();
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const [img1, setImg1] = useState();
  const [imgF1, setImgF1] = useState();
  const [checkUploadimgF1, setcheckUploadimgF1] = useState(false);

  function onFormSubmit(e, imgF, setImg, setcheckUploadimgF) {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("myImage", imgF);
    axios
      .post(`${host}/uploadImg`, formData, config)
      .then((response) => {
        //console.log(response.data);
        let data = response.data;
        console.log(data);
        setImg(data);
        setcheckUploadimgF(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getJobsByIDjobs() {
    axios
      .post(`${host}/showJobsByIDjobs`, {
        idJobs: props.match.params.id,
      })
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(data);

  return (
    <>
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
            <div className="row mt-4 mb-5 justify-content-center align-items-start">
              <div
                className="row w-100 justify-content-center align-items-start"
                data-aos="fade-up"
              >
                <div className="col-12 col-md-3 col-sm-5  mx-5 mt-3 ">
                  {!(data.length === 0) ? (
                    <>
                      <div className="row px-4">
                        <div className="col">
                          <h3>รายละเอียด</h3>
                          <div
                            id="carouselExampleControls"
                            className="carousel slide mt-2"
                            data-bs-ride="carousel"
                          >
                            <div
                              className="carousel-inner"
                              data-bs-interval="2000"
                              style={{ height: "250px" }}
                            >
                              <div
                                className="carousel-item active"
                                data-bs-interval="2000"
                              >
                                <img
                                  src={`${host}/img/${data.img1}`}
                                  className="d-block w-100"
                                  alt="..."
                                  style={{ height: "250px" }}
                                />
                              </div>
                              <div
                                className="carousel-item"
                                data-bs-interval="2000"
                              >
                                <img
                                  src={`${host}/img/${data.img2}`}
                                  className="d-block w-100"
                                  alt="..."
                                  style={{ height: "250px" }}
                                />
                              </div>
                              <div
                                className="carousel-item"
                                data-bs-interval="2000"
                              >
                                <img
                                  src={`${host}/img/${data.img3}`}
                                  className="d-block w-100"
                                  alt="..."
                                  style={{ height: "250px" }}
                                />
                              </div>
                              <div
                                className="carousel-item"
                                data-bs-interval="2000"
                              >
                                <img
                                  src={`${host}/img/${data.img4}`}
                                  className="d-block w-100"
                                  alt="..."
                                  style={{ height: "250px" }}
                                />
                              </div>
                            </div>
                            <button
                              className="carousel-control-prev bg-danger"
                              type="button"
                              data-bs-target="#carouselExampleControls"
                              data-bs-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next  bg-danger"
                              type="button"
                              data-bs-target="#carouselExampleControls"
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-12 p-3">
                          <h4>รับทำ : {data.jobs_name}</h4>
                          <h4>รายละเอียด : {data.description}</h4>
                          <h4>ราคา : {data.price}  บาท </h4>
                          <h4>ระยะเวลา : {data.time} </h4>
                          <h4>ประเภทราคา : {data.type}</h4>
                          <h4>จังหวัด : {data.job_province}</h4>
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button bg-danger text-white"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  ข้อมูลช่าง
                                </button>
                              </h2>
                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse "
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body  justify-content-center">
                                  <h4>ชื่อ : {data.name}</h4>
                            
                                  <a href={`tel:${data.tel}`}>
                                    เบอร์โทรศัพท์ : {`tel:${data.tel}`}{" "}
                                  </a>
                                  <h4>ประเภทช่าง : {data.type_skill}</h4>
                                  <h4>ไอดีไลน์ : {data.id_line}</h4>
                                  <h4>จังหวัด : {data.province}</h4>
                                  <h4>
                                    {" "}
                                    <Link
                                      to={`/profile/${data.profile_id}`}>  ข้อมูลเพิ่มเติม
                                    </Link>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                        </div>{" "}
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
                <div className="col-12 col-sm-5 mx-5 mt-3 ">
                  <div className="col-12  mt-2">
                    <div className="mb-3">
                      <label for="formFile" class="form-label">
                        รูปงานที่ว่าจ้าง :
                      </label>
                      <br />
                      <input
                        className="w-50"
                        type="file"
                        name="myImage"
                        onChange={(e) => {
                          setImgF1(e.target.files[0]);
                        }}
                      />
                      <button
                        className={
                          checkUploadimgF1
                            ? "btn btn-success ms-3 me-3"
                            : "btn btn-outline-danger ms-3 me-3"
                        }
                        type="submit"
                        onClick={(e) => {
                          onFormSubmit(e, imgF1, setImg1, setcheckUploadimgF1);
                        }}
                      >
                        อัพโหลด
                      </button>
                      <img
                        src={`${host}/img/${img1}`}
                        alt=""
                        style={{ height: "40px", width: "40px" }}
                      />
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label for="floatingInput">อีเมลของคุณ</label>
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                    <label for="floatingTextarea2">แสดงความคิดเห็น...</label>
                  </div>
                  <div
                    className="btn btn-outline-danger mt-2 mb-5"
                    onClick={(e) => {
                      e.preventDefault();
                      postComment();
                    }}
                  >
                    โพสต์
                  </div>
                  {vadi && (
                    <>
                      <div className="alert alert-danger" role="alert">
                        กรุณากรอก Email
                      </div>
                    </>
                  )}
                  {commentt ? (
                    <>
                      {commentt.map((item, index) => {
                        return (
                          <>
                            <div className="row">
                              <div className="row py-3 justify-content-center align-items-start">
                                <div className="col-8">
                                  <div className="col mb-1">
                                    <div /* style={{wordWrap:'break-word' , width: '100px'}} */
                                    >
                                      Email : {item.username_email}{" "}
                                    </div>
                                  </div>
                                  <div className="col mb-1">
                                    <div
                                      style={{
                                        wordWrap: "break-word",
                                        width: "100px",
                                      }}
                                    >
                                      {item.text}
                                    </div>
                                  </div>
                                  <div className="col">
                                    วันที่ : {item.time.substring(0, 10)}
                                  </div>
                                  <div className="col">
                                    เวลา : {item.time.substring(11, 19)}
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="col-12">
                                    <img
                                      src={`${host}/img/${item.img}`}
                                      alt="SD"
                                      style={{ height: "100px" }}
                                    />{" "}
                                  </div>
                                </div>
                              </div>
                              <div className="row border w-100"></div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
