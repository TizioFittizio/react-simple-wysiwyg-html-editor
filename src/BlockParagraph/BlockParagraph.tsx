import * as React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import './BlockParagraph.css';

interface Props {
    id: string;
    html: string;
    readonly: boolean;
    showHTML: boolean;
    onHTMLChange: (html: string) => void;
    onNewLineKeyPress: () => void;
}

class BlockParagraph extends React.Component<Props, { }> {

    public constructor(props: Props){
        super(props);
    }

    public render(){
        return (
            <div className='block-paragraph-container'>
                {this.props.showHTML ? this.renderTextarea() : this.renderEditable()}
            </div>
        );
    }

    private renderEditable(){
        return (
            <ContentEditable
                id={this.props.id}
                tagName='div'
                className='editable'
                disabled={this.props.readonly}
                html={this.props.html}
                onChange={e => this.onChange(e)}
                onKeyDown={e => this.onKeyDown(e)}
            />
        );
    }

    private renderTextarea(){
        return (
            <textarea
                className='editable'
                value={this.props.html}
                readOnly={true}
            />
        )
    }

    private onChange(event: ContentEditableEvent){
        this.props.onHTMLChange(event.target.value);
    }

    private onKeyDown(event: React.KeyboardEvent<HTMLDivElement>){
        if (event.key === 'Enter'){
            event.preventDefault();
            this.props.onNewLineKeyPress();
        }
    }

}

export default BlockParagraph;