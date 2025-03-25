import Image from '@tiptap/extension-image'

export const ResizableImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                renderHTML: attributes => attributes.width ? { width: attributes.width } : {},
            },
            height: {
                default: null,
                renderHTML: attributes => attributes.height ? { height: attributes.height } : {},
            },
            alignment: {
                default: 'left', // Varsayılan hizalama sol (left)
                renderHTML: (attributes: { alignment?: 'left' | 'right' | 'center' }) =>
                    ({ style: `float: ${attributes.alignment}` }),
            }
        };
    },
    addNodeView() {
        return ({ node, editor, getPos }) => {
            const MIN_WIDTH = 60;
            const BORDER_COLOR = '#0096fd';

            // Container oluştur
            const container = document.createElement('div');
            container.classList.add('resizable-image-container');
            container.setAttribute('draggable', 'true');
            container.setAttribute('data-drag-handle', '');
            container.style.position = 'relative';
            container.style.display = 'inline-block';
            container.style.lineHeight = '0px';
            container.style.overflow = 'hidden';
            container.style.clear = 'both';
            container.style.float = (node.attrs.alignment as 'left' | 'right') || 'left'; // Varsayılan olarak hizalama ayarla

            // Resim oluştur
            const img = document.createElement('img');
            img.src = node.attrs.src;
            if (node.attrs.alt) img.alt = node.attrs.alt;
            if (node.attrs.title) img.title = node.attrs.title;
            if (node.attrs.width) img.width = node.attrs.width;
            if (node.attrs.height) img.height = node.attrs.height;
            img.style.cursor = 'default';

            container.append(img);

            let editing = false;
            let borders: any = [];

            // Düzenleme modunu aç/kapat
            container.addEventListener('click', () => {
                if (!editing) {
                    editing = true;
                    createResizeUI();
                }
            });

            // Konteyner dışına tıklanınca düzenleme modunu kapat
            document.addEventListener('click', (event: any) => {
                if (!container.contains(event.target) && editing) {
                    editing = false;
                    removeResizeUI();
                }
            });

            function createResizeUI() {
                // Kenarlıklar
                const borderPositions = [
                    { left: 0, top: 0, height: '100%', width: '1px' },
                    { right: 0, top: 0, height: '100%', width: '1px' },
                    { top: 0, left: 0, width: '100%', height: '1px' },
                    { bottom: 0, left: 0, width: '100%', height: '1px' }
                ];

                for (const pos of borderPositions) {
                    const border = document.createElement('div');
                    border.style.position = 'absolute';
                    border.style.backgroundColor = BORDER_COLOR;
                    Object.assign(border.style, pos);
                    container.append(border);
                    borders.push(border);
                }

                // Yeniden boyutlandırma kolları
                const directions = ['nw', 'ne', 'sw', 'se'];
                for (const direction of directions) {
                    const handle = document.createElement('div');
                    handle.setAttribute('role', 'button');
                    handle.setAttribute('tabindex', '0');
                    handle.setAttribute('data-direction', direction);
                    handle.style.position = 'absolute';
                    handle.style.height = '10px';
                    handle.style.width = '10px';
                    handle.style.backgroundColor = BORDER_COLOR;
                    handle.style.cursor = `${direction}-resize`;

                    // Pozisyonları belirle
                    if (direction.includes('n')) handle.style.top = '0';
                    if (direction.includes('s')) handle.style.bottom = '0';
                    if (direction.includes('w')) handle.style.left = '0';
                    if (direction.includes('e')) handle.style.right = '0';

                    handle.addEventListener('mousedown', handleMouseDown);
                    container.append(handle);
                }

                const aligementButtons = ["left", "right"];
                for (const aligementButton of aligementButtons) {
                    const handle = document.createElement('div');
                    handle.setAttribute('role', 'button');
                    handle.setAttribute('tabindex', '0');
                    handle.style.position = 'absolute';
                    handle.style.height = '10px';
                    handle.style.width = '50px';
                    handle.style.zIndex = '1000';
                    handle.style.top = '10px';
                    // Pozisyonları belirle
                    if (aligementButton === "left") {
                        handle.style.left = '1rem';
                        handle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"> <line x1="21" y1="6" x2="3" y2="6"/> <line x1="15" y1="12" x2="3" y2="12"/> <line x1="17" y1="18" x2="3" y2="18"/> </svg>`;
                    }
                    if (aligementButton === "right") {
                        handle.style.right = '1rem';
                        handle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"> <line x1="3" y1="6" x2="21" y2="6"/> <line x1="9" y1="12" x2="21" y2="12"/> <line x1="7" y1="18" x2="21" y2="18"/> </svg>`;
                    }

                    handle.addEventListener('click', () => updateAlignment(aligementButton as 'left' | 'right'));

                    container.append(handle);
                }
            }

            function removeResizeUI() {
                borders.forEach((border: any) => border.remove());
                borders = [];
                const handles = container.querySelectorAll('[role="button"]');
                handles.forEach(handle => handle.remove());
            }

            function handleMouseDown(event: any) {
                event.preventDefault();
                const direction = event.currentTarget.dataset.direction;
                const initialXPosition = event.clientX;
                const currentWidth = img.width;
                let newWidth = currentWidth;
                const transform = direction.includes('w') ? -1 : 1;

                function mouseMoveHandler(event: any) {
                    newWidth = Math.max(currentWidth + transform * (event.clientX - initialXPosition), MIN_WIDTH);
                    img.style.width = `${newWidth}px`;

                    if (!event.buttons) removeListeners();
                }

                function removeListeners() {
                    window.removeEventListener('mousemove', mouseMoveHandler);
                    window.removeEventListener('mouseup', removeListeners);

                    if (typeof getPos === 'function') {
                        editor.view.dispatch(editor.view.state.tr.setNodeMarkup(getPos(), null, {
                            ...node.attrs,
                            width: newWidth
                        }));
                    }
                }

                window.addEventListener('mousemove', mouseMoveHandler);
                window.addEventListener('mouseup', removeListeners);
            }

            function updateAlignment(newAlignment: 'left' | 'right') {
                container.style.float = newAlignment;
                if (typeof getPos === 'function') {
                    editor.view.dispatch(editor.view.state.tr.setNodeMarkup(getPos(), null, {
                        ...node.attrs,
                        alignment: newAlignment
                    }));
                }
            }


            return {
                dom: container,
                update: (updatedNode) => {
                    if (updatedNode.attrs.src !== node.attrs.src) {
                        img.src = updatedNode.attrs.src;
                    }
                    if (updatedNode.attrs.width !== node.attrs.width) {
                        img.width = updatedNode.attrs.width;
                    }
                    if (updatedNode.attrs.height !== node.attrs.height) {
                        img.height = updatedNode.attrs.height;
                    }
                    if (updatedNode.attrs.alignment !== node.attrs.alignment) {
                        container.style.float = updatedNode.attrs.alignment;
                    }
                    return true;
                },
                destroy: () => {
                    // Event temizliği yapılabilir
                }
            };
        };
    },
});
