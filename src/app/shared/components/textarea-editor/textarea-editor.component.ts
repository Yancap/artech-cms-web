import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Subject } from 'rxjs';
import { SvgComponent } from "../svg/svg.component";

@Component({
  selector: 'app-textarea-editor',
  standalone: true,
  imports: [ButtonComponent, SvgComponent],
  templateUrl: './textarea-editor.component.html',
  styleUrl: './textarea-editor.component.scss',
})
export class TextareaEditorComponent implements OnInit, OnChanges {
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
    console.log(this.value);
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

  ngOnChanges(): void {
    if (this.editorRef && this.editorRef.nativeElement) {
      this.editorRef.nativeElement.innerHTML = this.value;
    }
  }

  handleInputLinkDisabled = (event: Event) => event.preventDefault();

  clickDownSetLink(event: Event) {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    (event.target as HTMLInputElement).focus();

    // if (range.commonAncestorContainer instanceof Text) {
    //   // Criar wrapper
    //   const highlight = document.createElement('span');
    //   highlight.classList.add('subselection');

    //   // Extrair e envolver
    //   const contents = range.extractContents();
    //   highlight.appendChild(contents);
    //   range.insertNode(highlight);

    //   (event.target as HTMLInputElement).focus();
    // }
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

  // applyBold(event: Event) {
  //   event.preventDefault();
  //   const selection = window.getSelection();

  //   if (!selection || selection.rangeCount === 0) return;

  //   const range = selection.getRangeAt(0);
  //   if (range.collapsed) {
  //     this.formattingStates.bold = !this.formattingStates.bold;
  //     const divEditor =
  //       selection.focusNode === this.editorRef.nativeElement
  //         ? (selection.focusNode as HTMLElement)
  //         : null;
  //     if (divEditor) {
  //       range.setStartAfter(selection.focusNode?.lastChild as Node);
  //       range.collapse(true);
  //       selection.removeAllRanges();
  //       selection.addRange(range);
  //       return;
  //     }

  //     range.setStartAfter(selection.focusNode as Node);
  //     range.collapse(true);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //     return;
  //   } // Não há texto selecionado

  //   const nodeElement = range.commonAncestorContainer;

  //   //Verifica se o ultimo elemento é Strong e adiciona nele

  //   const childrenElements = range.cloneContents().children;
  //   const textContent = range.cloneContents().textContent;

  //   if (childrenElements.length > 1) {
  //     const stringArray: string[] = [];
  //     for (let index = 0; index < childrenElements.length; index++) {
  //       const result = this.verifyTextContentInChildren(
  //         childrenElements[index],
  //         'STRONG'
  //       );
  //       stringArray.push(result);
  //     }
  //     const textThatStrong = stringArray.join('');

  //     // Lógica para remover os strongs
  //     if (textThatStrong === textContent) {
  //     } else {
  //       // Lógica para remover os strongs e adicionar um que cobre todo o range
  //     }

  //   }

  //   //Verifica se o elemento selecionado é strong
  //   console.log(nodeElement);
  //   if (
  //     nodeElement.parentElement &&
  //     nodeElement.parentElement.tagName === 'STRONG'
  //   ) {
  //     const cloneSelectedText = range.cloneContents();
  //     const currentHTMLElement = nodeElement.parentElement;

  //     //Toggle Strong
  //     if (currentHTMLElement.textContent === cloneSelectedText.textContent) {
  //       const selectedText = range.extractContents();
  //       const saveTextContent = selectedText.textContent;
  //       range.setStartAfter(nodeElement);
  //       nodeElement.childNodes.forEach((element) => {
  //         if (element.nodeName === 'STRONG' || element.nodeName === 'B') {
  //           element.remove();
  //         }
  //       });
  //       nodeElement.parentElement.remove();
  //       selectedText.textContent = saveTextContent;
  //       range.insertNode(selectedText);
  //       range.collapse(true);
  //       selection.removeAllRanges();
  //       selection.addRange(range);
  //       return;
  //     }

  //     //Remove o Strong de textos que estão dentro de strong

  //     const startOffset = selection.getRangeAt(0).startOffset;
  //     const endOffset = selection.getRangeAt(0).endOffset;

  //     //Pega o texto que vem antes do texto selecionado
  //     range.setStart(nodeElement, 0);
  //     range.setEnd(nodeElement, startOffset);
  //     const textBefore = range.cloneContents();

  //     //Pega o texto que vem depois do texto selecionado
  //     range.setStart(nodeElement, endOffset);
  //     range.setEnd(nodeElement, nodeElement.textContent?.length as number);
  //     const textAfter = range.cloneContents();

  //     const elementBefore = document.createElement('strong');
  //     const elementAfter = document.createElement('strong');

  //     elementBefore.innerText = textBefore.textContent as string;
  //     range.setStartBefore(nodeElement.parentElement);
  //     range.insertNode(elementBefore);

  //     range.setStartBefore(nodeElement.parentElement);
  //     range.insertNode(cloneSelectedText);

  //     elementAfter.innerText = textAfter.textContent as string;
  //     range.setStartAfter(nodeElement.parentElement);
  //     range.insertNode(elementAfter);

  //     nodeElement.textContent = null;

  //     range.collapse(true);
  //     selection.removeAllRanges();
  //     selection.addRange(range);

  //     this.editorRef.nativeElement.childNodes.forEach((element) => {
  //       if (
  //         (element.nodeName === 'STRONG' || element.nodeName === 'B') &&
  //         !element.textContent
  //       ) {
  //         element.remove();
  //       }
  //     });
  //     return;
  //   }

  //   console.log('XAINA 4');

  //   const selectedText = range.extractContents();
  //   // const saveTextContent = selectedText.textContent;
  //   // selectedText.textContent = saveTextContent;

  //   const element = document.createElement('strong');
  //   element.appendChild(selectedText);
  //   range.insertNode(element);

  //   // Reposiciona o cursor após o elemento inserido
  //   range.setStartAfter(element);
  //   range.collapse(true);
  //   selection.removeAllRanges();
  //   selection.addRange(range);

  //   //Remover os Strongs vazios
  //   this.editorRef.nativeElement.childNodes.forEach((element) => {
  //     if (
  //       (element.nodeName === 'STRONG' || element.nodeName === 'B') &&
  //       !element.textContent
  //     ) {
  //       element.remove();
  //     }
  //   });
  // }

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
    element: HTMLElement | Element | null,
    type: string | string[]
  ): boolean {
    if (!element) return false;
    if (element === this.editorRef.nativeElement) return false;
    if (Array.isArray(type))
      return type.some((name) => element.tagName === name.toUpperCase());
    if (element.tagName === type.toUpperCase()) return true;
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
