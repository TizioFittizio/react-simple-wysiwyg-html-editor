import React from 'react';
import Editor from './Editor';

export default {
  title: 'Editor'
};

export const Story1 = () => {
    const testHTML = '<p>Facebook aggiorna la sua App per la gestione delle pagine (disponibile per <a href="https://apps.apple.com/it/app/gestore-delle-pagine-facebook/id514643583" target="_blank" rel="noreferrer noopener">iOS</a> e per <a href="https://play.google.com/store/apps/details?id=com.facebook.pages.app&amp;hl=it" target="_blank" rel="noreferrer noopener">Android</a>) e unifica la gestione di Instagram, Facebook e Messenger in un’unica piattaforma. Un grande aiuto per le piccole e medie imprese.</p><p>Grazie alla nuova <a href="https://about.fb.com/news/2020/09/a-faster-and-easier-way-to-manage-your-business-on-facebook-and-instagram/" target="_blank" rel="noreferrer noopener">Facebook Business Suite</a> sarà possibile programmare i post, non più solo da desktop, ma anche da smartphone. Ma le novità non finiscono qui! Con questa nuova feature sarà inoltre possibile gestire, in un’unica piattaforma, i messaggi di <strong>Instagram Direct</strong> e <strong>Messenger</strong>. Non servirà dunque passare da un’app all’altra, tutte le attività principali relative ai tre canali targati Zuckerberg saranno effettuabili da un’unica interfaccia.</p><figure class="wp-block-image size-large"><a href="https://www.facebook.com/watch/?v=3469305613090476&amp;extid=djVCsPYXnqdsMgMR" target="_blank" rel="noopener noreferrer"><img src="https://cms.youthquake.it/wp-content/uploads/2020/09/facebook-business-suite-1024x862.png" alt="Facebook business suite" class="wp-image-1497" srcset="https://cms.youthquake.it/wp-content/uploads/2020/09/facebook-business-suite-1024x862.png 1024w, https://cms.youthquake.it/wp-content/uploads/2020/09/facebook-business-suite-300x253.png 300w, https://cms.youthquake.it/wp-content/uploads/2020/09/facebook-business-suite-768x647.png 768w, https://cms.youthquake.it/wp-content/uploads/2020/09/facebook-business-suite-1200x1010.png 1200w, https://cms.youthquake.it/wp-content/uploads/2020/09/facebook-business-suite.png 1239w" sizes="(max-width: 1024px) 100vw, 1024px" /></a><figcaption>Interfaccia di Facebook Business Suite</figcaption></figure><h3><strong>Come funziona Facebook Business Suite?</strong></h3><p>Basterà effettuare l’accesso tramite con l’account personale legato alle pagine e avrai subito accesso a tutte le funzionalità per la gestione delle pagine. Tramite un semplice tasto potrai creare, schedulare o pubblicare direttamente un nuovo post. Lo stesso procedimento vale per i messaggi ricevuti in direct che appariranno in un’unica schermata in maniera distinguibile tra quelli ricevuti su <strong>Messenger</strong> e quelli relativi ad <strong>Instagram</strong>.</p><p>Dall’App <strong>Gestore delle pagine</strong> sarà inoltre possibile monitorare i dati statistici dei singoli post pubblicati e delle campagne attive in pagina. <strong>Facebook Business Suite</strong> risulta essere un valido alleato per tutte le <strong>PMI</strong> attive sui canali social e i negozi che potranno visualizzare le loro vetrine shop presenti su Facebook ed Instagram direttamente nella nuova interfaccia.</p><p>Ancora una volta Mark Zuckerberg centra l’obiettivo e soddisfa i bisogni di tutti i marketer attivi sui suoi canali. La gestione delle pagine da ora in poi sarà estremamente più facile. E voi, avete già provato la nuova interfaccia?   </p>'
    return (
        <Editor
            HTML={testHTML}
            onHTMLEdit={html => console.log(html)}
        />
    );
}

export const Story2 = () => {
    const testHTML = '<h1>Testo 1</h1><p>Testo 2</p><div>HTML 1</div><p>Testo 3</p><div>HTML 2</div><p>Testo 4</p>'
    return (
        <Editor
            HTML={testHTML}
            onHTMLEdit={html => console.log(html)}
        />
    );
}