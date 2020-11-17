import * as React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import './BlockParagraph.css';

interface Props {
    html: string;
    readonly: boolean;
    showHTML: boolean;
    onHTMLChange: (html: string) => void;
}

interface State {
    
}

class BlockParagraph extends React.Component<Props, State> {

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
                tagName='div'
                className='editable'
                disabled={this.props.readonly}
                html={this.props.html}
                onChange={e => this.onChange(e)}
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

}

export default BlockParagraph;