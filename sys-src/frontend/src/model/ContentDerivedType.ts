import type Content from './Content';

// See https://stackoverflow.com/a/52358194
type ContentClass = typeof Content;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface ContentDerivedType extends ContentClass {}
