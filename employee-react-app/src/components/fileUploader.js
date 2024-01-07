import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FileUploader.css";
const { API } = require("../config/" + process.env.NODE_ENV);


const FileUploader = () => {
  const sessionData = sessionStorage.getItem("loggedinUserData");
  console.log(sessionData);
  const userData = sessionData?.length > 0 && JSON.parse(sessionData);
  const fileRef = useRef();
  const navigate = useNavigate();

  const uploadNewFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userData._id);

    axios
      .post(API.FILEUPLOADER, formData)
      .then((res) => {
        console.log(res.data);
        console.log("file uploaded");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          fileRef.current.value = "";
        }, 1500);
      });
  };

  return (
    <body className="body">
      <div className="d-flex justify-content-center uploaderr">
        <div >
          <div className="">
            <h1>Welcome {userData?.username}</h1>
            <div className="uploadsheetposition">

              <button
                className="btn btn-primary m-2 uploadsheet"
              >
                UPLOAD NEW SHEET
              </button>

              <button
                className="btn btn-primary m-2 uploadsheet"
                onClick={() => navigate("/birthdays")}
              >
                CHECK EXISTING SHEETS
              </button>
            </div>
          </div>

          <div className="file-uploader-container">
            <h3 className="file-uploader-heading">UPLOAD A FILE</h3>
            <input ref={fileRef} type="file" onChange={uploadNewFile} className="file-input" />
          </div>
        </div>
      </div>
    </body>
  );
};

export default FileUploader;
