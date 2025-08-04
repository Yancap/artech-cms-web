import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-textarea-editor',
  standalone: true,
  imports: [],
  templateUrl: './textarea-editor.component.html',
  styleUrl: './textarea-editor.component.scss',
})
export class TextareaEditorComponent {
  @ViewChild('editorRef') editorRef!: ElementRef<HTMLDivElement>;

  createLink(event: Event) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    //Substituir
    const url = prompt('Digite o URL');
    if (!url) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.appendChild(selectedText);

    range.insertNode(anchor);

    range.setStartAfter(anchor);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  applyFormat(event: Event, type: string) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // Não há texto selecionado

    const selectedText = range.extractContents();
    const element = document.createElement(type);
    element.appendChild(selectedText);
    range.insertNode(element);

    // Reposiciona o cursor após o elemento inserido
    range.setStartAfter(element);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  applyUnorderedList(event: Event) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const content = range.extractContents();
    const textContent = content.textContent || '';
    const lines = textContent.split('\n').filter((line) => line.trim() !== '');

    const ul = document.createElement('ul');
    for (const line of lines) {
      const li = document.createElement('li');
      li.textContent = line.trim();
      ul.appendChild(li);
    }

    range.insertNode(ul);

    // Reposiciona o cursor após a lista
    range.setStartAfter(ul);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  applyOrderedList(event: Event) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const content = range.extractContents();
    const textContent = content.textContent || '';
    const lines = textContent.split('\n').filter((line) => line.trim() !== '');

    const ol = document.createElement('ol');
    for (const line of lines) {
      const li = document.createElement('li');
      li.textContent = line.trim();
      ol.appendChild(li);
    }

    range.insertNode(ol);

    range.setStartAfter(ol);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  onInput() {
    const content = this.editorRef.nativeElement.innerHTML;
    console.log(content); // Aqui você pode emitir o conteúdo para o componente pai
  }
}
