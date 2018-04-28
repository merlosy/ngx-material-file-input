/**
 * The files to be uploaded
 */
export declare class FileInput {
    private _files;
    private delimiter;
    private _fileNames;
    constructor(_files: File[], delimiter?: string);
    readonly files: File[];
    readonly fileNames: string;
}
