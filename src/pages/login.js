/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import LOGO from "../asset/logM.png";
import { host } from "../service/local";

export default function login() {
  const [username, setUsername] = useState("");
  const [checkUsername, setCheckUsername] = useState(true);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);
  const [resUsername, setResUsername] = useState("");
  const [resPassword, setResPassword] = useState("");
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    getDataToLocal();
  }, []);
  function getDataToLocal() {
    setIsLogin(JSON.parse(localStorage.getItem("userData")));
  }
  function addDataToLocal(data) {
    let user = {
      username: data.username,
      id: data.id,
      img: data.img,
      name: data.name,
      tel: data.tel,
      type_skill: data.type_skill,
      id_line: data.id_line,
      about: data.about,
      province: data.province,
    };
    localStorage.setItem("userData", JSON.stringify(user));
    getDataToLocal();
  }
  function delDataToLocal() {
    localStorage.removeItem("userData");
    getDataToLocal();
  }

  function checkLogin() {
    setCheckUsername(true);
    setCheckPassword(true);
    if (username.trim().length < 1) {
      setCheckUsername(false);
      setResUsername("กรุณากรอกชื่อผู้ใช้");
    } else {
      axios
        .post(`${host}/users/login`, {
          username: username.trim(),
          password: password.trim(),
        })
        .then((res) => {
          if (res.data === "ไม่พบชื่อผู้ใช้ในระบบ") {
            setResUsername(res.data);
            setCheckUsername(false);
          } else if (res.data === "รหัสผ่านไม่ถูกต้อง") {
            setResPassword(res.data);
            setCheckPassword(false);
          } else {
            addDataToLocal(res.data);
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // รหัสผ่านไม่ถูกต้อง
    // ไม่พบชื่อผู้ใช้ในระบบ
  }

  if(isLogin) { 
    return <Redirect to={`/`} />
  } 
  return (
    <>
      <div className="container-fluid">
        {/* {isLogin ? <>T</> : <>F</>} */}
        <div className="row mt-4 mb-5 justify-content-center align-items-center">
          <div
            className="row w-100 justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <div className="col col-sm-5 mt-3">
              <div className="text-center mb-3">
                <img
                  src={LOGO}
                  className="rounded"
                  alt="..."
                  style={{ height: "150px" }}
                />
              </div>

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
                    {resUsername}
                  </div>
                </>
              )}
              <div className="form-floating mb-2">
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
              {checkPassword ? (
                <></>
              ) : (
                <>
                  <div className="alert alert-danger" role="alert">
                    {resPassword}
                  </div>
                </>
              )}
              <div
                className="btn mt-2 mb-2 btn-danger w-100"
                onClick={() => {
                  checkLogin();
                }}
              >
                เข้าสู่ระบบ
              </div>
              <Link to='/signup'
                className="btn mt-2 mb-2 btn-outline-danger w-100"
            
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
