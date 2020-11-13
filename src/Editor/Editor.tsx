import * as React from 'react';
import { EditorProps } from './Editor.types';
import './Editor.css';

interface State {
    
}

class Editor extends React.Component<EditorProps, State> {

    public constructor(props: EditorProps){
        super(props);
    }

    public render(){
        return (
            <div className={this.getEditorClassName()}>
                <h1>Editor TODO</h1>
            </div>
        );
    }

    private getEditorClassName(){
        const { editorClassName } = this.props;
        let className = 'editor-container';
        if (editorClassName) className += ` ${editorClassName}`;
        return className;
    }

}

export default Editor;