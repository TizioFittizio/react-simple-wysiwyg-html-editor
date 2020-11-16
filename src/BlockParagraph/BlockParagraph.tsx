import * as React from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import './BlockParagraph.css';

interface Props {
    html: string;
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
                <ContentEditable
                    tagName='div'
                    html={this.props.html}
                    onChange={e => this.onChange(e)}
                />
            </div>
        );
    }

    private onChange(event: ContentEditableEvent){
        this.props.onHTMLChange(event.target.value);
    }

}

export default BlockParagraph;