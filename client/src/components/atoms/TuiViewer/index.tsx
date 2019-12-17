import React, { useEffect, useRef } from 'react';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';

export interface TuiViewerProps {
  content: string;
}

function TuiViewer({ content }: TuiViewerProps): React.ReactElement {
  const tuiViewerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tuiViewerElement = tuiViewerRef.current;
    if (tuiViewerElement)
      new Viewer({
        el: tuiViewerElement,
        initialValue: content,
      });
  }, [content]);

  return <div ref={tuiViewerRef}></div>;
}

export default TuiViewer;
