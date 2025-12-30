import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-textarea-editor',
  standalone: true,
  imports: [ButtonComponent, SvgComponent],
  templateUrl: './textarea-editor.component.html',
  styleUrl: './textarea-editor.component.scss',
})
export class TextareaEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editorRef') editorRef!: ElementRef<HTMLDivElement>;

  @ViewChild('inputLinkHrefRef')
  inputLinkHrefRef!: ElementRef<HTMLInputElement>;

  @ViewChild('inputLinkTextRef')
  inputLinkTextRef!: ElementRef<HTMLInputElement>;

  @ViewChild('linkFormatterRef')
  linkFormatterRef!: ElementRef<HTMLDivElement>;

  @Output() onChange: EventEmitter<string> = new EventEmitter();
  @Input() value: string = '';

  public textLinkSelected: string | null = '';
  public hrefLinkSelected = '';
  public toggleLinkFormatter = false;

  formattingStates = {
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
    link: false,
    code: false,
  };

  headingStates: {
    toggleHeading: boolean;
    heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | null;
  } = {
    toggleHeading: false,
    heading: null,
  };

  timeoutHandleKeyDown!: NodeJS.Timeout;

  ngOnInit(): void {
    window.addEventListener('click', (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        event.target.classList.contains('wrapper-link-format')
      ) {
        this.closeLinkFormat(event);
      }
    });
    window.addEventListener('keydown', (event) => {
      if (
        event.key === 'Tab' &&
        event.shiftKey &&
        event.target === this.editorRef.nativeElement
      ) {
        event.preventDefault();
        document.execCommand('outdent');
        this.handleSelection(event);
      } else if (
        event.key === 'Tab' &&
        event.target === this.editorRef.nativeElement
      ) {
        event.preventDefault();
        document.execCommand('indent');
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.editorRef && this.editorRef.nativeElement) {
      this.editorRef.nativeElement.innerHTML = this.value;
      //document.execCommand('insertHTML', false, `<div>${this.value}</div>`);
      //this.onInput();
    }
  }

  handleInputLinkDisabled = (event: Event) => event.preventDefault();

  clickDownSetLink(event: Event) {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    (event.target as HTMLInputElement).focus();

  }

  openLinkFormat(event: Event) {
    event.preventDefault();

    // Fazer a verificação de se o elemento é um <a> pegar também o seu href
    const selection = document.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    //const isAnchorElement = selection.focusNode?.parentElement;
    const isAnchorElement = this.getElementThatParent(selection.focusNode, 'A');

    if (isAnchorElement && isAnchorElement instanceof HTMLAnchorElement) {
      this.hrefLinkSelected = isAnchorElement.href;
      this.textLinkSelected = isAnchorElement.textContent;
    } else {
      const textContent = range.cloneContents().textContent;
      this.textLinkSelected = textContent;
    }

    let elementIsChildEditorRef = false;
    let boolArrayComparer: boolean[] = [];
    this.editorRef.nativeElement.childNodes.forEach((child) => {
      boolArrayComparer.push(
        this.anyChildNodesAreAnyElement(child, range.commonAncestorContainer)
      );
    });

    elementIsChildEditorRef = boolArrayComparer.some((value) => value);

    if (elementIsChildEditorRef) {
      this.toggleLinkFormatter = true;
      this.formattingStates.link = true;

      // Criar wrapper

      const highlight = document.createElement('span');
      highlight.classList.add('subselection');

      // Extrair e envolver
      const contents = range.extractContents();
      highlight.appendChild(contents);
      range.insertNode(highlight);

      selection.addRange(range);
    }
  }

  closeLinkFormat(event: Event) {
    event.preventDefault();

    this.toggleLinkFormatter = false;

    this.formattingStates.link = false;
    this.textLinkSelected = '';
    this.hrefLinkSelected = '';

    const selectedElement = document.querySelector('span.subselection');

    if (!selectedElement) return;

    if (selectedElement.firstChild) {
      const childNodes: ChildNode[] = [];
      selectedElement.childNodes.forEach((child) => childNodes.push(child));
      selectedElement.replaceWith(...childNodes);
    }

    selectedElement.remove();
  }

  removeLink(event: Event) {
    event.preventDefault();
    const selectedElement = document.querySelector('span.subselection');
    if (!selectedElement) {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(selectedElement);
    const anchorElement = this.getElementThatParent(
      range.commonAncestorContainer,
      'A'
    );
    if (!anchorElement) return;
    const childNodes: ChildNode[] = [];
    anchorElement.childNodes.forEach((child) => childNodes.push(child));

    anchorElement.replaceWith(...childNodes);
    this.closeLinkFormat(event);
  }

  createLink(event: Event) {
    //Fazer a função de remover link
    event.preventDefault();

    const selectedElement = document.querySelector('span.subselection');
    if (!selectedElement) {
      return;
    }

    const inputValue = this.inputLinkHrefRef.nativeElement.value;

    const range = document.createRange();
    range.selectNodeContents(selectedElement); // ou selectNode(el) se quiser o elemento inteiro

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    selection.removeAllRanges(); // limpa seleções anteriores
    selection.addRange(range); // aplica a nova seleção

    //Verifica se o elemento selecionado já é um Anchor
    if (
      selectedElement.parentElement &&
      selectedElement.parentElement instanceof HTMLAnchorElement
    ) {
      selectedElement.parentElement.target = '_blank';
      selectedElement.parentElement.href = inputValue;
      selectedElement.parentElement.textContent =
        this.inputLinkTextRef.nativeElement.value;

      this.closeLinkFormat(event);

      selectedElement.remove();

      return;
    }

    if (!selectedElement.textContent) {
      const newAnchor = document.createElement('a');
      newAnchor.href = inputValue;
      newAnchor.target = '_blank';
      newAnchor.textContent = this.inputLinkTextRef.nativeElement.value;
      selectedElement.replaceWith(newAnchor);
      range.setStartAfter(newAnchor);
      this.closeLinkFormat(event);
      return;
    }

    document.execCommand('createLink', false, inputValue);

    if (
      selectedElement.firstChild &&
      selectedElement.firstChild instanceof HTMLAnchorElement
    ) {
      selectedElement.firstChild.target = '_blank';

      selectedElement.firstChild.textContent =
        this.inputLinkTextRef.nativeElement.value;
      const ch = selectedElement.firstChild;

      selectedElement.replaceWith(selectedElement.firstChild);

      range.setStartAfter(ch);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    this.closeLinkFormat(event);

    //selection.anchorNode.parentElement.target = '_blank';
  }

  private anyChildNodesAreAnyElement(
    child: Element | ChildNode,
    elementComparer: Element | Node
  ) {
    //if (!children[0]) return currentElement;

    if (child.childNodes.length > 0) {
      const maxI = child.childNodes.length;
      const boolArray: boolean[] = [];
      for (let index = 0; index < maxI; index++) {
        const result = this.anyChildNodesAreAnyElement(
          child.childNodes[index],
          elementComparer
        );
        boolArray.push(result);
      }
      return (
        child === elementComparer || boolArray.some((boolValue) => boolValue)
      );
    }
    return child === elementComparer;
    //var element = this.iterateChildNode(children, index);
  }
  private getElementThatParent(
    child: Element | Node | null,
    comparer: string
  ): Element | null {
    //if (!children[0]) return currentElement;
    if (!child || !child.parentElement) return null;
    if (child === this.editorRef.nativeElement) return null;
    if (child.nodeName === comparer) return child as Element;
    return this.getElementThatParent(child.parentElement, comparer);
  }

  private getTopElementInSelection(
    currentElement: Element | Node | null
  ): Element | Node | null {
    //if (!children[0]) return currentElement;
    if (!currentElement || !currentElement.parentElement) return null;
    if (currentElement.parentElement === this.editorRef.nativeElement)
      return currentElement;
    return this.getTopElementInSelection(currentElement.parentElement);
  }

  applyFormat(event: Event, format: keyof typeof this.formattingStates) {
    event.preventDefault();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (selection.type === 'Caret') {
      this.formattingStates[format] = !this.formattingStates[format];
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand(format);
      return;
    }

    document.execCommand(format);
    this.handleSelection(event);
  }

  applyHeading(event: Event, type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    this.headingStates.heading =
      this.headingStates.heading === type ? null : type;
    if (selection.type === 'Caret') {
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (!this.headingStates.heading) {
      //document.execCommand('insertHTML', false, '' + range.extractContents().textContent);
      document.execCommand('formatBlock', false, '<div>');
      this.editorRef.nativeElement.innerHTML =
        this.editorRef.nativeElement.innerHTML.replace('<div>', '');
    } else {
      //document.execCommand('insertHTML', false, `<${type}>` + range.extractContents().textContent + `</${type}>`);
      document.execCommand('formatBlock', false, `<${type}>`);
    }
  }

  applyCode(event: Event) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (selection.type === 'Caret') {
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }


    const elementCode = this.getElementThatParent(range.startContainer, 'CODE');

    if (elementCode !== null && elementCode.parentElement) {
      if (elementCode.parentElement === this.editorRef.nativeElement) {
        const innerHtmlElement = elementCode.innerHTML;
        elementCode.remove();
        document.execCommand('insertHTML', false, innerHtmlElement);
      } else if (elementCode.children.length > 0) {
        // Possui elementos HTML então é innerHMTL
        elementCode.parentElement.innerHTML =
          elementCode.parentElement.innerHTML
            .replace('<code>', '')
            .replace('</code>', '');
        elementCode.remove();
      } else {
        elementCode.outerHTML = elementCode.outerHTML
          .replace('<code>', '')
          .replace('</code>', '');

        // range.insertNode(elementCode);
        //console.log(range.extractContents());
        // Apenas texto, então é textoContext
        // elementCode.parentElement.textContent =
        //   elementCode.parentElement.textContent; //Tira o link entre o text content e elemento que será removido

        //const rangeTextContent = range.cloneContents();
        // console.log(
        //   'Comparação 1: ',
        //   elementCode.textContent !== rangeTextContent.textContent
        // );
        // console.log('elementCode.textContent: ', elementCode.textContent);
        // console.log('rangeTextContent: ', rangeTextContent.textContent);

        // console.log('FORA');
        // console.log(elementCode.parentElement);
        // if (
        //   elementCode.textContent &&
        //   rangeTextContent.textContent &&
        //   elementCode.textContent !== rangeTextContent.textContent
        // ) {
        //   console.log('DENTRO');
        //   console.log(elementCode.parentElement);

        //   const contentSeparated = elementCode.textContent.split(
        //     rangeTextContent.textContent
        //   );

        //   console.log('contentSeparated: ', contentSeparated);

        //   // contentSeparated[2] = contentSeparated[1];
        //   // contentSeparated[1] = rangeTextContent;

        //   console.log('contentSeparated: ', contentSeparated);
        //   //rangeTextContent = range.extractContents();
        //   let listCodeElement: (HTMLElement | DocumentFragment)[] = [];

        //   if (contentSeparated[0].length === 0) {
        //     listCodeElement.push(rangeTextContent);
        //     const codeElement = document.createElement('code');
        //     codeElement.textContent = contentSeparated[1];
        //     listCodeElement.push(codeElement);
        //   } else if (contentSeparated[1].length === 0) {
        //     const codeElement = document.createElement('code');
        //     codeElement.textContent = contentSeparated[0];
        //     listCodeElement.push(codeElement);
        //     listCodeElement.push(rangeTextContent);
        //   } else {
        //     const codeElement1 = document.createElement('code');
        //     codeElement1.textContent = contentSeparated[0];

        //     const codeElement2 = document.createElement('code');
        //     codeElement2.textContent = contentSeparated[1];

        //     listCodeElement.push(codeElement1);
        //     listCodeElement.push(rangeTextContent);
        //     listCodeElement.push(codeElement2);
        //   }

        //   console.log('listCodeElement: ', listCodeElement);
        //   //range.deleteContents();
        //   listCodeElement.forEach((element) => {
        //     console.log(element.textContent);

        //     if (elementCode.parentElement) {
        //       elementCode.parentElement.appendChild(element);
        //     }
        //   });
        // }
      }

      this.formattingStates.code = false;
    } else {
      const docFrag = range.extractContents();
      const codeElement = document.createElement('code');
      codeElement.appendChild(docFrag);

      range.insertNode(codeElement);
      range.setStartAfter(codeElement);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  applyUnorderedList(event: Event) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!this.formattingStates.ul) {
      if (selection.type === 'Caret') {
        this.formattingStates.ul = !this.formattingStates.ul;
        this.formattingStates.ol = false;
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('insertUnorderedList');
        return;
      }
      document.execCommand('insertUnorderedList');
      return;
    }

    this.formattingStates.ul = false;
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  applyOrderedList(event: Event) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!this.formattingStates.ol) {
      if (selection.type === 'Caret') {
        this.formattingStates.ol = !this.formattingStates.ol;
        this.formattingStates.ul = false;
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('insertOrderedList');
        return;
      }
      document.execCommand('insertOrderedList');
    }

    this.formattingStates.ol = false;
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  onInput() {
    const content = this.editorRef.nativeElement.innerHTML;
    this.onChange.emit(content);
  }

  //Método que verifica se algum elemento pai é a respectiva tag
  private iterateParentElement(
    element: HTMLElement | Element | Node | null,
    type: string | string[]
  ): boolean {
    if (!element) return false;
    if (element === this.editorRef.nativeElement) return false;
    if (Array.isArray(type))
      return type.some((name) => element.nodeName === name.toUpperCase());
    if (element.nodeName === type.toUpperCase()) return true;
    return this.iterateParentElement(element.parentElement, type);
  }

  //Evento para verificar se o botão deve se manter ativo ou não
  handleSelection(event: Event) {
    const selection = window.getSelection();

    if (!selection || !selection.focusNode || selection.rangeCount === 0) {
      if (event.target instanceof Text) {
        if (event.target.parentElement === this.editorRef.nativeElement) {
          this.formattingStates.bold = false;
          this.formattingStates.italic = false;
          this.formattingStates.underline = false;
          this.formattingStates.ul = false;
          this.formattingStates.ol = false;
          this.formattingStates.code = false;
          this.headingStates.toggleHeading = false;
          this.headingStates.heading = null;
          return;
        }

        //Vai iterar para verificar se o elemento pai é alguma tag de formatação
        this.formattingStates.bold = this.iterateParentElement(
          event.target.parentElement,
          'B'
        );
        this.formattingStates.italic = this.iterateParentElement(
          event.target.parentElement,
          'I'
        );
        this.formattingStates.underline = this.iterateParentElement(
          event.target.parentElement,
          'U'
        );
        this.formattingStates.code = this.iterateParentElement(
          event.target.parentElement,
          'CODE'
        );
        this.formattingStates.ul = this.iterateParentElement(
          event.target.parentElement,
          'UL'
        );
        this.formattingStates.ol = this.iterateParentElement(
          event.target.parentElement,
          'OL'
        );

        if (this.iterateParentElement(event.target.parentElement, 'H1')) {
          this.headingStates.toggleHeading = true;
          this.headingStates.heading = 'h1';
        } else if (
          this.iterateParentElement(event.target.parentElement, 'H2')
        ) {
          this.headingStates.toggleHeading = true;
          this.headingStates.heading = 'h2';
        } else if (
          this.iterateParentElement(event.target.parentElement, 'H3')
        ) {
          this.headingStates.toggleHeading = true;
          this.headingStates.heading = 'h3';
        } else if (
          this.iterateParentElement(event.target.parentElement, 'H4')
        ) {
          this.headingStates.toggleHeading = true;
          this.headingStates.heading = 'h4';
        } else if (
          this.iterateParentElement(event.target.parentElement, 'H5')
        ) {
          this.headingStates.toggleHeading = true;
          this.headingStates.heading = 'h5';
        } else if (
          this.iterateParentElement(event.target.parentElement, 'H6')
        ) {
          this.headingStates.toggleHeading = true;
          this.headingStates.heading = 'h6';
        }
      }
      return;
    }

    if (selection.focusNode.parentElement === this.editorRef.nativeElement) {
      this.formattingStates.bold = false;
      this.formattingStates.italic = false;
      this.formattingStates.underline = false;
      this.formattingStates.code = false;
      this.formattingStates.ul = false;
      this.formattingStates.ol = false;
      this.headingStates.toggleHeading = false;
      this.headingStates.heading = null;

      return;
    }

    this.formattingStates.bold = this.iterateParentElement(
      selection.focusNode.parentElement,
      'B'
    );
    this.formattingStates.italic = this.iterateParentElement(
      selection.focusNode.parentElement,
      'I'
    );
    this.formattingStates.underline = this.iterateParentElement(
      selection.focusNode.parentElement,
      'U'
    );
    this.formattingStates.code = this.iterateParentElement(
      selection.focusNode.parentElement,
      'CODE'
    );

    this.formattingStates.ul = this.iterateParentElement(
      selection.focusNode.parentElement,
      'UL'
    );
    this.formattingStates.ol = this.iterateParentElement(
      selection.focusNode.parentElement,
      'OL'
    );

    if (this.iterateParentElement(selection.focusNode.parentElement, 'H1')) {
      
      this.headingStates.toggleHeading = true;
      this.headingStates.heading = 'h1';
    } else if (
      this.iterateParentElement(selection.focusNode.parentElement, 'H2')
    ) {
      this.headingStates.toggleHeading = true;
      this.headingStates.heading = 'h2';
    } else if (
      this.iterateParentElement(selection.focusNode.parentElement, 'H3')
    ) {
      this.headingStates.toggleHeading = true;
      this.headingStates.heading = 'h3';
    } else if (
      this.iterateParentElement(selection.focusNode.parentElement, 'H4')
    ) {
      this.headingStates.toggleHeading = true;
      this.headingStates.heading = 'h4';
    } else if (
      this.iterateParentElement(selection.focusNode.parentElement, 'H5')
    ) {
      this.headingStates.toggleHeading = true;
      this.headingStates.heading = 'h5';
    } else if (
      this.iterateParentElement(selection.focusNode.parentElement, 'H6')
    ) {
      this.headingStates.toggleHeading = true;
      this.headingStates.heading = 'h6';
    } else {
      this.headingStates.toggleHeading = false;
      this.headingStates.heading = null;

    }

  }

  handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        const selection = window.getSelection();

        if (
          selection &&
          selection.focusNode &&
          selection.focusNode !== this.editorRef.nativeElement
        ) {
          this.formattingStates.bold = this.iterateParentElement(
            selection.focusNode as Element,
            'B'
          );
          this.formattingStates.italic = this.iterateParentElement(
            selection.focusNode as Element,
            'I'
          );
          this.formattingStates.underline = this.iterateParentElement(
            selection.focusNode as Element,
            'U'
          );
          this.formattingStates.code = this.iterateParentElement(
            selection.focusNode as Element,
            'CODE'
          );
          this.formattingStates.ul = this.iterateParentElement(
            selection.focusNode as Element,
            'UL'
          );
          this.formattingStates.ol = this.iterateParentElement(
            selection.focusNode as Element,
            'OL'
          );

          if (this.iterateParentElement(selection.focusNode as Element, 'H1')) {
            this.headingStates.toggleHeading = true;
            this.headingStates.heading = 'h1';
          } else if (
            this.iterateParentElement(selection.focusNode as Element, 'H2')
          ) {
            this.headingStates.toggleHeading = true;
            this.headingStates.heading = 'h2';
          } else if (
            this.iterateParentElement(selection.focusNode as Element, 'H3')
          ) {
            this.headingStates.toggleHeading = true;
            this.headingStates.heading = 'h3';
          } else if (
            this.iterateParentElement(selection.focusNode as Element, 'H4')
          ) {
            this.headingStates.toggleHeading = true;
            this.headingStates.heading = 'h4';
          } else if (
            this.iterateParentElement(selection.focusNode as Element, 'H5')
          ) {
            this.headingStates.toggleHeading = true;
            this.headingStates.heading = 'h5';
          } else if (
            this.iterateParentElement(selection.focusNode as Element, 'H6')
          ) {
            this.headingStates.toggleHeading = true;
            this.headingStates.heading = 'h6';
          }
        } else {
          this.formattingStates.bold = false;
          this.formattingStates.italic = false;
          this.formattingStates.underline = false;
          this.formattingStates.code = false;
          this.formattingStates.ul = false;
          this.formattingStates.ol = false;
          this.headingStates.toggleHeading = false;
          this.headingStates.heading = null;
        }

        break;
      default:
        return;
    }
  }
}
