"use client";
import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type EditorProps = {
  onChange?: (data: string) => void;
  buttonType: string;
  clickedNoticeContent: any;
};

const Editor = ({
  onChange,
  buttonType,
  clickedNoticeContent,
}: EditorProps) => {
  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    setEditorData(buttonType === "modification" ? clickedNoticeContent : "");
  }, [buttonType, clickedNoticeContent]);

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);

    if (onChange) {
      onChange(data);
    }
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
