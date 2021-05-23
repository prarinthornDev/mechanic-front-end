/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { host } from "../service/local";

export default function post(props) {
  const [check, setCheck] = useState(false);
  const [postBtn, setPostBtn] = useState(false);

  const [id, setID] = useState();
  const [jobsName, setJobsName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [province, setProvince] = useState("");
  const [time, setTime] = useState(0);
  //time
  const [isEdit, setIsEdit] = useState(false);
  const [jobID, setJobID] = useState();

  //path
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();

  //File temp to upload
  const [imgF1, setImgF1] = useState();
  const [imgF2, setImgF2] = useState();
  const [imgF3, setImgF3] = useState();
  const [imgF4, setImgF4] = useState();

  //check response after upload
  const [checkUploadimgF1, setcheckUploadimgF1] = useState(false);
  const [checkUploadimgF2, setcheckUploadimgF2] = useState(false);
  const [checkUploadimgF3, setcheckUploadimgF3] = useState(false);
  const [checkUploadimgF4, setcheckUploadimgF4] = useState(false);

  const [dataProvince, setDataProvince] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("userData"))){

    }else{
      getJobsAll();
    }
    
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      setCheck(true);
      setID(JSON.parse(localStorage.getItem("userData")).id);
    } else {
      setCheck(false);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${host}/province`)
      .then((res) => {
        setDataProvince(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  function setEditJobs(j) {
    setJobID(j);
    axios
      .post(`${host}/showJobsByIDjobs`, {
        idJobs: j,
      })
      .then((res) => {
        console.log(res.data[0]);

        setJobsName(res.data[0].jobs_name);
        setDescription(res.data[0].description);
        setPrice(res.data[0].price);
        setType(res.data[0].type);
        setProvince(res.data[0].job_province);
        setTime(res.data[0].time);

        setImg1(res.data[0].img1);
        setImg2(res.data[0].img2);
        setImg3(res.data[0].img3);
        setImg4(res.data[0].img4);

        if (res.data[0].img1 === "undefined") {
          setcheckUploadimgF1(false);
        } else {
          setcheckUploadimgF1(true);
        }
        if (res.data[0].img2 === "undefined") {
          setcheckUploadimgF2(false);
        } else {
          setcheckUploadimgF2(true);
        }
        if (res.data[0].img3 === "undefined") {
          setcheckUploadimgF3(false);
        } else {
          setcheckUploadimgF3(true);
        }
        if (res.data[0].img4 === "undefined") {
          setcheckUploadimgF4(false);
        } else {
          setcheckUploadimgF4(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEdit(true);
  }
  function deleteJobs(id) {
    axios
      .post(`${host}/deleteJobs`, {
        idJ: id,
      })
      .then((res) => {
        reset();
        setIsEdit(false);
        getJobsAll();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function edit() {
    console.log(jobID);
    axios
      .post(`${host}/editJobs`, {
        idJ: jobID,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        jobs_name: jobsName,
        description: description,
        price: price,
        type: type,
        time: time,
        province: province,
      })
      .then((res) => {
        reset();
        setIsEdit(false);
        getJobsAll();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getJobsAll() {
    axios
      .post(`${host}/showJobsByIdProfile`, {
        idProfile: JSON.parse(localStorage.getItem("userData")).id,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function post() {
    axios
      .post(`${host}/addJob`, {
        id: id,
        jobsName: jobsName,
        description: description,
        price: price,
        type: type,
        province: province,
        time: time,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
      })
      .then((res) => {
        console.log(res);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function reset() {
    setJobsName("");
    setDescription("");
    setPrice(0);
    setType("");
    setProvince("");
    setTime(0);
    setImg1();
    setImg2();
    setImg3();
    setImg4();
    setImgF1();
    setImgF2();
    setImgF3();
    setImgF4();
    setcheckUploadimgF1(false);
    setcheckUploadimgF2(false);
    setcheckUploadimgF3(false);
    setcheckUploadimgF4(false);
  }

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

  if (!JSON.parse(localStorage.getItem("userData"))) {
    return <Redirect to={`/login`} />;
  }

  console.log(data);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4 mb-5 justify-content-center align-items-start">
          <div
            className="row w-100 justify-content-center align-items-start"
            data-aos="fade-up"
          >
            <div className="col-12 col-sm-5 mx-5 mt-3 border">
              {isEdit ? <h3>แก้ไขงาน</h3> : <h3>ลงงาน</h3>}
              {/*  */}
              <div className="col-12">
                <label for="jobsName" className="form-label">
                  ชื่องาน{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jobsName"
                  placeholder="ล้างแอร์ / รับเหมา / ติดประตู"
                  value={jobsName}
                  onChange={(e) => {
                    setJobsName(e.target.value);
                    if (jobsName.length >= 1) {
                      setPostBtn(true);
                    } else {
                      setPostBtn(false);
                    }
                  }}
                />
              </div>

              <div className="col-12">
                <label for="description" className="form-label">
                  รายละเอียดงาน{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="..."
                  style={{ height: "4rem" }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="col-12">
                <label for="price" className="form-label">
                  ราคา{" "}
                </label>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    aria-describedby="basic-addon2"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    บาท
                  </span>
                </div>
              </div>

              <div className="col-12">
                <label for="time" className="form-label">
                  ระยะเวลาในการทำงาน{" "}
                </label>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="time"
                    aria-describedby="basic-addon2"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    ชั่วโมง
                  </span>
                </div>
              </div>

              <div className="col-12 mt-2">
                <label for="type_skill" className="form-label">
                  ประเภทงาน
                </label>
                <select
                  id="type_skill"
                  className="form-select"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option selected>เลือก...</option>
                  <option value="ช่างไฟฟ้า">งานช่างไฟฟ้า</option>
                  <option value="ช่างประปา">งานช่างประปา</option>
                  <option value="ช่างปูน">งานช่างปูน</option>
                  <option value="ช่างโลหะ">งานช่างโลหะ</option>
                  <option value="ช่างไม้">งานช่างไม้</option>
                  <option value="ช่างรับเหมา">งานช่างรับเหมา</option>
                </select>
              </div>

              <div className="col-12 mt-2">
                <label for="inputState" className="form-label">
                  จังหวัดที่รับงาน
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                >
                  <option selected>เลือกจังหวัด...</option>
                  {dataProvince.length === 0 ? (
                    <>
                      <option>Loading....</option>
                    </>
                  ) : (
                    <>
                      {dataProvince.map((item, index) => {
                        return (
                          <option value={item.province} key={index}>
                            {item.province}
                          </option>
                        );
                      })}
                    </>
                  )}
                </select>
              </div>

              {/*  */}
              <div className="col-12  mt-2">
                <div className="mb-3">
                  <label for="formFile" class="form-label">
                    รูปตัวอย่างงานที่ 1 :
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
                    upload
                  </button>
                  <img
                    src={`${host}/img/${img1}`}
                    alt=""
                    style={{ height: "40px", width: "40px" }}
                  />
                </div>
              </div>

              <div className="col-12  mt-2">
                <div className="mb-3">
                  <label for="formFile" class="form-label">
                    รูปตัวอย่างงานที่ 2 :
                  </label>
                  <br />
                  <input
                    className="w-50"
                    type="file"
                    name="myImage"
                    onChange={(e) => {
                      setImgF2(e.target.files[0]);
                    }}
                  />
                  <button
                    className={
                      checkUploadimgF2
                        ? "btn btn-success ms-3 me-3"
                        : "btn btn-outline-danger ms-3 me-3"
                    }
                    type="submit"
                    onClick={(e) => {
                      onFormSubmit(e, imgF2, setImg2, setcheckUploadimgF2);
                    }}
                  >
                    upload
                  </button>
                  <img
                    src={`${host}/img/${img2}`}
                    alt=""
                    style={{ height: "40px", width: "40px" }}
                  />
                </div>
              </div>

              <div className="col-12  mt-2">
                <div className="mb-3">
                  <label for="formFile" class="form-label">
                    รูปตัวอย่างงานที่ 3 :
                  </label>
                  <br />
                  <input
                    className="w-50"
                    type="file"
                    name="myImage"
                    onChange={(e) => {
                      setImgF3(e.target.files[0]);
                    }}
                  />
                  <button
                    className={
                      checkUploadimgF3
                        ? "btn btn-success ms-3 me-3"
                        : "btn btn-outline-danger ms-3 me-3"
                    }
                    type="submit"
                    onClick={(e) => {
                      onFormSubmit(e, imgF3, setImg3, setcheckUploadimgF3);
                    }}
                  >
                    upload
                  </button>
                  <img
                    src={`${host}/img/${img3}`}
                    alt=""
                    style={{ height: "40px", width: "40px" }}
                  />
                </div>
              </div>

              <div className="col-12  mt-2">
                <div className="mb-3">
                  <label for="formFile" class="form-label">
                    รูปตัวอย่างงานที่ 4 :
                  </label>
                  <br />
                  <input
                    className="w-50"
                    type="file"
                    name="myImage"
                    onChange={(e) => {
                      setImgF4(e.target.files[0]);
                    }}
                  />
                  <button
                    className={
                      checkUploadimgF4
                        ? "btn btn-success ms-3 me-3"
                        : "btn btn-outline-danger ms-3 me-3"
                    }
                    type="submit"
                    onClick={(e) => {
                      onFormSubmit(e, imgF4, setImg4, setcheckUploadimgF4);
                    }}
                  >
                    upload
                  </button>
                  <img
                    src={`${host}/img/${img4}`}
                    alt=""
                    style={{ height: "40px", width: "40px" }}
                  />
                </div>
              </div>
              {/*  */}

              {isEdit ? (
                <>
                  <div
                    className="btn btn-warning me-3 w-50"
                    onClick={(e) => {
                      e.preventDefault();
                      edit();
                    }}
                  >
                    EDIT
                  </div>

                  <div
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      reset();
                      setIsEdit(false);
                    }}
                  >
                    CANCEL
                  </div>
                </>
              ) : (
                <>
                  {postBtn ? (
                    <>
                      <div
                        className="btn btn-danger me-3 w-50"
                        onClick={(e) => {
                          e.preventDefault();
                          post();
                        }}
                      >
                        POST
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="btn btn-danger me-3 w-50 disabled">
                        POST
                      </div>
                    </>
                  )}
                  <div
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      reset();
                    }}
                  >
                    RESET
                  </div>
                </>
              )}
            </div>

            <div className="col-12 col-sm-5 mt-3 border">
              {data.length >= 1 ? (
                <>
                  {/* data */}
                  <div className="row">
                    {data.map((item, index) => {
                      return (
                        <>
                          <div className="col-6 col-sm-6 col-sm-6 mt-3">
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
                                <h5 class="card-title">{item.jobs_name}</h5>
                                <p class="card-text">{item.description}</p>
                                <div class="input-group w-100 mb-2">
                                  <span class="input-group-text">ราคา</span>
                                  <input
                                    type="text"
                                    class="form-control disbled"
                                    aria-label="ราคา"
                                    value={item.price}
                                    disabled
                                  />
                                  <span class="input-group-text">บาท</span>
                                </div>

                                <div
                                  className="btn btn-outline-danger me-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setEditJobs(item.jobs_id);
                                  }}
                                >
                                  Edit
                                </div>
                                <div
                                  className="btn btn-danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteJobs(item.jobs_id);
                                  }}
                                >
                                  Delete
                                </div>
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
      </div>
    </>
  );
}
