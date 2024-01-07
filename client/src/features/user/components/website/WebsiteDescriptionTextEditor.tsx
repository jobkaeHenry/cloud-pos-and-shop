import ReactQuill, { ReactQuillProps } from "react-quill";
import { sanitize } from "isomorphic-dompurify";
import "./quill.custom.css";

interface WebsiteDescriptionTextEditorProps
  extends Omit<ReactQuillProps, "theme"> {}

const WebsiteDescriptionTextEditor = ({
  onChange,
  ...quillProps
}: WebsiteDescriptionTextEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      onChange={(content, _d, _s, _e) =>
        onChange?.(sanitize(content), _d, _s, _e)
      }
      {...quillProps}
    />
  );
};

export default WebsiteDescriptionTextEditor;
