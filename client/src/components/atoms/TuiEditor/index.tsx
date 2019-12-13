import React, { useState, useEffect } from 'react';
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content

export interface TuiEditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

function TuiEditor({
  onChange,
  placeholder = '내용을 입력해주세요.',
}: TuiEditorProps): React.ReactElement {
  const [content, setContent] = useState('');
  useEffect(() => {
    const editor = new Editor({
      el: document.getElementById('tui-editor')!,
      initialEditType: 'wysiwyg',
      height: '450px',
      previewStyle: 'vertical',
      placeholder,
    });
    editor.on('change', () => {
      setContent(editor.getHtml());
    });
  }, [placeholder]);

  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  return <div id="tui-editor"></div>;
}

export default TuiEditor;
