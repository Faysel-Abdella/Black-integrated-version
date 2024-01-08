'use client'
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Editor = ({ onChange } : {onChange?: (data: string) => void;}) => {
  const [editorData, setEditorData] = useState('');

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