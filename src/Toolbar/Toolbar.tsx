import * as React from 'react';
import './Toolbar.css';

interface Props {

}

interface State {
    
}

class Toolbar extends React.Component<Props, State> {

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
                {this.renderSeparator()}
                {this.renderFontSelect()}
                {this.renderSeparator()}
                {this.renderSizeSelect()}
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

    private renderFontSelect(){
        return (
            <select 
                onChange={e => {
                    e.preventDefault();
                    this.executeCommand('fontname', e.target.value)
                }}
            >
                <option>Arial</option>
                <option>Arial Black</option>
                <option>Courier New</option>
                <option>Times New Roman</option>
            </select>
        );
    }

    private renderSizeSelect(){
        return (
            <select 
                onChange={e => {
                    e.preventDefault();
                    this.executeCommand('fontsize', e.target.value)
                }}
            >
                <option value='1'>Very small</option>
                <option value='2'>A bit small</option>
                <option selected value='3'>Normal</option>
                <option value='4'>Medium-large</option>
                <option value='5'>Big</option>
                <option value='6'>Very big</option>
                <option value='7'>Maximum</option>
            </select>
        );
    }

    private renderSeparator(){
        return (
            <div className='separator' />
        );
    }

    private executeCommand(command: string, argument?: string){
        document.execCommand(command, false, argument);
    }

}

export default Toolbar;