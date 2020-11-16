import * as React from 'react';
import './Toolbar.css';

interface Props {

}

interface State {
    
}

class Toolbar extends React.Component<Props, State> {

    // select title
    // select font
    // select size

    // undo
    // redo
    // remove formatting
    // bold
    // italic
    // underline
    // left align
    // center align
    // right align
    // numbered list
    // dotted list
    // quote
    // add indentation
    // delete indentation
    // hyperlink
    // cut
    // copy
    // paste

    public render(){
        return (
            <div className='toolbar-container'>
                {this.renderTitleSelect()}
            </div>
        );
    }

    private renderTitleSelect(){
        return (
            <select 
                onChange={e => {
                    e.preventDefault();
                    this.executeCommand('formatblock', e.target.value);
                }}
            >
                <option selected value='p'>Paragraph</option>
                <option value='h1'>Title 1</option>
                <option value='h2'>Title 2</option>
                <option value='h3'>Title 3</option>
                <option value='h4'>Title 4</option>
                <option value='h5'>Title 5</option>
                <option value='h6'>Subtitle</option>
                <option value='pre'>Preformatted</option>
            </select>
        );
    }

    private executeCommand(command: string, argument?: string){
        document.execCommand(command, false, argument);
    }

}

export default Toolbar;