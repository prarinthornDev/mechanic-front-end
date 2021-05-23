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
import IMG from "../asset/testProfile.jpg";
import LOGO from "../asset/logM.png";
import LINE from "../asset/line.png";
import USER from '../asset/user.png';

export default function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  /*    const [profile_id , set] ; */
  const [img, setImg] = useState("");
  //   const [name, setName] = useState("");
  const [tel, setTel] = useState();
  const [type_skill, setTypeSkill] = useState("");
  const [id_line, setIdLine] = useState("");
  //const [id_facebook, setIdFacebook] = useState("");
  const [about, setAbout] = useState("");
  const [province, setProvince] = useState("");

  const [checkUsername, setCheckUsername] = useState(true);
  //const [checkPassword, setCheckPassword] = useState(true);
  const [check, setCheck] = useState(false);

  const [dataProvince, setDataProvince] = useState([]);

  const [name, setName] = useState("");
  const [imgF, setImgF] = useState();
  const [checkUploadimgF, setcheckUploadimgF] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);

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

  function signup() {
    axios
      .post(`${host}/users/signUp`, {
        username: username.trim(),
        password: password.trim(),
        img: img,
        name: name.trim(),
        tel: tel,
        type_skill: type_skill,
        id_line: id_line.trim(),
        about: about.trim(),
        province: province,
      })
      .then((res) => {
        if (res.data === "ลงทะเบียนเรียบร้อย") {
          setIsSignUp(true);
        } else {
          setIsSignUp(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // ลงทะเบียนเรียบร้อย
  }

  function uploadImage(e, imgF, setImg, setcheckUploadimgF) {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("myImage", imgF);
    axios
      .post("http://localhost:5001/uploadImg", formData, config)
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

  function checkLogin() {
    setCheckUsername(true);
    setCheck(false);
    //setCheckPassword(true);
    if (username.trim() === "") {
    } else {
      axios
        .post(`${host}/users/login`, {
          username: username.trim(),
          password: password.trim(),
        })
        .then((res) => {
          if (res.data === "ไม่พบชื่อผู้ใช้ในระบบ") {
            setCheck(true);
          } else {
            setCheckUsername(false);
            setCheck(false);
          }
          // console.log(res.data);
        })
        .catch((err) => {});
    }
  }

  if (isSignUp) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4 mb-5 justify-content-center align-items-center">
          {/*  <div className="col-sm d-flex justify-content-center align-items-center">
          </div> */}
          <div
            className="row w-100 justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <div className="col col-sm-5 mt-3 ">
              <div className="text-center">
                <img
                  src={LOGO}
                  className="rounded"
                  alt="..."
                  style={{ height: "150px" }}
                />
              </div>
              {/*  */}
              <div className="form-floating mb-3">
                <input
                  type="Username"
                  className="form-control"
                  id="floatingInput"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label for="floatingInput">ชื่อผู้ใช้</label>
              </div>
              {checkUsername ? (
                <></>
              ) : (
                <>
                  <div className="alert alert-danger" role="alert">
                    ขออภัย..ชื่อผู้ใช้นี้มีในระบบแล้ว
                  </div>
                </>
              )}
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label for="floatingPassword">รหัสผ่าน</label>
              </div>
              <div
                className="btn mt-2 mb-2 btn-danger w-100"
                onClick={() => {
                  checkLogin();
                }}
              >
                ตรวจสอบ
              </div>
              {check ? (
                <>
                  <div className="mt-3 w-100">
                    {/*  <div className="col-4 border"></div> */}
                    <div className="text-center d-flex justify-content-center  w-100">
                    {(img === '') ? <>
                    <img
                        src={USER}
                        className="rounded"
                        alt="..."
                        style={{ height: "250px" }}
                      />
                    </>:<>
                    <img
                        src={`${host}/img/${img}`}
                        className="rounded"
                        alt="..."
                        style={{ height: "250px" }}
                      />
                    </>}
                     
                    </div>
                    <div className="col mt-3 mb-3 w-100 d-flex justify-content-center">
                      <input
                        type="file"
                        className="btn btn-light"
                        onChange={(e) => {
                          setImgF(e.target.files[0]);
                          setcheckUploadimgF(false);
                        }}
                      />
                      <button
                        className={
                          checkUploadimgF
                            ? "btn btn-success ms-3"
                            : "btn btn-danger ms-3"
                        }
                        type="submit"
                        onClick={(e) => {
                          uploadImage(e, imgF, setImg, setcheckUploadimgF);
                        }}
                      >
                        อัพโหลด
                      </button>
                    </div>
                  </div>
                  <form className="w-100">
                    <div className="col-12 mt-3">
                      <label for="name" className="form-label">
                        ชื่อ-นามสกุล{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="นายช่างใหญ่ บางบัวทอง"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <label for="tel" className="form-label">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="tel"
                        value={tel}
                        onChange={(e) => {
                          setTel(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <label for="id_line" className="form-label">
                        <img src={LINE} alt="" style={{ height: "25px" }} /> 
                        ไลน์ไอดี
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="id_line"
                        value={id_line}
                        onChange={(e) => {
                          setIdLine(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <label for="type_skill" className="form-label">
                        ความสามารถ
                      </label>
                      <select
                        id="type_skill"
                        className="form-select"
                        value={type_skill}
                        onChange={(e) => {
                          setTypeSkill(e.target.value);
                        }}
                      >
                        <option selected>เลือก...</option>
                        <option value="ช่างไฟฟ้า">ช่างไฟฟ้า</option>
                        <option value="ช่างประปา">ช่างประปา</option>
                        <option value="ช่างปูน">ช่างปูน</option>
                        <option value="ช่างโลหะ">ช่างโลหะ</option>
                        <option value="ช่างไม้">ช่างไม้</option>
                        <option value="ช่างรับเหมา">ช่างรับเหมา</option>
                      </select>
                    </div>

                    <div className="col-12 mt-3">
                      <label for="inputState" className="form-label">
                        จังหวัด
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
                    <div className="col-12 mb-3 mt-3">
                      <label for="inputAddress" className="form-label">
                        เกี่ยวกับฉัน
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="รายละเอียด"
                        style={{ height: "5rem" }}
                        value={about}
                        onChange={(e) => {
                          setAbout(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          signup();
                        }}
                      >
                        สมัครสมาชิก
                      </button>
                      <Link to="/" className="btn btn-secondary ms-5">
                        ยกเลิก
                      </Link>
                    </div>
                  </form>
                </>
              ) : (
                <></>
              )}
              {/*  <div className="col-12 w-100">
                DEBUGGGG // username :{username}
                password:{password}
                <br />
                role:{role}
                img:{img}
                <br />
                name:{name}
                tel:{tel}
                <br />
                type_skill:{type_skill}
                id_ilne:{id_ilne}
                <br />
                about:{about}
                province:{province}
                <br />
                host:{host}
              </div> */}
            </div>
          </div>

          {/*  <div className="col-sm border">
       
          </div> */}
        </div>
      </div>
    </>
  );
}
