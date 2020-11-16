import * as React from 'react';
import { EditorProps } from './Editor.types';
import './Editor.css';
import Toolbar from '../Toolbar/Toolbar';
import BlockParagraph from '../BlockParagraph/BlockParagraph';
import BlockHTML from '../BlockHTML/BlockHTML';
import BlockWrapper from '../BlockWrapper/BlockWrapper';

type HTMLBlock = { type: 'paragraph' | 'html', html: string };

interface State {
    HTMLBlocks: Array<HTMLBlock>;
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
                {this.state.HTMLBlocks.map((x, i) => this.renderHTMLBlock(x, i))}
            </div>
        );
    }

    private renderHTMLBlock(block: HTMLBlock, index: number){
        switch (block.type){
            case 'paragraph':
                console.log(block.html);
                return (
                    <BlockWrapper
                        key={index}
                        icon='edit'
                        showMenuOnClick={true}
                        showMenuButtonAddHTML={true}
                        showMenuButtonAddParagraph={true}
                        showMenuButtonDelete={true}
                        showMenuButtonToggleReadonly={true}
                    >
                        <BlockParagraph 
                            html={block.html}
                            onHTMLChange={newHTML => console.log(newHTML)}
                        />
                    </BlockWrapper>
                );
            case 'html':
                return (
                    <BlockWrapper
                        key={index}
                        icon='edit'
                    >
                        <BlockHTML
                        />
                    </BlockWrapper>
                );
        }
    }

    private getHTMLBlocksFromHTML(html: string): HTMLBlock[] {
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

    private getHTMLBlockFromElement(element: Element): HTMLBlock {
        const tagName = element.tagName;
        if (Editor.PARAGRAPH_TAGS.includes(tagName)){
            return { type: 'paragraph', html: element.outerHTML.trim() }
        }
        else {
            return { type: 'html', html: element.outerHTML.trim() }
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