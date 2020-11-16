import * as React from 'react';
import ToolbarIconsImages from './ToolbarIconsImages';
import './Toolbar.css';

interface Props {

}

interface State {
    
}

class Toolbar extends React.Component<Props, State> {

    public render(){
        return (
            <div className='toolbar-container'>
                {this.renderTitleSelect()}
                {this.renderSeparator()}
                {this.renderFontSelect()}
                {this.renderSeparator()}
                {this.renderSizeSelect()}
                {this.renderSeparator()}
                {this.renderBoldButton()}
                {this.renderItalicButton()}
                {this.renderUnderlineButton()}
                {this.renderSeparator()}
                {this.renderLeftAlignButton()}
                {this.renderCenterAlignButton()}
                {this.renderRightAlignButton()}
                {this.renderSeparator()}
                {this.renderNumberedListButton()}
                {this.renderDottedListButton()}
                {this.renderSeparator()}
                {this.renderAddIndentationButton()}
                {this.renderRemoveIndentationButton()}
                {this.renderSeparator()}
                {this.renderAddQuoteButton()}
                {this.renderAddHyperlinkButton()}
                {this.renderSeparator()}
                {this.renderUndoButton()}
                {this.renderRedoButton()}
                {this.renderRemoveFormattingButton()}
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

    private renderBoldButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.BOLD, 
            onClick: () => this.executeCommand('bold') 
        });
    }

    private renderItalicButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.ITALIC, 
            onClick: () => this.executeCommand('italic')
        });
    }

    private renderUnderlineButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.UNDERLINE, 
            onClick: () => this.executeCommand('underline')
        });
    }

    private renderLeftAlignButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.LEFT_ALIGN, 
            onClick: () => this.executeCommand('justifyleft') 
        });
    }

    private renderCenterAlignButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.CENTER_ALIGN, 
            onClick: () => this.executeCommand('justifycenter')
        });
    }

    private renderRightAlignButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.RIGHT_ALIGN, 
            onClick: () => this.executeCommand('justifyright')
        });
    }

    private renderNumberedListButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.NUMBERED_LIST, 
            onClick: () => this.executeCommand('insertorderedlist')
        });
    }

    private renderDottedListButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.DOTTED_LIST, 
            onClick: () => this.executeCommand('insertunorderedlist')
        });
    }

    private renderAddIndentationButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.ADD_INDENTATION, 
            onClick: () => this.executeCommand('indent')
        });
    }

    private renderRemoveIndentationButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.DELETE_INDENTATION, 
            onClick: () => this.executeCommand('outdent')
        });
    }

    private renderAddQuoteButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.QUOTE, 
            onClick: () => this.executeCommand('blockquote')
        });
    }

    private renderAddHyperlinkButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.HYPERLINK, 
            onClick: () => {
                const url = prompt('Insert url');
                if (!url) return;
                this.executeCommand('createlink', url);
            }
        });
    }

    private renderUndoButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.UNDO, 
            onClick: () => this.executeCommand('undo')
        });
    }

    private renderRedoButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.REDO, 
            onClick: () => this.executeCommand('redo')
        });
    }

    private renderRemoveFormattingButton(): React.ReactNode {
        return this.renderButton({ 
            image: ToolbarIconsImages.REMOVE_FORMATTING, 
            onClick: () => this.executeCommand('removeFormat')
        });
    }

    private renderButton(values: { image: string, onClick: () => void }){
        return (
            <button
                type='button'
                onClick={e => {
                    e.preventDefault();
                    values.onClick()
                }}
            >
                <img src={values.image} />
            </button>
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