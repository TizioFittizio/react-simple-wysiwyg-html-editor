export interface EditorProps {
    HTML?: string;
    editorClassName?: string;
    onHTMLEdit?: (html: string) => void;
}