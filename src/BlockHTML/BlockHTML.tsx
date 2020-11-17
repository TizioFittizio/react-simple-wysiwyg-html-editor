import * as React from 'react';
import './BlockHTML.css';

interface Props {
    html: string;
    showHTML: boolean;
    onHTMLChange: (html: string) => void;    
}

interface State {
    
}

class BlockHTML extends React.Component<Props, { }> {

    public constructor(props: Props){
        super(props);
    }

    public render(){
        return (
            <div className='block-html-container'>
                {this.props.showHTML ? this.renderHTML() : this.renderTextarea()}
            </div>
        );
    }

    private renderTextarea(){
        return (
            <textarea
                className='editable'
                value={this.props.html}
                onChange={e => this.props.onHTMLChange(e.target.value)}
            />
        )
    }

    private renderHTML(){
        return (
            <div
                className='editable'
                dangerouslySetInnerHTML={{ __html: this.props.html }}
            />
        );
    }

}

export default BlockHTML;