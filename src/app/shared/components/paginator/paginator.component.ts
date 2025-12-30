import { AfterContentInit, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit, AfterContentInit {
  pagePointer = 0;
  pageSize: number = 3;
  pageLength: number = 0;
  pageArray: number[] = [];
  arrayButtons: number[] = [];
  limitBtnInContainer = 6;
  @Output() paginate: EventEmitter<any> = new EventEmitter();
  @Input() tablePageData!: any[];
  tableDataOutput: any[] = [];
  public outOfRightIndex = false;
  public outOfLeftIndex = false;

  ngOnInit(): void {
    this.pageLength = Math.ceil(this.tablePageData.length / this.pageSize);

    for (let index = 0; index < this.pageLength; index++) {
      this.pageArray.push(index);
    }
    if (this.pageLength > this.limitBtnInContainer) {
      this.arrayButtons = this.pageArray.slice(0, this.limitBtnInContainer - 1);
      this.outOfRightIndex = true;
    } else {
      this.arrayButtons = this.pageArray.slice(0, this.pageLength);
    }


    let iForTableData = 0;

    for (let i = 0; i < this.pageLength; i++) {
      const arrayInternal = [];
      for (let j = 0; j < this.pageSize; j++) {
        if(this.tablePageData[iForTableData] === undefined) break
        arrayInternal.push(this.tablePageData[iForTableData]);
        iForTableData++;
      }
      this.tableDataOutput.push(arrayInternal);
    }

  }

  ngAfterContentInit(): void {
    this.paginate.emit(this.tableDataOutput[this.pagePointer])
  }
  click(currentIndex: number) {
    this.pagePointer = currentIndex;
    this.doCheckPageComponent();
  }

  rightPaginator() {
    this.pagePointer++;
    this.doCheckPageComponent();
  }

  leftPaginator() {
    this.pagePointer--;
    this.doCheckPageComponent();
  }


  doCheckPageComponent() {
    if (this.pageLength > this.limitBtnInContainer) {
      if (this.limitBtnInContainer - this.pagePointer === 1) {
        this.arrayButtons = this.pageArray.slice(
          this.pagePointer - (this.limitBtnInContainer - 3),
          this.limitBtnInContainer + 1
        );
        this.outOfRightIndex = true;
        this.outOfLeftIndex = true;
      } else if (this.limitBtnInContainer - this.pagePointer === 2) {
        this.arrayButtons = this.pageArray.slice(
          this.pagePointer - (this.limitBtnInContainer - 4),
          this.limitBtnInContainer
        );
        this.outOfRightIndex = true;
        this.outOfLeftIndex = true;
      } else if (this.pagePointer === this.limitBtnInContainer) {
        this.arrayButtons = this.pageArray.slice(
          this.pagePointer - (this.limitBtnInContainer - 3),
          this.limitBtnInContainer + 2
        );
        this.outOfRightIndex = true;
        this.outOfLeftIndex = true;
      } else if (this.pagePointer > this.limitBtnInContainer) {
        this.arrayButtons = this.pageArray.slice(
          this.pagePointer - 4,
          this.pagePointer + 2
        );
        this.outOfRightIndex = true;
        this.outOfLeftIndex = true;
      }

      if (this.pagePointer + 2 >= this.pageLength - 1) {
        this.arrayButtons = this.pageArray.slice(
          this.pagePointer - 3,
          this.pageLength + 1
        );
        this.outOfRightIndex = false;
        this.outOfLeftIndex = true;
      }
      if (this.outOfLeftIndex && this.pagePointer <= 3) {
        this.arrayButtons = this.pageArray.slice(
          0,
          this.limitBtnInContainer - 1
        );
        this.outOfRightIndex = true;
        this.outOfLeftIndex = false;
      }
    }
    this.paginate.emit(this.tableDataOutput[this.pagePointer])
  }
}
