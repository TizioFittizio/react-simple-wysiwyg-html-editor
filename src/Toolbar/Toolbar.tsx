import * as React from 'react';
import { ToolbarProps } from './Toolbar.types';
import './Toolbar.css';

interface State {
    
}

class Toolbar extends React.Component<ToolbarProps, State> {

    public constructor(props: ToolbarProps){
        super(props);
    }

    public render(){
        return (
            <div className='toolbar-container'>
                <h1>Toolbar TODO</h1>
            </div>
        );
    }

}

export default Toolbar;