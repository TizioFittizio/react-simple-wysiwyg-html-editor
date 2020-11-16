import React from 'react';
import Editor from './Editor';

export default {
  title: 'Editor'
};

export const Story1 = () => {
    return (
        <Editor
            HTML='<div><p>Paragrafo</p><div>Cose strane</div><p>Altro paragrafo</p></div>'
            onHTMLEdit={html => console.log(html)}
        />
    );
}