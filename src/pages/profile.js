/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LOADING from "../asset/loadingsssss.gif";
import { host } from "../service/local";

export default function profile(props) {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [vadi, setVadi] = useState(false);
  const [vaImg, setVaImg] = useState(false);

  const [check, setCheck] = useState(false);
  const [id, setID] = useState(0);

  const [commentt, setCommentt] = useState([]);

  const [imgP, setImgP] = useState();
  const [imgFP, setImgFP] = useState();
  const [checkUploadimgFP, setcheckUploadimgFP] = useState(false);
  const [lineID, setLineID] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [province, setProvince] = useState("");
  const [tel, setTel] = useState("");
  const [typeSkill, setTypeSkill] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getProfileByid();
    getComment();
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      setCheck(true);
      setID(JSON.parse(localStorage.getItem("userData")).id);

      if (
        JSON.parse(localStorage.getItem("userData")).id == props.match.params.id
      ) {
        setIsProfile(true);
      } else {
        setIsProfile(false);
      }
    } else {
      setCheck(false);
    }
  }, []);

  function getComment() {
    axios
      .post(`${host}/getCommentByIDprofile`, {
        idProfile: props.match.params.id,
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
          jobs_id: "null",
          profile_id: props.match.params.id,
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

  function editProfile(){

    axios.post(`${host}/editProfile` ,{
        id : props.match.params.id,
        img : imgP,
        name : name ,
        tel : tel ,
        type_skill : typeSkill,
        id_line : lineID,
        about : about , 
        province : province 
    }).then((res)=>{
        setIsEdit(false);
        getProfileByid();
    }).catch((err)=>{
        console.log(err);
    })
  }

  function getProfileByid() {
    axios
      .post(`${host}/getProfileByid`, {
        id: props.match.params.id,
      })
      .then((res) => {
        setData(res.data[0]);
        setLineID(res.data[0].id_line);
        setImgP(res.data[0].img);
        setName(res.data[0].name);
        setAbout(res.data[0].about);
        setProvince(res.data[0].province);
        setTel(res.data[0].tel);
        setTypeSkill(res.data[0].type_skill);
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
                  {isEdit ? <>

                    <h3>แก้ไขข้อมูลส่วนตัว</h3>
                  <div class="input-group mb-3 mt-3 justify-content-center align-items-start">
                    <img
                      src={`${host}/img/${data.img}`}
                      alt=""
                      style={{ height: "200px" }}
                    />
                  </div>
                  {/*  */}
                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      ชื่อ
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={name}
                      onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      เบอร์โทรศัพท์
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={tel}
                      onChange={(e)=>{
                        setTel(e.target.value);
                    }}
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      LIND ID
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={lineID}
                      onChange={(e)=>{
                        setLineID(e.target.value);
                    }}
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      จังหวัด
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={province}
                      onChange={(e)=>{
                        setProvince(e.target.value);
                    }}
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      ประเภทช่าง
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={typeSkill}
                      onChange={(e)=>{
                        setTypeSkill(e.target.value);
                    }}
                      
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      แนะนำตัว
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={about}
                      onChange={(e)=>{
                          setAbout(e.target.value);
                      }}
                      
                    />
                  </div>

                  {isProfile ? (
                    <>
                      <div class="input-group mb-3 mt-3 justify-content-center align-items-start">
                        <div
                          className="btn btn-danger me-2 w-50"
                          onClick={(e) => {
                            e.preventDefault();
                            editProfile();
                            //setIsEdit(false);
                          }}
                        >
                          SAVE
                        </div>
                        <div
                          className="btn btn-outline-danger w-25 me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEdit(false);
                          }}
                        >
                          CANCEL
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}


                  {/*  */}
                  </> : <>

                  <h3>ข้อมูลช่าง</h3>
                  <div class="input-group mb-3 mt-3 justify-content-center align-items-start">
                    <img
                      src={`${host}/img/${data.img}`}
                      alt=""
                      style={{ height: "200px" }}
                    />
                  </div>
                  {/*  */}
                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      ชื่อ
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={name}
                      disabled
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      เบอร์โทรศัพท์
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={tel}
                      disabled
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      LIND ID
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={lineID}
                      disabled
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      จังหวัด
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={province}
                      disabled
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      ประเภทช่าง
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={typeSkill}
                      disabled
                    />
                  </div>

                  <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">
                      แนะนำตัว
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={about}
                      disabled
                    />
                  </div>

                  {isProfile ? (
                    <>
                      <div class="input-group mb-3 mt-3 justify-content-center align-items-start">
                        <div
                          className="btn btn-danger w-50"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEdit(true);
                          }}
                        >
                          EDIT
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  
                  
                  </>}

                  

                  {/*  */}

                  {/* {(JSON.parse(localStorage.getItem("userData")).id) == props.match.params.id ? 'ช่าง': 'ไม่ใช่ช่าง'} */}
                </div>
                <div className="col-12 col-sm-5 mx-5 mt-3 ">
                  <div className="col-12  mt-2">
                    <div className="mb-3">
                      <label for="formFile" class="form-label">
                        รูปงานที่เคยว่าจ้าง :
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
                    <label for="floatingInput">Email address</label>
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
                    <label for="floatingTextarea2">Comments</label>
                  </div>
                  <div
                    className="btn btn-outline-danger mt-2 mb-5"
                    onClick={(e) => {
                      e.preventDefault();
                      postComment();
                    }}
                  >
                    POST
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
