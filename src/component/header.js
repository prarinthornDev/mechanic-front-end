/* eslint-disable react-hooks/rules-of-hooks */
import React ,{useEffect , useState} from "react";
import { Link } from "react-router-dom";
import LOGO from "../asset/logM.png";
export default function header() {

    const [check , setCheck] = useState(false);

    useEffect(() => {
        if ((JSON.parse(localStorage.getItem("userData")))){
            setCheck(true);
        }else{
            setCheck(false);
        }
       
    }, [(JSON.parse(localStorage.getItem("userData")))])

  function delDataToLocal() {
    localStorage.removeItem("userData");
    setCheck(false);
  }

  /* {(JSON.parse(localStorage.getItem("userData"))) ? (JSON.parse(localStorage.getItem("userData"))).id : 'F'} */
  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center "
        style={{ height: "15vh", width: "100%" }}
      >
        <div className="col-6 col-sm-3 d-flex justify-content-center align-items-center ">
          {" "}
          <img src={LOGO} alt="" style={{ height: "100px" }} />{" "}
          <Link to='/post' className="btn btn-outline-danger w-100 mb-1" >ลงงาน</Link>
        </div>

        <div className="col-6 col-sm-3 ">
          {(check) ? (
            <>
              <div className="btn btn-outline-danger w-100 mb-1" onClick={(e) => {
                  e.preventDefault();
                  //goooooo
                }}>
                {JSON.parse(localStorage.getItem("userData")).name}
              </div>
              <div
                className="btn btn-outline-danger w-100"
                onClick={(e) => {
                  e.preventDefault();
                  delDataToLocal();
                }}
              >
                ออกจากระบบ
              </div>
            </>
          ) : (
            <>
              <Link to='/login' className="btn btn-outline-danger w-100 md-w-50 mb-1" >เข้าสู่ระบบ</Link>
              <Link to='/signup' className="btn btn-outline-danger w-100 md-w-50">สมัครสมาชิก</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
