import * as React from 'react';
import './Editor.css';

interface Props {
    
}

interface State {
    
}

class Editor extends React.Component<Props, State> {

    public constructor(props: Props){
        super(props);
    }

    public render(){
        return (
            <h1>Editor TODO</h1>
        );
    }

}

export default Editor;