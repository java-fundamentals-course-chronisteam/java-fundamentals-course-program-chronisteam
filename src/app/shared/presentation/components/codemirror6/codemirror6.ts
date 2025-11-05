import { Component, ElementRef, Input, Output, EventEmitter, OnDestroy, OnInit, ViewChild, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { EditorView } from '@codemirror/view';
import { Extension, EditorState } from '@codemirror/state';

@Component({
  selector: 'app-codemirror6',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Codemirror6Component),
      multi: true
    }
  ],
  template: `<div #editorHost></div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    div {
      width: 100%;
      height: 100%;
    }
  `]
})
export class Codemirror6Component implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @ViewChild('editorHost', { static: true }) editorHost!: ElementRef<HTMLDivElement>;
  @Input() extensions: Extension[] = [];
  @Output() codeChange = new EventEmitter<string>();

  private editorView?: EditorView;
  private onChange = (value: string) => {};
  private onTouched = () => {};
  private _value: string = '';
  private isInitialized = false;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.initEditor();
  }

  ngOnDestroy() {
    this.editorView?.destroy();
  }

  private initEditor() {
    if (this.isInitialized) {
      return;
    }

    const extensions = [
      ...this.extensions,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const value = update.state.doc.toString();
          this._value = value;
          this.onChange(value);
          this.codeChange.emit(value);
        }
      })
    ];

    const state = EditorState.create({
      doc: this._value || '',
      extensions
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorHost.nativeElement
    });

    this.isInitialized = true;
  }

  writeValue(value: string): void {
    this._value = value || '';
    if (this.editorView && value !== this.editorView.state.doc.toString()) {
      this.editorView.dispatch({
        changes: {
          from: 0,
          to: this.editorView.state.doc.length,
          insert: this._value
        }
      });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Para CodeMirror 6, podemos usar CSS para deshabilitar la interacción
    // o simplemente ignorar este método si no es crítico
    if (this.editorView && this.editorHost) {
      if (isDisabled) {
        this.editorHost.nativeElement.style.pointerEvents = 'none';
        this.editorHost.nativeElement.style.opacity = '0.6';
      } else {
        this.editorHost.nativeElement.style.pointerEvents = 'auto';
        this.editorHost.nativeElement.style.opacity = '1';
      }
    }
  }
}

