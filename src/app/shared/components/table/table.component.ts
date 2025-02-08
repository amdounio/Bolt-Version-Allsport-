import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {GetAllPage} from "../../../core/models/getAllPage.model";
import {SharedModule} from "../../shared.module";
import {Pageable} from "../../../core/models/pageable.model";
import {tablePageSizes} from "../../constant";
import {SpinnerComponent} from "../spinner/spinner.component";
import {NestedPropertyPipe} from "../../pipes/nested-property.pipe";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    imports: [
        NgClass,
        NgbPagination,
        NgIf,
        NgForOf,
        SharedModule,
        SpinnerComponent,
        NestedPropertyPipe
    ],
    standalone: true
})
export class TableComponent {
    @Input() data: GetAllPage<any> = {
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 0
        },
        first: true,
        last: true,
        totalElements: 0,
        totalPages: 0,
        size: 0,
        empty: true
    };
    @Input() columns: { id: number, key: string, header: string, className?: string }[] = [];
    @Input() actions: { label: string, action: string, class: string, icon: string, tooltip?: string }[] = [];
    @Input() headerActions: { label: string, action: string, class: string, icon: string, tooltip?: string }[] = [];
    @Input() pageSize: number = 10;
    @Input() spinner: boolean = true;
    @Input() showPagination: boolean = true;
    @Input() selectable: boolean = false;
    @Input() showHeader: { inputSearch?: boolean, pageSize?: boolean } = {inputSearch: true, pageSize: true};

    @Output() headerActionsEvents: EventEmitter<{ action: string }> = new EventEmitter();
    @Output() rowAction: EventEmitter<{ action: string, row: any }> = new EventEmitter();
    @Output() pageChange: EventEmitter<Pageable> = new EventEmitter();
    @Output() selectedItemsEvent: EventEmitter<any[]> = new EventEmitter();

    selectedItems: any[] = [];

    filter: string = '';
    selectedRows = new Set<any>();

    protected readonly tablePageSizes: number[] = tablePageSizes;

    performAction(action: string, row: any) {
        this.rowAction.emit({action, row});
    }

    performHeaderActions(action: any) {
        this.headerActionsEvents.emit({action});
    }

    updateData(page: number = 1) {
        const pageable: Pageable = new Pageable();
        pageable.page = page - 1;
        pageable.searchCriteria = this.filter;
        pageable.pageSize = this.pageSize;
        this.pageChange.emit(pageable);
    }

    toggleRowSelection(item: any) {
        if (!item) {
            console.error('Row does not have a unique identifier:', item);
            return;
        }

        if (this.selectedRows.has(item)) {
            this.selectedRows.delete(item);
            this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
        } else {
            this.selectedRows.add(item);
            this.selectedItems.push(item);
        }
        this.handleSelectedItems();
    }

    isRowSelected(row: any): boolean {
        if (!row.productPlacementID) {
            return false;
        }
        return this.selectedRows.has(row.productPlacementID);
    }

    handleSelectedItems(): void {
        this.selectedItemsEvent.emit(this.selectedItems);
    }
}