import * as React from 'react';
import { EditorProps } from './Editor.types';
import './Editor.css';
import Toolbar from '../Toolbar/Toolbar';
import BlockParagraph from '../BlockParagraph/BlockParagraph';

interface State {
    HTMLBlocks: Array<{ type: 'paragraph' | 'html', content: string }>;
}

class Editor extends React.Component<EditorProps, State> {

    private static readonly PARAGRAPH_TAGS = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

    public constructor(props: EditorProps){
        super(props);
        this.state = { HTMLBlocks: this.getHTMLBlocksFromHTML(props.HTML) };
    }

    public render(){
        return (
            <div className={this.getEditorClassName()}>
                {this.renderToolbar()}
                {this.renderHTMLBlocks()}
            </div>
        );
    }

    private renderToolbar(){
        return (
            <Toolbar />
        );
    }

    private renderHTMLBlocks(){
        return (
            <div className='html-blocks-container'>
                <BlockParagraph html='<h2>AAAAH</h2>' onHTMLChange={() => {}} onNewLineKeyPress={() => {}} />
            </div>
        );
    }

    private getHTMLBlocksFromHTML(html: string){
        const container = document.createElement('div');
        container.innerHTML = html;
        const containerChildren = container.children;
        const blocks = [];
        for (let i = 0; i < containerChildren.length; i++){
            const child = containerChildren[i];
            blocks.push(this.getHTMLBlockFromElement(child));
        }
        return blocks;
    }

    private getHTMLBlockFromElement(element: Element){
        const tagName = element.tagName;
        if (Editor.PARAGRAPH_TAGS.includes(tagName)){
            return { type: 'paragraph', html: element.innerHTML }
        }
        else {
            return { type: 'html', html: element.innerHTML }
        }
    }

    private getEditorClassName(){
        const { editorClassName } = this.props;
        let className = 'editor-container';
        if (editorClassName) className += ` ${editorClassName}`;
        return className;
    }

}

export default Editor;