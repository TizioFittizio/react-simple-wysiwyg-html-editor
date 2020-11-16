export interface EditorProps {
    HTML: string;
    onHTMLEdit: (html: string) => void;
    editorClassName?: string;
}