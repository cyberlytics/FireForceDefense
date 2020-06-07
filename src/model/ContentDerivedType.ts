import type Content from './Content';

// See https://stackoverflow.com/a/52358194
type ContentClass = typeof Content;
export default interface ContentDerivedType extends ContentClass {}
