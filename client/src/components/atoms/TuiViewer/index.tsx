import React, { useEffect } from 'react';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';

export interface TuiViewerProps {
  content: string;
}

function TuiViewer({ content }: TuiViewerProps): React.ReactElement {
  useEffect(() => {
    new Viewer({
      el: document.getElementById('tui-viewer')!,
      initialValue: content,
    });
  }, [content]);

  return <div id="tui-viewer"></div>;
}

export default TuiViewer;
