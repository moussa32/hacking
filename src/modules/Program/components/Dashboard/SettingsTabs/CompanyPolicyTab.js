import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { dvbaseUrl } from "../../../../../api/Constants";
import { Editor } from "react-draft-wysiwyg";
import { Markup } from "interweave";
import draftToHtml from "draftjs-to-html";
import { CustomContentStateConverter } from "../../../../../shared/utils/CustomContentStateConverter";
import { getCompanyPolicy, putCompanyPolicy, postCompanyPolicyImage } from "../../../../../api/ProgramAPI/ProgramSettingsApi";
import { getNewTokens } from "../../../../../api/RefreshTokenApi";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./CompanyPoliceTab.css";

const CompanyPolicyTab = () => {
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoadding, setIsLoadding] = useState(false);
  const [status, setStatus] = useState(null);

  const token = localStorage.getItem("accessToken");

  const onEditorStateChange = editorState => {
    let convertedEditorStateToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    setContent(convertedEditorStateToHtml);
    console.log(convertedEditorStateToHtml);
  };

  useEffect(() => {
    getCompanyPolicy(token)
      .then(res => {
        setContent(res.data.policy);
        const htmlFromApi = res.data.policy;

        const blocksFromHTML = convertFromHTML(htmlFromApi);
        const initContent = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        setEditorState(EditorState.createWithContent(CustomContentStateConverter(initContent)));
      })
      .catch(error => {
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("reFreshtoken"));
        }
      });
  }, []);

  const handlePutCompanyPolicy = () => {
    setIsLoadding(true);
    setStatus(null);

    putCompanyPolicy(token, { policy: content })
      .then(res => {
        setIsLoadding(false);
        setStatus({ type: "success", message: "تم تحديث سياسات البرنامج بنجاح." });
      })
      .catch(error => {
        if (error.response.status === 401) {
          setStatus({ type: "danger", message: "جاري تحديث جلستك" });
          getNewTokens(localStorage.getItem("refreshToken"));
        }
      });
  };

  const handleUploadPolicyImage = image => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("image", image);
      postCompanyPolicyImage(localStorage.getItem("accessToken"), data)
        .then(res => {
          console.log({ data: `${dvbaseUrl}/${res.data.path}` });
          resolve({ data: { link: `${dvbaseUrl}/${res.data.path}` } });
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  };

  return (
    <>
      <h3 className="text-lightgreen p-4">تفاصيل</h3>
      <div className="row">
        <div className="col-md-11 mx-auto">
          <div className="form-group">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                image: {
                  previewImage: true,
                  uploadEnabled: true,
                  uploadCallback: handleUploadPolicyImage,
                  alt: { present: true, mandatory: false },
                  inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg,image/webp",
                },
              }}
            />
            <div className="content-view mt-3">
              <Markup className={"content-view"} content={content} />
            </div>
            {/* <textarea disabled value={content} onChange={e => setContent(e.target.value)} className="form-control p-3 custom-input border-0" id="summary" rows="6" name="summary"></textarea> */}
          </div>
          <button className="btn btn-lightgreen w-50 btn-block mx-auto my-4" onClick={handlePutCompanyPolicy}>
            إضافة
          </button>
          {isLoadding ? (
            <div className="spinner-border d-block mx-auto text-success mt-4 mb-1" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          {status && (
            <div className={`alert alert-${status.type} mt-4 text-center`} role="alert">
              {status.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyPolicyTab;
