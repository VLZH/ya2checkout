export class PaginationModel {
    Page: number;
    Limit: number;
    Count: number;
    constructor(data: any) {
        this.Page = data.Page;
        this.Limit = data.Limit;
        this.Count = data.Count;
    }
}
