import React, { useState, useEffect, useRef } from 'react';
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
  const tuiEditorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tuiEditorElement = tuiEditorRef.current;
    if (tuiEditorElement) {
      const editor = new Editor({
        el: tuiEditorElement,
        initialEditType: 'wysiwyg',
        height: '45rem',
        previewStyle: 'vertical',
        placeholder,
      });
      editor.on('change', () => {
        setContent(editor.getHtml());
      });
    }
  }, [placeholder]);

  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  return <div ref={tuiEditorRef}></div>;
}

export default TuiEditor;
