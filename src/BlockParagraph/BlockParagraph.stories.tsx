import React from 'react';
import BlockParagraph from './BlockParagraph';

export default {
  title: 'BlockParagraph'
};

export const Story = () => {
    return (
        <BlockParagraph
            html={'<p><h1>A very</h1> simple text</p>'}
            onHTMLChange={html => console.log(html)}
            onNewLineKeyPress={() => alert('NewLine')}
        />
    );
}