import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const ClearfixExtension = Extension.create({
    name: 'clearfix',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('clearfix'),
                props: {
                    decorations(state) {
                        const endOfDocPosition = state.doc.nodeSize - 2;
                        const decoration = Decoration.widget(endOfDocPosition, () => {
                            const clearfixElement = document.createElement('div');
                            clearfixElement.style.clear = 'both';
                            clearfixElement.classList.add('clearfix');
                            return clearfixElement;
                        });

                        return DecorationSet.create(state.doc, [decoration]);
                    },
                },
            }),
        ];
    },
});

export default ClearfixExtension;