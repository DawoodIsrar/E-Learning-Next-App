import { useState, useEffect, useRef } from "react";
import { CKEditor } from "ckeditor4-react";
import { toolBarConfiguration, extraPlugins } from "@/utils/editor";
import "./style.scss";

export default function App({ value, onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [content, setContent] = useState(value);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setContent(value);
  }, [isLayoutReady && value]);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-style"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {isLayoutReady && (
              <CKEditor
                initData={content}
                config={{
                  allowedContent: true,
                  removeFormatAttributes: "",
                  disallowedContent: false,
                  extraAllowedContent: "*(*);*{*}",
                  fillEmptyBlocks: false,
                  versionCheck: false,
                  autoParagraph: false,
                  removeButtons: "",
                  extraPlugins: extraPlugins,
                  toolbar: toolBarConfiguration,
                  height: 400,
                  baseFloatZIndex: 10005,
                }}
                onChange={(evt, editor) => onChange(evt)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
