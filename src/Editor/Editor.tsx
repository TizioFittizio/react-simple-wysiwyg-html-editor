import * as React from 'react';
import { EditorProps } from './Editor.types';
import './Editor.css';
import Toolbar from '../Toolbar/Toolbar';
import BlockParagraph from '../BlockParagraph/BlockParagraph';
import BlockHTML from '../BlockHTML/BlockHTML';
import BlockWrapper from '../BlockWrapper/BlockWrapper';
import { getRandomId } from '../helpers/getRandomId';
import { selectElementContents } from '../helpers/selectElementContents';

type HTMLBlock = { id: string, type: 'paragraph' | 'html', html: string, readonly: boolean, showHTML: boolean };

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
                {this.renderBlockAdd()}
            </div>
        );
    }

    private renderHTMLBlock(block: HTMLBlock, index: number){
        switch (block.type){
            case 'paragraph':
                return this.renderBlockParagraph(block, index);
            case 'html':
                return this.renderBlockHTML(block, index);
            default:
                throw new Error(`Rendering of unknown block type: ${block.type}`);     
        }
    }

    private renderBlockParagraph(block: HTMLBlock, index: number){
        return (
            <BlockWrapper
                key={index}
                icon='edit'
                showMenuOnClick
                showMenuButtonAddHTML
                showMenuButtonAddParagraph
                showMenuButtonDelete
                showMenuButtonToggleReadonly
                onMenuButtonAddHTML={() => this.onAddingBlockHTML(index)}
                onMenuButtonAddParagraph={() => this.onAddingBlockParagraph(index)}
                onMenuButtonDelete={() => this.onBlockHTMLRemove(index)}
                onMenuButtonToggleReadonly={() => this.onBlockHTMLToggleReadonly({ block, index })}
            >
                <BlockParagraph
                    id={block.id}
                    html={block.html}
                    readonly={block.readonly}
                    showHTML={block.showHTML}
                    onHTMLChange={html => this.onBlockHTMLChange({ html, block, index })}
                    onNewLineKeyPress={() => {
                        this.onAddingBlockParagraph(index);
                        setTimeout(() => this.focusAndSelectBlock(index + 1), 10);
                    }}
                />
            </BlockWrapper>
        );
    }

    private renderBlockHTML(block: HTMLBlock, index: number){
        return (
            <BlockWrapper
                key={index}
                icon='edit'
                showMenuOnClick
                showMenuButtonAddHTML
                showMenuButtonAddParagraph
                showMenuButtonDelete
                showMenuButtonToggleShowHTML
                onMenuButtonAddHTML={() => this.onAddingBlockHTML(index)}
                onMenuButtonAddParagraph={() => this.onAddingBlockParagraph(index)}
                onMenuButtonDelete={() => this.onBlockHTMLRemove(index)}
                onMenuButtonToggleShowHTML={() => this.onBlockHTMLToggleHTMLVisualization({ block, index })}
            >
                <BlockHTML
                    html={block.html}
                    onHTMLChange={html => this.onBlockHTMLChange({ html, block, index })}
                    showHTML={block.showHTML}
                />
            </BlockWrapper>
        );
    }

    private renderBlockAdd(){
        return (
            <BlockWrapper
                icon='new'
                showMenuOnClick
                showMenuButtonAddParagraph
                showMenuButtonAddHTML
                onMenuButtonAddHTML={() => this.onAddingBlockHTML(this.state.HTMLBlocks.length)}
                onMenuButtonAddParagraph={() => this.onAddingBlockParagraph(this.state.HTMLBlocks.length)}
            >
                <div style={{ width: '100%', height: '50px' }} />
            </BlockWrapper>
        );
    }

    private onAddingBlockParagraph(index: number){
        const newBlocks = this.state.HTMLBlocks.slice();
        const newElement = document.createElement('p');
        newElement.innerHTML = 'Text';
        const newBlock = this.getHTMLBlockFromElement(newElement);
        newBlocks.splice(index + 1, 0, newBlock);
        const newHTML = this.getHTMLFromHTMLBlocks(newBlocks);
        this.setState({ HTMLBlocks: this.getHTMLBlocksFromHTML(newHTML) });
        this.props.onHTMLEdit(newHTML);
    }

    private onAddingBlockHTML(index: number){
        const newBlocks = this.state.HTMLBlocks.slice();
        const newElement = document.createElement('div');
        newElement.innerHTML = 'HTML';
        const newBlock = this.getHTMLBlockFromElement(newElement);
        newBlocks.splice(index + 1, 0, newBlock);
        const newHTML = this.getHTMLFromHTMLBlocks(newBlocks);
        this.setState({ HTMLBlocks: this.getHTMLBlocksFromHTML(newHTML) });
        this.props.onHTMLEdit(newHTML);
    }

    private onBlockHTMLChange({ html, block, index }: { html: string, block: HTMLBlock, index: number }){
        const newBlock = { ...block, html };
        const newBlocks = this.state.HTMLBlocks.slice();
        newBlocks.splice(index, 1, newBlock);
        const newHTML = this.getHTMLFromHTMLBlocks(newBlocks);
        this.setState({ HTMLBlocks: this.getHTMLBlocksFromHTML(newHTML) });
        this.props.onHTMLEdit(newHTML);
    }

    private onBlockHTMLRemove(index: number){
        const newBlocks = this.state.HTMLBlocks.slice();
        newBlocks.splice(index, 1);
        const newHTML = this.getHTMLFromHTMLBlocks(newBlocks);
        this.setState({ HTMLBlocks: this.getHTMLBlocksFromHTML(newHTML) });
        this.props.onHTMLEdit(newHTML);
    }

    private onBlockHTMLToggleReadonly({ block, index }: { block: HTMLBlock, index: number }){
        const newBlock: HTMLBlock = { ...block, readonly: !block.readonly };
        const newBlocks = this.state.HTMLBlocks.slice();
        newBlocks.splice(index, 1, newBlock);
        this.setState({ HTMLBlocks: newBlocks });
    }

    private onBlockHTMLToggleHTMLVisualization({ block, index }: { block: HTMLBlock, index: number }){
        const newBlock: HTMLBlock = { ...block, showHTML: !block.showHTML };
        const newBlocks = this.state.HTMLBlocks.slice();
        newBlocks.splice(index, 1, newBlock);
        this.setState({ HTMLBlocks: newBlocks });
    }

    private focusAndSelectBlock(index: number){
        const block = this.state.HTMLBlocks[index];
        if (!block) throw new Error('No HTML block with index ' + index);
        const element = document.getElementById(block.id);
        if (!element) throw new Error(`HTML block element with id ${block.id} not found`);
        element.focus({});
        selectElementContents(element);
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
        const defaultProperties = {
            readonly: false,
            showHTML: false
        }
        if (Editor.PARAGRAPH_TAGS.includes(tagName)){
            return { 
                type: 'paragraph', 
                html: element.outerHTML.trim(),
                id: getRandomId(),
                ...defaultProperties 
            }
        }
        else {
            return { 
                type: 'html',
                id: getRandomId(),
                html: element.outerHTML.trim(),
                ...defaultProperties
            }
        }
    }

    private getHTMLFromHTMLBlocks(blocks: HTMLBlock[]){
        let html = '';
        for (const block of blocks) html += this.getHTMLFromHTMLBlock(block);
        return html;
    }

    private getHTMLFromHTMLBlock(block: HTMLBlock){
        let innerHTML = block.html.trim();
        if (!innerHTML.startsWith('<')){
            switch (block.type){
                case 'html':
                    innerHTML = `<div>${innerHTML}</div>`;
                    break;
            }
        }
        return innerHTML;
    }

    private getEditorClassName(){
        const { editorClassName } = this.props;
        let className = 'editor-container';
        if (editorClassName) className += ` ${editorClassName}`;
        return className;
    }

}

export default Editor;